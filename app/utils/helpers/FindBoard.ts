import { boards } from "@/public/assets/data";

export const getCurrentBoard = (id: string | string[] | undefined) => {
  const board = boards.find((board) => board._id === id);

  return board || null;
};
