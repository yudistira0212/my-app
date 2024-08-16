"use client";

import React, { useEffect, useState } from "react";
import { Class, Dosen } from "@prisma/client";
import InputClass from "./components/inputClass";
import ListClass from "./components/listClass";
import apiClient from "@/app/lib/axios/axios";

interface ClassWithDosen extends Class {
  dosen: Dosen;
}

const PageClass: React.FC = () => {
  const [classes, setClasses] = useState<ClassWithDosen[]>([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await apiClient.get("/api/class");
      console.log("Response data:", response.data); // Log response data
      setClasses(response.data);
    } catch (error) {
      console.error("Error fetching class:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white p-4">
      <h1 className="text-2xl font-bold mb-6">Class</h1>
      <div className="py-4">
        <InputClass onSuccess={fetchData} />
      </div>

      <div>
        <ListClass classes={classes} fetcData={fetchData} />
      </div>
    </div>
  );
};

export default PageClass;
