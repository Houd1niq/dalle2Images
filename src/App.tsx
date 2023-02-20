import React, { useEffect } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { GeneratedImagesPage } from "./pages/GeneratedImagesPage";
import { AppDispatch, useAppDispatch, useAppSelector } from "./store/store";
import { ImagesState, removeImages } from "./store/slices/imagesSlice";
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

function deleteOldImages(imagesState: ImagesState, dispatch: AppDispatch) {
  Object.keys(imagesState).forEach((key) => {
    if (imagesState[key].expires < Date.now()) {
      dispatch(removeImages(key));
    }
  });
}

function App() {
  const imagesState = useAppSelector((state) => state.images);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.appState.isLoading);

  useEffect(() => {
    deleteOldImages(imagesState, dispatch);
    let interval = setInterval(() => {
      deleteOldImages(imagesState, dispatch);
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
