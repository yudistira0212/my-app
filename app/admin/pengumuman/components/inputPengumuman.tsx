"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { uploadImage } from "@/app/lib/controllers/imageControllers";
import { useSession } from "next-auth/react";
import { FaPlus } from "react-icons/fa";
import Modals from "@/app/components/ui/modals/Modals";
import apiClient from "@/app/lib/axios/axios";
import { toast } from "react-toastify";
import { images } from "@/app/lib/image/images";

interface PengumumanInputProps {
  onSuccess: () => void;
}

const InputPengumuman: React.FC<PengumumanInputProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    judul: "",
    text: "",
    gambar: "",
    url_gambar: "",
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
    if (!selectedFile) {
      toast.error("Please select a file to upload.");
      return;
    }

    setUploading(true);

    const userId = data?.user.id;
    const rute = "pengumuman";
    const uploadResult = await uploadImage(rute, selectedFile);

    if (!uploadResult) {
      toast.error("Failed to upload image");
      setUploading(false);
      return;
    }

    const { url: url_gambar, namaImage: gambar } = uploadResult;

    const pengumumanData = {
      ...formData,
      gambar,
      url_gambar,
      user_id: Number(userId), // Update with the correct user_id
    };

    try {
      await apiClient.post("/api/pengumuman", pengumumanData);
      resetForm();
      setModalIsOpen(false);
      onSuccess();
      toast.success("Pengumuman created successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Error creating pengumuman");
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      judul: "",
      text: "",
      gambar: "",
      url_gambar: "",
    });
    setSelectedFile(null);
    setPreviewURL(null);
  };

  return (
    <div>
      <button
        onClick={() => setModalIsOpen(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-md flex"
      >
        <FaPlus />
      </button>

      <Modals
        modalIsOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        title={"Tambah Pengumuman"}
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6"
        >
          <div className="grid grid-cols-4 gap-2">
            <div className="row-span-2">
              <label className="text-gray-700">Gambar</label>
              <Image
                src={previewURL || images.imageDefault}
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
            className="bg-blue-500 mt-4 text-white p-2 rounded flex justify-center w-full"
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
  <div className="col-span-3">
    <label className="text-gray-700">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className="text-gray-900 border border-gray-300 rounded-lg bg-gray-50 w-full h-24"
    />
  </div>
);

export default InputPengumuman;
