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
  export interface IVerifyEmailCodeProps {
    username: string;
    verificationCode: string;
  }

  export interface IUpdatePasswordProps {
    oldPassword: string;
    newPassword: string;
  }

  export interface IResetPasswordProps {
    passwordResetToken: string;
    newPassword: string;
  }

  export interface IUpdateUserCareerProps {
    score: number;
    isMatchWin: boolean;
  }


  export interface IJwtPayload {
    exp: number; 
  }