"use client";

import React, { useEffect, useState } from "react";
import Pengumuman from "./components/Pengumuman";
import Dosen from "./components/dosen";
import Profil from "./components/profil";
import HomeHeader from "./components/HomeHeader";
import Class from "./components/Class";
import apiClient from "@/app/lib/axios/axios";

import type {
  Class as ClassType,
  Dosen as DosenType,
  Pengumuman as PengumumanType,
  Prodi,
} from "@prisma/client";

interface ClassWhitDosen extends ClassType {
  dosen: DosenType;
}

const PageHome = () => {
  const [DataClass, setDataClass] = useState<ClassWhitDosen[]>([]);
  const [DataPengumuman, setDataPengumuman] = useState<PengumumanType[]>([]);
  const [DataDosen, setDataDosen] = useState<DosenType[]>([]);
  const [dataProdi, setDataProdi] = useState<Prodi>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
    getDataPengumuman();
    getDataDosen();
    getDataProdi();
  }, []);

  // get data class
  const getData = async () => {
    setLoading(true);
    try {
      const result = await apiClient.get("/api/class");
      const data = result.data;
      setDataClass(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // get data pengumuman
  const getDataPengumuman = async () => {
    setLoading(true);
    try {
      const result = await apiClient.get("/api/pengumuman");
      const data = result.data;
      setDataPengumuman(data);
    } catch (error) {
      console.log("error get data : ", error);
    } finally {
      setLoading(false);
    }
  };

  const getDataDosen = async () => {
    setLoading(true);
    try {
      const result = await apiClient.get("/api/dosen");
      const data = result.data;
      setDataDosen(data);
      // console.log({ data });
    } catch (error) {
      console.log("error get data dosen : ", error);
    } finally {
      setLoading(false);
    }
  };

  const getDataProdi = async () => {
    setLoading(true);
    try {
      const result = await apiClient.get("/api/prodi/1");
      const data = result.data;
      setDataProdi(data);
      // console.log({ data });
    } catch (error) {
      console.log("error get data prodi : ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <HomeHeader />
      </div>
      <div className="m-4">
        {/* {loading ? <ClassSkeleton /> : <Class dataClass={DataClass} />} */}
        <Class dataClass={DataClass} loading={loading} />
      </div>
      <div>
        <Pengumuman dataPengumuman={DataPengumuman} />
      </div>
      <div>
        <Dosen dataDosen={DataDosen} />
      </div>
      <div>{dataProdi && <Profil dataProdi={dataProdi} />}</div>
    </div>
  );
};

export default PageHome;
