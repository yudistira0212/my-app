"use client";

import Image from "next/image";
import React from "react";

const HomeHeader = () => {
  return (
    <div
      className="h-[100vh] flex flex-col justify-center p-10"
      // style={{
      //   backgroundImage: `url(@/app/assets/background/laptop2.png)`,
      // }}
    >
      <h1 className="text-2xl font-bold  text-blue-900">SELAMAT DATANG DI</h1>
      <h1 className=" text-3xl font-bold  text-blue-900">
        PROFIL PRODI TEKNIK INFORMATIKA
      </h1>
      <Image className="object-cover" src={""} alt={""} width={0} height={0} />
    </div>
  );
};

export default HomeHeader;
