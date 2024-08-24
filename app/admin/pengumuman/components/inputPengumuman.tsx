"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
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
  const [judul, setJudul] = useState("");
  const [text, setText] = useState("");
  const [gambar, setGambar] = useState("");
  const [urlGambar, setUrlGambar] = useState<string | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { data } = useSession();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fungsi untuk membuka dialog pemilihan file
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // Fungsi untuk menangani perubahan file yang dipilih
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setPreviewURL(previewURL);
    } else {
      setPreviewURL(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userId = data?.user.id;

    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    setUploading(true);

    // Tentukan rute sesuai dengan pengaturan backend Anda
    const rute = "pengumuman";
    const uploadResult = await uploadImage(rute, selectedFile);

    if (!uploadResult) {
      alert("Failed to upload image");
      setUploading(false);
      return;
    }

    const { url: url_gambar, namaImage: gambar } = uploadResult;

    const pengumumanData = {
      judul,
      text,
      gambar,
      url_gambar,
      user_id: Number(userId), // Update dengan ID pengguna yang sesuai
    };

    try {
      await apiClient.post("/api/pengumuman", pengumumanData);

      // Reset form fields
      setJudul("");
      setText("");
      setGambar("");
      setUrlGambar(null);
      setSelectedFile(null);
      setPreviewURL(null);
      setModalIsOpen(false);
      onSuccess();
      toast.success("Pengumuman created successfully");
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error);
      }
    } finally {
      setUploading(false);
    }
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
        title={" Tambah Pengumuman"}
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6"
        >
          <div className="grid grid-cols-4 gap-2">
            <div className="row-span-2">
              <label className="text-gray-700">Gambar</label>
              {previewURL ? (
                <div className="">
                  <Image
                    src={previewURL || images.imageDefault}
                    alt="Preview"
                    className="bg-gray-200 hover:cursor-pointer rounded-lg mb-2"
                    onClick={handleImageClick}
                    width={200}
                    height={200}
                  />
                </div>
              ) : (
                <div className="">
                  <Image
                    alt="Preview"
                    src={images.imageDefault}
                    onClick={handleImageClick}
                    className="bg-gray-200 hover:cursor-pointer rounded-lg mb-2"
                    width={200}
                    height={200}
                  />
                </div>
              )}
              <input
                type="file"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="text-gray-900 border border-gray-300 rounded-lg  bg-gray-50 w-full h-12"
                hidden
              />
            </div>
            <div className="col-span-3">
              <label className="text-gray-700">Judul</label>
              <input
                type="text"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                className="text-gray-900 border border-gray-300 rounded-lg  bg-gray-50 w-full h-12"
              />
            </div>
            <div className="col-span-3">
              <label className="text-gray-700">Teks</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="text-gray-900 border border-gray-300 rounded-lg  bg-gray-50 w-full h-24"
              />
            </div>
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

export default InputPengumuman;
