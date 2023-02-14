import React from "react";
import download from "../assets/download.svg";
import { DarkButton } from "./DarkButton";

export const ImageItem: React.FC<{
  index: number;
  item: { url: string };
}> = ({ item, index }) => {
  return (
    <div className="group relative transition-all duration-300 hover:scale-[1.02]">
      <img
        className="w-[280px] h-[280px] bg-gray-800 mb-2 lg:mb-0 group-hover:opacity-75 transition-all duration-300"
        src={item.url}
        alt="image"
      />
      {/* link for desktop version*/}
      <a
        download={"image-" + index}
        className="hidden sm:group-hover:block"
        href={item.url}
      >
        <img
          className="absolute w-10 bottom-0 right-0 transition-all duration-300 cursor-pointer"
          alt="download"
          src={download}
        />
      </a>
      {/* link for mobile version*/}
      <DarkButton className="block lg:hidden">
        <a download={"image-" + index} href={item.url}>
          Скачать
        </a>
      </DarkButton>
    </div>
  );
};
