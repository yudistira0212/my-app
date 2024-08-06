"use client";

import React, { useEffect, useState } from "react";
import InputClass from "./inputClass";
import ListClass from "./listClass";
import { Class, Dosen } from "@prisma/client";
import axios from "axios";
import moment from "moment";

interface ClassWithDosen extends Class {
  dosen: Dosen;
}

const PageClass: React.FC = () => {
  const [classes, setClasses] = useState<ClassWithDosen[]>([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/class");
      setClasses(response.data);
    } catch (error) {
      console.error("Error fetching class:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white p-4">
      <InputClass onSuccess={fetchData} />
      <ListClass classes={classes} fetcData={fetchData} />
      {/* <h1 className="text-3xl font-bold mb-8">Input Class</h1>
      <div className="w-full   p-6">
        <h2 className="text-xl font-semibold mb-4">Class Data</h2>
        <form>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="bg-gray-200 p-4 rounded-lg flex items-center justify-center"
              >
                <label htmlFor={`classInput${index}`} className="sr-only">
                  Isi Class
                </label>
                <input
                  id={`classInput${index}`}
                  type="text"
                  placeholder="Isi Class"
                  className="bg-gray-200 text-center border-none  focus:outline-none"
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Selanjutnya...</span>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg"
            >
              Simpan
            </button>
          </div>
        </form>
      </div> */}
    </div>
  );
};

export default PageClass;
