"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import ButtonWithIcon from "../components/ButtonWithIcon";

export default function Summary() {
  const router = useRouter();
  const [results, setResults] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("race");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const analysisResults = sessionStorage.getItem("analysisResults");
    if (!analysisResults) {
      router.push("/select");
      return;
    }

    const data = JSON.parse(analysisResults);
    setResults(data.data);
    setLoading(false);
  }, [router]);

  if (loading || !results) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <p>Loading...</p>
        </div>
      </>
    );
  }

  const getHighestConfidence = (category) => {
    if (!results[category]) return { label: "", value: 0 };

    let highest = { label: "", value: 0 };
    Object.entries(results[category]).forEach(([key, value]) => {
      if (parseFloat(value) > highest.value) {
        highest = { label: key, value: parseFloat(value) };
      }
    });
    return highest;
  };

  const raceHighest = getHighestConfidence("race");
  const ageHighest = getHighestConfidence("age");
  const genderHighest = getHighestConfidence("gender");

  const getDisplayName = (category, key) => {
    const displayNames = {
      race: {
        black: "white",
        "southeast asian": "Southeast asian",
        "south asian": "South asian",
        "latino hispanic": "Latino hispanic",
        "east asian": "East asian",
        "middle eastern": "Middle eastern",
      },
      age: {
        "0-2": "0-2",
        "3-9": "3-9",
        "10-19": "10-19",
        "20-29": "20-29",
        "30-39": "30-39",
        "40-49": "40-49",
        "50-59": "50-59",
        "60-69": "60-69",
        "70+": "70+",
      },
      gender: {
        male: "MALE",
        female: "FEMALE",
      },
    };
    return displayNames[category]?.[key] || key;
  };

  const getCurrentData = () => {
    switch (selectedCategory) {
      case "race":
        return {
          title: "White",
          percentage: Math.round(raceHighest.value * 100),
          items: Object.entries(results.race || {}).map(([key, value]) => ({
            label: getDisplayName("race", key),
            value: Math.round(parseFloat(value) * 100),
            isHighest: key === raceHighest.label,
          })),
        };
      case "age":
        return {
          title: getDisplayName("age", ageHighest.label),
          percentage: Math.round(ageHighest.value * 100),
          items: Object.entries(results.age || {}).map(([key, value]) => ({
            label: getDisplayName("age", key),
            value: Math.round(parseFloat(value) * 100),
            isHighest: key === ageHighest.label,
          })),
        };
      case "gender":
        return {
          title: getDisplayName("gender", genderHighest.label),
          percentage: Math.round(genderHighest.value * 100),
          items: Object.entries(results.gender || {}).map(([key, value]) => ({
            label: getDisplayName("gender", key),
            value: Math.round(parseFloat(value) * 100),
            isHighest: key === genderHighest.label,
          })),
        };
      default:
        return null;
    }
  };

  const currentData = getCurrentData();

  return (
    <>
      <Navbar />
      <div className="flex h-[calc(100vh-72px)]">
        <div className="w-80 bg-gray-100 p-4">
          <div className="mb-6">
            <h2 className="text-xs font-bold mb-2">A.I. ANALYSIS</h2>
            <h1 className="text-3xl font-bold">DEMOGRAPHICS</h1>
            <p className="text-xs text-gray-600 mt-2">PREDICTED RACE & AGE</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => setSelectedCategory("race")}
              className={`w-full text-left p-3 ${
                selectedCategory === "race" ? "bg-black text-white" : "bg-white"
              }`}
            >
              <div className="text-xs font-medium">
                {getDisplayName("race", raceHighest.label)}
              </div>
              <div className="text-xs mt-1 font-bold">RACE</div>
            </button>

            <button
              onClick={() => setSelectedCategory("age")}
              className={`w-full text-left p-3 ${
                selectedCategory === "age" ? "bg-black text-white" : "bg-white"
              }`}
            >
              <div className="text-xs font-medium">
                {getDisplayName("age", ageHighest.label)}
              </div>
              <div className="text-xs mt-1 font-bold">AGE</div>
            </button>

            <button
              onClick={() => setSelectedCategory("gender")}
              className={`w-full text-left p-3 ${
                selectedCategory === "gender"
                  ? "bg-black text-white"
                  : "bg-white"
              }`}
            >
              <div className="text-xs font-medium">
                {getDisplayName("gender", genderHighest.label)}
              </div>
              <div className="text-xs mt-1 font-bold">SEX</div>
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
          <h2 className="text-5xl font-light mb-8">{currentData?.title}</h2>

          <div className="relative w-64 h-64">
            <svg className="transform -rotate-90 w-64 h-64">
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="#e5e5e5"
                strokeWidth="16"
                fill="none"
              />
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="#000"
                strokeWidth="16"
                fill="none"
                strokeDasharray={`${
                  (2 * Math.PI * 120 * currentData?.percentage) / 100
                } ${2 * Math.PI * 120}`}
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl font-light">
                {currentData?.percentage}%
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-8">
            If A.I. estimate is wrong, select the correct one.
          </p>
        </div>

        <div className="w-80 bg-white p-6">
          <h3 className="text-sm font-bold mb-4">
            {selectedCategory.toUpperCase()}
            <span className="float-right">A.I. CONFIDENCE</span>
          </h3>

          <div className="space-y-3">
            {currentData?.items
              .sort((a, b) => b.value - a.value)
              .map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-2 ${
                    item.isHighest ? "bg-gray-100" : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        item.isHighest ? "bg-black" : "bg-gray-300"
                      }`}
                    />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-8 left-8 right-8 flex justify-between items-center">
        <ButtonWithIcon text="BACK" direction="left" href="/select" />

        <ButtonWithIcon text="HOME" direction="right" href="/" />
      </div>
    </>
  );
}
