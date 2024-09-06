import { Loader2 } from "lucide-react";
import React from "react";
import BlurIn from "./magicui/blur-in";

const Loading = () => {
  return (
    <div className="flex  items-center justify-center h-screen w-screen bg-gradient-to-tr from-[#500000] to-[#0a0a0a]">
           <div className="w-full z-10 absolute h-full md:flex md:items-center md:justify-center  hidden">
                        <BlurIn
                    word="Numeron Arena"
                    className="bg-clip-text h-72 translate-y-10 text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20 font-bold px-4 pointer-events-none text-5xl text-center md:text-[100px] lg:text-[130px] xl:text-[150px] 2xl:text-[200px] animate-pulse duration-1000" 
                    />
      </div>
    </div>
  );
};

export default Loading;
