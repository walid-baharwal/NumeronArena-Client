import { Outlet } from "react-router-dom";

// import { LampDemo } from "@/components/ui/lamp";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import BlurIn from "@/components/magicui/blur-in";
import { Toaster } from "@/components/ui/toaster";

const Auth = () => {
  return (
    <BackgroundGradientAnimation>
      <div className="w-full absolute h-full md:flex md:items-center md:justify-center translate-y-[5%]  hidden">
        <BlurIn
          word="Numeron Arena"
          className="bg-clip-text h-72   ltext-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20  font-bold px-4 pointer-events-none text-5xl text-center md:text-[100px] lg:text-[130px] xl:text-[150px] 2xl:text-[200px]"
        />
      </div>
      <div className="absolute z-50 h-screen w-screen inset-0 ">
        <Toaster />
        <Outlet />
      </div>
    </BackgroundGradientAnimation>
  );
};

export default Auth;
