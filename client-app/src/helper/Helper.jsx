import { Navigate } from "react-router-dom";
import axios from "axios";

export function attempts_Number(result) {
  return result.filter((r) => r !== undefined).length;
}

export function earnedPoints(result, answers, point) {
  return result
    .map((element, i) => answers[i] === element)
    .filter((i) => i)
    .map((i) => point)
    .reduce((prev, curr) => prev + curr, 0);
}

export function flagResult(totalPoints, earnPoints) {
  return (totalPoints * 50) / 100 < earnPoints; //pass mark
}

//Get data server data
export async function getServerData(url) {
  const data = await (await axios.get(url))?.data;
  console.log(data);
}

// getServerData('http://localhost:5000/adminApp/quizzes/results')
