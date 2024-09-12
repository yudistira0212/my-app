import { useFetch } from "@/app/hooks/useFetch";
import Link from "next/link";
import React from "react";
import { BsTelephoneFill } from "react-icons/bs";
import { FaInstagramSquare } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import SkeletonBox from "../../ui/skeleton/SkeletonBox";

const Footer = () => {
  const { data: dataKontak, isLoading, isError } = useFetch("/api/kontak/1");

  return (
    <div className="mt-8 text-center p-4 bg-[#A8A8A75E] h-auto md:h-[50vh]">
      <h3 className="text-lg md:text-xl font-bold text-blue-900 mb-4">
        TERHUBUNG DENGAN KAMI:
      </h3>
      <div className="flex flex-col md:flex-row justify-center w-full h-auto gap-4 md:gap-8">
        {/* Telepon */}
        <div className="flex items-center gap-1 justify-between">
          <BsTelephoneFill size={20} />
          {isLoading ? (
            <div className="w-40 md:w-60 h-5 rounded-full">
              <SkeletonBox />
            </div>
          ) : (
            <p className="font-bold text-sm md:text-xl">
              {dataKontak?.telephone}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="flex items-center gap-1 justify-between">
          <MdEmail size={20} />
          {isLoading ? (
            <div className="w-40 md:w-60 h-5 rounded-full">
              <SkeletonBox />
            </div>
          ) : (
            <Link
              className="font-bold text-sm md:text-xl"
              href={`mailto:${dataKontak?.email}`}
            >
              {dataKontak?.email}
            </Link>
          )}
        </div>

        {/* Instagram */}
        <div className="flex items-center gap-1 justify-between">
          <FaInstagramSquare size={20} />
          {isLoading ? (
            <div className="w-40 md:w-60 h-5 rounded-full">
              <SkeletonBox />
            </div>
          ) : (
            <Link
              href={dataKontak?.link_sosial_media ?? "#"}
              target="_blank"
              className="font-bold text-sm md:text-xl"
            >
              {dataKontak?.sosial_media}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Footer;
