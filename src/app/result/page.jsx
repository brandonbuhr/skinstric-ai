"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ButtonWithIcon from "../components/ButtonWithIcon";
import Navbar from "../components/Navbar";

export default function Result() {
  const router = useRouter();

  const handleFaceScan = () => {
    router.push("/camera");
  };

  const handleGalleryAccess = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64String = reader.result.split(",")[1];

          sessionStorage.setItem("capturedImage", base64String);

          router.push("/processing");
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <>
      <Navbar />
      <p className="ml-8 font-bold">TO START ANALYSIS</p>

      <div className="flex items-center justify-center h-[calc(100vh-100px)] gap-80 xl:gap-140 lg:gap-100 flex-col xl:flex-row lg:flex-row md:flex-row sm:flex-col">
        <button
          onClick={handleFaceScan}
          className="relative flex flex-col items-center gap-4"
        >
          <div className="relative">
            <Image
              src="/camera.png"
              alt="Camera icon"
              width={136}
              height={136}
              className="hover:cursor-pointer hover:scale-105 transition-transform duration-300"
            />

            <div className="absolute -top-5 -right-[60px] w-[66px] h-[59px]">
              <svg
                className="absolute top-1 left-0"
                width="62"
                height="55"
                viewBox="0 0 62 55"
              >
                <path
                  d="M 0 55 L 62 0"
                  stroke="#1A1B1C"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>
              <div className="absolute top-0 right-0 w-[5px] h-[5px] border border-[#1A1B1C] rounded-full bg-white"></div>
            </div>

            <p className="absolute -top-14 -right-[130px] text-xs text-center uppercase whitespace-nowrap">
              <span className="block">Allow A.I.</span>
              <span className="block">to scan your face</span>
            </p>
          </div>
        </button>

        <button
          onClick={handleGalleryAccess}
          className="relative flex flex-col items-center gap-4"
        >
          <div className="relative">
            <Image
              src="/gallery.png"
              alt="Gallery icon"
              width={136}
              height={136}
              className="hover:cursor-pointer hover:scale-105 transition-transform duration-300"
            />

            <div className="absolute -bottom-5 -left-[70px] w-[66px] h-[59px]">
              <svg
                className="absolute bottom-1 right-0"
                width="62"
                height="55"
                viewBox="0 0 62 55"
              >
                <path
                  d="M 62 0 L 0 55"
                  stroke="#1A1B1C"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>
              <div className="absolute bottom-0 left-0 w-[5px] h-[5px] border border-[#1A1B1C] rounded-full bg-white"></div>
            </div>

            <p className="absolute -bottom-12 -left-[150px] text-xs text-center uppercase whitespace-nowrap">
              <span className="block">Allow A.I.</span>
              <span className="block">access gallery</span>
            </p>
          </div>
        </button>
      </div>

      <div className="absolute left-[32px] bottom-[32px]">
        <ButtonWithIcon text="BACK" direction="left" href="/testing" />
      </div>
    </>
  );
}
