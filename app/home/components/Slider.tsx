// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";
// import { Pengumuman } from "@prisma/client";
// import apiClient from "@/app/lib/axios/axios";

// const Slider = () => {
//   const router = useRouter();
//   const sliderRef = useRef<HTMLDivElement>(null);
//   const [dataPengumuman, setDataPengumuman] = useState<Pengumuman[]>([]);

//   const [activeSlide, setActiveSlide] = useState(0);
//   const slides = [
//     {
//       title: "Slide 1",
//       description: "Deskripsi Slide 1",
//       imageUrl: "https://via.placeholder.com/1920x1080",
//     },
//     {
//       title: "Slide 2",
//       description: "Deskripsi Slide 2",
//       imageUrl: "https://via.placeholder.com/1920x1080",
//     },
//     {
//       title: "Slide 3",
//       description: "Deskripsi Slide 3",
//       imageUrl: "https://via.placeholder.com/1920x1080",
//     },
//   ];

//   const getDataPengumuman = async () => {
//     try {
//       const result = await apiClient.get("/api/pengumuman");
//       const data = result.data;
//       setDataPengumuman(data);
//     } catch (error) {
//       console.log("error get data : ", error);
//     }
//   };
//   useEffect(() => {
//     const interval = setInterval(() => {
//       handleSlideNext();
//     }, 5000); // 5 detik

//     return () => clearInterval(interval); // Bersihkan interval saat komponen dihapus
//   }, [activeSlide]);

//   useEffect(() => {
//     getDataPengumuman();
//   }, []);

//   const handleSlideChange = (index: number) => {
//     setActiveSlide(index);
//   };

//   const handleSlideNext = () => {
//     setActiveSlide((prev) => (prev + 1) % slides.length);
//   };

//   const handleSlidePrev = () => {
//     setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
//   };

//   return (
//     <div className="relative overflow-hidden w-full h-screen">
//       <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4">
//         <button
//           onClick={handleSlidePrev}
//           className="bg-gray-500 hover:bg-gray-600 px-3 py-2 rounded-md text-white"
//         >
//           Prev
//         </button>
//         <button
//           onClick={handleSlideNext}
//           className="bg-gray-500 hover:bg-gray-600 px-3 py-2 rounded-md text-white"
//         >
//           Next
//         </button>
//       </div>

//       <motion.div
//         ref={sliderRef}
//         className="relative flex transition-transform duration-1000 ease-in-out"
//         style={{ transform: `translateX(-${activeSlide * 100}%)` }}
//       >
//         {dataPengumuman.map((value, index) => (
//           <div
//             key={value.id}
//             className="w-full h-screen flex-shrink-0 flex flex-col items-center justify-center bg-cover bg-center"
//             style={{ backgroundImage: `url(${value.url_gambar})` }}
//           >
//             <div className="bg-white bg-opacity-50 rounded-md p-4 text-center">
//               <h2 className="text-3xl font-bold">{value.judul}</h2>
//               <p className="text-gray-700">{value.text}</p>
//             </div>
//           </div>
//         ))}
//       </motion.div>

//       <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center p-4 space-x-2">
//         {slides.map((_, index) => (
//           <div
//             key={index}
//             className={`w-4 h-4 rounded-full cursor-pointer ${
//               activeSlide === index ? "bg-blue-500" : "bg-gray-500"
//             }`}
//             onClick={() => handleSlideChange(index)}
//           ></div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Slider;
