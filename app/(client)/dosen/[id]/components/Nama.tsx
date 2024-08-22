import Image from "next/image";
import React from "react";

interface Props {
  nama: string;
  jabatan: string;
}
const Nama: React.FC<Props> = ({ nama, jabatan }) => {
  return (
    <div>
      <h1 className="text-4xl font-bold  ">{nama}</h1>
      <h3 className="text-2xl font-bold ">{jabatan}</h3>
    </div>
  );
};

export default Nama;
