import { createSlice } from "@reduxjs/toolkit";

// create reducer
export const commonReducer = createSlice({
  name: "common",
  initialState: {
    isDarkMode: false,
  },
  reducers: {
    changeToDarkMode: (state) => {
      return {
        ...state,
        isDarkMode: true,
      };
    },
    changeToLightMode: (state) => {
      return {
        ...state,
        isDarkMode: false,
      };
    },
  },
});

export const {
  changeToDarkMode,
  changeToLightMode,
  setQuizType,
  setQuizDifficulty,
} = commonReducer.actions;

export default commonReducer.reducer;
