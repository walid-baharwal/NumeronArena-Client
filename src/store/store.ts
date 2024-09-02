import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { appReducer } from "./AppSlice";
import { authReducer } from "./AuthSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
