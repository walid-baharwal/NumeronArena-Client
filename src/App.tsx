import { Outlet } from "react-router-dom";
import "./App.css";
import { Toaster } from "./components/ui/toaster";
import { useEffect, useState } from "react";
import { getUserData, updateAccessToken } from "./api/apiUtils";
import { setUser } from "./store/AuthSlice";
import { useTypedDispatch } from "./store/store";
import Loading from "@/components/Loading";

function App() {
  const dispatch = useTypedDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authenticateUser = async () => {
      const updated  = await updateAccessToken();
        if(updated){
          const result  = await getUserData();
          if(result.success){
           dispatch(setUser(result.data));
          }
        }
        setIsLoading(false);
      };
      authenticateUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return   isLoading ? <Loading/>
  
  : (
    <>
      <div>
        <Outlet />
        <Toaster />
      </div>
    </>
  );
}

export default App;
