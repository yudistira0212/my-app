"use client";

import { Pengumuman } from "@prisma/client";
import React from "react";
import EditPengumuman from "./EditPengumuman";
import DeletePengumuman from "./DeletePengumuman";

interface ListPengumumanProps {
  listData: Pengumuman[];
  fechingData: () => void;
}
const ListPengumuman: React.FC<ListPengumumanProps> = ({
  listData,
  fechingData,
}) => {
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
            {listData.map((value, index) => (
              <tr
                key={value.id}
                className="odd:bg-white even:bg-gray-50 border-b"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {index + 1}
                </th>
                <td className="px-6 py-4">{value.judul}</td>
                <td className="px-6 py-4">{value.text}</td>
                <td className="px-6 py-4">
                  <img
                    src={value.url_gambar!}
                    alt={value.gambar!}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <EditPengumuman id={value.id} onSuccess={fechingData} />

                    <DeletePengumuman
                      id={value.id}
                      image={value.gambar!}
                      onSuccess={fechingData}
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

export default ListPengumuman;
