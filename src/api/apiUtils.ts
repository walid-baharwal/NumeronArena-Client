import axios from "axios";
import config from "../envConfig/envConfig";
import { ApiResponse, IAuthToken } from "@/types/ApiResponse";
import {
  ICreateUserProps,
  IJwtPayload,
  ILoginProps,
  IResetPasswordProps,
  IUpdatePasswordProps,
  IUpdateUserCareerProps,
  IVerifyEmailCodeProps,
} from "@/types/apiInterfaces";
import { jwtDecode } from "jwt-decode";
import { AxiosError } from "axios";

const createUserAccount = async ({
  username,
  email,
  fullName,
  password,
}: ICreateUserProps): Promise<ApiResponse> => {
  try {
    const result = await axios.post<ApiResponse>(`${config.HOST}/api/v1/u/register`, {
      username,
      email,
      fullName,
      password,
    });
    return result.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;
    console.log("Backend Service Error :: UserAccount Creation :: ", error);
    return {
      success: false,
      message: axiosError.response?.data.message || "Registration failed Please Retry",
    };
  }
};

const userLogin = async ({ identifier, password }: ILoginProps): Promise<ApiResponse> => {
  try {
    const result = await axios.post<ApiResponse>(
      `${config.HOST}/api/v1/u/login`,
      {
        identifier,
        password,
      },
      { withCredentials: true }
    );
    if (result.data.statusCode != 203) {
      const { accessToken, refreshToken } = result.data.data as IAuthToken;
      saveTokenInLocalStorage(accessToken, refreshToken);
    }
    return result.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;
    console.log("Backend Service Error :: Login :: ", error);
    return {
      success: false,
      message: axiosError.response?.data.message || "Sign in Failed Please Retry",
    };
  }
};

const verifyEmailCode = async ({
  username,
  verificationCode,
}: IVerifyEmailCodeProps): Promise<ApiResponse> => {
  try {
    const result = await axios.post<ApiResponse>(
      `${config.HOST}/api/v1/u/verify-email-code`,
      {
        username,
        verificationCode,
      },
      { withCredentials: true }
    );
    if (result.data.success) {
      const { accessToken, refreshToken } = result.data.data as IAuthToken;
      saveTokenInLocalStorage(accessToken, refreshToken);
    }
    return result.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;
    console.log("Backend Service Error :: Email Verification :: ", error);
    return {
      success: false,
      message:
        axiosError.response?.data.message || "Please check your network connection & Please Retry",
    };
  }
};

const updateAccessToken = async (): Promise<boolean> => {
  try {
    const result = await axios.put<ApiResponse>(
      `${config.HOST}/api/v1/u/update-access-token`,
      {},
      {
        withCredentials: true,
      }
    );

    if (result.data.success) {
      const { accessToken, refreshToken } = result.data.data as IAuthToken;
      saveTokenInLocalStorage(accessToken, refreshToken);
      return true;
    }
    return false;
  } catch (error) {
    console.log("Backend Service Error :: updating access token :: ", error);
    return false;
  }
};

const getUserData = async (): Promise<ApiResponse> => {
  try {
    const result = await axios.post<ApiResponse>(
      `${config.HOST}/api/v1/u/get-user`,
      {},
      {
        withCredentials: true,
      }
    );

    return result.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;
    console.log("Backend Service Error :: get User data :: ", error);
    return {
      success: false,
      message: axiosError.response?.data.message || "Failed to get user data. Please try again.",
    };
  }
};

