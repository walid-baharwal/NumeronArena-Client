import { IUser } from "@/types/ApiResponse";
import { createSlice } from "@reduxjs/toolkit";

interface IInitialState{
  userData: IUser | null;
  status :boolean;
}

const initialState :IInitialState = {
  userData: null,
  status: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
    },
    onLogout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

export const { setUser,onLogout } = authSlice.actions;
export const authReducer = authSlice.reducer;
