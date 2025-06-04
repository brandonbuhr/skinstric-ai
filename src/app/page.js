import Navbar from "./components/Navbar";
import ButtonWithIcon from "./components/ButtonWithIcon";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="relative overflow-hidden">
        <div className="absolute w-[602px] h-[602px] left-[-301px] top-[179px] border-dashed border-2 rotate-45 border-[#A0A4AB]"></div>

        <div className="absolute w-[602px] h-[602px] right-[-301px] top-[179px] border-dashed border-2 rotate-45 border-[#A0A4AB]"></div>

        <div className="absolute left-[32px] top-1/2 -translate-y-1/2">
          <ButtonWithIcon text="DISCOVER A.I." direction="left" />
        </div>

        <div className="absolute right-[2px] top-1/2 -translate-y-1/2">
          <ButtonWithIcon text="TAKE TEST" direction="right" href="/testing" />
        </div>

        <div className="flex flex-col items-center justify-center h-[calc(100vh-72px)]">
          <h1 className="text-[60px] text-center">Sophisticated</h1>
          <h1 className="text-[60px] text-center">skincare</h1>
        </div>
      </div>
      <div className="absolute bottom-0 left-16 p-4">
        <p>SKINSTRIC DEVELOPED AN A.I.</p>
        <p>HIGHLY-PERSONALIZED ROUTINE TAILORED TO</p>
        <p>WHAT YOUR SKIN NEEDS</p>
      </div>
    </>
  );
}
