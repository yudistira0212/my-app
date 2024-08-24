// components/FacultySlider.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Dosen as DosenType } from "@prisma/client";
import apiClient from "@/app/lib/axios/axios";
import Image from "next/image";
import Link from "next/link";

interface Props {
  dataDosen: DosenType[];
}
const Dosen: React.FC<Props> = ({ dataDosen }) => {
  return (
    <div className="w-full bg-blue-900 py-8">
      <h2 className="text-center text-white text-2xl font-bold mb-4">
        DOSEN TEKNIK INFORMATIKA
      </h2>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
          1536: { slidesPerView: 5 },
        }}
      >
        {dataDosen.map((value, index) => (
          <SwiperSlide key={value.id} className="flex flex-col  ">
            <Link
              href={`/dosen/${value.id}`}
              className="w-full  flex justify-center"
            >
              <div className="w-48 h-48 bg-white rounded-full  overflow-hidden mb-4">
                <Image
                  src={value.url_gambar ?? ""}
                  alt={value.nama}
                  className="w-full h-full object-cover"
                  width={300}
                  height={300}
                />
              </div>
            </Link>
            <div className="text-center text-white">
              <h3 className="font-bold">{value.nama}</h3>
              <p>{value.jabatan}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Dosen;
