import { useFetch } from "@/app/hooks/useFetch";
import apiClient from "@/app/lib/axios/axios";
import { Kontak } from "@prisma/client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsTelephoneFill } from "react-icons/bs";
import { FaInstagramSquare } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const { data: dataKontak, isLoading, isError } = useFetch("/api/kontak/1");

  return (
    <div className="mt-8 text-center p-4 bg-[#A8A8A75E] h-[50vh]">
      <h3 className="text-xl font-bold text-blue-900 mb-4">
        TERHUBUNG DENGAN KAMI :
      </h3>
      <div className="flex justify-center h-1/2 space-x-8">
        <div className="flex items-center gap-1 justify-center">
          <BsTelephoneFill size={20} />
          <p className="font-bold text-xl">{dataKontak?.telephone}</p>
          {/* <p>{dataKontak?.alamat}</p> */}
        </div>
        <div className="flex items-center gap-1 justify-center">
          <MdEmail size={20} />
          <Link
            className="font-bold text-xl"
            href={`mailto:${dataKontak?.email}`}
          >
            {dataKontak?.email}
          </Link>
        </div>
        <div className="flex items-center gap-1 justify-center">
          <FaInstagramSquare size={20} />
          <Link href={"#"} className="font-bold text-xl">
            {dataKontak?.sosial_media}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
