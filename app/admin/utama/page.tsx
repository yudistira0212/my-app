"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import type { Prodi } from "@prisma/client";

const DashboardUtama = () => {
  const [namaProdi, setNamaProdi] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [visiMisi, setVisiMisi] = useState("");
  const [sejarah, setSejarah] = useState("");
  const [infoLainnya, setInfoLainnya] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProdi = async () => {
      try {
        const response = await axios.get(`/api/prodi/1`);
        const data: Prodi = response.data;

        setNamaProdi(data.nama as string);
        setDeskripsi(data.deskripsi as string);
        setVisiMisi(data.visi_misi as string);
        setSejarah(data.sejarah as string);
        setInfoLainnya(data.info_lainnya as string);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching Prodi:", error);
        setError("Failed to fetch Prodi");
        setLoading(false);
      }
    };

    fetchProdi();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.patch(`/api/prodi/1`, {
        nama: namaProdi,
        deskripsi,
        visi_misi: visiMisi,
        sejarah,
        info_lainnya: infoLainnya,
        logo_prodi: "",
        url_logo_prodi: "",
        logo_universitas: "",
        url_logo_universitas: "",
      });

      if (response.status === 200) {
        console.log("Data berhasil disimpan!");
      } else {
        console.error("Gagal menyimpan data.");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col bg-white p-4">
          <h1 className="text-2xl font-bold mb-6">Input Data Prodi</h1>
          <div className="flex flex-wrap w-full bg-white">
            <div className="flex flex-col items-center w-full sm:w-1/3">
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Logo Prodi
                </label>
                <div className="flex flex-col items-center">
                  <img
                    className="h-32 w-32 bg-gray-200 rounded-lg mb-2"
                    src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
                    alt="logo prodi"
                  />
                  <input
                    className="text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                    type="file"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  Logo Universitas
                </label>
                <div className="flex flex-col items-center">
                  <img
                    className="h-32 w-32 bg-gray-200 rounded-lg mb-2"
                    src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
                    alt="logo universitas"
                  />
                  <input
                    className="text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                    type="file"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full sm:w-2/3">
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Nama Program Studi
                </label>
                <input
                  className="w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-2 focus:outline-none bg-gray-50"
                  type="text"
                  placeholder="Nama Program Studi"
                  value={namaProdi}
                  onChange={(e) => setNamaProdi(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Deskripsi
                </label>
                <textarea
                  className="w-full h-32 text-sm text-gray-900 border border-gray-300 rounded-lg p-2 focus:outline-none bg-gray-50"
                  placeholder="Deskripsi"
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full bg-white p-4">
          <h1 className="text-2xl font-bold mb-6">Input Visi Misi</h1>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Visi Misi
            </label>
            <textarea
              className="w-full h-32 text-sm text-gray-900 border border-gray-300 rounded-lg p-2 focus:outline-none bg-gray-50"
              placeholder="Visi Misi"
              value={visiMisi}
              onChange={(e) => setVisiMisi(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Sejarah Singkat Prodi
            </label>
            <textarea
              className="w-full h-32 text-sm text-gray-900 border border-gray-300 rounded-lg p-2 focus:outline-none bg-gray-50"
              placeholder="Sejarah Singkat Prodi"
              value={sejarah}
              onChange={(e) => setSejarah(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Informasi Lainnya
            </label>
            <textarea
              className="w-full h-32 text-sm text-gray-900 border border-gray-300 rounded-lg p-2 focus:outline-none bg-gray-50"
              placeholder="Informasi Lainnya"
              value={infoLainnya}
              onChange={(e) => setInfoLainnya(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="text-white bg-[#495579] hover:bg-blue-800 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default DashboardUtama;
