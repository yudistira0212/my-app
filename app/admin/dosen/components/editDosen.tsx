"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { updateImage } from "@/app/lib/controllers/imageControllers";
import { FaEdit } from "react-icons/fa";
import Modals from "@/app/components/ui/modals/Modals";
import apiClient from "@/app/lib/axios/axios";
import { toast } from "react-toastify";
import { images } from "@/app/lib/image/images";
import { Dosen } from "@prisma/client";

interface EditProps {
  onSuccess: () => void;
  dataDosen: Dosen;
}

const EditDosen: React.FC<EditProps> = ({ onSuccess, dataDosen }) => {
  const [formData, setFormData] = useState({
    nama: dataDosen.nama || "",
    jabatan: dataDosen.jabatan || "",
    pendidikan: dataDosen.pendidikan || "",
    publikasi: dataDosen.publikasi || "",
    kontak: dataDosen.kontak || "",
    biografi: dataDosen.biografi || "",
  });

  console.log(dataDosen);

  const [gambarLama, setGambarLama] = useState<string>(dataDosen.gambar || "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(
    dataDosen.url_gambar || null
  );
  const [uploading, setUploading] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

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

    console.log("masukkk");

    let url_gambar = previewURL;
    let gambar = gambarLama;
    if (selectedFile) {
      const updateResult = await updateImage("dosen", gambarLama, selectedFile);
      if (!updateResult) {
        toast.error("Failed to update image");
        setUploading(false);
        return;
      }
      url_gambar = updateResult.url;
      gambar = updateResult.namaImage;
    }

    const dosenData = {
      ...formData,
      url_gambar,
      gambar,
      prodi_id: 1, // Update with the actual prodi_id
    };

    try {
      await apiClient.put(`/api/dosen/${dataDosen.id}/update`, dosenData);
      toast.success("Dosen updated successfully");
      setModalIsOpen(false);
      onSuccess();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Error updating dosen");
    } finally {
      setUploading(false);
    }
  };

  const handleModalOpen = () => {
    // Initialize form data from props when modal opens
    setFormData({
      nama: dataDosen.nama || "",
      jabatan: dataDosen.jabatan || "",
      pendidikan: dataDosen.pendidikan || "",
      publikasi: dataDosen.publikasi || "",
      kontak: dataDosen.kontak || "",
      biografi: dataDosen.biografi || "",
    });
    setPreviewURL(dataDosen.url_gambar || null);
    setGambarLama(dataDosen.gambar || "");
    setModalIsOpen(true);
  };

  return (
    <div>
      <button
        onClick={handleModalOpen}
        className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-md flex"
      >
        <FaEdit />
      </button>

      <Modals
        modalIsOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        title={"Edit Dosen"}
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6"
        >
          <div className="grid grid-cols-4 gap-2">
            <div className="row-span-2">
              <label className="text-gray-700">Foto</label>
              <Image
                src={previewURL ?? images.imageDefault}
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
            {renderTextInput("Nama", "nama", formData.nama, handleChange)}
            {renderTextInput(
              "Posisi",
              "jabatan",
              formData.jabatan,
              handleChange
            )}
            {renderTextArea(
              "Pendidikan",
              "pendidikan",
              formData.pendidikan,
              handleChange
            )}
            {renderTextArea(
              "Publikasi Ilmiah",
              "publikasi",
              formData.publikasi,
              handleChange
            )}
            {renderTextArea(
              "Biografi",
              "biografi",
              formData.biografi ?? "",
              handleChange
            )}
            {renderTextInput(
              "Contact",
              "kontak",
              formData.kontak,
              handleChange,
              "email"
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 mt-4 text-white p-2 rounded w-full flex justify-center disabled:opacity-50"
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
  onChange: React.ChangeEventHandler<HTMLInputElement>,
  type: string = "text"
) => (
  <div className="col-span-3">
    <label className="text-gray-700">{label}</label>
    <input
      type={type}
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
  <div className="col-span-2">
    <label className="text-gray-700">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      className="text-gray-900 border border-gray-300 rounded-lg bg-gray-50 w-full h-12"
    />
  </div>
);

export default EditDosen;
