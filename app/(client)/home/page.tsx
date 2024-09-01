"use client";

import React from "react";
import Pengumuman from "./components/Pengumuman";
import Dosen from "./components/dosen";
import Profil from "./components/profil";
import HomeHeader from "./components/HomeHeader";
import Class from "./components/Class";
import { useFetch } from "@/app/hooks/useFetch";
import type {
  Class as ClassType,
  Dosen as DosenType,
  Pengumuman as PengumumanType,
  Prodi,
} from "@prisma/client";

interface ClassWithDosen extends ClassType {
  dosen: DosenType;
}

const PageHome: React.FC = () => {
  const { data: DataClass, isLoading: isLoadingClass } = useFetch("/api/class");
  const { data: DataPengumuman, isLoading: isLoadingPengumuman } =
    useFetch("/api/pengumuman");
  const { data: DataDosen, isLoading: isLoadingDosen } = useFetch("/api/dosen");
  const { data: dataProdi, isLoading: isLoadingProdi } =
    useFetch("/api/prodi/1");

  const isLoading =
    isLoadingClass || isLoadingPengumuman || isLoadingDosen || isLoadingProdi;

  return (
    <div>
      <div>
        <HomeHeader />
      </div>
      <div className="m-4">
        <Class dataClass={DataClass || []} loading={isLoadingClass} />
      </div>
      <div>
        <Pengumuman dataPengumuman={DataPengumuman || []} />
      </div>
      <div>
        <Dosen dataDosen={DataDosen || []} />
      </div>
      <div>{dataProdi && <Profil dataProdi={dataProdi} />}</div>
    </div>
  );
};

export default PageHome;
