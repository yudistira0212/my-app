"use client";

import React, { useEffect, useState } from "react";
import InputPengumuman from "./components/inputPengumuman";
import ListPengumuman from "./components/ListPengumuman";
import { Pengumuman } from "@prisma/client";
import apiClient from "@/app/lib/axios/axios";

const PagePengumuman = () => {
  const [listData, setListData] = useState<Pengumuman[]>([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await apiClient.get(`/api/pengumuman`);
      console.log(response.data);
      setListData(response.data);
    } catch (error) {
      console.log("filed fetch data", error);
    }
  };

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
