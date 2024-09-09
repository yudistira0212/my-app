import React from "react";
import { images } from "@/app/lib/image/images";
import Link from "next/link";
import Image from "next/image";

const Universitas = () => {
  return (
    <div
      className="w-full h-screen uppercase   p-4 bg-cover"
      style={{ backgroundImage: `url(${images.rektorat.src})` }}
    >
      {/* <Image
        src={images.rektorat}
        alt="logo kampus merdeka"
        className="object-contain abusolute z-0 h-screen w-full"
        width={50}
        height={50}
      /> */}
      <div>
        <h1 className="text-3xl font-bold text-center ">UNIVERSIATS PAPUA</h1>
      </div>
      <div className="flex justify-evenly w-full items-center h-4/5">
        <div className="bg-white bg-opacity-50 p-3 rounded-full underline">
          <Link href="#">Fakultas Teknik</Link>
        </div>
        <div className="bg-white bg-opacity-50 p-3 rounded-full underline">
          <Link href="#">Unipa</Link>
        </div>
        <div className="bg-white bg-opacity-50 p-3 rounded-full underline">
          <Link href="#">BPAK UNIPA</Link>
        </div>
      </div>
      <div className="flex bottom-0 text-white ">
        <Image src={images.LogoUnipa} alt="logo unipa" width={50} height={50} />
        <div>
          <h4 className="text-lg font-bold">Kampus Manokari</h4>
          <p>JL. Gunung Salju, Manokwari, Papua Barat, 98314</p>
        </div>
      </div>
    </div>
  );
};

export default Universitas;
