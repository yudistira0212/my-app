"use client";

import React, { useState } from "react";
import Modals from "@/app/components/ui/modals/Modals";
import apiClient from "@/app/lib/axios/axios";
import { Class, Dosen } from "@prisma/client";
import moment from "moment";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

interface EditProps {
  id: number;
  dataClass: Class;
  dataDosen: Dosen[];
  onSuccess: () => void;
}

// Helper function to format date for input fields
const formatDate = (date: Date | null): string => {
  return date ? moment(date).format("YYYY-MM-DDTHH:mm") : "";
};

const EditClass: React.FC<EditProps> = ({
  id,
  onSuccess,
  dataClass,
  dataDosen,
}) => {
  const [formData, setFormData] = useState({
    id: dataClass.id,
    nama: dataClass.nama,
    sks: dataClass.sks,
    waktu_mulai: formatDate(dataClass.waktu_mulai),
    waktu_selesai: formatDate(dataClass.waktu_selesai),
    dosen_id: dataClass.dosen_id,
    ruangan: dataClass.ruangan,
  });

  const [uploading, setUploading] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      await apiClient.put(`/api/class/${id}/update`, payload);
      setUploading(false);
      setModalIsOpen(false);

      toast.success("Class updated successfully");
      onSuccess();
    } catch (error: any) {
      setUploading(false);
      toast.error(error.response?.data?.error || "Error updating class");
    }
  };

  const resetForm = () => {
    setFormData({
      id: dataClass.id,
      nama: dataClass.nama,
      sks: dataClass.sks,
      waktu_mulai: formatDate(dataClass.waktu_mulai),
      waktu_selesai: formatDate(dataClass.waktu_selesai),
      dosen_id: dataClass.dosen_id,
      ruangan: dataClass.ruangan,
    });
  };

  return (
    <div>
      <button
        onClick={() => setModalIsOpen(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-md flex"
      >
        <FaEdit />
      </button>

      <Modals
        modalIsOpen={modalIsOpen}
        onClose={() => {
          setModalIsOpen(false);
          resetForm();
        }}
        title={"Edit Class"}
      >
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
          {renderFormFields(handleChange, formData, dataDosen)}
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
  );
};

// Render form fields separately for better readability
const renderFormFields = (
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void,
  formData: any,
  dataDosen: Dosen[]
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
            className="text-gray-900 border border-gray-300 rounded-lg bg-gray-50 w-full h-12"
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
          className="text-gray-900 border border-gray-300 rounded-lg bg-gray-50 w-full h-12"
        >
          <option value="" disabled>
            Select a Dosen
          </option>
          {dataDosen.map((dosen) => (
            <option key={dosen.id} value={dosen.id}>
              {dosen.nama}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

// Form input field definitions
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

export default EditClass;