const userLogout = async () => {
  try {
    await axios.post(
      `${config.HOST}/api/v1/u/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    localStorage.removeItem("aTExP_183");
    localStorage.removeItem("rTExP_487");
  } catch (error) {
    console.log("Backend Service Error :: Logout :: ", error);
  }
};

const updateUserPassword = async ({
  oldPassword,
  newPassword,
}: IUpdatePasswordProps): Promise<ApiResponse> => {
  // check access token expiry
  try {
    const result = await axios.put<ApiResponse>(
      `${config.HOST}/api/v1/u/update-user-password`,
      { oldPassword, newPassword },
      {
        withCredentials: true,
      }
    );
    return result.data;
  } catch (error) {
    console.log("Backend Service Error :: Update User Password :: ", error);
    return { success: false, message: "Failed to update passowrd. Please try again." };
  }
};

const updateUserAvatar = async (file: File): Promise<ApiResponse> => {
  // check access token expiry
  try {
    const formData = new FormData();
    formData.append("image", file);

    const result = await axios.put<ApiResponse>(
      `${config.HOST}/api/v1/u/update-user-avatar`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return result.data;
  } catch (error) {
    console.log("Backend Service Error :: Update User Avatar :: ", error);
    return { success: false, message: "Failed to update avatar. Please try again." };
  }
};

const sendForgetPasswordEmail = async (email: string): Promise<ApiResponse> => {
  try {
    const result = await axios.post<ApiResponse>(
      `${config.HOST}/api/v1/u/forget-password-email/${email}`
    );
    return result.data;
  } catch (error) {
    console.log("Backend Service Error :: password reset email  :: ", error);
    return { success: false, message: "Failed to send reset passowrd email. Please try again." };
  }
};

const isUsernameUnique = async (username: string): Promise<ApiResponse> => {
  try {
    const result = await axios.post<ApiResponse>(
      `${config.HOST}/api/v1/u/is-username-unique/${username}`
    );
    return result.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;
    console.log("Backend Service Error :: checking unique username  :: ", error);
    return {
      success: false,
      message:
        axiosError.response?.data.message || "Failed to check unique username. Please try again.",
    };
  }
};

const resetUserPassword = async ({
  passwordResetToken,
  newPassword,
}: IResetPasswordProps): Promise<ApiResponse> => {
  try {
    const result = await axios.post<ApiResponse>(`${config.HOST}/api/v1/u/foget-password-email`, {
      passwordResetToken,
      newPassword,
    });
    return result.data;
  } catch (error) {
    console.log("Backend Service Error :: password reseting  :: ", error);
    return { success: false, message: "Failed to reset passowrd. Please try again." };
  }
};

const updateUserCareerRecord = async ({
  score,
  isMatchWin,
}: IUpdateUserCareerProps): Promise<ApiResponse> => {
  // check access token expiry
  try {
    const result = await axios.put<ApiResponse>(
      `${config.HOST}/api/v1/u/update-career-record`,
      {
        score,
        isMatchWin,
      },
      {
        withCredentials: true,
      }
    );
    return result.data;
  } catch (error) {
    console.log("Backend Service Error :: update user record  :: ", error);
    return { success: false, message: "Failed to update user record. Please try again." };
  }
};

const getUserCareerRecord = async (): Promise<ApiResponse> => {
  // check access token expiry
  try {
    const result = await axios.post<ApiResponse>(
      `${config.HOST}/api/v1/u/get-career-record`,
      {},
      {
        withCredentials: true,
      }
    );
    return result.data;
  } catch (error) {
    console.log("Backend Service Error :: update user record  :: ", error);
    return { success: false, message: "Failed to update user record. Please try again." };
  }
};

const saveTokenInLocalStorage = (accessToken: string, refreshToken: string) => {
  const decodedAccessToken = jwtDecode<IJwtPayload>(accessToken);
  const decodedRefreshToken = jwtDecode<IJwtPayload>(refreshToken);
  const accessTokenExpiry = decodedAccessToken.exp;
  const refreshTokenExpiry = decodedRefreshToken.exp;
  localStorage.setItem("aTExP_183", accessTokenExpiry.toString());
  localStorage.setItem("rTExP_487", refreshTokenExpiry.toString());
};

export {
  createUserAccount,
  userLogin,
  userLogout,
  verifyEmailCode,
  updateAccessToken,
  getUserData,
  updateUserPassword,
  updateUserAvatar,
  sendForgetPasswordEmail,
  resetUserPassword,
  updateUserCareerRecord,
  getUserCareerRecord,
  isUsernameUnique,
};
