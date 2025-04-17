"use client";
import { v4 as uuidv4 } from "uuid";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from "react";
import {
  getFromLocalStorage,
  setToLocalStorage
} from "../utils/helpers/helpers";
import { BoardProps } from "../utils/interface";
import { staticBoards } from "@/public/assets/data";

interface BoardContextProps {
  boards: BoardProps[];
  createNewBoard: (boardObj: Omit<BoardProps, "_id">) => void;
  getCurrentBoard: (id: string) => BoardProps | undefined;
  editBoard: (updatedBoard: BoardProps[]) => void;
  editTask: (updatedBoard: BoardProps[]) => void;
  deleteBoard: (indexOfBoardToDelete: number) => void;
  deleteTask: (
    taskIndex: number,
    currentBoard: BoardProps,
    currentColumnName: string
  ) => void;
}

const BoardContext = createContext<BoardContextProps | undefined>(undefined);

export function BoardProvider({ children }: { children: ReactNode }) {
  const [boards, setBoards] = useState<BoardProps[]>(
    getFromLocalStorage("boards") || staticBoards
  );

  useEffect(() => {
    setToLocalStorage("boards", boards);
  }, [boards]);

  const updateBoards = (newBoards: BoardProps[]) => {
    setBoards(newBoards);
    setToLocalStorage("boards", newBoards);
  };

  const getCurrentBoard = (id: string) => {
    if (id) {
      const board = boards.find((board: BoardProps) => board._id === id);
      return board;
    }
  };

  const createNewBoard = (boardObj: Omit<BoardProps, "_id">) => {
    if (boardObj.name) {
      const newBoard = {
        ...boardObj,
        _id: uuidv4()
      };

      boards.push(newBoard);
      window.location.href = `/boards/${newBoard._id}/${newBoard.name.replace(
        / /g,
        "-"
      )}`;
    }

    updateBoards(boards);
  };

  const editBoard = (updatedBoard: BoardProps[]) => {
    updateBoards(updatedBoard);
  };
  const editTask = (updatedBoard: BoardProps[]) => {
    updateBoards(updatedBoard);
  };

  const deleteBoard = (indexOfBoardToDelete: number) => {
    boards.splice(indexOfBoardToDelete, 1);

    if (
      (!boards[indexOfBoardToDelete - 1] || !boards[0]) &&
      (!boards[indexOfBoardToDelete - 1] || !boards[0])
    ) {
      window.location.href = `/`;
    } else {
      window.location.href = `/boards/${
        boards[indexOfBoardToDelete - 1]._id ||
        boards[0]._id ||
        boards[indexOfBoardToDelete + 1]
      }/${
        boards[indexOfBoardToDelete - 1].name.replace(/ /g, "-") ||
        boards[0].name.replace(/ /g, "-") ||
        boards[indexOfBoardToDelete + 1].name.replace(/ /g, "-")
      }`;
    }

    return updateBoards(boards);
  };

  const deleteTask = (
    taskIndex: number,
    currentBoard: BoardProps,
    currentColumnName: string
  ) => {
    boards.map(
      (board: BoardProps) =>
        board._id === currentBoard._id &&
        board.columns.map(
          (col) =>
            col.name.toLowerCase() === currentColumnName.toLowerCase() &&
            col.tasks.splice(taskIndex, 1)
        )
    );

    return updateBoards(boards);
  };

  return (
    <BoardContext.Provider
      value={{
        boards,
        getCurrentBoard,
        createNewBoard,
        editBoard,
        deleteBoard,
        deleteTask,
        editTask
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}

export function useBoards(): BoardContextProps {
  const context = useContext(BoardContext);
  if (context === undefined) {
    throw new Error("useBoards must be used within a BoardProvider");
  }
  return context;
}
