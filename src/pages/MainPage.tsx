import React, { useState } from "react";
import openAI from "../api/openAI.js";
import { useAppDispatch } from "../store/store";
import { addImages } from "../store/slices/imagesSlice";
import { useNavigate } from "react-router-dom";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  async function getTestImage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setIsError(false);
    try {
      let response = await openAI.createImage({
        prompt: promptsValue,
        n: 4,
        size: "1024x1024",
      });
      setIsLoading(false);
      if (!isLoading && response.status === 200) {
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

  return (
    <div className="App">
      <div className="text-2xl ">Генератор изображений</div>
      <form onSubmit={getTestImage} className="mb-3">
        <input
          className="w-[320px] h-8 p-2 border-1 border-gray-300 rounded-md outline-none bg-gray-800"
          value={promptsValue}
          onChange={(e) => {
            setPromptsValue(e.target.value);
          }}
          type="text"
          name="prompts"
          id=""
        />
        <button
          className="w-22 p-2 ml-3 bg-gray-800 rounded-xl hover:bg-gray-600 transition-colors duration-150"
          type="submit"
        >
          Получить изображение
        </button>
      </form>
      <div className="flex gap-1">
        {isLoading && <div className="text-2xl">Loading...</div>}
        {isError && (
          <div className="text-2xl">
            При запросе произошла ошибка. Возможно сервис не работает или вы
            ввели запрещённый запрос.
          </div>
        )}
        {/*{image.length > 0 &&*/}
        {/*  image.map((item) => {*/}
        {/*    return (*/}
        {/*      <img className="w-[300px]" key={item.url} src={item.url}></img>*/}
        {/*    );*/}
        {/*  })}*/}
      </div>
    </div>
  );
};
