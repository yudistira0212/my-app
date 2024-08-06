"use client";

import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import React, { useState } from "react";

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
        Delete
      </button>
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
                    Delete Class
                  </Dialog.Title>
                  <Dialog.Description className="mt-2 mb-4">
                    Are you sure you want to delete this class?
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

export default DeleteClass;
