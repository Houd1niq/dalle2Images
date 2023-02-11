import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { GeneratedImagesPage } from "./pages/GeneratedImagesPage";

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainPage></MainPage>,
  },
  {
    path: "/images/:id",
    element: <GeneratedImagesPage></GeneratedImagesPage>,
  },
]);

function App() {
  return <RouterProvider router={browserRouter}></RouterProvider>;
}
export default App;
