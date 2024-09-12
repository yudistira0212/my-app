import React from "react";
import { images } from "@/app/lib/image/images";
import Link from "next/link";
import Image from "next/image";

const Universitas = () => {
  return (
    <div
      className="w-full h-screen p-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${images.rektorat.src})` }}
    >
      <div>
        <h1 className="text-3xl font-bold text-center sm:text-4xl md:text-5xl text-white mt-4">
          UNIVERSITAS PAPUA
        </h1>
      </div>
      <div className="flex flex-col sm:flex-row justify-evenly items-center h-4/5 w-full gap-4">
        <div className="bg-white bg-opacity-50 p-3 rounded-full underline">
          <Link href="" target="_blank">
            <span className="text-sm sm:text-base md:text-lg">
              Fakultas Teknik
            </span>
          </Link>
        </div>
        <div className="bg-white bg-opacity-50 p-3 rounded-full underline">
          <Link
            href="https://www.unipa.ac.id/fakultas/fakultas-teknik"
            target="_blank"
          >
            <span className="text-sm sm:text-base md:text-lg">Unipa</span>
          </Link>
        </div>
        <div className="bg-white bg-opacity-50 p-3 rounded-full underline">
          <Link href="https://bpak.unipa.ac.id/" target="_blank">
            <span className="text-sm sm:text-base md:text-lg">BPAK UNIPA</span>
          </Link>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-2 text-white  bottom-4 left-4 sm:left-8">
        <Image
          src={images.LogoUnipa}
          alt="logo unipa"
          width={50}
          height={50}
          className="w-12 h-12"
        />
        <div className="text-center sm:text-left">
          <h4 className="text-lg font-bold">Kampus Manokwari</h4>
          <p className="text-sm sm:text-base">
            JL. Gunung Salju, Manokwari, Papua Barat, 98314
          </p>
        </div>
      </div>
    </div>
  );
};

export default Universitas;
