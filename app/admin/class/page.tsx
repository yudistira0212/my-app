"use client";

import React, { useCallback } from "react";
import { Class, Dosen } from "@prisma/client";
import InputClass from "./components/inputClass";
import ListClass from "./components/listClass";
import { useFetch } from "@/app/hooks/useFetch";
import apiClient from "@/app/lib/axios/axios";
import Loading from "@/app/components/common/loading/Loading";

const PageClass: React.FC = () => {
  // Menggunakan useFetch untuk mendapatkan data kelas
  const {
    data: classes,
    isLoading: clsLoading,
    isError: clsError,
    mutate: mutateClasses,
  } = useFetch("/api/class");

  // Menggunakan useFetch untuk mendapatkan data dosen
  const {
    data: dataDosen,
    isLoading: dosenLoading,
    isError: dosenError,
    // mutate: mutateDosen,
  } = useFetch("/api/dosen");

  // Callback untuk memperbarui data kelas
  const fetchData = useCallback(
    async (keyword?: string) => {
      try {
        const response = await apiClient.get("/api/class", {
          params: {
            search: keyword,
          },
        });
        mutateClasses(response.data, false); // Mutasi cache tanpa revalidasi
      } catch (error: any) {
        console.error(error.response ? error.response.data.error : error);
      }
    },
    [mutateClasses]
  );

  if (clsLoading || dosenLoading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Loading />
      </div>
    );
  }

  if (clsError || dosenError) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <p>Error loading data</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white p-4">
      <h1 className="text-2xl font-bold mb-6">Class</h1>
      <div className="py-4">
        <InputClass onSuccess={fetchData} dosenList={dataDosen} />
      </div>

      <div>
        {dataDosen && classes && (
          <ListClass
            classes={classes}
            fetcData={fetchData}
            dataDosen={dataDosen}
          />
        )}
      </div>
    </div>
  );
};

export default PageClass;
