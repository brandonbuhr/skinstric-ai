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

      <div className="flex items-center justify-center h-[calc(100vh-72px)] gap-32">
        <button
          onClick={handleFaceScan}
          className="flex flex-col items-center gap-4"
        >
          <Image src="/camera.png" alt="Camera icon" width={136} height={136} />
          <p className="text-xs text-center max-w-[150px] uppercase">
            Allow A.I. to scan your face
          </p>
        </button>

        <button
          onClick={handleGalleryAccess}
          className="flex flex-col items-center gap-4"
        >
          <Image
            src="/gallery.png"
            alt="Gallery icon"
            width={136}
            height={136}
          />
          <p className="text-xs text-center max-w-[150px] uppercase">
            Allow A.I. access gallery
          </p>
        </button>
      </div>

      <div className="absolute left-[32px] bottom-[32px]">
        <ButtonWithIcon text="BACK" direction="left" href="/testing" />
      </div>
    </>
  );
}
