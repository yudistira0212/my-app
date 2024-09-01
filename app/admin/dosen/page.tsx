"use client";

import React, { useCallback } from "react";
import DosenInput from "./components/dosenInput";
import TableDosen from "./components/tableDosen";
import { Dosen } from "@prisma/client";
import { useFetch } from "@/app/hooks/useFetch";
import apiClient from "@/app/lib/axios/axios";
import Loading from "@/app/components/common/loading/Loading";

const PageDosen = () => {
  // Menggunakan useFetch untuk mendapatkan data dosen
  const { data: dosen, mutate, isLoading, isError } = useFetch("/api/dosen");

  // Callback untuk memperbarui data dosen
  const fetchDosen = useCallback(async () => {
    // Clear previous error
    try {
      const response = await apiClient.get(`/api/dosen/`);
      mutate(response.data, false);
    } catch (error) {
      console.log(error);
    }
  }, [mutate]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  if (isError) return <p>Error loading dosen data</p>;

  return (
    <div className="flex flex-col bg-white p-4">
      <h1 className="text-2xl font-bold mb-6">Dosen</h1>
      <div className="py-4">
        <DosenInput onSuccess={fetchDosen} />
      </div>
      <div>
        <TableDosen dosenList={dosen || []} fetchDosen={fetchDosen} />
      </div>
    </div>
  );
};

export default PageDosen;
