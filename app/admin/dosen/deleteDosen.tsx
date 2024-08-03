"use client";

import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import React, { useState } from "react";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "@/app/lib/firebase/firebase";
import { deleteImage } from "@/app/lib/controllers/imageControllers";

interface deleteDosenProps {
  id: number;
  image: string;
  onSuccess: () => void;
}

const DeleteDosen: React.FC<deleteDosenProps> = ({ id, image, onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDelete = async () => {
    setIsLoading(true);

    const rute = "dosen";
    const deleteResult = await deleteImage(rute, image);

    if (!deleteResult) {
      setIsLoading(false);
      console.log("gagal uplaod image");

      return;
    }
    try {
      await axios.delete(`/api/dosen/${id}/delete`);
      onSuccess();
      setIsLoading(false);
      setIsOpen(false);
    } catch (error) {
      console.error("Error deleting dosen:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <a
        onClick={() => setIsOpen(true)}
        className="font-medium text-red-600 dark:text-red-500 hover:underline hover:cursor-pointer"
      >
        Delete
      </a>
      <Transition appear show={isOpen} as={React.Fragment}>
        <Dialog
          as="div"
          open={isOpen}
          className="relative z-10"
          onClose={() => setIsOpen(false)}
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
                  <Dialog.Title className="text-xl font-semibold">
                    Delete Dosen
                  </Dialog.Title>
                  <Dialog.Description className="mt-2 mb-4">
                    Yakin ingin menghapus Dosen ini?
                  </Dialog.Description>
                  {errorMessage && (
                    <div className="bg-red-100 p-2 rounded mb-4">
                      {errorMessage}
                    </div>
                  )}
                  <div className="mt-4 flex justify-end gap-3">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DeleteDosen;
