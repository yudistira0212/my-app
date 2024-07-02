"use client";

import React from "react";
import Search from "./Search";
import Slider from "./Slider";
import Pengumuman from "./Pengumuman";
import Dosen from "./dosen";
import Profil from "./profil";
import Footer from "@/app/components/client/footer/footer";
import laptop2 from "@/app/assets/background/laptop2.png";

const PageHome = () => {
  return (
    <div>
      <div>
        <div
          className="h-[100vh] flex flex-col justify-center p-10"
          // style={{
          //   backgroundImage: `url(@/app/assets/background/laptop2.png)`,
          // }}
        >
          <h1 className="text-2xl font-bold  text-blue-900">
            SELAMAT DATANG DI
          </h1>
          <h1 className=" text-3xl font-bold  text-blue-900">
            PROFIL PRODI TEKNIK INFORMATIKA
          </h1>
        </div>
      </div>

      <div className="m-4">
        <Search />
      </div>
      <div>
        <Pengumuman />
      </div>
      <div>
        <Dosen />
      </div>
      <div>
        <Profil />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default PageHome;
