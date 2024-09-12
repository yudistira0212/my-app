import Image from "next/image";
import React from "react";
import { images } from "@/app/lib/image/images";

const Navbar = () => {
  return (
    <div>
      <nav className="flex justify-between p-4 bg-[#FFFBEB]  md:flex-row items-center">
        {/* Bagian Logo */}
        <div className="flex gap-2 h-10 items-center mb-4 md:mb-0">
          <Image
            src={images.logoKampusMerdeka}
            alt="logo kampus merdeka"
            height={50}
            width={50}
            className="object-contain w-auto h-auto"
          />
          <Image
            src={images.logoTutwuri}
            alt="logo tutwuri"
            height={50}
            width={50}
            className="object-contain w-auto h-auto"
          />
        </div>

        {/* Bagian Text dan Logo */}
        <div className="h-10 flex  md:flex-row items-center gap-2">
          <div className="text-center text-sm md:text-base">
            ILMU UNTUK KEMANUSIAAN
          </div>
          <Image
            src={images.LogoUnipa}
            alt="logo unipa"
            height={50}
            width={50}
            className="object-contain"
          />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
