"use client";

import React, { Suspense, useCallback, useState } from "react";
import { toast } from "react-toastify";
import Loading from "@/app/components/common/loading/Loading";
import apiClient from "@/app/lib/axios/axios";
import { useFetch } from "@/app/hooks/useFetch";

// Menggunakan React.lazy untuk memuat komponen secara dinamis
const DashboardHeader = React.lazy(
  () => import("./components/DashboardHeader")
);
const DashboardForm = React.lazy(() => import("./components/DashboardForm"));

const DashboardUtama = () => {
  const [isEdit, setIsEdit] = useState(true);
  const [error, setError] = useState("");

  // Menggunakan useFetch untuk mendapatkan data
  const { data: prodiData, isLoading, isError } = useFetch(`/api/prodi/1`);

  // Callback untuk memperbarui data prodi
  // const updateProdiData = useCallback((newData: any) => {
  //   setError(""); // Clear previous error
  //   apiClient
  //     .put(`/api/prodi/1`, newData)
  //     .then(() => {
  //       toast.success("Data updated successfully");
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setError(error.message || "An error occurred");
  //       toast.error("Failed to update data");
  //     });
  // }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <Loading />
      </div>
    );
  }

  if (isError || !prodiData) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <p>Error loading data</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white p-4">
      <Suspense
        fallback={
          <div className="flex justify-center items-center w-full h-screen">
            <Loading />
          </div>
        }
      >
        <DashboardHeader
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          title="Data Prodi"
        />
        <DashboardForm
          isEdit={isEdit}
          prodiData={prodiData}
          // setProdiData={updateProdiData}
          setError={setError}
          fetchProdi={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </Suspense>
    </div>
  );
};

export default DashboardUtama;
