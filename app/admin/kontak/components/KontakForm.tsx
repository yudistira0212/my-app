"use client";

import React, { useState } from "react";

import { toast } from "react-toastify";
import Input from "@/app/components/common/input/Input";
import Button from "@/app/components/common/button/Button";
import apiClient from "@/app/lib/axios/axios";

interface KontakFormProps {
  isEdit: boolean;
  kontakData: {
    email: string;
    telephone: string;
    alamat: string;
    sosialMedia: string;
  };
  setKontakData: React.Dispatch<React.SetStateAction<any>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  fetchKontak: () => void;
}

const KontakForm: React.FC<KontakFormProps> = ({
  isEdit,
  kontakData,
  setKontakData,
  setError,
  setLoading,
  fetchKontak,
}) => {
  const [loading, setFormLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setLoading(true);

    try {
      let response = null;

      const data = {
        email: kontakData.email,
        telephone: kontakData.telephone,
        alamat: kontakData.alamat,
        sosial_media: kontakData.sosialMedia,
        prodi_id: 1,
      };

      const cekData = await apiClient.get(`/api/kontak`);
      if (cekData.data.length === 0) {
        response = await apiClient.post(`/api/kontak`, data);
      } else {
        response = await apiClient.patch(`/api/kontak/1`, data);
      }

      fetchKontak();
      toast.success("Kontak successfully saved.");
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error);
      }
    } finally {
      setFormLoading(false);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        isEdit={isEdit}
        value={kontakData.email ?? ""}
        onChange={(value) => setKontakData({ ...kontakData, email: value })}
        id={"email"}
        label="Email Prodi"
        type="email"
      />
      <Input
        isEdit={isEdit}
        value={kontakData.telephone ?? ""}
        onChange={(value) => setKontakData({ ...kontakData, telephone: value })}
        id={"telephone"}
        label="Telepon Prodi"
        type="text"
        inputMode="tel"
      />
      <Input
        isEdit={isEdit}
        value={kontakData.alamat ?? ""}
        onChange={(value) => setKontakData({ ...kontakData, alamat: value })}
        id={"alamat"}
        label="Alamat Prodi"
        type="text"
      />
      <Input
        isEdit={isEdit}
        value={kontakData.sosialMedia ?? ""}
        onChange={(value) =>
          setKontakData({ ...kontakData, sosialMedia: value })
        }
        id={"sosialMedia"}
        label="URL Sosial Media"
        type="text"
      />
      <div className="mt-4">
        <Button
          text={"Simpan"}
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
