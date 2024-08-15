"use client";

import React from "react";
import Search from "./components/Search";
import Slider from "./components/Slider";
import Pengumuman from "./components/Pengumuman";
import Dosen from "./components/dosen";
import Profil from "./components/profil";
import Footer from "@/app/components/client/footer/footer";
import laptop2 from "@/app/assets/background/laptop2.png";
import Image from "next/image";
import HomeHeader from "./components/HomeHeader";

const PageHome = () => {
  return (
    <div>
      <div>
        <HomeHeader />
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
