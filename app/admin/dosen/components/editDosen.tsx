"use client";

import React, { useRef, useState } from "react";

import Image from "next/image";

import { updateImage } from "@/app/lib/controllers/imageControllers";
import { FaEdit } from "react-icons/fa";
import Modals from "@/app/components/ui/modals/Modals";
import apiClient from "@/app/lib/axios/axios";
import { toast } from "react-toastify";

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
    await apiClient
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
        if (error.response) {
          console.error(error.response.data.error);
        } else {
          console.error(error);
        }
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
      await apiClient.put(`/api/dosen/${id}/update`, dosenData);
      setUploading(false);
      onSuccess();

      setModalIsOpen(false);
      toast.success("Dosen updated successfully");
    } catch (error: any) {
      setUploading(false);
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error);
      }
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
          <div className="grid  grid-cols-4 gap-2">
            <div className="row-span-2">
              <label className=" text-gray-700">Foto</label>
              {previewURL ? (
                <div className="">
                  <Image
                    src={previewURL}
                    alt="Preview"
                    className=" bg-gray-200 hover:cursor-pointer rounded-lg mb-2"
                    onClick={handleImageClick}
                    width={200}
                    height={200}
                  />
                </div>
              ) : (
                <div className="">
                  <Image
                    alt="Preview"
                    src={""}
                    onClick={handleImageClick}
                    className=" bg-gray-200 hover:cursor-pointer rounded-lg mb-2"
                    width={200}
                    height={200}
                  />
                </div>
              )}
              <input
                type="file"
                onChange={handleFileChange}
                ref={fileInputRef}
                className=" text-gray-900 border border-gray-300 rounded-lg  bg-gray-50 w-full h-12 "
                hidden
              />
            </div>
            <div className=" col-span-3">
              <label className=" text-gray-700">Nama</label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className=" text-gray-900 border border-gray-300 rounded-lg  bg-gray-50 w-full h-12 "
              />
            </div>
            <div className=" col-span-3">
              <label className=" text-gray-700">Posisi</label>
              <input
                type="text"
                value={jabatan}
                onChange={(e) => setJabatan(e.target.value)}
                className=" text-gray-900 border border-gray-300 rounded-lg  bg-gray-50 w-full h-12 "
              />
            </div>
            <div className="  col-span-2">
              <label className=" text-gray-700">Pendidikan</label>
              <textarea
                value={pendidikan}
                onChange={(e) => setPendidikan(e.target.value)}
                className=" text-gray-900 border border-gray-300 rounded-lg  bg-gray-50 w-full h-12 "
              />
            </div>
            <div className=" col-span-2">
              <label className=" text-gray-700">Publikasi Ilmiah</label>
              <textarea
                value={publikasi}
                onChange={(e) => setPublikasi(e.target.value)}
                className=" text-gray-900 border border-gray-300 rounded-lg  bg-gray-50 w-full h-12 "
              />
            </div>
            <div className=" col-span-2">
              <label className=" text-gray-700">Contact</label>
              <input
                type="email"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className=" text-gray-900 border border-gray-300 rounded-lg  bg-gray-50 w-full h-12 "
              />
            </div>
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

export default EditDosen;
