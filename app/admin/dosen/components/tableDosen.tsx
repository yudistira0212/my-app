"use client";

import React from "react";

import EditDosen from "./editDosen";
import DeleteDosen from "./deleteDosen";
import { Dosen } from "@prisma/client";
import ShowDosen from "./ShowDosen";
import Image from "next/image";
import { images } from "@/app/lib/image/images";
interface tableDosenProps {
  dosenList: Dosen[];
  fetchDosen: any;
}

const TableDosen: React.FC<tableDosenProps> = ({ dosenList, fetchDosen }) => {
  const handelFetching = () => {
    fetchDosen();
  };

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-white uppercase bg-[#8B8A8A]">
            <tr>
              <th scope="col" className="px-6 py-3">
                NO
              </th>
              <th scope="col" className="px-6 py-3">
                Nama
              </th>
              <th scope="col" className="px-6 py-3">
                Jabatan
              </th>
              <th scope="col" className="px-6 py-3">
                Foto
              </th>
              <th scope="col" className="px-6 py-3">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {dosenList.map((dosen, index) => (
              <tr
                key={dosen.id}
                className="odd:bg-white text-left  even:bg-[#D9D9D9]"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {index + 1}
                </th>
                <td className="px-6 py-4">{dosen.nama}</td>
                <td className="px-6 py-4">{dosen.jabatan}</td>
                <td className="px-6 py-4">
                  <Image
                    src={dosen.url_gambar || images.imageDefault}
                    alt={dosen.nama!}
                    className="w-16 h-16 object-cover rounded-lg"
                    width={300}
                    height={300}
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <EditDosen dataDosen={dosen} onSuccess={handelFetching} />

                    <DeleteDosen
                      id={dosen.id}
                      image={dosen.gambar!}
                      onSuccess={handelFetching}
                    />
                    <ShowDosen dataDosen={dosen} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableDosen;
