import { boards } from "@/public/assets/data";

export const FindBoard = (id: string | string[]) => {
  const board = boards.find((board) => board._id === id);

  return board || null;
};
