"use client";

import React, { useEffect, useState } from "react";
import Loading from "@/app/components/common/loading/Loading";
import KontakHeader from "./components/KontakHeader";
import KontakForm from "./components/KontakForm";
import apiClient from "@/app/lib/axios/axios";

const PageKontak = () => {
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(true);
  const [error, setError] = useState("");
  const [kontakData, setKontakData] = useState({
    email: "",
    telephone: "",
    alamat: "",
    sosialMedia: "",
  });

  useEffect(() => {
    fetchKontak();
  }, []);

  const fetchKontak = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get("/api/kontak/1");
      const data = res.data;

      setKontakData({
        email: data.email,
        telephone: data.telephone,
        alamat: data.alamat,
        sosialMedia: data.sosial_media,
      });
      setError("");
    } catch (error) {
      console.error("Error fetching kontak:", error);
      setError("Failed to fetch kontak data.");
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
          <KontakHeader isEdit={isEdit} setIsEdit={setIsEdit} />
          <KontakForm
            isEdit={isEdit}
            kontakData={kontakData}
            setKontakData={setKontakData}
            setError={setError}
            setLoading={setLoading}
            fetchKontak={fetchKontak}
          />
        </>
      )}
    </div>
  );
};

export default PageKontak;
