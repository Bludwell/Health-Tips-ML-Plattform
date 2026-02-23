import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Overview from "./components/Overview/Overview.tsx";
import UserData from "./components/UserData/UserData.tsx";
import Form from "./components/Form/Form.tsx";
import Register from "./components/Register/Register.tsx";
import Login from "./components/Login/Login.tsx";
import { AuthProvider } from "./context/AuthProvider.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/Overview", element: <Overview /> },
  { path: "/UserData", element: <UserData /> },
  { path: "/Form", element: <Form /> },
  { path: "/Register", element: <Register /> },
  { path: "/Login", element: <Login /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
