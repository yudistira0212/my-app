"use client";
import apiClient from "@/app/lib/axios/axios";
import {
  Class as ClassType,
  Dosen,
  Mahasiswa,
  Mahasiswa_has_class,
} from "@prisma/client";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import Absen from "./components/Absen";

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

        <div className="w-full">
          <Image
            src="/images/gedung.jpg"
            alt="Gedung"
            width={1479}
            height={251}
            className="w-full"
          />
        </div>

        {/* <div className="bg-white p-8 w-full text-center">
          <h3 className="text-xl font-bold text-blue-900 mb-4">
            TERHUBUNG DENGAN KAMI :
          </h3>
          <div className="flex justify-center space-x-8">
            <div className="flex items-center">
              <img
                src="/path/to/phone-icon.png"
                alt="Phone"
                className="w-6 h-6 mr-2"
              />
              <span>(0986) 214245</span>
            </div>
            <div className="flex items-center">
              <img
                src="/path/to/email-icon.png"
                alt="Email"
                className="w-6 h-6 mr-2"
              />
              <span>prodi.s1informatika@unipa.ac.id</span>
            </div>
            <div className="flex items-center">
              <img
                src="/path/to/instagram-icon.png"
                alt="Instagram"
                className="w-6 h-6 mr-2"
              />
              <span>@teknik_informatika_unipa</span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default PageClass;
