"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Class, Dosen } from "@prisma/client";
import InputClass from "./components/inputClass";
import ListClass from "./components/listClass";
import apiClient from "@/app/lib/axios/axios";

interface ClassWithDosen extends Class {
  dosen: Dosen;
}

const PageClass: React.FC = () => {
  const [classes, setClasses] = useState<ClassWithDosen[]>([]);
  const [dataDosen, setDataDosen] = useState<Dosen[]>([]);
  useEffect(() => {
    fetchData();
    fetchDosen();
  }, []);

  const fetchData = useCallback(async (keyword?: string) => {
    try {
      const response = await apiClient.get("/api/class", {
        params: {
          search: keyword,
        },
      });

      setClasses(response.data);
    } catch (error: any) {
      if (error.response) {
        console.error(error.response.data.error);
      } else {
        console.error(error);
      }
    }
  }, []);

  const fetchDosen = useCallback(async () => {
    try {
      const response = await apiClient.get("/api/dosen");

      setDataDosen(response.data);
    } catch (error: any) {
      if (error.response) {
        console.error(error.response.data.error);
      } else {
        console.error(error);
      }
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white p-4">
      <h1 className="text-2xl font-bold mb-6">Class</h1>
      <div className="py-4">
        <InputClass onSuccess={fetchData} />
      </div>

      <div>
        {dataDosen && (
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
