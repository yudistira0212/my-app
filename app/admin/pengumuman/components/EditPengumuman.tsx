"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

import { updateImage } from "@/app/lib/controllers/imageControllers";
import { useSession } from "next-auth/react";
import { FaEdit } from "react-icons/fa";
import Modals from "@/app/components/ui/modals/Modals";
import apiClient from "@/app/lib/axios/axios";
import { toast } from "react-toastify";

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
    await apiClient
      .get(`/api/pengumuman/${id}`)
      .then((response) => {
        const pengumuman = response.data;
        setJudul(pengumuman.judul);
        setText(pengumuman.text);
        setPreviewURL(pengumuman.url_gambar);
        setGambarLama(pengumuman.gambar);
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
      const response = await apiClient.put(
        `/api/pengumuman/${id}/update`,
        pengumumanData
      );

      setUploading(false);
      onSuccess();

      setModalIsOpen(false);

      toast.success("Pengumuman updated successfully");
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
          getDataPengumuman();
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
              {previewURL ? (
                <div>
                  <Image
                    src={previewURL}
                    alt="Preview"
                    className="bg-gray-200 hover:cursor-pointer rounded-lg mb-2"
                    onClick={handleImageClick}
                    width={200}
                    height={200}
                  />
                </div>
              ) : (
                <div>
                  <Image
                    alt="Preview"
                    src={""}
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
            <div className="col-span-4">
              <label className="text-gray-700">Text</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="text-gray-900 border border-gray-300 rounded-lg  bg-gray-50 w-full h-24"
              />
            </div>
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

export default EditPengumuman;
