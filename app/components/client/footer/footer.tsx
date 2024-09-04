import { useFetch } from "@/app/hooks/useFetch";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsTelephoneFill } from "react-icons/bs";
import { FaInstagramSquare } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import SkeletonBox from "../../ui/skeleton/SkeletonBox";

const Footer = () => {
  const { data: dataKontak, isLoading, isError } = useFetch("/api/kontak/1");

  return (
    <div className="mt-8 text-center p-4 bg-[#A8A8A75E] h-[50vh]">
      <h3 className="text-xl font-bold text-blue-900 mb-4">
        TERHUBUNG DENGAN KAMI :
      </h3>
      <div className="flex justify-center w-full h-1/2 gap-8">
        <div className="flex items-center gap-1 justify-between">
          <BsTelephoneFill size={20} />
          {isLoading && (
            <div className="w-60  h-5 rounded-full">
              <SkeletonBox />{" "}
            </div>
          )}
          <p className="font-bold text-xl">{dataKontak?.telephone}</p>
          {/* <p>{dataKontak?.alamat}</p> */}
        </div>
        <div className="flex items-center gap-1 justify-between">
          <MdEmail size={20} />
          {isLoading && (
            <div className="w-60  h-5 rounded-full">
              <SkeletonBox />{" "}
            </div>
          )}
          <Link
            className="font-bold text-xl"
            href={`mailto:${dataKontak?.email}`}
          >
            {dataKontak?.email}
          </Link>
        </div>
        <div className="flex items-center gap-1 justify-between">
          <FaInstagramSquare size={20} />
          {isLoading && (
            <div className="w-60  h-5 rounded-full">
              <SkeletonBox />{" "}
            </div>
          )}
          <Link
            href={dataKontak?.link_sosial_media ?? "#"}
            target="_blank"
            className="font-bold text-xl"
          >
            {dataKontak?.sosial_media}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
