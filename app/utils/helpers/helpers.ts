// import { BoardProps } from "../interface";

// export const setToLocalStorage = (key: string, value: BoardProps[]) => {
//   if (typeof window !== undefined) {
//     localStorage.setItem(key, JSON.stringify(value));
//   } else {
//     return;
//   }
// };

// export const getFromLocalStorage = (key: string) => {
//   if (typeof window !== undefined) {
//     const JSONBoard = localStorage.getItem(key);
//     if (JSONBoard) {
//       return JSON.parse(JSONBoard);
//     } else {
//       return null;
//     }
//   } else {
//     return;
//   }
// };
