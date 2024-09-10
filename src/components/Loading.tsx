import BlurIn from "./magicui/blur-in";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-tr from-[#500000] to-[#0a0a0a]">
      <div className="w-full z-10 absolute h-full flex items-center justify-center  ">
        <BlurIn
          word="Numeron Arena"
          className="bg-clip-text h-72 translate-y-[30%] md:translate-y-[15%] text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20 font-bold px-4 pointer-events-none text-[75px] text-center  md:text-[90px] lg:text-[110px] xl:text-[140px] min-[1680px]:text-[190px] animate-pulse duration-1000"
        />
      </div>
    </div>
  );
};

export default Loading;
