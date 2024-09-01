"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { updateImage } from "@/app/lib/controllers/imageControllers";
import { useSession } from "next-auth/react";
import { FaEdit } from "react-icons/fa";
import Modals from "@/app/components/ui/modals/Modals";
import apiClient from "@/app/lib/axios/axios";
import { toast } from "react-toastify";
import { images } from "@/app/lib/image/images";
import { Pengumuman } from "@prisma/client";

interface EditProps {
  pengumuman: Pengumuman;
  onSuccess: () => void;
}

const EditPengumuman: React.FC<EditProps> = ({ pengumuman, onSuccess }) => {
  const [formData, setFormData] = useState({
    judul: pengumuman.judul || "",
    text: pengumuman.text || "",
    gambar: pengumuman.gambar || "",
    url_gambar: pengumuman.url_gambar || "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { data } = useSession();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => fileInputRef.current?.click();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    setPreviewURL(file ? URL.createObjectURL(file) : null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    const userId = data?.user.id;
    let { gambar, url_gambar } = formData;

    if (selectedFile) {
      const updateResult = await updateImage(
        "pengumuman",
        gambar,
        selectedFile
      );
      if (!updateResult) {
        toast.error("Failed to update image");
        setUploading(false);
        return;
      }
      url_gambar = updateResult.url;
      gambar = updateResult.namaImage;
    }

    const pengumumanData = {
      ...formData,
      url_gambar,
      gambar,
      user_id: Number(userId), // Sesuaikan dengan user_id yang tepat
    };

    try {
      await apiClient.put(
        `/api/pengumuman/${pengumuman.id}/update`,
        pengumumanData
      );
      onSuccess();
      setModalIsOpen(false);
      toast.success("Pengumuman updated successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Error updating pengumuman");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          setModalIsOpen(true);
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-md flex"
      >
        <FaEdit />
      </button>

      <Modals
        modalIsOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        title={"Edit Pengumuman"}
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6"
        >
          <div className="grid grid-cols-4 gap-2">
            <div className="row-span-2">
              <label className="text-gray-700">Gambar</label>
              <Image
                src={previewURL ?? pengumuman.url_gambar ?? images.imageDefault}
                alt="Preview"
                className="bg-gray-200 hover:cursor-pointer rounded-lg mb-2"
                onClick={handleImageClick}
                width={200}
                height={200}
              />
              <input
                type="file"
                onChange={handleFileChange}
                ref={fileInputRef}
                hidden
              />
            </div>
            {renderTextInput("Judul", "judul", formData.judul, handleChange)}
            {renderTextArea("Teks", "text", formData.text, handleChange)}
          </div>

          <button
            type="submit"
            className="bg-blue-500 mt-4 text-white p-2 rounded disabled:opacity-50"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Simpan"}
          </button>
        </form>
      </Modals>
    </div>
  );
};

// Helper functions for rendering inputs
const renderTextInput = (
  label: string,
  name: string,
  value: string,
  onChange: React.ChangeEventHandler<HTMLInputElement>
) => (
  <div className="col-span-3">
    <label className="text-gray-700">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="text-gray-900 border border-gray-300 rounded-lg bg-gray-50 w-full h-12"
    />
  </div>
);

const renderTextArea = (
  label: string,
  name: string,
  value: string,
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>
) => (
  <div className="col-span-4">
    <label className="text-gray-700">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className="text-gray-900 border border-gray-300 rounded-lg bg-gray-50 w-full h-24"
    />
  </div>
);

export default EditPengumuman;
