"use client";
import apiClient from "@/app/lib/axios/axios";
import {
  Class as ClassType,
  Dosen,
  Mahasiswa,
  Mahasiswa_has_class,
} from "@prisma/client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import Class from "./components/Class";

interface ClassWithRelations extends ClassType {
  dosen: Dosen; // Relation to Dosen
  Mahasiswa_has_class: (Mahasiswa_has_class & {
    mahasiswa: Mahasiswa;
  })[];
}
const PageClass: React.FC = () => {
  const [dataClass, setDataClass] = useState<ClassWithRelations>();

  const id = useParams().id;

  useEffect(() => {
    fetchData(id);
  }, [id]);
  const fetchData = async (id: any) => {
    try {
      const result = await apiClient.get(`/api/class/${id}`);
      const data = result.data;
      console.log(data);

      setDataClass(data);
    } catch (error) {
      console.error("gagal mengambil data:", error);
    }
  };

  return (
    <div>
      <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-between">
        {dataClass && <Class dataClass={dataClass} />}
      </div>
    </div>
  );
};

export default PageClass;
