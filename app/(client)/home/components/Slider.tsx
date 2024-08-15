import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Slider = () => {
  const router = useRouter();
  const sliderRef = useRef<HTMLDivElement>(null);

  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    {
      title: "Slide 1",
      description: "Deskripsi Slide 1",
      imageUrl: "https://via.placeholder.com/1920x1080",
    },
    {
      title: "Slide 2",
      description: "Deskripsi Slide 2",
      imageUrl: "https://via.placeholder.com/1920x1080",
    },
    {
      title: "Slide 3",
      description: "Deskripsi Slide 3",
      imageUrl: "https://via.placeholder.com/1920x1080",
    },
  ];

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
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const handleSlidePrev = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative overflow-hidden w-full h-screen">
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4">
        <button
          onClick={handleSlidePrev}
          className="bg-gray-500 hover:bg-gray-600 px-3 py-2 rounded-md text-white"
        >
          Prev
        </button>
        <button
          onClick={handleSlideNext}
          className="bg-gray-500 hover:bg-gray-600 px-3 py-2 rounded-md text-white"
        >
          Next
        </button>
      </div>

      <motion.div
        ref={sliderRef}
        className="relative flex transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${activeSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-full h-screen flex-shrink-0 flex flex-col items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.imageUrl})` }}
          >
            <div className="bg-white bg-opacity-50 rounded-md p-4 text-center">
              <h2 className="text-3xl font-bold">{slide.title}</h2>
              <p className="text-gray-700">{slide.description}</p>
            </div>
          </div>
        ))}
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center p-4 space-x-2">
        {slides.map((_, index) => (
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

export default Slider;
