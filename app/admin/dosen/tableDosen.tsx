"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import EditDosen from "./editDosen";
import DeleteDosen from "./deleteDosen";
import { Dosen } from "@prisma/client";
interface tableDosenProps {
  dosenList: Dosen[];
  fetchDosen: () => void;
}

const TableDosen: React.FC<tableDosenProps> = ({ dosenList, fetchDosen }) => {
  const handelFetching = () => {
    fetchDosen();
  };

  return (
    <div>
      <h2>List Dosen</h2>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
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
                className="odd:bg-white even:bg-gray-50 border-b"
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
                  <img
                    src={dosen.url_gambar!}
                    alt={dosen.nama!}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <EditDosen id={dosen.id} onSuccess={handelFetching} />

                    <DeleteDosen
                      id={dosen.id}
                      image={dosen.gambar!}
                      onSuccess={handelFetching}
                    />
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
