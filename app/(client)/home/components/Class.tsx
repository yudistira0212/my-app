"use client";

import Loading from "@/app/components/common/loading/Loading";
import ClassSkeleton from "@/app/components/ui/skeleton/ClassSkeleton";
import { Class as ClassType, Dosen } from "@prisma/client";
import Link from "next/link";
import React, { useState, useCallback, Suspense } from "react";

interface ClassWhitDosen extends ClassType {
  dosen: Dosen;
}

interface Props {
  dataClass: ClassWhitDosen[];
  loading: boolean;
}
const Class: React.FC<Props> = ({ dataClass, loading }) => {
  const [search, setSearch] = useState("");

  const handleSearchChange = useCallback(
    (event: { target: { value: React.SetStateAction<string> } }) => {
      setSearch(event.target.value);
    },
    []
  );

  const filteredClasses = dataClass.filter((classItem) =>
    classItem.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className=" min-h-screen bg-gray-50 rounded p-4 ">
      <div className="flex justify-center">
        <h1 className="text-xl font-bold">Class Info</h1>
      </div>
      <form className="max-w-md mx-auto">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Search..."
            value={search}
            onChange={handleSearchChange}
          />
        </div>
      </form>

      <div>
        <div className="my-6">
          {loading && <ClassSkeleton />}
          {filteredClasses.length === 0 && !loading && (
            <h1 className="text-xl font-bold uppercase">
              Tidak ada kelas yang tersedia
            </h1>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-6">
          {filteredClasses.map((value, index) => (
            <Link
              key={value.id}
              className="text-white p-3 rounded-3xl hover:bg-[#38415c] flex items-center bg-[#495579] justify-center"
              href={`/class/${value.id}`}
            >
              <div className="flex flex-col gap-1 justify-center text-center">
                <div>{value.nama}</div>
                <div>{value.sks}</div>
                <div>{value.dosen?.nama}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Class;
