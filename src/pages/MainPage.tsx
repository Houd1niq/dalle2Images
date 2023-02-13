import React, { useState } from "react";
import openAI from "../api/openAI.js";
import { useAppDispatch, useAppSelector } from "../store/store";
import { addImages } from "../store/slices/imagesSlice";
import { useNavigate } from "react-router-dom";
import { CardOfQuery } from "../components/CardOfQuery";
import { DarkInput } from "../components/DarkInput";
import { DarkButton } from "../components/DarkButton";
import { setIsLoading } from "../store/slices/appStateSlice";

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

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function getTestImage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
        setIsLoading(false);
      }
    }
  }

  return (
    <div className="">
      <h1 className="text-2xl mb-3">Генератор изображений</h1>
      <form onSubmit={getTestImage} className="mb-8">
        <DarkInput
          className="w-[320px] mb-3 sm:mb-0"
          value={promptsValue}
          placeholder="Введите запрос"
          onChange={(e) => {
            setPromptsValue(e.target.value);
          }}
          type="text"
          name="prompts"
          id=""
        />
        <DarkButton className="ml-3" type="submit">
          Получить изображение
        </DarkButton>
      </form>
      <div className="flex gap-1">
        {isError && (
          <div className="text-2xl">
            При запросе произошла ошибка. Возможно сервис не работает или вы
            ввели запрещённый запрос.
          </div>
        )}
      </div>
      <div>
        <h2 className="text-2xl mb-5">Предыдущие запросы</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {Object.keys(queries).length === 0 && (
            <div className="text-2xl">Запросов пока нет</div>
          )}
          {Object.keys(queries).map((item) => {
            return (
              <CardOfQuery
                key={item}
                query={queries[item].query}
                data={queries[item].data}
                id={item}
              ></CardOfQuery>
            );
          })}
        </div>
      </div>
    </div>
  );
};
