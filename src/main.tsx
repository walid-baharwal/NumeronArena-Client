import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import Protected from "./components/ProtectedRoute.js";
import { ThemeProvider } from "@/components/theme-provider"
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Auth from "./pages/Auth.tsx";
import Signup from "./pages/SignUp.tsx";
import SignIn from "./pages/SignIn.tsx";
import VerifyEmail from "./pages/VerifyEmail.tsx";
import Home from "./pages/Home.tsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<App />}>
      <Route
        path=""
        element={
            <Home />
        }
      />
    
      <Route
        path="profile"
        element={
          <Protected authentication>
            {/* <Profile /> */}
          </Protected>
        }
      />
      {/* <Route
        path="github"
        loader={async ({ params }) => {
          return fetch(`https://api.github.com/users/walid-baharwal`).then(
            (response) => response.json()
          );
        }}
        element={<Blog/>}
      /> */}
    </Route>
    <Route path="/auth" element={<Auth/>}>
    <Route
      
          element={<Navigate to="signin" replace />}
        />

      <Route
      path="signin"
      element={
        <Protected authentication={false}>
          <SignIn/>
        </Protected>
      }
    />
    <Route
      path="signup"
      element={
        <Protected authentication={false}>
          <Signup />
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
    </>
  )
);



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <RouterProvider router={router} />
    </ThemeProvider>
    </Provider>
  </StrictMode>
);
