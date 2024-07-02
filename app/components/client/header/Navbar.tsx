import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav className="flex justify-between p-4  bg-[#FFFBEB] ">
        <div className="flex gap-2 h-10 ">
          <Image src="" alt="tess" />
          <Image src="" alt="tesss" />
        </div>
        <div className="h-10">
          <Image src="" alt="tess" />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
