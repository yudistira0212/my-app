// components/ProdiProfile.tsx
"use client";

import apiClient from "@/app/lib/axios/axios";
import { Prodi } from "@prisma/client";
import React from "react";

interface Props {
  dataProdi: Prodi;
}
const Profil: React.FC<Props> = ({ dataProdi }) => {
  return (
    <div className="bg-gray-50 p-8">
      <h1 className="text-center text-3xl font-bold mb-8 text-blue-900">
        PROFIL PRODI TEKNIK INFORMATIKA
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold text-blue-900 mb-4">
            VISI MISI TUJUAN
          </h2>
          <div className="mb-4">
            <strong>Visi</strong>
            {dataProdi?.visi?.split("\n").map((line, index) => (
              <p className=" text-justify " key={index}>
                {line}
              </p>
            ))}
          </div>
          <div className="mb-4">
            <strong>Misi</strong>
            <ol className="list-decimal ml-5">
              {dataProdi?.misi?.split("\n").map((line, index) => (
                <li className="text-justify " key={index}>
                  {line}
                </li>
              ))}
            </ol>
          </div>
          <div className="mb-4">
            <strong>Tujuan</strong>
            <ol className="list-decimal ml-5">
              {dataProdi?.tujuan?.split("\n").map((line, index) => (
                <li className="text-justify" key={index}>
                  {line}
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-blue-900 mb-4">
            PROFIL SINGKAT TEKNIK INFORMATIKA
          </h2>
          {dataProdi?.deskripsi?.split("\n").map((line, index) => (
            <p className="mb-4 text-justify " key={index}>
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profil;
