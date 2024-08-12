"use client";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { storage } from "@/app/lib/firebase/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { updateImage } from "@/app/lib/controllers/imageControllers";
import { useSession } from "next-auth/react";

interface EditProps {
  id: number;
  onSuccess: () => void;
}

const EditPengumuman: React.FC<EditProps> = ({ id, onSuccess }) => {
  const [judul, setJudul] = useState("");
  const [text, setText] = useState("");
  const [gambarLama, setGambarLama] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { data } = useSession();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const getDataPengumuman = async () => {
    await axios
      .get(`/api/pengumuman/${id}`)
      .then((response) => {
        const pengumuman = response.data;
        setJudul(pengumuman.judul);
        setText(pengumuman.text);
        setPreviewURL(pengumuman.url_gambar);
        setGambarLama(pengumuman.gambar);
      })
      .catch((error) => {
        console.error("Error fetching pengumuman data:", error);
      });
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

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
    setUploading(true);

    const userId = data?.user.id;

    let url_gambar = previewURL;
    let gambar = gambarLama;
    if (selectedFile) {
      const rute = "pengumuman";
      const updateResult = await updateImage(rute, gambarLama, selectedFile);

      if (!updateResult) {
        alert("Failed to update image");
        setUploading(false);
        return;
      }
      url_gambar = updateResult.url;
      gambar = updateResult.namaImage;
    }

    const pengumumanData = {
      id,
      judul,
      text,
      url_gambar,
      gambar,
      user_id: Number(userId), // Sesuaikan dengan user_id yang tepat
    };

    try {
      const response = await axios.put(
        `/api/pengumuman/${id}/update`,
        pengumumanData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setUploading(false);
        onSuccess();
        console.log("Pengumuman updated successfully:", response.data);
        setModalIsOpen(false);
      } else {
        setUploading(false);
        console.error("Failed to update pengumuman");
      }
    } catch (error) {
      setUploading(false);
      console.error("Error updating pengumuman:", error);
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          setModalIsOpen(true);
          getDataPengumuman();
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-md flex"
      >
        Edit
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
                    Edit Pengumuman
                  </Dialog.Title>
                  <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-md rounded-lg p-6"
                  >
                    <div className="grid grid-cols-4 gap-2">
                      <div className="row-span-2">
                        <label className="text-gray-700">Gambar</label>
                        {previewURL ? (
                          <div>
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
                          <div>
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
                      <div className="col-span-4">
                        <label className="text-gray-700">Text</label>
                        <textarea
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                          className="text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 w-full h-24"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="bg-blue-500 mt-4 text-white p-2 rounded disabled:opacity-50"
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

export default EditPengumuman;
