"use client";

import React from "react";

import Pengumuman from "./components/Pengumuman";
import Dosen from "./components/dosen";
import Profil from "./components/profil";
import Footer from "@/app/components/client/footer/footer";

import HomeHeader from "./components/HomeHeader";
import Navbar from "@/app/components/client/header/Navbar";
import Class from "./components/Class";

const PageHome = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <HomeHeader />
      </div>

      <div className="m-4">
        <Class />
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
