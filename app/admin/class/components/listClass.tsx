// components/ListClass.tsx

"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Class } from "@prisma/client";
import { Dosen } from "@prisma/client";
import moment from "moment";
import EditDosen from "../dosen/components/editDosen";
import EditClass from "./editClass";
import DeleteClass from "./deleteClass";
import ShowClass from "./showClass";

interface ClassWithDosen extends Class {
  dosen: Dosen;
}

interface ListClassProps {
  classes: ClassWithDosen[];
  fetcData: () => void;
}

const formatDate = (date: Date | null): string => {
  return moment(date).format("YYYY/MM/DD, HH:mm");
};

const ListClass: React.FC<ListClassProps> = ({ classes, fetcData }) => {
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm  text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-white uppercase bg-[#8B8A8A]">
            <tr>
              <th scope="col" className="px-6 py-3">
                NO
              </th>
              <th scope="col" className="px-6 py-3">
                Nama
              </th>
              <th scope="col" className="px-6 py-3">
                sks
              </th>
              <th scope="col" className="px-6 py-3">
                Waktu
              </th>
              <th scope="col" className="px-6 py-3">
                Dosen
              </th>
              <th scope="col" className="px-6 py-3">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="">
            {classes.map((cls, index) => (
              <tr
                key={cls.id}
                className="odd:bg-white text-left  even:bg-[#D9D9D9]"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {index + 1}
                </th>
                <td className="px-6 py-4">{cls.nama}</td>
                <td className="px-6 py-4">{cls.sks}</td>
                <td className="px-6 py-4">
                  {formatDate(cls.waktu_mulai)} -{" "}
                  {formatDate(cls.waktu_selesai)}
                </td>
                <td className="px-6 py-4">{cls.dosen.nama}</td>
                <td className="px-6 py-4">
                  <div className="flex text-center gap-2">
                    <EditClass id={cls.id} onSuccess={fetcData} />

                    <DeleteClass id={cls.id} onSuccess={fetcData} />
                    <ShowClass dataClass={cls} />
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

export default ListClass;
