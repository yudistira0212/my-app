// components/FacultySlider.tsx

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

const facultyMembers = [
  {
    name: "CHRISTIAN DWI SUHERNDRA, S.T., M.Cs.",
    position: "KAPRODI S1 INFORMATIKA",
    imageUrl: "path/to/image1.jpg",
  },
  {
    name: "LEON FERDINAND MARBUN, S.T., M.T.",
    position: "KAPRODI D3 KOMPUTER",
    imageUrl: "path/to/image2.jpg",
  },
  {
    name: "RINTA LUTA, S.T., M.T.",
    position: "KAJUR TEKNIK INFORMATIKA",
    imageUrl: "path/to/image3.jpg",
  },
  {
    name: "PROF. DEDI IRFAN, S.T., M.T., Ph.D",
    position: "DOSEN DI FT",
    imageUrl: "path/to/image4.jpg",
  },
  {
    name: "FIKRULIN FADHLI KOM, M.Sc.",
    position: "DOSEN",
    imageUrl: "path/to/image5.jpg",
  },
];

const Dosen = () => {
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
        {facultyMembers.map((member, index) => (
          <SwiperSlide key={index} className="flex flex-col  ">
            <div className="w-full  flex justify-center">
              <div className="w-48 h-48 bg-white rounded-full  overflow-hidden mb-4">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="text-center text-white">
              <h3 className="font-bold">{member.name}</h3>
              <p>{member.position}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Dosen;
