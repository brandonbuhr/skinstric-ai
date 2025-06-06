"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import ButtonWithIcon from "./components/ButtonWithIcon";

export default function Home() {
  const [hoveredButton, setHoveredButton] = useState(null);
  const router = useRouter();

  return (
    <>
      <Navbar />

      <div className="relative overflow-hidden hidden xl:block">
        <div
          className={`absolute w-[500px] h-[500px] left-[-301px] top-[188px] border-dashed border-2 rotate-45 border-[#A0A4AB] transition-opacity duration-300 ${
            hoveredButton === "right" ? "opacity-0" : "opacity-100"
          }`}
        ></div>

        <div
          className={`absolute w-[500px] h-[500px] right-[-301px] top-[188px] border-dashed border-2 rotate-45 border-[#A0A4AB] transition-opacity duration-300 ${
            hoveredButton === "left" ? "opacity-0" : "opacity-100"
          }`}
        ></div>

        <div
          className={`flex flex-col items-center justify-center h-[calc(100vh-72px)] transition-transform duration-500 ease-out ${
            hoveredButton === "left"
              ? "translate-x-[200px]"
              : hoveredButton === "right"
              ? "-translate-x-[200px]"
              : ""
          }`}
        >
          <h1 className="text-[60px] text-center">Sophisticated</h1>
          <h1 className="text-[60px] text-center">skincare</h1>
        </div>

        <div
          className={`absolute left-[32px] top-1/2 -translate-y-1/2 z-50 transition-opacity duration-300 ${
            hoveredButton === "right"
              ? "opacity-0 pointer-events-none"
              : "opacity-100"
          }`}
          onMouseEnter={() => setHoveredButton("left")}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <ButtonWithIcon text="DISCOVER A.I." direction="left" />
        </div>

        <div
          className={`absolute right-[2px] top-1/2 -translate-y-1/2 z-50 transition-opacity duration-300 ${
            hoveredButton === "left"
              ? "opacity-0 pointer-events-none"
              : "opacity-100"
          }`}
          onMouseEnter={() => setHoveredButton("right")}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <ButtonWithIcon text="TAKE TEST" direction="right" href="/testing" />
        </div>
      </div>

      <div className="relative flex items-center justify-center h-[calc(100vh-72px)] xl:hidden">
        <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px]">
          <div className="absolute inset-0 border-2 border-[#A0A4AB] border-dashed rotate-45"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <h1 className="text-[40px] sm:text-[50px] leading-tight mb-6">
              Sophisticated
              <br />
              skincare
            </h1>
            <p className="text-sm text-gray-600 mb-8 max-w-[250px]">
              Skinstric developed an A.I. that creates a highly-personalized
              routine tailored to what your skin needs.
            </p>

            <button
              onClick={() => router.push("/testing")}
              className="flex items-center gap-2 uppercase text-xs tracking-wider cursor-pointer hover:scale-[1.1] transition-transform duration-300"
            >
              <span className="font-bold">ENTER EXPERIENCE</span>
              <div className="relative w-[20px] h-[20px]">
                <div className="absolute inset-0 border border-black rotate-45"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    viewBox="0 0 10 10"
                    className="w-[6px] h-[6px] fill-black"
                  >
                    <polygon points="0,0 10,5 0,10" />
                  </svg>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-16 p-4 hidden md:block">
        <p>SKINSTRIC DEVELOPED AN A.I.</p>
        <p>HIGHLY-PERSONALIZED ROUTINE TAILORED TO</p>
        <p>WHAT YOUR SKIN NEEDS</p>
      </div>
    </>
  );
}
