import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Homepg from "./Pages/Homepg.jsx"
import App from "./App.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="" element={<Homepg />} /> 
      <Route path="/app" element={<App />} /> 
    </Route>
  )
);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);