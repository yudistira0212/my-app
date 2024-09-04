"use client";

import React from "react";
import Pengumuman from "./components/Pengumuman";
import Dosen from "./components/dosen";
import Profil from "./components/profil";
import HomeHeader from "./components/HomeHeader";
import Class from "./components/Class";
import { useFetch } from "@/app/hooks/useFetch";
import SkeletonBox from "../../components/ui/skeleton/SkeletonBox";
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
  const {
    data: DataClass,
    isLoading: isLoadingClass,
    isError: isErrorClass,
  } = useFetch("/api/class");
  const {
    data: DataPengumuman,
    isLoading: isLoadingPengumuman,
    isError: isErrorPengumuman,
  } = useFetch("/api/pengumuman");
  const {
    data: DataDosen,
    isLoading: isLoadingDosen,
    isError: isErrorDosen,
  } = useFetch("/api/dosen");
  const {
    data: dataProdi,
    isLoading: isLoadingProdi,
    isError: isErrorProdi,
  } = useFetch("/api/prodi/1");

  return (
    <div>
      <div>
        <HomeHeader />
      </div>
      <div className="my-8">
        <Class dataClass={DataClass || []} loading={isLoadingClass} />
      </div>
      <div className="my-8">
        {isLoadingPengumuman ? (
          <div className="w-full my-4 h-[50vh]  rounded-full">
            <SkeletonBox />
          </div>
        ) : (
          <Pengumuman dataPengumuman={DataPengumuman || []} />
        )}
        {isErrorPengumuman && (
          <div className="w-full my-4 h-[50vh] flex items-center justify-center  rounded-full">
            <h2>Gagal Mengambil data Pengumuman</h2>
          </div>
        )}
      </div>
      <div className="my-8">
        {isLoadingDosen ? (
          <div className="w-full my-4  h-[50vh]  rounded-full">
            <SkeletonBox />
          </div>
        ) : (
          <Dosen dataDosen={DataDosen || []} />
        )}
        {isErrorDosen && (
          <div className="w-full my-4 h-[50vh] flex items-center justify-center  rounded-full">
            <h2>Gagal Mengambil data Dosen</h2>
          </div>
        )}
      </div>
      <div>
        {isLoadingProdi ? (
          <div className="w-full  h-[100vh]  rounded-full">
            <SkeletonBox />
          </div>
        ) : (
          <Profil dataProdi={dataProdi} />
        )}
        {isErrorProdi && (
          <div className="w-full  h-[50vh] flex items-center justify-center  rounded-full">
            <h2>Gagal Mengambil data Prfil</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHome;
