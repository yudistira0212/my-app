"use client";

import React, { useState } from "react";

import { deleteImage } from "@/app/lib/controllers/imageControllers";
import { FaTrashAlt } from "react-icons/fa";
import Confirm from "@/app/components/ui/modals/Confirm";
import apiClient from "@/app/lib/axios/axios";
import { toast } from "react-toastify";

interface DeletePengumumanProps {
  id: number;
  image: string;
  onSuccess: () => void;
}

const DeletePengumuman: React.FC<DeletePengumumanProps> = ({
  id,
  image,
  onSuccess,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDelete = async () => {
    setIsLoading(true);

    const rute = "pengumuman";
    const deleteResult = await deleteImage(rute, image);

    if (!deleteResult) {
      setIsLoading(false);
      console.log("Gagal menghapus image");

      return;
    }
    try {
      await apiClient.delete(`/api/pengumuman/${id}/delete`);
      onSuccess();
      setIsLoading(false);
      setIsOpen(false);
      toast.success("Pengumuman deleted successfully");
    } catch (error: any) {
      setErrorMessage("Failed to delete pengumuman.");
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-red-500 hover:bg-red-700 text-white p-2 rounded-md flex"
      >
        <FaTrashAlt />
      </button>

      <Confirm
        show={isOpen}
        onClose={() => setIsOpen(false)}
        title={" Hapus Pengumuman"}
        description={"Yakin ingin menghapus Pengumuman ini?"}
      >
        {errorMessage && (
          <div className="bg-red-100 p-2 rounded mb-4">{errorMessage}</div>
        )}
        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={() => setIsOpen(false)}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:text-white hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 disabled:bg-opacity-50 disabled:cursor-wait text-white px-4 py-2 rounded"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Delete"}
          </button>
        </div>
      </Confirm>
    </>
  );
};

export default DeletePengumuman;
