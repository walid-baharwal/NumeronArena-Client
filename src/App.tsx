import { Outlet } from "react-router-dom";
import "./App.css";
import { Toaster } from "./components/ui/toaster";
import { useEffect, useState } from "react";
import { getUserData, updateAccessToken } from "./api/apiUtils";
import { setUser } from "./store/AuthSlice";
import { useTypedDispatch } from "./store/store";
import { Header } from "./components/Header";
import { BackgroundGradientAnimation } from "./components/ui/background-gradient-animation";
import BlurIn from "./components/magicui/blur-in";
import { Loading } from "./components";

function App() {
  const dispatch = useTypedDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authenticateUser = async () => {
      const updated = await updateAccessToken();
      if (updated) {
        const result = await getUserData();
        if (result.success) {
          dispatch(setUser(result.data));
        }
      }
      setIsLoading(false);
    };
    authenticateUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <BackgroundGradientAnimation>
        <div className="w-full absolute h-full md:flex md:items-center md:justify-center">
          <BlurIn
            word="NUMERON ARENA"
            className="bg-clip-text h-72 mt-[70%] md:mt-0 md:translate-y-[15%]   ltext-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20  font-bold px-4 pointer-events-none text-[75px] text-center  md:text-[90px] lg:text-[110px] xl:text-[140px] min-[1680px]:text-[190px]"
          />
        </div>
        <div className="absolute z-50 h-screen w-full  overflow-hidden">
          <Header />
          <Outlet />
          <Toaster />
        </div>
      </BackgroundGradientAnimation>
    </>
  );
}

export default App;
