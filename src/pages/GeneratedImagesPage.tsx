import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/store";

export const GeneratedImagesPage = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const urlArrayAndQuery = useAppSelector((state) => state.images[id]);

  if (!urlArrayAndQuery)
    return (
      <div>
        <h2 className="text-3xl mb-3">
          Произошла ошибка. Скорее всего такой старницы не существует
        </h2>
        <Link
          to={"/"}
          className="text-lg w-24 mx-auto rounded-xl hover:bg-gray-500 outline-none bg-gray-800 mt-3 p-2 block w-[240px]"
        >
          Вернуться на главную
        </Link>
      </div>
    );
  else {
    return (
      <div className="flex flex-col items-center">
        <h2 className="text-3xl mb-3">
          Результаты по запросу: {urlArrayAndQuery.query}
        </h2>
        <div className="flex flex-wrap gap-2 max-w-[800px] justify-center xl:max-w-full">
          {urlArrayAndQuery.data.map((item, index) => {
            return (
              <div key={index}>
                <img
                  className="w-[280px] h-[280px] bg-gray-800 mb-2 sm:mb-0"
                  src={item.url}
                  alt="image"
                />
              </div>
            );
          })}
        </div>
        <Link
          to={"/"}
          className="text-lg w-24 mx-auto rounded-xl hover:bg-gray-500 outline-none bg-gray-800 mt-3 p-2 block w-[240px]"
        >
          Вернуться на главную
        </Link>
      </div>
    );
  }
};
