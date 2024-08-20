// components/ProdiProfile.tsx
"use client";

import apiClient from "@/app/lib/axios/axios";
import { Prodi } from "@prisma/client";
import React, { useEffect, useState } from "react";

const Profil = () => {
  const [dataProdi, setDataProdi] = useState<Prodi>();

  useEffect(() => {
    getDataProdi();
  }, []);
  const getDataProdi = async () => {
    try {
      const result = await apiClient.get("/api/prodi/1");
      const data = result.data;
      setDataProdi(data);
      console.log({ data });
    } catch (error) {
      console.log("error get data prodi : ", error);
    }
  };

  return (
    <div className="bg-gray-50 p-8">
      <h1 className="text-center text-3xl font-bold mb-8 text-blue-900">
        PROFIL PRODI TEKNIK INFORMATIKA
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold text-blue-900 mb-4">
            VISI MISI TUJUAN
          </h2>
          <p className="mb-4">
            <strong>Visi</strong>
            {dataProdi?.visi?.split("\n").map((line, index) => (
              <p className=" text-justify " key={index}>
                {line}
              </p>
            ))}
          </p>
          <div className="mb-4">
            <strong>Misi</strong>
            <ol className="list-decimal ml-5">
              {dataProdi?.misi?.split("\n").map((line, index) => (
                <li className="text-justify " key={index}>
                  {line}
                </li>
              ))}
            </ol>
          </div>
          <div className="mb-4">
            <strong>Tujuan</strong>
            <ol className="list-decimal ml-5">
              {dataProdi?.tujuan?.split("\n").map((line, index) => (
                <li className="text-justify" key={index}>
                  {line}
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-blue-900 mb-4">
            PROFIL SINGKAT TEKNIK INFORMATIKA
          </h2>
          {dataProdi?.deskripsi?.split("\n").map((line, index) => (
            <p className="mb-4 text-justify " key={index}>
              {line}
            </p>
          ))}
          {/* <p className="mb-4">
            Program studi Teknik Informatika adalah program pendidikan perguruan
            tinggi yang berfokus pada bidang teknologi informasi, dengan tujuan
            mengembangkan pengetahuan, ilmu, dan keahlian dalam sistem cerdas,
            manajemen informasi, dan jaringan komputer. Program studi ini
            menawarkan kurikulum yang dirancang untuk memberikan pemahaman
            mendalam tentang teori dan aplikasi teknologi informasi serta
            keterampilan praktis yang dibutuhkan dalam industri teknologi
            informasi.
          </p>
          <p className="mb-4">
            Di Universitas Papua, Program Studi Teknik Informatika didukung oleh
            fasilitas yang memadai, seperti laboratorium komputer yang modern,
            perpustakaan yang lengkap, serta dosen-dosen yang berkualitas dan
            berpengalaman di bidangnya. Mahasiswa program studi ini juga
            didorong untuk berpartisipasi dalam kegiatan penelitian dan
            pengabdian kepada masyarakat yang dapat mengembangkan potensi
            akademik dan profesional mereka.
          </p>
          <p>
            Dengan visi dan misi yang jelas, Program Studi Teknik Informatika
            Universitas Papua berkomitmen untuk menghasilkan lulusan yang
            unggul, berdaya saing, dan memiliki jiwa wirausaha yang tinggi,
            sehingga mampu memberikan kontribusi yang signifikan dalam
            perkembangan teknologi informasi untuk mendukung pembangunan
            nasional dan kesejahteraan masyarakat.
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Profil;
