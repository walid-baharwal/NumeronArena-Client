import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { updateAccessToken } from "@/api/apiUtils";

const useAccessTokenCheck = () => {
  const navigate = useNavigate();

  const isAccessTokenExpired = (): boolean => {
    try {
      const accessTokenExpiry = localStorage.getItem("accessTokenExpiry");
      if (!accessTokenExpiry) return true;

      const currentTime = Math.floor(Date.now() / 1000);
      const oneHourInSeconds = 3600;
      const timeRemaining = parseInt(accessTokenExpiry) - currentTime;

      return timeRemaining <= oneHourInSeconds || currentTime > parseInt(accessTokenExpiry);
    } catch (error) {
      console.error("Error checking access token expiry:", error);
      return true;
    }
  };

  const ifAccessTokenExpired = async () => {
    if (isAccessTokenExpired()) {
      const tokenUpdated = await updateAccessToken();
      if (!tokenUpdated) {
        navigate("/auth/signin");
      }
    }
  };

  useEffect(() => {
    ifAccessTokenExpired();
  }, []);
};

export default useAccessTokenCheck;
