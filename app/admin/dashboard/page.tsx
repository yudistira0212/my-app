"use client";

import React, { useEffect, useState, Suspense } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Loading from "@/app/components/common/loading/Loading";
import apiClient from "@/app/lib/axios/axios";

// Menggunakan React.lazy untuk memuat komponen secara dinamis
const DashboardHeader = React.lazy(
  () => import("./components/DashboardHeader")
);
const DashboardForm = React.lazy(() => import("./components/DashboardForm"));

const DashboardUtama = () => {
  const [loadingData, setLoadingData] = useState(true);
  const [isEdit, setIsEdit] = useState(true);
  const [error, setError] = useState("");

  const [prodiData, setProdiData] = useState({
    namaProdi: "",
    deskripsi: "",
    visi: "",
    misi: "",
    tujuan: "",
    sejarah: "",
    infoLainnya: "",
    logoProdiNama: "",
    logoProdiUrl: "",
    logoUniversitasNama: "",
    logoUniversitasUrl: "",
  });

  useEffect(() => {
    fetchProdi();
  }, []);

  const fetchProdi = async () => {
    setLoadingData(true);
    try {
      const response = await apiClient.get(`/api/prodi/1`);
      const data = response.data;
      setProdiData({
        namaProdi: data.nama,
        deskripsi: data.deskripsi,
        visi: data.visi,
        misi: data.misi,
        tujuan: data.tujuan,
        sejarah: data.sejarah,
        infoLainnya: data.info_lainnya,
        logoProdiNama: data.logo_prodi,
        logoProdiUrl: data.url_logo_prodi,
        logoUniversitasNama: data.logo_universitas,
        logoUniversitasUrl: data.url_logo_universitas,
      });
      setError("");
    } catch (error: any) {
      if (error.response) {
        console.error(error.response.data.error);
      } else {
        console.error(error);
      }
    } finally {
      setLoadingData(false);
    }
  };

  return (
    <div className="flex flex-col bg-white p-4">
      {loadingData ? (
        <div className="flex justify-center items-center w-full h-screen ">
          <Loading />
        </div>
      ) : (
        <Suspense
          fallback={
            <div className="flex justify-center items-center w-full h-screen ">
              <Loading />
            </div>
          }
        >
          <>
            <DashboardHeader
              isEdit={isEdit}
              setIsEdit={setIsEdit}
              title="Data Prodi"
            />
            <DashboardForm
              isEdit={isEdit}
              prodiData={prodiData}
              setProdiData={setProdiData}
              setError={setError}
              setLoading={setLoadingData}
              fetchProdi={fetchProdi}
            />
          </>
        </Suspense>
      )}
    </div>
  );
};

export default DashboardUtama;
