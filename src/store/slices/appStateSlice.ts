import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { isLoading: boolean } = {
  isLoading: false,
};

const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setIsLoading } = appStateSlice.actions;
export default appStateSlice.reducer;
