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
import Shop from "./Pages/Shop.jsx";
import Listing from "./Pages/Listing.jsx";
import BuyItem from "./Pages/BuyItem.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="" element={<Homepg />} /> 
      <Route path="/app" element={<App />} /> 
      <Route path="/shop" element={<Shop />} />
      <Route path="/list" element={<Listing />} />
      <Route path="/buy" element={<BuyItem />} />
    </Route>
  )
);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);