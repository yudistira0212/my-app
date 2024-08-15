import Modals from "@/app/components/ui/modals/Modals";
import { Class, Dosen } from "@prisma/client";
import moment from "moment";
import React, { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";

interface ClassWithDosen extends Class {
  dosen: Dosen;
}
interface Props {
  dataClass: ClassWithDosen;
}
const ShowClass: React.FC<Props> = ({ dataClass }) => {
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
          title={dataClass.nama}
        >
          <div className="grid grid-cols-6">
            <p className="col-span-1">Dosen</p>
            <p className="col-span-1">:</p>
            <p className="col-span-4 w-full"> {dataClass.dosen.nama} </p>

            <p className="col-span-1">Sks</p>
            <p className=" col-span-1">:</p>
            <p className="col-span-4 w-full"> {dataClass.sks} </p>

            <p className="col-span-1">Mulai</p>
            <p className="col-span-1">:</p>
            <p className="col-span-4 w-full">
              {moment(dataClass.waktu_mulai).format("YYYY-MM-DD HH:mm")}{" "}
            </p>

            <p className="col-span-1">Selesai</p>
            <p className="col-span-1">:</p>
            <p className="col-span-4 w-full">
              {moment(dataClass.waktu_selesai).format("YYYY-MM-DD HH:mm")}{" "}
            </p>
          </div>
        </Modals>
      </div>
    </div>
  );
};

export default ShowClass;
