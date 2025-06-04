"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const slides = [
  {
    id: 1,
    title: "Heartleaf My Type Calming Cream",
    img: "https://cdn.shopify.com/s/files/1/1074/9876/files/axis-y-heartleaf-my-type-calming-cream-main-2_1024x1024_1080x_dbed1972-a0ba-4fa9-b809-57769b2bed53.webp?v=1729034961",
    url: "/",
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50"
  },
  {
    id: 2,
    title: "Daily Purifying Treatment Toner",
    img: "https://glowtime.mu/wp-content/uploads/2022/03/axis-y-daily-purifying-treatment-toner.png",
    url: "/",
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50"
  },
  {
    id: 3,
    title: "Dark Spot Correcting Glow Cream",
    img: "https://www.axis-y.com/cdn/shop/files/Glow_Cream.png?v=1730435480",
    url: "/",
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50"
  }
];

const Slider = () => {

  const [current, setCurrent] = useState(0);

  return (
    <div className="h-[calc(100vh-80px)] overflow-hidden">
      <div
        className="w-max h-full flex transition-all ease-in-out duration-1000"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide) => (
          <div
            className={`${slide.bg} w-screen h-full flex flex-col gap-16 xl:flex-row`}
            key={slide.id}
          >

            {/* text left */}
            <div className="w-1/2 xl:h-full flex flex-col items-center justify-center gap-8 2xl:gap-12 text-center">
             
              <h1 className="text-5xl font-semibold">
                {slide.title}
              </h1>
              <Link href={slide.url}>
                <button className="rounded-full bg-gray-400 text-white py-2 px-4 hover:bg-gray-500">
                  Худалдан авах
                </button>
              </Link>
            </div>

            {/* img right */}
            <div className="w-1/2 h-full relative flex items-center justify-center">
              <Image
                src={slide.img}
                alt=""
                fill
                sizes="100%"
                className="object-contain"
              />
            </div>

          </div>
        ))}
      </div>
      <div className="absolute m-auto left-1/2 bottom-8 flex gap-4">
        
        {slides.map((slide, index) => (
          <div
            className={`w-2 h-2  rounded-full ring-1 ring-gray-400 cursor-pointer flex justify-center ${
              current === index ? "scale-125" : ""
            }`}
            key={slide.id}
            onClick={() => setCurrent(index)}
          >
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;