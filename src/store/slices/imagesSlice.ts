import {
  createListenerMiddleware,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../store";

type DataAboutImage = {
  data: {
    url: string;
  }[];
  query: string;
  expires: number;
};

type ImagesState = {
  [key: string]: DataAboutImage;
};

const initialState: ImagesState = {};

for (let i = 0; i < localStorage.length; i++) {
  const created = localStorage.key(i);
  if (created !== null) {
    const item = localStorage.getItem(created);
    if (item === null) continue;

    const value: {
      query: string;
      data: { b64_json: string }[] | { url: string }[];
      expires: number;
    } = JSON.parse(item);

    // Detect if the item is a legacy item then clear the local storage
    if (value.data[0].hasOwnProperty("b64_json")) {
      localStorage.clear();
      break;
    } else if (!value.hasOwnProperty("expires")) {
      localStorage.clear();
      break;
    } else if (value.data[0].hasOwnProperty("url")) {
      // If the item is not a legacy item, add it to the state
      const data = value.data as { url: string }[];
      initialState[created] = {
        data,
        query: value.query,
        expires: value.expires,
      };
    }
  }
}

const imagesSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    addImages(
      state,
      action: PayloadAction<{
        created: number;
        data: { url: string }[];
        query: string;
      }>
    ) {
      let { created, data, query } = action.payload;
      const key = created.toString();
      state[key] = { data: [], query: "", expires: 0 };
      state[key].expires = Date.now() + 1000 * 60 * 60;
      state[key].data = data;
      state[key].query = query;
    },
    removeImages(state, action: PayloadAction<string>) {
      delete state[action.payload];
      localStorage.removeItem(action.payload);
    },
  },
});

export const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  actionCreator: imagesSlice.actions.addImages,
  effect: (action, api) =>
    localStorage.setItem(
      action.payload.created.toString(),
      JSON.stringify({
        data: action.payload.data,
        query: action.payload.query,
        expires: (api.getState() as RootState).images[
          action.payload.created.toString()
        ].expires,
      })
    ),
});

export const { addImages, removeImages } = imagesSlice.actions;
export default imagesSlice.reducer;
