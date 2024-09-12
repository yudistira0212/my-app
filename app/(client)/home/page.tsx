"use client";

import React from "react";
import Pengumuman from "./components/Pengumuman";
import Dosen from "./components/dosen";
import Profil from "./components/profil";
import HomeHeader from "./components/HomeHeader";
import Class from "./components/Class";
import { useFetch } from "@/app/hooks/useFetch";
import SkeletonBox from "../../components/ui/skeleton/SkeletonBox";
import Universitas from "@/app/components/client/footer/universitas";

// Komponen reusable untuk penanganan status loading dan error

const SectionWrapper = ({
  isLoading,
  isError,
  children,
  height = "50vh",
}: any) => {
  if (isLoading) {
    return (
      <div className={`w-full h-[${height}] my-4 rounded-full`}>
        <SkeletonBox />
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className={`w-full h-[${height}] my-4 flex items-center justify-center rounded-full`}
      >
        <h2>Gagal Mengambil Data</h2>
      </div>
    );
  }

  return children;
};

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

  console.log({ isErrorClass, isLoadingClass, DataClass });

  return (
    <div>
      <HomeHeader />

      <div className="my-8">
        <Class
          dataClass={DataClass || []}
          loading={isLoadingClass}
          error={isErrorClass}
        />
      </div>

      <div className="my-8">
        <SectionWrapper
          isLoading={isLoadingPengumuman}
          isError={isErrorPengumuman}
        >
          <Pengumuman dataPengumuman={DataPengumuman || []} />
        </SectionWrapper>
      </div>

      <Universitas />

      <div className="my-8">
        <SectionWrapper isLoading={isLoadingDosen} isError={isErrorDosen}>
          <Dosen dataDosen={DataDosen || []} />
        </SectionWrapper>
      </div>

      <div>
        <SectionWrapper
          isLoading={isLoadingProdi}
          isError={isErrorProdi}
          height="100vh"
        >
          <Profil dataProdi={dataProdi} />
        </SectionWrapper>
      </div>
    </div>
  );
};

export default PageHome;
