"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Loading from "@/app/components/common/loading/Loading";
import DashboardHeader from "./components/DashboardHeader";
import DashboardForm from "./components/DashboardForm";
import apiClient from "@/app/lib/axios/axios";
// import Loading from "@/components/common/loading/Loading";
// import DashboardForm from "./components/DashboardForm";
// import DashboardHeader from "./components/DashboardHeader";

const DashboardUtama = () => {
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(true);
  const [error, setError] = useState("");

  const [prodiData, setProdiData] = useState({
    namaProdi: "",
    deskripsi: "",
    visiMisi: "",
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
    setLoading(true);
    try {
      const response = await apiClient.get(`/api/prodi/1`);
      const data = response.data;
      setProdiData({
        namaProdi: data.nama,
        deskripsi: data.deskripsi,
        visiMisi: data.visi_misi,
        sejarah: data.sejarah,
        infoLainnya: data.info_lainnya,
        logoProdiNama: data.logo_prodi,
        logoProdiUrl: data.url_logo_prodi,
        logoUniversitasNama: data.logo_universitas,
        logoUniversitasUrl: data.url_logo_universitas,
      });
      setError("");
    } catch (error) {
      console.error("Error fetching Prodi:", error);
      setError("Failed to fetch Prodi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-white p-4">
      {loading ? (
        <Loading />
      ) : (
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
            setLoading={setLoading}
            fetchProdi={fetchProdi}
          />
        </>
      )}
    </div>
  );
};

export default DashboardUtama;
