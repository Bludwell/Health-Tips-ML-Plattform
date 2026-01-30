import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Overview from "./components/Overview/Overview.tsx";
import UserData from "./components/UserData/UserData.tsx";
import Form from "./components/Form/Form.tsx";
import Login from "./components/Login/Login.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/Overview", element: <Overview /> },
  { path: "/UserData", element: <UserData /> },
  { path: "/Form", element: <Form /> },
  { path: "/Login", element: <Login /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
