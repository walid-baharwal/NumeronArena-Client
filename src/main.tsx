import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import Protected from "./components/AuthLayout.js";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<App />}>
      <Route
        path=""
        element={
          <Protected authentication>
            {/* <Home /> */}
          </Protected>
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
      <Route
      path="/signin"
      element={
        <Protected authentication={false}>
          {/* <SignIn /> */}
        </Protected>
      }
    />
    <Route
      path="/signup"
      element={
        <Protected authentication={false}>
          {/* <SignUp /> */}
        </Protected>
      }
    />
      <Route
      path="/verify-email/:username"
      element={
        <Protected authentication={false}>
          {/* <VerifyEmailCode /> */}
        </Protected>
      }
    />
    </>
  )
);



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
