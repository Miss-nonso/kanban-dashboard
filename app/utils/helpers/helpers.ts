import { BoardProps } from "../interface";

export const setToLocalStorage = (key: string, value: BoardProps[]) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key: string) => {
  const JSONBoard = localStorage.getItem(key);
  if (JSONBoard) {
    return JSON.parse(JSONBoard);
  }
};
