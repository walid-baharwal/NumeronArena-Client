export interface ICreateUserProps {
    username: string;
    email: string;
    fullName: string;
    password: string;
  }

  export interface ILoginProps {
    identifier: string;
    password: string;
  }
  export interface IVerifyEmailCode {
    username: string;
    verificationCode: string;
  }
  export interface IJwtPayload {
    exp: number; 
  }