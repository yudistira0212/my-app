import Modals from "@/app/components/ui/modals/Modals";
import { Dosen } from "@prisma/client";
import moment from "moment";
import Image from "next/image";
import React, { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";

interface Props {
  dataDosen: Dosen;
}
const ShowDosen: React.FC<Props> = ({ dataDosen }) => {
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
          title={dataDosen.nama}
        >
          <div className="grid grid-cols-6">
            <Image
              src={dataDosen.url_gambar ?? ""}
              alt={dataDosen.gambar ?? ""}
              className="col-span-6"
              width={100}
              height={100}
            />

            <p className="col-span-2">Jabatan</p>
            <p className="col-span-1">:</p>
            <p className="col-span-3 w-full"> {dataDosen.jabatan} </p>

            <p className="col-span-2">Pendidikan</p>
            <p className="col-span-1">:</p>
            <p className="col-span-3 w-full"> {dataDosen.pendidikan} </p>

            <p className="col-span-2">Kontak</p>
            <p className="col-span-1">:</p>
            <p className="col-span-3 w-full"> {dataDosen.kontak} </p>

            <p className="col-span-2">Publikasi Ilmiah</p>
            <p className="col-span-1">:</p>
            <p className="col-span-3 w-full"> {dataDosen.publikasi} </p>

            <p className="col-span-2">Biorafi</p>
            <p className="col-span-1">:</p>
            <p className="col-span-3 w-full"> {dataDosen.biografi} </p>
          </div>
        </Modals>
      </div>
    </div>
  );
};

export default ShowDosen;
