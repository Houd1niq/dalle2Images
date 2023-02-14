import React, { useLayoutEffect, useState } from "react";
import { DataAboutImage } from "../store/slices/imagesSlice";

export const Timer: React.FC<{ urlArrayAndQuery: DataAboutImage }> = ({
  urlArrayAndQuery,
}) => {
  let [timeLeft, setTimeLeft] = useState<number>(
    Math.floor((urlArrayAndQuery.expires - Date.now()) / 1000)
  );

  useLayoutEffect(() => {
    let countedTime: number;
    let interval = setInterval(() => {
      countedTime = Math.floor((urlArrayAndQuery.expires - Date.now()) / 1000);
      setTimeLeft(countedTime);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [urlArrayAndQuery]);

  return (
    <div className="mt-1">
      <p className="text-lg">
        Оставшееся время: {Math.floor(timeLeft / 60)} минут и{" "}
        {timeLeft - Math.floor(timeLeft / 60) * 60} секунд
      </p>
      <div className="relative h-1 w-[80%] max-w-[500px] bg-gray-600 mx-auto">
        <div
          className="h-full bg-white"
          style={{ width: `${timeLeft / 36}%` }}
        ></div>
      </div>
    </div>
  );
};
