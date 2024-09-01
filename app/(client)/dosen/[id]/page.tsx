"use client";
import React, { useEffect, useState } from "react";
import ImageComponent from "./components/Image";

import { useParams } from "next/navigation";
import Pendidikan from "./components/Pendidikan";
import Nama from "./components/Nama";
import Biografi from "./components/Biografi";
import PublikasiIlmiah from "./components/PublikasiIlmiah";
import Link from "next/link";
import Contact from "./components/Contact";
import { useFetch } from "@/app/hooks/useFetch";
import Loading from "@/app/components/common/loading/Loading";

const PageDosen = () => {
  const { id } = useParams();

  const { data: dataDosen, isLoading, isError } = useFetch(`/api/dosen/${id}`);

  if (isLoading) {
    return (
      <div className="bg-gray-50 min-h-screen flex fitems-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <div className="bg-[#fefbf3] min-h-screen flex flex-col items-center justify-between p-8">
        <div className="w-full max-w-4xl mx-auto bg-white shadow-lg gap-6 rounded-lg p-8 flex flex-col md:flex-row">
          <div className="md:w-1/3 bg-[#DFDFDF] rounded-t-full  flex flex-col items-center">
            <div className="w-full flex justify-center shadow-lg  rounded-full">
              <ImageComponent
                src={dataDosen?.url_gambar ?? ""}
                alt={dataDosen?.gambar ?? ""}
              />
            </div>
            <div>
              <div>
                <Pendidikan dataPendidikan={dataDosen?.pendidikan ?? ""} />
              </div>
              <div>
                <Contact contact={dataDosen?.kontak ?? ""} />
              </div>
            </div>
          </div>
          <div className="md:w-2/3  pt-32 text-justify">
            <div className="uppercase">
              <Nama
                nama={dataDosen?.nama ?? ""}
                jabatan={dataDosen?.jabatan ?? ""}
              />
              <div className="w-full border-b-2 border-b-black"></div>
              <br />
            </div>
            <div>
              <Biografi biografi={dataDosen?.biografi ?? ""} />
            </div>
            <div>
              <PublikasiIlmiah publikasiIlmiah={dataDosen?.publikasi ?? ""} />
            </div>
          </div>
        </div>

        <Link
          href="/home"
          className="bg-blue-900 text-white px-4 py-2 mt-8 rounded-md"
        >
          BACK
        </Link>
      </div>
    </div>
  );
};

export default PageDosen;
