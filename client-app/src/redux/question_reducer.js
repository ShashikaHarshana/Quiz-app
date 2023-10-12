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
      const filteredQuestions = state.questions.filter((question) => {
        if (
          question.type === state.selectedQuizType &&
          question.difficulty === state.selectedDifficulty
        ) {
          return question;
        }
      });
      let shuffled;
      if (state.selectedQuizType === "wlc") {
        shuffled = state.questions.sort(function () {
          return 0.5 - Math.random();
        });
      } else {
        shuffled = filteredQuestions.sort(function () {
          return 0.5 - Math.random();
        });
      }

      const selectedQuestions = shuffled.slice(0, 10);

      return {
        ...state,
        queue: selectedQuestions,
      };
    },
    startWeeklyChallenge: (state) => {
      const filteredQuestions = state.questions.filter((question) => {
        return question;
      });
      const shuffled = filteredQuestions.sort(function () {
        return 0.5 - Math.random();
      });

      const selectedQuestions = shuffled.slice(0, 10);

      return {
        ...state,
        queue: selectedQuestions,
      };
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
  startWeeklyChallenge,
} = questionReducer.actions;

export default questionReducer.reducer;
