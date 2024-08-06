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

interface EditProps {
  // show: boolean;
  id: number;
  // dataGaleri: any;
  onSuccess: () => void;
}
const EditDosen: React.FC<EditProps> = ({
  // show,
  id,
  // dataGaleri,
  onSuccess,
}) => {
  const [nama, setNama] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [pendidikan, setPendidikan] = useState("");
  const [publikasi, setPublikasi] = useState("");
  const [contact, setContact] = useState("");
  const [gambarLama, setGambarLama] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const getDataDosen = async () => {
    await axios
      .get(`/api/dosen/${id}`)
      .then((response) => {
        const dosen = response.data;
        setNama(dosen.nama);
        setJabatan(dosen.jabatan);
        setPendidikan(dosen.pendidikan);
        setPublikasi(dosen.publikasi);
        setContact(dosen.kontak);
        setPreviewURL(dosen.url_gambar);
        setGambarLama(dosen.gambar);
        // setUrlGambarLama(dosen.url_gambar);
      })
      .catch((error) => {
        console.error("Error fetching dosen data:", error);
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

    let url_gambar = previewURL;
    let gambar = gambarLama;
    if (selectedFile) {
      const rute = "dosen";
      const updateResult = await updateImage(rute, gambarLama, selectedFile);

      if (!updateResult) {
        alert("Failed to update image");
        setUploading(false);
        return;
      }
      url_gambar = updateResult.url;
      gambar = updateResult.namaImage;
    }

    const dosenData = {
      nama,
      jabatan,
      pendidikan,
      publikasi,
      kontak: contact,
      url_gambar,
      gambar,
      prodi_id: 1, // Update with the actual prodi_id
    };

    try {
      const response = await axios.put(`/api/dosen/${id}/update`, dosenData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setUploading(false);
        onSuccess();
        console.log("Dosen updated successfully:", response.data);
        setModalIsOpen(false); // Navigate back to the dosen list page
      } else {
        setUploading(false);
        console.error("Failed to update dosen");
      }
    } catch (error) {
      setUploading(false);
      console.error("Error updating dosen:", error);
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          setModalIsOpen(true);
          getDataDosen();
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
                    Edit Dosen
                  </Dialog.Title>
                  <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-md rounded-lg p-6"
                  >
                    <div className="grid  grid-cols-4 gap-2">
                      <div className="row-span-2">
                        <label className=" text-gray-700">Foto</label>
                        {previewURL ? (
                          <div className="">
                            <Image
                              src={previewURL}
                              alt="Preview"
                              className=" bg-gray-200 rounded-lg mb-2"
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
                              className=" bg-gray-200 rounded-lg mb-2"
                              width={200}
                              height={200}
                            />
                          </div>
                        )}
                        <input
                          type="file"
                          onChange={handleFileChange}
                          ref={fileInputRef}
                          className=" text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 w-full h-12 "
                          hidden
                        />
                      </div>
                      <div className=" col-span-3">
                        <label className=" text-gray-700">Nama</label>
                        <input
                          type="text"
                          value={nama}
                          onChange={(e) => setNama(e.target.value)}
                          className=" text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 w-full h-12 "
                        />
                      </div>
                      <div className=" col-span-3">
                        <label className=" text-gray-700">Posisi</label>
                        <input
                          type="text"
                          value={jabatan}
                          onChange={(e) => setJabatan(e.target.value)}
                          className=" text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 w-full h-12 "
                        />
                      </div>
                      <div className="  col-span-2">
                        <label className=" text-gray-700">Pendidikan</label>
                        <textarea
                          value={pendidikan}
                          onChange={(e) => setPendidikan(e.target.value)}
                          className=" text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 w-full h-12 "
                        />
                      </div>
                      <div className=" col-span-2">
                        <label className=" text-gray-700">
                          Publikasi Ilmiah
                        </label>
                        <textarea
                          value={publikasi}
                          onChange={(e) => setPublikasi(e.target.value)}
                          className=" text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 w-full h-12 "
                        />
                      </div>
                      <div className=" col-span-2">
                        <label className=" text-gray-700">Contact</label>
                        <input
                          type="email"
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                          className=" text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 w-full h-12 "
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

export default EditDosen;
