import App from "@/App";
import { ErrorElement, Protected } from "@/components";
import { Auth, Home, NotFoundPage, PlayWithBot, SignIn, SignUp, VerifyEmail } from "@/pages";

import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} errorElement={<ErrorElement />}>
        <Route path="" element={<Home />} />
        <Route
          path="profile"
          element={<Protected authentication>{/* Profile Page here */}</Protected>}
        />
        <Route
          path="settings"
          element={<Protected authentication>{/*settings page here */}</Protected>}
        />
        <Route path="1v1-bot" element={<PlayWithBot />} />
      </Route>
      {/* Authentication routes */}
      <Route path="/auth" element={<Auth />} errorElement={<ErrorElement />}>
        <Route element={<Navigate to="signin" replace />} />
        <Route
          path="signin"
          element={
            <Protected authentication={false}>
              <SignIn />
            </Protected>
          }
        />
        <Route
          path="signup"
          element={
            <Protected authentication={false}>
              <SignUp />
            </Protected>
          }
        />
        <Route
          path="verify/:username"
          element={
            <Protected authentication={false}>
              <VerifyEmail />
            </Protected>
          }
        />
      </Route>
      {/* 404 Route */}
      <Route path="*" element={<NotFoundPage />} />
    </>
  )
);

export default router;
