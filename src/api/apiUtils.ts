import axios from "axios";
import config from "../envConfig/envConfig";
import { ApiResponse } from "@/types/ApiResponse";
import { createUserProps, LoginProps } from "@/types/apiInterfaces";



async function createUserAccount({
  username,
  email,
  fullName,
  password,
}: createUserProps): Promise<ApiResponse> {
  try {
    // console.log({ username, email, password })
    const result = await axios.post<ApiResponse>(`${config.HOST}/api/v1/u/register`, {
      username,
      email,
      fullName,
      password,
    });
    return result.data; 
    
  } catch (error) {
    console.log("Backend Service Error :: UserAccount Creation :: ", error);
    return { success: false, message: "Registration failed Please Retry" };
  }
}

async function Login({ identifier, password }: LoginProps) : Promise<ApiResponse > {
  try {
    const result = await axios.post<ApiResponse>(`${config.HOST}/api/v1/u/login`, {
      identifier,
      password,
    });
      return result.data;
    
  } catch (error) {
    console.log("Appwrite Service Error :: Login :: ", error);
    return { success: false, message: "Login Failed Please Retry" };
  }
}


async function Logout() {
  try {
     await axios.post(`${config.HOST}/api/v1/u/logout`, {} ,{
      withCredentials: true, 
    });

  } catch (error) {
    console.log("Appwrite Service Error :: Logout :: ", error);
  }
}

export { createUserAccount, Login, Logout };
