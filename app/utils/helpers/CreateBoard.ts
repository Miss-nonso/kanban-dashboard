import { v4 as uuidv4 } from "uuid";

import { boards } from "@/public/assets/data";
import { BoardProps } from "../interface";
import { setToLocalStorage } from "./helpers";

export const createNewBoard = (boardObj: Omit<BoardProps, "_id">) => {
  if (boardObj.name) {
    const newBoard = {
      ...boardObj,
      _id: uuidv4()
    };

    boards.push(newBoard);
  }

  console.log({ boards });
  setToLocalStorage("board", boards);
  return { message: "sucess", response: 200 };
};
