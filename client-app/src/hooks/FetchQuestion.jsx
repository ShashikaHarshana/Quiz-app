import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import data, {
  answers,
} from "../components/main-components/quiz-components/data";

import * as Action from "../redux/question_reducer";
// fetch quest to fetch api data

export const useFetchQuestion = () => {
  const dispatch = useDispatch();
  const [getData, setGetData] = useState({
    isLoading: false,
    apiData: [],
    serverError: null,
  });

  useEffect(() => {
    setGetData((prev) => ({ ...prev, loading: true }));

    // async function fetch data from backend.
    (async () => {
      try {
        let question = await data;

        if (question.length > 0) {
          setGetData((prev) => ({ ...prev, loading: false }));
          setGetData((prev) => ({ ...prev, apiData: { question, answers } }));

          //dispatch
          dispatch(Action.startExamAction({ question, answers }));
        } else {
          throw new Error("No Question available");
        }
      } catch (error) {
        setGetData((prev) => ({ ...prev, loading: false }));
        setGetData((prev) => ({ ...prev, serverError: error }));
      }
    })();
  }, [dispatch]);
  return [getData, setGetData];
};

export const MoveNextQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.moveNextAction()); //increase by 1
  } catch (error) {
    console.log(error);
  }
};

export const MovePrevQuestion = () => async (dispatch) => {
  try {
    //decrease
  } catch (error) {
    console.log(error);
  }
};
