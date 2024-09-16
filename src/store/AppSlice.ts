import { TFriend } from "@/types/ApiResponse";
import { createSlice } from "@reduxjs/toolkit";

export interface IAppState {
  friends : TFriend[] | null
}

const initialState: IAppState = {
  friends : null
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setFriends: (state, action) => {
      state.friends = action.payload;
    },
  },
});

 export const { setFriends } = appSlice.actions;
export const appReducer = appSlice.reducer;
