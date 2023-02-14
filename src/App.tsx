import React, { useEffect } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { GeneratedImagesPage } from "./pages/GeneratedImagesPage";
import { useAppDispatch, useAppSelector } from "./store/store";
import { removeImages } from "./store/slices/imagesSlice";
import Progress from "./components/Progress";
import { NotFoundBlock } from "./components/NotFoundBlock";

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainPage></MainPage>,
    errorElement: <NotFoundBlock></NotFoundBlock>,
  },
  {
    path: "/images/:id",
    element: <GeneratedImagesPage></GeneratedImagesPage>,
  },
]);

function App() {
  const imagesState = useAppSelector((state) => state.images);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.appState.isLoading);

  useEffect(() => {
    let interval = setInterval(() => {
      Object.keys(imagesState).forEach((key) => {
        if (imagesState[key].expires < Date.now()) {
          dispatch(removeImages(key));
        }
      });
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [imagesState]);

  return (
    <>
      <Progress isAnimating={isLoading}></Progress>
      <RouterProvider router={browserRouter}></RouterProvider>
    </>
  );
}
export default App;
