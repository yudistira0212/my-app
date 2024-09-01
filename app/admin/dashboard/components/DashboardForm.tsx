"use client";

import React, { useState } from "react";

import { toast } from "react-toastify";
import { updateImage } from "@/app/lib/controllers/imageControllers";
import ImageUpload from "@/app/components/common/image/ImageUpload";
import Input from "@/app/components/common/input/Input";
import Textarea from "@/app/components/common/textArea/Textarea";
import Button from "@/app/components/common/button/Button";
import apiClient from "@/app/lib/axios/axios";

interface DashboardFormProps {
  isEdit: boolean;
  prodiData: {
    namaProdi: string;
    deskripsi: string;
    visi: string;
    misi: string;
    tujuan: string;
    sejarah: string;
    infoLainnya: string;
    logoProdiNama: string;
    logoProdiUrl: string;
    logoUniversitasNama: string;
    logoUniversitasUrl: string;
  };
  setProdiData: React.Dispatch<React.SetStateAction<any>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  fetchProdi: () => void;
}

const DashboardForm: React.FC<DashboardFormProps> = ({
  isEdit,
  prodiData,
  setProdiData,
  setError,
  setLoading,
  fetchProdi,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [logoProdi, setLogoProdi] = useState<File | null>(null);
  const [logoProdiPreview, setLogoProdiPreview] = useState("");
  const [logoUniversitas, setLogoUniversitas] = useState<File | null>(null);
  const [logoUniversitasPreview, setLogoUniversitasPreview] = useState("");

  const handleFileChangeProdi = (file: File | null, preview: string) => {
    setLogoProdi(file);
    setLogoProdiPreview(preview);
  };

  const handleFileChangeUniversitas = (file: File | null, preview: string) => {
    setLogoUniversitas(file);
    setLogoUniversitasPreview(preview);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setLoading(true);

    try {
      let logoProdiName = prodiData.logoProdiNama;
      let logoProdiURL = prodiData.logoProdiUrl;

      let logoUniversitasName = prodiData.logoUniversitasNama;
      let logoUniversitasURL = prodiData.logoUniversitasUrl;

      if (logoProdi) {
        const rute = "utama/prodi";
        const updateResult = await updateImage(rute, logoProdiName, logoProdi);

        if (!updateResult) {
          toast.error("Failed to update image Prodi");
          return;
        }
        logoProdiName = updateResult.namaImage;
        logoProdiURL = updateResult.url;
      }

      if (logoUniversitas) {
        const rute = "utama/universitas";
        const updateResult = await updateImage(
          rute,
          logoUniversitasName,
          logoUniversitas
        );

        if (!updateResult) {
          toast.error("Failed to update image Universitas");
          return;
        }
        logoUniversitasName = updateResult.namaImage;
        logoUniversitasURL = updateResult.url;
      }

      let response = null;

      const data = {
        nama: prodiData.namaProdi,
        deskripsi: prodiData.deskripsi,
        visi: prodiData.visi,
        misi: prodiData.misi,
        tujuan: prodiData.tujuan,
        sejarah: prodiData.sejarah,
        info_lainnya: prodiData.infoLainnya,
        logo_prodi: logoProdiName,
        url_logo_prodi: logoProdiURL,
        logo_universitas: logoUniversitasName,
        url_logo_universitas: logoUniversitasURL,
      };

      const cekData = await apiClient.get(`/api/prodi`);
      if (cekData.data.length === 0) {
        response = await apiClient.post(`/api/prodi`, {
          data,
        });
      } else {
        response = await apiClient.patch(`/api/prodi/1/update`, {
          data,
        });
      }

      toast.success("Prodi successfully saved.");
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error);
      }
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-8 w-full bg-white">
        <div className="flex flex-col">
          <ImageUpload
            id="logoProdi"
            label="Prodi"
            isEdit={isEdit}
            fileUrl={prodiData.logoProdiUrl}
            filePreview={logoProdiPreview}
            onFileChange={handleFileChangeProdi}
          />
          <ImageUpload
            id="logoUniversitas"
            label="Universitas"
            isEdit={isEdit}
            fileUrl={prodiData.logoUniversitasUrl}
            filePreview={logoUniversitasPreview}
            onFileChange={handleFileChangeUniversitas}
          />
        </div>
        <div className="flex flex-col w-full">
          <Input
            id="namaProdi"
            isEdit={isEdit}
            value={prodiData.namaProdi ?? ""}
            onChange={(value) =>
              setProdiData({ ...prodiData, namaProdi: value })
            }
            label="Nama Program Studi"
          />
          <Textarea
            id="Deskripsi"
            isEdit={isEdit}
            value={prodiData.deskripsi ?? ""}
            placeholder="Deskripsi"
            label="Deskripsi"
            onChange={(value) =>
              setProdiData({ ...prodiData, deskripsi: value })
            }
            classTextarea="h-64"
          />
        </div>
      </div>
      <div className="flex flex-col w-full bg-white p-4">
        <h1 className="text-2xl font-bold mb-6">Input Visi Misi</h1>
        <Textarea
          id="visi"
          isEdit={isEdit}
          value={prodiData.visi ?? ""}
          placeholder="Visi"
          label="Visi"
          onChange={(value) => setProdiData({ ...prodiData, visi: value })}
        />
        <Textarea
          id="misi"
          isEdit={isEdit}
          value={prodiData.misi ?? ""}
          placeholder="Misi"
          label="Misi"
          onChange={(value) => setProdiData({ ...prodiData, misi: value })}
        />
        <Textarea
          id="tujuan"
          isEdit={isEdit}
          value={prodiData.tujuan ?? ""}
          placeholder="Tujuan"
          label="Tujuan"
          onChange={(value) => setProdiData({ ...prodiData, tujuan: value })}
        />
        <Textarea
          id="sejarah"
          isEdit={isEdit}
          value={prodiData.sejarah ?? ""}
          placeholder="Sejarah Singkat Prodi"
          label="Sejarah Singkat Prodi"
          onChange={(value) => setProdiData({ ...prodiData, sejarah: value })}
        />
        <Textarea
          id="Informasi_Lainnya"
          isEdit={isEdit}
          value={prodiData.infoLainnya ?? ""}
          placeholder="Informasi Lainnya"
          label="Informasi Lainnya"
          onChange={(value) =>
            setProdiData({ ...prodiData, infoLainnya: value })
          }
        />
      </div>
      <div>
        <Button
          text="Simpan"
          textLoading="Menyimpan..."
          isEdit={isEdit}
          submitting={submitting}
          loading={false}
          type="submit"
        />
      </div>
    </form>
  );
};

export default DashboardForm;
