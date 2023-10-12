import { createSlice } from "@reduxjs/toolkit";

// create reducer
export const questionReducer = createSlice({
  name: "questions",
  initialState: {
    questions: [],
    queue: [],
    trace: 0,
    selectedQuizType: "",
    selectedDifficulty: "",
  },
  reducers: {
    startExamAction: (state) => {
      if (state.selectedQuizType === "wcl") {
      } else {
        const filteredQuestions = state.questions.filter((question) => {
          if (
            question.type === state.selectedQuizType &&
            question.difficulty === state.selectedDifficulty
          ) {
            return question;
          }
        });

        const shuffled = filteredQuestions.sort(function () {
          return 0.5 - Math.random();
        });

        const selectedQuestions = shuffled.slice(0, 10);
        return {
          ...state,
          queue: selectedQuestions,
        };
      }
    },
    storeQuestions: (state, action) => {
      return {
        ...state,
        questions: action.payload,
      };
    },
    setQuestionTypeAndDifficulty: (state, action) => {
      const { type, difficulty } = action.payload;
      return {
        ...state,
        selectedQuizType: type,
        selectedDifficulty: difficulty,
      };
    },
    moveNextAction: (state) => {
      return {
        ...state,
        trace: state.trace + 1,
      };
    },
    movePrevAction: (state) => {
      return {
        ...state,
        trace: state.trace - 1,
      };
    },
    resetAllAction: () => {
      return {
        queue: [],
        trace: 0,
      };
    },
  },
});

export const {
  startExamAction,
  moveNextAction,
  movePrevAction,
  resetAllAction,
  storeQuestions,
  setQuestionTypeAndDifficulty,
} = questionReducer.actions;

export default questionReducer.reducer;
