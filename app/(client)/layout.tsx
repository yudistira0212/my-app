import React from "react";
import Navbar from "../components/client/header/Navbar";

const Layoutclient = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />

      <main>{children}</main>
    </div>
  );
};

export default Layoutclient;
