
export interface IUser {
  _id: string;
  username: string;
  email: string;
  fullName: string;
  friends: string[]; 
  isVerified: boolean;
  createdAt: string; 
  updatedAt: string;
  __v: number;
  refreshToken: string;
}

export interface IPlayerRecord{
  _id: string;
  player: string;
  matchPlayed: number;
  matchWins: number;
  matchLosts:number;
  highestScore:number;
  createdAt: string;
  updatedAt: string;
  __v: number;

}

export interface ApiResponse {
  statusCode?: number;
  success: boolean;
  message: string;
  data?:{
    user?: IUser | IPlayerRecord;
    accessToken?: string;
    refreshToken?: string;
  

  }

}
