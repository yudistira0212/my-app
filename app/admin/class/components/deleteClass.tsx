"use client";

import Confirm from "@/app/components/ui/modals/Confirm";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

interface DeleteClassProps {
  id: number;
  onSuccess: () => void;
}

const DeleteClass: React.FC<DeleteClassProps> = ({ id, onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`/api/class/${id}/delete`);
      onSuccess();
      setIsLoading(false);
      setIsOpen(false);
    } catch (error) {
      console.error("Error deleting class:", error);
      setErrorMessage("Error deleting class");
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
        title={" Hapus Class"}
        description={"Yakin ingin menghapus class ini?"}
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

export default DeleteClass;
