import Image from "next/image";
import React from "react";
import { images } from "@/app/lib/image/images";
const Navbar = () => {
  return (
    <div>
      <nav className="flex justify-between p-4  bg-[#FFFBEB] ">
        <div className="flex gap-2 h-10 ">
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
        <div className="h-10 flex items-center gap-2">
          <div>ILMU UNTUK KEMANUSIAAN</div>
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
