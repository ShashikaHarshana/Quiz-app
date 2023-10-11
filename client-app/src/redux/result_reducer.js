import { createSlice } from "@reduxjs/toolkit";

export const resultReducer = createSlice({
  name: "result",
  initialState: {
    userId: null,
    result: [],
    wclResult: [],
    wclAttempts: 0,
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    pushResultAction: (state, action) => {
      state.result.push(action.payload);
    },
    updateResultAction: (state, action) => {
      const { trace, checked } = action.payload;
      console.log(checked, trace, trace + 1);
      console.log(state.result);
      state.result.fill(checked, trace, trace + 1);
    },
    resetResultAction: (state, action) => {
      return { ...state, result: [] };
    },
    resetWclResutlAction: (state, action) => {
      return { ...state, wclResult: [] };
    },
  },
});

export const {
  setUserId,
  pushResultAction,
  resetResultAction,
  updateResultAction,
} = resultReducer.actions;

export default resultReducer.reducer;
