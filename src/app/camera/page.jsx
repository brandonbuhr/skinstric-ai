"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import ButtonWithIcon from "../components/ButtonWithIcon";

export default function Camera() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => {
        setIsReady(true);

        setTimeout(() => {
          router.push("/capture");
        }, 1000);
      })
      .catch((err) => {
        console.error("Camera permission denied:", err);
        alert("Camera permission is required to proceed");
      });
  }, [router]);

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-[calc(100vh-72px)]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">CONFIGURING CAMERA</h2>
          {isReady ? (
            <p className="text-lg">Camera ready! Redirecting...</p>
          ) : (
            <p className="text-lg">Please allow camera access</p>
          )}
        </div>
      </div>

      <div className="absolute left-[32px] bottom-[32px]">
        <ButtonWithIcon text="BACK" direction="left" href="/" />
      </div>
    </>
  );
}
