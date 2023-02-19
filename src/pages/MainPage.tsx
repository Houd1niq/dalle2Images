import React, { useEffect, useRef, useState } from "react";
import openAI from "../api/openAI.js";
import { useAppDispatch, useAppSelector } from "../store/store";
import { addImages } from "../store/slices/imagesSlice";
import { useNavigate } from "react-router-dom";
import { MobileCardOfQuery } from "../components/MobileCardOfQuery";
import { DarkInput } from "../components/DarkInput";
import { DarkButton } from "../components/DarkButton";
import { setIsLoading } from "../store/slices/appStateSlice";
import { FancyHeader } from "../components/FancyHeader";
import { DesktopCardOfQuery } from "../components/DesktopCardOfQuery";

interface AxiosError {
  response: {
    status: number;
    data: {
      error: {
        message: string;
      };
    };
  };
}

export const MainPage = () => {
  const [promptsValue, setPromptsValue] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const queries = useAppSelector((state) => state.images);
  const isLoading = useAppSelector((state) => state.appState.isLoading);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [width, setWidth] = useState<"mobile" | "desktop">("desktop");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && width === "desktop") setWidth("mobile");
      if (window.innerWidth > 768 && width === "mobile") {
        setWidth("desktop");
        console.log("here");
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

  async function getImage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (promptsValue.trim() === "") {
      if (inputRef.current) inputRef.current.classList.add("border-red-500");
      return;
    }
    if (!isLoading) {
      dispatch(setIsLoading(true));
      setIsError(false);
      try {
        let response = await openAI.createImage({
          prompt: promptsValue,
          n: 4,
          size: "512x512",
          response_format: "url",
        });
        dispatch(setIsLoading(false));
        if (response.status === 200) {
          let responseData = response.data as {
            created: number;
            data: { url: string }[];
          };
          dispatch(addImages({ ...responseData, query: promptsValue }));
          navigate(`images/${responseData.created}`);
        }
      } catch (e) {
        console.log(e);
        setIsError(true);
        dispatch(setIsLoading(false));
      }
    }
  }

  return (
    <div className="">
      <FancyHeader value={"Генератор изображений"}></FancyHeader>
      <form onSubmit={getImage} className="mb-6">
        <DarkInput
          childRef={inputRef}
          className="w-[320px] mb-3 sm:mb-0"
          value={promptsValue}
          placeholder="Введите запрос"
          onChange={(e) => {
            setPromptsValue(e.target.value);
            e.target.classList.remove("border-red-500");
          }}
          type="text"
          name="prompts"
          id=""
        />
        <DarkButton className="ml-3" type="submit">
          Получить изображение
        </DarkButton>
      </form>
      {isError && (
        <div className="text-2xl bg-red-600 mb-3 p-1 border border-white max-w-[600px] mx-auto">
          При запросе произошла ошибка. Возможно сервис не работает или вы ввели
          запрещённый запрос.
        </div>
      )}
      <div>
        <h2 className="text-2xl mb-5 font-bold">Предыдущие запросы</h2>
        <div className="flex flex-wrap md:flex-col justify-center md:items-center gap-6">
          {Object.keys(queries).length === 0 && (
            <div className="text-2xl">Запросов пока нет :(</div>
          )}
          {Object.keys(queries)
            .reverse()
            .map((item) => {
              if (width === "mobile")
                return (
                  <MobileCardOfQuery
                    key={item}
                    query={queries[item].query}
                    data={queries[item].data}
                    id={item}
                  ></MobileCardOfQuery>
                );
              else
                return (
                  <DesktopCardOfQuery
                    key={item}
                    query={queries[item].query}
                    data={queries[item].data}
                    id={item}
                  ></DesktopCardOfQuery>
                );
            })}
        </div>
      </div>
    </div>
  );
};
