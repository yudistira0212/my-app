"use client";

import Modals from "@/app/components/ui/modals/Modals";
import apiClient from "@/app/lib/axios/axios";
import { Dialog, Transition } from "@headlessui/react";
import { Dosen } from "@prisma/client";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";

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
    ruangan: "",
  });

  const [dosenList, setDosenList] = useState<Dosen[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchDosen();
  }, []);

  const fetchDosen = async () => {
    try {
      const response = await apiClient.get("/api/dosen");
      setDosenList(response.data);
    } catch (error: any) {
      if (error.response) {
        console.error(error.response.data.error);
      } else {
        console.error(error);
      }
    }
  };

  const fetchClassData = async (id: number) => {
    try {
      const response = await apiClient.get(`/api/class/${id}`);
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
        ruangan: data.ruangan,
      });
    } catch (error: any) {
      if (error.response) {
        console.error(error.response.data.error);
      } else {
        console.error(error);
      }
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

    console.log(payload.ruangan);

    try {
      const response = await apiClient.put(`/api/class/${id}/update`, payload);

      console.log("updated successfully:", response.data);
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
        ruangan: "",
      });

      toast.success("Class updated successfully");

      onSuccess();
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
      <div>
        <button
          onClick={() => {
            setModalIsOpen(true);
            openEditModal();
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-md flex"
        >
          <FaEdit />
        </button>

        <Modals
          modalIsOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
          title={"Edit Class"}
        >
          <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
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
                className="text-gray-900 border border-gray-300 rounded-lg  bg-gray-50 w-full h-12"
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
                className="text-gray-900 border border-gray-300 rounded-lg  bg-gray-50 w-full h-12"
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
                className="text-gray-900 border border-gray-300 rounded-lg  bg-gray-50 w-full h-12"
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
                className="text-gray-900 border border-gray-300 rounded-lg  bg-gray-50 w-full h-12"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="ruangan"
                className="block text-sm font-medium text-gray-700"
              >
                Ruangan
              </label>
              <input
                type="text"
                id="ruangan"
                name="ruangan"
                value={formData.ruangan}
                onChange={handleChange}
                required
                className="text-gray-900 border border-gray-300 rounded-lg  bg-gray-50 w-full h-12"
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
                className="text-gray-900 border border-gray-300 rounded-lg  bg-gray-50 w-full h-12"
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
        </Modals>
      </div>
    </div>
  );
};

export default EditClass;
