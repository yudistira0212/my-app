"use client";

import React, { useRef, useState } from "react";
import axios from "axios";

import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { uploadImage } from "@/app/lib/controllers/imageControllers";
import { useSession } from "next-auth/react";

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
      const response = await axios.post("/api/pengumuman", pengumumanData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        console.log("Pengumuman created successfully:", response.data);
        // Reset form fields
        setJudul("");
        setText("");
        setGambar("");
        setUrlGambar(null);
        setSelectedFile(null);
        setPreviewURL(null);
        setModalIsOpen(false);
        onSuccess();
      } else {
        console.error("Failed to create pengumuman");
      }
    } catch (error) {
      console.error("Error creating pengumuman:", error);
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>

      <Transition appear show={modalIsOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setModalIsOpen(false)}
        >
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h2" className="text-xl font-semibold mb-4">
                    Tambah Pengumuman
                  </Dialog.Title>
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
                              src={previewURL}
                              alt="Preview"
                              className="bg-gray-200 rounded-lg mb-2"
                              onClick={handleImageClick}
                              width={200}
                              height={200}
                            />
                          </div>
                        ) : (
                          <div className="">
                            <img
                              alt="Preview"
                              onClick={handleImageClick}
                              className="bg-gray-200 rounded-lg mb-2"
                              width={200}
                              height={200}
                            />
                          </div>
                        )}
                        <input
                          type="file"
                          onChange={handleFileChange}
                          ref={fileInputRef}
                          className="text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 w-full h-12"
                          hidden
                        />
                      </div>
                      <div className="col-span-3">
                        <label className="text-gray-700">Judul</label>
                        <input
                          type="text"
                          value={judul}
                          onChange={(e) => setJudul(e.target.value)}
                          className="text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 w-full h-12"
                        />
                      </div>
                      <div className="col-span-3">
                        <label className="text-gray-700">Teks</label>
                        <textarea
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                          className="text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 w-full h-24"
                        />
                      </div>
                      {/* <div className="col-span-3">
                        <label className="text-gray-700">URL Gambar</label>
                        <input
                          type="text"
                          value={urlGambar || ""}
                          onChange={(e) => setUrlGambar(e.target.value)}
                          className="text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 w-full h-12"
                        />
                      </div> */}
                    </div>

                    <button
                      type="submit"
                      className="bg-blue-500 mt-4 text-white p-2 rounded"
                      disabled={uploading}
                    >
                      {uploading ? "Uploading..." : "Save"}
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default InputPengumuman;
