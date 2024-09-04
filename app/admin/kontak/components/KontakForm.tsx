"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import Input from "@/app/components/common/input/Input";
import Button from "@/app/components/common/button/Button";
import apiClient from "@/app/lib/axios/axios";
import { Kontak } from "@prisma/client";

interface KontakFormProps {
  isEdit: boolean;
  kontakData: Kontak;
  fetchKontak: () => void;
}

const KontakForm: React.FC<KontakFormProps> = ({
  isEdit,
  kontakData,
  fetchKontak,
}) => {
  const [formData, setFormData] = useState(kontakData);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        email: formData.email,
        telephone: formData.telephone,
        alamat: formData.alamat,
        sosial_media: formData.sosial_media,
        link_sosial_media: formData.link_sosial_media,
        prodi_id: 1,
      };

      const cekData = await apiClient.get(`/api/kontak`);
      if (cekData.data.length === 0) {
        await apiClient.post(`/api/kontak`, data);
      } else {
        await apiClient.patch(`/api/kontak/1/update`, data);
      }

      fetchKontak();
      toast.success("Kontak successfully saved.");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Error saving kontak");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        isEdit={isEdit}
        value={formData.email ?? ""}
        onChange={(value) => setFormData({ ...formData, email: value })}
        id="email"
        label="Email Prodi"
        type="email"
      />
      <Input
        isEdit={isEdit}
        value={formData.telephone ?? ""}
        onChange={(value) => setFormData({ ...formData, telephone: value })}
        id="telephone"
        label="Telepon Prodi"
        type="text"
        inputMode="tel"
      />
      <Input
        isEdit={isEdit}
        value={formData.alamat ?? ""}
        onChange={(value) => setFormData({ ...formData, alamat: value })}
        id="alamat"
        label="Alamat Prodi"
        type="text"
      />
      <Input
        isEdit={isEdit}
        value={formData.sosial_media ?? ""}
        onChange={(value) => setFormData({ ...formData, sosial_media: value })}
        id="sosialMedia"
        label="Sosial Media"
        type="text"
      />
      <Input
        isEdit={isEdit}
        value={formData.link_sosial_media ?? ""}
        onChange={(value) =>
          setFormData({ ...formData, link_sosial_media: value })
        }
        id="link_sosial_media"
        label="URL Sosial Media"
        type="text"
      />
      <div className="mt-4">
        <Button
          text="Simpan"
          isEdit={isEdit}
          loading={loading}
          textLoading="Menyimpan..."
          type="submit"
        />
      </div>
    </form>
  );
};

export default KontakForm;
