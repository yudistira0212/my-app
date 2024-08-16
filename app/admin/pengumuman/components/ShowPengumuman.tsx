import Modals from "@/app/components/ui/modals/Modals";
import { Pengumuman } from "@prisma/client";

import Image from "next/image";
import React, { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";

interface Props {
  dataPengumuman: Pengumuman;
}
const ShowPengumuman: React.FC<Props> = ({ dataPengumuman }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div>
      <div>
        <button
          onClick={() => setModalIsOpen(true)}
          className="bg-yellow-500 hover:bg-yellow-700 text-white p-2 rounded-md flex"
        >
          <IoEyeSharp />
        </button>
        <Modals
          modalIsOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
          title={dataPengumuman.judul}
        >
          <div className="grid grid-cols-6">
            <Image
              src={dataPengumuman.url_gambar ?? ""}
              alt={dataPengumuman.gambar ?? ""}
              className="col-span-6"
              width={100}
              height={100}
            />
            <p className="col-span-2">Deskripsi</p>
            <p className="col-span-1">:</p>
            <p className="col-span-3 w-full"> {dataPengumuman.text} </p>
          </div>
        </Modals>
      </div>
    </div>
  );
};

export default ShowPengumuman;
