import { useLocation } from "react-router-dom";
import { useAppSelector } from "../store/store";
import { DarkButton } from "../components/DarkButton";
import { ImageItem } from "../components/ImageItem";
import { NotFoundBlock } from "../components/NotFoundBlock";
import { Timer } from "../components/Timer";

export const GeneratedImagesPage = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const urlArrayAndQuery = useAppSelector((state) => state.images[id]);

  if (!urlArrayAndQuery) return <NotFoundBlock></NotFoundBlock>;

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl mb-3 font-bold">
        Результаты по запросу:{" "}
        {urlArrayAndQuery.query[0].toUpperCase() +
          urlArrayAndQuery.query.slice(1)}
      </h2>

      <div className="info mb-3">
        <p className="text-lg">
          Ссылка на эту генерацию изображений действительна 1 час.
        </p>
        <Timer urlArrayAndQuery={urlArrayAndQuery}></Timer>
      </div>

      <div className="flex flex-wrap gap-2 max-w-[800px] justify-center xl:max-w-full">
        {urlArrayAndQuery.data.map((item, index) => {
          return <ImageItem item={item} index={index} key={index}></ImageItem>;
        })}
      </div>
      <DarkButton
        link={{ isLink: true, to: "/" }}
        className="text-lg mx-auto mt-4"
      >
        Вернуться на главную
      </DarkButton>
    </div>
  );
};
