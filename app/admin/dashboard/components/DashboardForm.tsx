"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { updateImage } from "@/app/lib/controllers/imageControllers";
import ImageUpload from "@/app/components/common/image/ImageUpload";
import Input from "@/app/components/common/input/Input";
import Textarea from "@/app/components/common/textArea/Textarea";
import Button from "@/app/components/common/button/Button";
import { useSaveProdi } from "@/app/hooks/useSaveProdi";
import { Prodi } from "@prisma/client";

interface DashboardFormProps {
  isEdit: boolean;
  // prodiData: {
  //   nama: string;
  //   deskripsi: string;
  //   visi: string;
  //   misi: string;
  //   tujuan: string;
  //   sejarah: string;
  //   infoLainnya: string;
  //   logoProdiNama: string;
  //   logoProdiUrl: string;
  //   logoUniversitasNama: string;
  //   logoUniversitasUrl: string;
  // };
  prodiData: Prodi;
  // setDataProdi?: React.Dispatch<React.SetStateAction<any>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  // setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  fetchProdi?: () => void;
}

const DashboardForm: React.FC<DashboardFormProps> = ({
  isEdit,
  prodiData,
  // setDataProdi,
  setError,
  // setLoading,
  fetchProdi,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [logoProdi, setLogoProdi] = useState<File | null>(null);
  const [logoProdiPreview, setLogoProdiPreview] = useState("");
  const [logoUniversitas, setLogoUniversitas] = useState<File | null>(null);
  const [logoUniversitasPreview, setLogoUniversitasPreview] = useState("");
  const [dataProdi, setDataProdi] = useState<Prodi>(prodiData);

  const { saveProdi } = useSaveProdi();

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

    try {
      let logoProdiName = dataProdi.logo_prodi;
      let logoProdiURL = dataProdi.url_logo_prodi;

      let logoUniversitasName = dataProdi.logo_universitas;
      let logoUniversitasURL = dataProdi.url_logo_universitas;

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

      const data = {
        nama: dataProdi.nama,
        deskripsi: dataProdi.deskripsi,
        visi: dataProdi.visi,
        misi: dataProdi.misi,
        tujuan: dataProdi.tujuan,
        sejarah: dataProdi.sejarah,
        info_lainnya: dataProdi.info_lainnya,
        logo_prodi: logoProdiName,
        url_logo_prodi: logoProdiURL,
        logo_universitas: logoUniversitasName,
        url_logo_universitas: logoUniversitasURL,
      };

      await saveProdi(data);
    } catch (error) {
      setError("Failed to save Prodi data.");
    } finally {
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
            fileUrl={dataProdi.url_logo_prodi}
            filePreview={logoProdiPreview}
            onFileChange={handleFileChangeProdi}
          />
          <ImageUpload
            id="logoUniversitas"
            label="Universitas"
            isEdit={isEdit}
            fileUrl={dataProdi.url_logo_universitas}
            filePreview={logoUniversitasPreview}
            onFileChange={handleFileChangeUniversitas}
          />
        </div>
        <div className="flex flex-col w-full">
          <Input
            id="namaProdi"
            isEdit={isEdit}
            value={dataProdi.nama ?? ""}
            onChange={(value) => setDataProdi({ ...dataProdi, nama: value })}
            label="Nama Program Studi"
          />
          <Textarea
            id="Deskripsi"
            isEdit={isEdit}
            value={dataProdi.deskripsi ?? ""}
            placeholder="Deskripsi"
            label="Deskripsi"
            onChange={(value) =>
              setDataProdi({ ...dataProdi, deskripsi: value })
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
          value={dataProdi.visi ?? ""}
          placeholder="Visi"
          label="Visi"
          onChange={(value) => setDataProdi({ ...dataProdi, visi: value })}
        />
        <Textarea
          id="misi"
          isEdit={isEdit}
          value={dataProdi.misi ?? ""}
          placeholder="Misi"
          label="Misi"
          onChange={(value) => setDataProdi({ ...dataProdi, misi: value })}
        />
        <Textarea
          id="tujuan"
          isEdit={isEdit}
          value={dataProdi.tujuan ?? ""}
          placeholder="Tujuan"
          label="Tujuan"
          onChange={(value) => setDataProdi({ ...dataProdi, tujuan: value })}
        />
        <Textarea
          id="sejarah"
          isEdit={isEdit}
          value={dataProdi.sejarah ?? ""}
          placeholder="Sejarah Singkat Prodi"
          label="Sejarah Singkat Prodi"
          onChange={(value) => setDataProdi({ ...dataProdi, sejarah: value })}
        />
        <Textarea
          id="Informasi_Lainnya"
          isEdit={isEdit}
          value={dataProdi.info_lainnya ?? ""}
          placeholder="Informasi Lainnya"
          label="Informasi Lainnya"
          onChange={(value) =>
            setDataProdi({ ...dataProdi, info_lainnya: value })
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
