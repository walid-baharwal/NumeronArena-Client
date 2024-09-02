import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

export interface IAppState {
  data : null
}

const initialState: IAppState = {
  data : null
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
  },
});

// export const {  } = appSlice.actions;
export const appReducer = appSlice.reducer;
