"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import apiClient from "@/app/lib/axios/axios";
import { Pengumuman as TypePengumuman } from "@prisma/client";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const Pengumuman = () => {
  const router = useRouter();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [dataPengumuman, setDataPengumuman] = useState<TypePengumuman[]>([]);

  const [activeSlide, setActiveSlide] = useState(0);

  const getDataPengumuman = async () => {
    try {
      const result = await apiClient.get("/api/pengumuman");
      const data = result.data;
      setDataPengumuman(data);
    } catch (error) {
      console.log("error get data : ", error);
    }
  };

  useEffect(() => {
    getDataPengumuman();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleSlideNext();
    }, 5000); // 5 detik

    return () => clearInterval(interval); // Bersihkan interval saat komponen dihapus
  }, [activeSlide]);

  const handleSlideChange = (index: number) => {
    setActiveSlide(index);
  };

  const handleSlideNext = () => {
    setActiveSlide((prev) => (prev + 1) % dataPengumuman.length);
  };

  const handleSlidePrev = () => {
    setActiveSlide(
      (prev) => (prev - 1 + dataPengumuman.length) % dataPengumuman.length
    );
  };

  return (
    <div className="relative overflow-hidden w-full">
      <div className="flex justify-center">
        <h1 className="text-xl font-bold">Pengumuman Prodi</h1>
      </div>
      <div className="flex w-full">
        <div className=" absolute z-10  rounded-e-full backdrop-blur-sm   left-0 h-[50vh]  flex justify-between items-center p-4">
          <button
            onClick={handleSlidePrev}
            className="text-gray-500 hover:text-gray-600 px-3 py-2 rounded-md "
          >
            <MdArrowBackIos size={40} />
          </button>
        </div>

        <motion.div
          ref={sliderRef}
          className="relative flex transition-transform w-full duration-1000 ease-in-out"
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >
          {dataPengumuman.map((value, index) => (
            <div
              key={index}
              className="w-full h-[50vh] flex-shrink-0 hover:cursor-pointer flex flex-col items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: `url(${value.url_gambar})` }}
            >
              <div className="bg-white   bg-opacity-40  shadow-lg rounded-md p-4 text-center">
                <h2 className="text-3xl font-bold">{value.judul}</h2>
                <p className="text-gray-700">{value.text}</p>
              </div>
            </div>
          ))}
        </motion.div>

        <div className=" absolute z-10 h-[50vh]  right-0 flex justify-between  rounded-s-full backdrop-blur-sm items-center p-4">
          <button
            onClick={handleSlideNext}
            className="text-gray-500 hover:text-gray-600   px-3 py-2 rounded-md "
          >
            <MdArrowForwardIos size={40} />
          </button>
        </div>
      </div>

      <div className=" bottom-0 left-0 right-0 absolute flex justify-center items-center p-4 space-x-2">
        {dataPengumuman.map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full cursor-pointer ${
              activeSlide === index ? "bg-blue-500" : "bg-gray-500"
            }`}
            onClick={() => handleSlideChange(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Pengumuman;
