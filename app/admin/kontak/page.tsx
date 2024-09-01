"use client";

import React, { useCallback, useEffect, useState } from "react";
import Loading from "@/app/components/common/loading/Loading";
import KontakHeader from "./components/KontakHeader";
import KontakForm from "./components/KontakForm";
import apiClient from "@/app/lib/axios/axios";
import { useFetch } from "@/app/hooks/useFetch";

const PageKontak = () => {
  const [isEdit, setIsEdit] = useState(true);

  const {
    data: dataKontak,
    isLoading,
    isError,
    mutate,
  } = useFetch(`/api/kontak/1`);

  const fetchKontak = useCallback(async () => {
    try {
      const res = await apiClient.get("/api/kontak/1");
      const data = res.data;

      mutate(data, false);
    } catch (error: any) {
      if (error.response) {
        console.error(error.response.data.error);
      } else {
        console.error(error);
      }
    }
  }, [mutate]);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return <p>Error loading data.</p>;
  }

  return (
    <div className="flex flex-col bg-white p-4">
      <KontakHeader isEdit={isEdit} setIsEdit={setIsEdit} />
      <KontakForm
        isEdit={isEdit}
        kontakData={dataKontak}
        fetchKontak={fetchKontak}
      />
    </div>
  );
};

export default PageKontak;
