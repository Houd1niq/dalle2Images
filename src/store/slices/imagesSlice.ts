import {
  createListenerMiddleware,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

type ImagesState = {
  [key: string]: {
    data: {
      url: string;
    }[];
    query: string;
  };
};

const initialState: ImagesState = {};

for (let i = 0; i < localStorage.length; i++) {
  const created = localStorage.key(i);
  if (created !== null) {
    const item = localStorage.getItem(created);
    if (item === null) continue;
    const value: { query: string; data: { url: string }[] } = JSON.parse(item);
    initialState[created] = { data: value.data, query: value.query };
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
      console.log("here", action.payload);
      let { created, data, query } = action.payload;
      state[created.toString()] = { data: [], query: "" };
      state[created.toString()].data = data;
      state[created.toString()].query = query;
    },
  },
});

export const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  actionCreator: imagesSlice.actions.addImages,
  effect: (action, _) =>
    localStorage.setItem(
      action.payload.created.toString(),
      JSON.stringify({ data: action.payload.data, query: action.payload.query })
    ),
});

export const { addImages } = imagesSlice.actions;
export default imagesSlice.reducer;
