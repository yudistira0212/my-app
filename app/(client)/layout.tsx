"use client";

import React from "react";
import Navbar from "../components/client/header/Navbar";
import Footer from "../components/client/footer/footer";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <div>{children}</div>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default layout;
