import { v4 as uuidv4 } from "uuid";

import { boards } from "@/public/assets/data";
import { BoardProps } from "../interface";

export const createNewBoard = (boardObj: BoardProps) => {
  const newBoard = {
    ...boardObj,
    _id: uuidv4()
  };

  boards.push(newBoard);
};
