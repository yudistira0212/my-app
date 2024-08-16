"use client";

import React, { useEffect, useState } from "react";
import DosenInput from "./components/dosenInput";
import TableDosen from "./components/tableDosen";
import { Dosen } from "@prisma/client";
import apiClient from "@/app/lib/axios/axios";

const PageDosen = () => {
  const [dosen, setDosenList] = useState<Dosen[]>([]);

  const getDosen = () => {
    fetchDosen();
  };

  useEffect(() => {
    fetchDosen();
  }, []);

  const fetchDosen = async () => {
    try {
      const response = await apiClient.get("/api/dosen");
      setDosenList(response.data);
    } catch (error) {
      console.error("Error fetching dosen data:", error);
    }
  };
  return (
    <div>
      <div className=" flex flex-col bg-white p-4">
        <h1 className="text-2xl font-bold mb-6">Dosen</h1>
        <div className="py-4">
          <DosenInput onSuccess={getDosen} />
        </div>
        <div>
          <TableDosen dosenList={dosen} fetchDosen={fetchDosen} />
        </div>
      </div>
    </div>
  );
};

export default PageDosen;
