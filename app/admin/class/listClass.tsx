// components/ListClass.tsx

"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Class } from "@prisma/client";
import { Dosen } from "@prisma/client";
import moment from "moment";
import EditDosen from "../dosen/editDosen";
import EditClass from "./editClass";
import DeleteClass from "./deleteClass";

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
      <h2>List Class</h2>
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
          <tbody>
            {classes.map((cls, index) => (
              <tr
                key={cls.id}
                className="odd:bg-white even:bg-gray-50 border-b"
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
                  <div className="flex gap-2">
                    <EditClass id={cls.id} onSuccess={fetcData} />

                    <DeleteClass id={cls.id} onSuccess={fetcData} />
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
