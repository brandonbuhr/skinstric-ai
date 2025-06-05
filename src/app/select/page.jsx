"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ButtonWithIcon from "../components/ButtonWithIcon";
import Navbar from "../components/Navbar";

export default function Select() {
  const router = useRouter();
  const [results, setResults] = useState(null);

  useEffect(() => {
    const analysisResults = sessionStorage.getItem("analysisResults");
    if (!analysisResults) {
      router.push("/");
      return;
    }

    const data = JSON.parse(analysisResults);
    setResults(data.data);
  }, [router]);

  const handleDemographicsClick = () => {
    router.push("/summary");
  };

  return (
    <>
      <Navbar />
      <div>
        <div className="px-8 py-4">
          <h2 className="text-xl font-bold mb-2">A.I. ANALYSIS</h2>
          <p className="text-sm">A.I. HAS ESTIMATED THE FOLLOWING.</p>
          <p className="text-sm">FIX ESTIMATED INFORMATION IF NEEDED.</p>
        </div>

        <div
          className="flex items-center justify-center"
          style={{ height: "calc(100vh - 300px)" }}
        >
          <div
            className="relative overflow-hidden transform rotate-45"
            style={{ width: "400px", height: "400px" }}
          >
            <button
              onClick={handleDemographicsClick}
              className="absolute top-0 left-0 w-1/2 h-1/2 hover:bg-gray-300 
            transition-colors cursor-pointer flex items-center justify-center"
            >
              <span className="text-sm font-medium transform -rotate-45">
                DEMOGRAPHICS
              </span>
            </button>

            <div
              className="absolute top-0 right-0 w-1/2 h-1/2
            flex items-center justify-center hover:bg-gray-300 cursor-not-allowed"
            >
              <span className="text-center text-sm font-medium leading-tight transform -rotate-45">
                COSMETIC
                <br />
                CONCERNS
              </span>
            </div>

            <div
              className="absolute bottom-0 left-0 w-1/2 h-1/2
            flex items-center justify-center hover:bg-gray-300 cursor-not-allowed"
            >
              <span className="text-center text-sm font-medium leading-tight transform -rotate-45">
                SKIN TYPE
                <br />
                DETAILS
              </span>
            </div>

            <div
              className="absolute bottom-0 right-0 w-1/2 h-1/2
            flex items-center justify-center hover:bg-gray-300 cursor-not-allowed"
            >
              <span className="text-sm font-medium transform -rotate-45">
                WEATHER
              </span>
            </div>
          </div>
        </div>

        <div className="fixed bottom-8 left-8 right-8 flex justify-between items-center">
          <ButtonWithIcon text="BACK" direction="left" href="/result" />
          <ButtonWithIcon
            text="GET SUMMARY"
            direction="right"
            href="/summary"
          />
        </div>
      </div>
    </>
  );
}
