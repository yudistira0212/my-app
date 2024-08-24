import Modals from "@/app/components/ui/modals/Modals";
import { images } from "@/app/lib/image/images";
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
          <div className="overflow-auto max-h-96">
            <Image
              src={dataDosen.url_gambar ?? images.imageDefault}
              alt={dataDosen.gambar ?? ""}
              className="col-span-8"
              width={100}
              height={100}
            />
            <div>
              <h4 className="col-span-2 text-lg font-bold">Jabatan</h4>
              <p className="col-span-5 w-full"> {dataDosen.jabatan} </p>
            </div>
            <div>
              <h4 className="col-span-2 text-lg font-bold">Pendidikan</h4>
              <p className="col-span-5 w-full"> {dataDosen.pendidikan} </p>
            </div>
            <div>
              <h4 className="col-span-2 text-lg font-bold">Kontak</h4>
              <p className="col-span-5 w-full"> {dataDosen.kontak} </p>
            </div>
            <div>
              <h4 className="col-span-2 text-lg font-bold">Biografi</h4>
              <p className="col-span-5 w-full  text-justify ">
                {dataDosen.biografi}
              </p>
            </div>
            <div>
              <h4 className="col-span-2 text-lg font-bold">Publikasi Ilmiah</h4>
              <p className="col-span-5 w-full"> {dataDosen.publikasi} </p>
            </div>
          </div>
        </Modals>
      </div>
    </div>
  );
};

export default ShowDosen;
