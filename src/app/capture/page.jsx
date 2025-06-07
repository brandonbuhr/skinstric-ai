"use client";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import ButtonWithIcon from "../components/ButtonWithIcon";

export default function Capture() {
  const router = useRouter();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "user" } })
      .then((stream) => {
        setStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Error accessing camera:", err);
        router.push("/result");
      });
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0);

      const dataUrl = canvas.toDataURL("image/jpeg");
      setCapturedImage(dataUrl);

      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    startCamera();
  };

  const usePhoto = () => {
    if (capturedImage) {
      const base64String = capturedImage.split(",")[1];
      sessionStorage.setItem("capturedImage", base64String);
      router.push("/processing");
    }
  };

  return (
    <>
      <Navbar />
      <div className="relative h-[calc(100vh-72px)]">
        {!capturedImage ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={capturedImage}
            alt="Captured"
            className="w-full h-full object-cover"
          />
        )}

        <canvas ref={canvasRef} className="hidden" />

        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          {!capturedImage ? (
            <button
              onClick={capturePhoto}
              className="bg-white rounded-full w-20 h-20 border-4 border-gray-300 hover:border-gray-400 transition-colors"
              aria-label="Capture photo"
            >
              <div className="w-16 h-16 bg-white rounded-full mx-auto" />
            </button>
          ) : (
            <div className="flex gap-4">
              <button
                onClick={retakePhoto}
                className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                RETAKE
              </button>
              <button
                onClick={usePhoto}
                className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                USE PHOTO
              </button>
            </div>
          )}
        </div>

        <div className="absolute left-[32px] bottom-[48px]">
          <ButtonWithIcon text="BACK" direction="left" href="/result" />
        </div>
      </div>
    </>
  );
}
