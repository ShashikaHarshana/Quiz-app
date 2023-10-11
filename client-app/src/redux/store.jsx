import { combineReducers, configureStore } from "@reduxjs/toolkit";

import questionReducer from "./question_reducer";
import resultReducer from "./result_reducer";
import commonReducer from "./common_reducer";

const rootReducer = combineReducers({
  questions: questionReducer,
  result: resultReducer,
  common: commonReducer,
});

// create store with reducer
export default configureStore({ reducer: rootReducer });
