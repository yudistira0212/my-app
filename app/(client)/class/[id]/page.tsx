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
import { useFetch } from "@/app/hooks/useFetch";
import Loading from "@/app/components/common/loading/Loading";

const PageClass: React.FC = () => {
  const id = useParams().id;

  const { data: dataClass, isLoading, isError } = useFetch(`/api/class/${id}`);

  if (isLoading) {
    return (
      <div className="bg-gray-50 h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (isError)
    return (
      <h2 className="text-red-500 text-2xl  ">Error loading dosen data</h2>
    );

  return (
    <div>
      <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-between">
        <Class dataClass={dataClass} />
      </div>
    </div>
  );
};

export default PageClass;
