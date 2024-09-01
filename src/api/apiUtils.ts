import axios from "axios";
import config from "../envConfig/envConfig";
import { ApiResponse, IAthToken, IUser } from "@/types/ApiResponse";
import { ICreateUserProps, IJwtPayload, ILoginProps, IVerifyEmailCode } from "@/types/apiInterfaces";
import {jwtDecode} from 'jwt-decode';


const createUserAccount = async({
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
    console.log("Backend Service Error :: UserAccount Creation :: ", error);
    return { success: false, message: "Registration failed Please Retry" };
  }
}

const userLogin = async({ identifier, password }: ILoginProps) : Promise<ApiResponse > =>{
  try {
    const result = await axios.post<ApiResponse>(`${config.HOST}/api/v1/u/login`, {
      identifier,
      password,
    }, { withCredentials: true });
    if(result.data.success){
      const { accessToken, refreshToken} = result.data.data as IAthToken;
      saveTokenInLocalStorage(accessToken, refreshToken);
    }
      return result.data;
    
  } catch (error) {
    console.log("Backend Service Error :: Login :: ", error);
    return { success: false, message: "Login Failed Please Retry" };
  }
}

 const verifyEmailCode = async({ username, verificationCode }: IVerifyEmailCode) : Promise<ApiResponse > => {
  try {
    const result = await axios.post<ApiResponse>(`${config.HOST}/api/v1/u/verify-email-code`, {
      username,
      verificationCode,
    }, { withCredentials: true });
    if(result.data.success){
      const { accessToken, refreshToken} = result.data.data as IAthToken;
     saveTokenInLocalStorage(accessToken, refreshToken);

    }
      return result.data;
    
  } catch (error) {
    console.log("Backend Service Error :: Email Verification :: ", error);
    return { success: false, message: "Verification Failed Please Retry" };
  }
}

 const updateAccessToken = async() :Promise<boolean> => {
  try {
    const result = await axios.put<ApiResponse>(`${config.HOST}/api/v1/u/update-access-token`, {} ,{
      withCredentials: true, 
    });

    if(result.data.success){
      const { accessToken, refreshToken} = result.data.data as IAthToken;
     saveTokenInLocalStorage(accessToken, refreshToken);
      return true;
    }
    return false;

  } catch (error) {
    console.log("Appwrite Service Error :: Logout :: ", error);
    return false;
  }
}

const getUserData = async() :Promise<ApiResponse> => {
  try {
    const result = await axios.put<ApiResponse>(`${config.HOST}/api/v1/u/get-user`, {} ,{
      withCredentials: true, 
    });

      return result.data;
    
  } catch (error) {
    console.log("Appwrite Service Error :: Logout :: ", error);
    return {success : false, message : "User Data Fetch Failed"};;
  }
}



const  userLogout = async () => {
  try {
     await axios.post(`${config.HOST}/api/v1/u/logout`, {} ,{
      withCredentials: true, 
    });

  } catch (error) {
    console.log("Appwrite Service Error :: Logout :: ", error);
  }
}




const saveTokenInLocalStorage =(accessToken: string, refreshToken: string)=> {
  const decodedAccessToken = jwtDecode<IJwtPayload>(accessToken);
  const decodedRefreshToken = jwtDecode<IJwtPayload>(refreshToken);
  const accessTokenExpiry = decodedAccessToken.exp;
  const refreshTokenExpiry = decodedRefreshToken.exp;
  localStorage.setItem("accessTokenExpiry", accessTokenExpiry.toString());
  localStorage.setItem("refreshTokenExpiry", refreshTokenExpiry.toString());
}


// const checkAndUpdatedUserAuthAndData =async ()=>{
//   const updated : boolean = await updateAccessToken();
//   if(updated){
//     const result : ApiResponse = await getUserData();
//     if(result.success){
//       // add data to redux user state
//     }
//   }
//   else{
//     /// redirect to login
//   }
// }


export { createUserAccount, userLogin, userLogout, verifyEmailCode ,updateAccessToken, getUserData};
