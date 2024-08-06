"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Dosen } from "@prisma/client";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";

interface editProps {
  id: number;
  onSuccess: () => void;
}
const EditClass: React.FC<editProps> = ({ id, onSuccess }) => {
  const [formData, setFormData] = useState({
    id: 0,
    nama: "",
    sks: 0,
    waktu_mulai: "",
    waktu_selesai: "",
    dosen_id: "",
  });

  const [dosenList, setDosenList] = useState<Dosen[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchDosen();
  }, []);

  const fetchDosen = async () => {
    try {
      const response = await axios.get("/api/dosen");
      setDosenList(response.data);
    } catch (error) {
      console.error("Error fetching dosen data:", error);
    }
  };

  const fetchClassData = async (id: number) => {
    try {
      const response = await axios.get(`/api/class/${id}`);
      const data = response.data;

      const formatDate = (date: Date | null): string => {
        return moment(date).format("YYYY-MM-DDTHH:MM");
      };

      setFormData({
        id: data.id,
        nama: data.nama,
        sks: data.sks,
        waktu_mulai: formatDate(data.waktu_mulai),
        waktu_selesai: formatDate(data.waktu_selesai),
        dosen_id: data.dosen_id.toString(),
      });
      console.log(formData);
    } catch (error) {
      console.error("Error fetching class data:", error);
    }
  };

  const openEditModal = () => {
    fetchClassData(id);
    setModalIsOpen(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    console.log(formData);

    const payload = {
      ...formData,
      waktu_mulai: formData.waktu_mulai
        ? new Date(formData.waktu_mulai).toISOString()
        : null,
      waktu_selesai: formData.waktu_selesai
        ? new Date(formData.waktu_selesai).toISOString()
        : null,
      dosen_id: parseInt(formData.dosen_id.toString(), 10), // Ensure dosen_id is integer
    };

    try {
      const response = await axios.put(`/api/class/${id}/update`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        console.log("updated successfully:", response.data);
        alert("updated successfully!");
        setUploading(false);
        setModalIsOpen(false);

        // Reset form after submission
        setFormData({
          id: 0,
          nama: "",
          sks: 0,
          waktu_mulai: "",
          waktu_selesai: "",
          dosen_id: "",
        });

        onSuccess();
      }
    } catch (error) {
      setUploading(false);
      console.error("Error creating/updating class:", error);
      alert("Error creating/updating class");
    }
  };

  return (
    <div>
      <div>
        <button
          onClick={() => {
            setModalIsOpen(true);
            openEditModal();
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
                    <Dialog.Title
                      as="h2"
                      className="text-xl font-semibold mb-4"
                    >
                      Edit Class
                    </Dialog.Title>
                    <form
                      onSubmit={handleSubmit}
                      className="max-w-md mx-auto p-4"
                    >
                      <div className="mb-4">
                        <label
                          htmlFor="nama"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Nama
                        </label>
                        <input
                          type="text"
                          id="nama"
                          name="nama"
                          value={formData.nama}
                          onChange={handleChange}
                          required
                          className="text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 w-full h-12"
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="sks"
                          className="block text-sm font-medium text-gray-700"
                        >
                          SKS
                        </label>
                        <input
                          type="number"
                          id="sks"
                          name="sks"
                          value={formData.sks}
                          onChange={handleChange}
                          required
                          className="text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 w-full h-12"
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="waktu_mulai"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Waktu Mulai
                        </label>
                        <input
                          type="datetime-local"
                          id="waktu_mulai"
                          name="waktu_mulai"
                          value={formData.waktu_mulai}
                          onChange={handleChange}
                          required
                          className="text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 w-full h-12"
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="waktu_selesai"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Waktu Selesai
                        </label>
                        <input
                          type="datetime-local"
                          id="waktu_selesai"
                          name="waktu_selesai"
                          value={formData.waktu_selesai}
                          onChange={handleChange}
                          required
                          className="text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 w-full h-12"
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="dosen_id"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Dosen
                        </label>
                        <select
                          id="dosen_id"
                          name="dosen_id"
                          value={formData.dosen_id}
                          onChange={handleChange}
                          required
                          className="text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 w-full h-12"
                        >
                          <option value="">Select a Dosen</option>
                          {dosenList.map((dosen) => (
                            <option key={dosen.id} value={dosen.id}>
                              {dosen.nama}
                            </option>
                          ))}
                        </select>
                      </div>
                      <button
                        type="submit"
                        disabled={uploading}
                        className="w-full disabled:opacity-50 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        {uploading ? "loading..." : "Update Class"}
                      </button>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>

      {/* Example button to open edit modal */}
      {/* <button
        onClick={() => openEditModal()} // Replace 1 with the actual class ID to edit
        className="bg-green-500 hover:bg-green-700 text-white p-2 rounded-md"
      >
        Edit Class
      </button> */}
    </div>
  );
};

export default EditClass;
