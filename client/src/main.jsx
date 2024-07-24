import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Homepg from "./Pages/Homepg.jsx";
import Shop from "./Pages/Shop.jsx";
import Listing from "./Pages/Listing.jsx";
import BuyItem from "./Pages/BuyItem.jsx";

// Define the routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Homepg />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/list" element={<Listing />} />
      <Route path="/buy" element={<BuyItem />} />
    </Route>
  )
);

// Render the application
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
