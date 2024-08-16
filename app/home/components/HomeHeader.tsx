"use client";

import React from "react";
import Laptop2 from "@/app/assets/background/laptop2.png";

const HomeHeader = () => {
  return (
    <div
      className="relative text-[#263159]   h-[100vh] flex justify-center items-center p-10 bg-cover bg-center"
      style={{ backgroundImage: `url(${Laptop2.src})` }}
    >
      <div className="absolute left-10 top-1/2 transform -translate-y-1/2">
        <h1 className="text-2xl font-bold ">SELAMAT DATANG DI</h1>
        <h1 className="text-3xl font-bold ">PROFIL PRODI TEKNIK INFORMATIKA</h1>
      </div>
    </div>
  );
};

export default HomeHeader;
