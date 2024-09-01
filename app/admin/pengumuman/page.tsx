"use client";

import React, { useCallback, useEffect, useState } from "react";
import InputPengumuman from "./components/inputPengumuman";
import ListPengumuman from "./components/ListPengumuman";
import apiClient from "@/app/lib/axios/axios";
import { useFetch } from "@/app/hooks/useFetch";
import Loading from "@/app/components/common/loading/Loading";

const PagePengumuman = () => {
  const {
    data: listData,
    isError,
    isLoading,
    mutate,
  } = useFetch("/api/pengumuman");

  const fetchData = useCallback(async () => {
    try {
      const response = await apiClient.get(`/api/pengumuman`);
      // console.log(response.data);
      mutate(response.data, false);
    } catch (error: any) {
      if (error.response) {
        console.error(error.response.data.error);
      } else {
        console.error(error);
      }
    }
  }, [mutate]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  if (isError) return <p>Error loading data</p>;

  return (
    <div>
      <div className=" flex flex-col bg-white p-4">
        <h1 className="text-2xl font-bold mb-6">Pengumuman</h1>
        <div className="py-4">
          <InputPengumuman onSuccess={fetchData} />
        </div>
        <ListPengumuman listData={listData} fechingData={fetchData} />
      </div>
    </div>
  );
};

export default PagePengumuman;
