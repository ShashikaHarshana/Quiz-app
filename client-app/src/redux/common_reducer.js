import { createSlice } from "@reduxjs/toolkit";

// create reducer
export const commonReducer = createSlice({
  name: "common",
  initialState: {
    isDarkMode: false,
    isLoggedIn: false,
    selectedQuizType: "dnd",
    user: "",
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
    setQuizType: (state, action) => {
      return {
        ...state,
        selectedQuizType: action.payload,
      };
    },
  },
});

export const { changeToDarkMode, changeToLightMode, setQuizType } =
  commonReducer.actions;

export default commonReducer.reducer;
