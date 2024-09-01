"use client";

import React, { useState, useCallback } from "react";
import { FaPlus } from "react-icons/fa";
import { Dosen } from "@prisma/client";
import Modals from "@/app/components/ui/modals/Modals";
import apiClient from "@/app/lib/axios/axios";
import { toast } from "react-toastify";

interface InputProps {
  onSuccess: () => void;
  dosenList: Dosen[];
}

const InputClass: React.FC<InputProps> = ({ onSuccess, dosenList }) => {
  const [formData, setFormData] = useState({
    nama: "",
    sks: 0,
    waktu_mulai: "",
    waktu_selesai: "",
    dosen_id: "",
    ruangan: "",
  });
  const [uploading, setUploading] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  // Menggunakan useFetch untuk mendapatkan data dosen
  // const {
  //   data: dosen,
  //   isLoading: dosenLoading,
  //   isError: dosenError,
  // } = useFetch("/api/dosen");

  // const [dosenList, setDosen] = useState<Dosen[]>([dosen]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    const payload = {
      ...formData,
      waktu_mulai: formData.waktu_mulai
        ? new Date(formData.waktu_mulai).toISOString()
        : null,
      waktu_selesai: formData.waktu_selesai
        ? new Date(formData.waktu_selesai).toISOString()
        : null,
      dosen_id: parseInt(formData.dosen_id.toString(), 10),
    };

    try {
      await apiClient.post("/api/class", payload);
      setUploading(false);
      onSuccess();
      setModalIsOpen(false);

      // Reset form setelah submit
      resetForm();
      toast.success("Class created successfully");
    } catch (error: any) {
      setUploading(false);
      console.error("Error creating class:", error);
      toast.error("Error creating class");
    }
  };

  const resetForm = () => {
    setFormData({
      nama: "",
      sks: 0,
      waktu_mulai: "",
      waktu_selesai: "",
      dosen_id: "",
      ruangan: "",
    });
  };

  // if (dosenLoading) {
  //   return <p>Loading...</p>;
  // }

  // if (dosenError) {
  //   return <p>Error loading dosen data</p>;
  // }

  return (
    <div>
      <button
        onClick={() => setModalIsOpen(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-md flex"
      >
        <FaPlus />
      </button>

      <Modals
        modalIsOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        title={"Tambah Class"}
      >
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
          {renderFormFields(handleChange, formData, dosenList)}

          <button
            type="submit"
            disabled={uploading}
            className="w-full disabled:opacity-50 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {uploading ? "loading..." : "Simpan"}
          </button>
        </form>
      </Modals>
    </div>
  );
};

// Memisahkan form field ke fungsi untuk keterbacaan yang lebih baik
const renderFormFields = (
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void,
  formData: any,
  dosenList: Dosen[]
) => {
  return (
    <>
      {formInputFields.map(({ id, name, type, label }) => (
        <div className="mb-4" key={id}>
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
          <input
            type={type}
            id={id}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            required
            className="text-gray-900 border border-gray-300 rounded-lg  bg-gray-50 w-full h-12"
          />
        </div>
      ))}

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
          {dosenList?.map((dosen) => (
            <option key={dosen.id} value={dosen.id}>
              {dosen.nama}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

// Daftar field input untuk form
const formInputFields = [
  { id: "nama", name: "nama", type: "text", label: "Nama" },
  { id: "sks", name: "sks", type: "number", label: "SKS" },
  {
    id: "waktu_mulai",
    name: "waktu_mulai",
    type: "datetime-local",
    label: "Waktu Mulai",
  },
  {
    id: "waktu_selesai",
    name: "waktu_selesai",
    type: "datetime-local",
    label: "Waktu Selesai",
  },
  { id: "ruangan", name: "ruangan", type: "text", label: "Ruangan" },
];

export default InputClass;
