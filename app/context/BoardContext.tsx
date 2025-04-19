"use client";
import { v4 as uuidv4 } from "uuid";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode
} from "react";
import { BoardProps } from "../utils/interface";
import { staticBoards } from "@/public/assets/data";
import { useRouter } from "next/navigation";

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

// ✅ Safe localStorage helpers
const setToLocalStorage = (key: string, value: BoardProps[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

const getFromLocalStorage = (key: string): BoardProps[] | null => {
  if (typeof window !== "undefined") {
    const JSONBoard = localStorage.getItem(key);
    return JSONBoard ? JSON.parse(JSONBoard) : null;
  }
  return null;
};

const BoardContext = createContext<BoardContextProps | undefined>(undefined);

export function BoardProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [boards, setBoards] = useState<BoardProps[]>(
    getFromLocalStorage("boards") || staticBoards
  );

  // ✅ On mount: load from localStorage or fallback to staticBoards
  useEffect(() => {
    const storedBoards = getFromLocalStorage("boards");
    if (storedBoards) {
      setBoards(storedBoards);
    } else {
      setBoards(staticBoards);
      setToLocalStorage("boards", staticBoards);
    }
  }, []);

  // ✅ Whenever boards change: update localStorage
  useEffect(() => {
    setToLocalStorage("boards", boards);
  }, [boards]);

  const updateBoards = (newBoards: BoardProps[]) => {
    setBoards(newBoards);
  };

  const getCurrentBoard = (id: string) => {
    return boards.find((board) => board._id === id);
  };

  const createNewBoard = (boardObj: Omit<BoardProps, "_id">) => {
    if (boardObj.name) {
      const newBoard = {
        ...boardObj,
        _id: uuidv4()
      };

      const updated = [...boards, newBoard];
      updateBoards(updated);

      router.push(
        `/boards/${newBoard._id}/${newBoard.name.replace(/ /g, "-")}`
      );
    }
  };

  const editBoard = (updatedBoard: BoardProps[]) => {
    updateBoards(updatedBoard);
  };

  const editTask = (updatedBoard: BoardProps[]) => {
    updateBoards(updatedBoard);
  };

  const deleteBoard = (index: number) => {
    const updated = [...boards];
    updated.splice(index, 1);

    updateBoards(updated);

    const fallback = updated[index - 1] || updated[index] || updated[0] || null;

    if (fallback) {
      router.push(
        `/boards/${fallback._id}/${fallback.name.replace(/ /g, "-")}`
      );
    } else {
      router.push(`/`);
    }
  };

  const deleteTask = (
    taskIndex: number,
    currentBoard: BoardProps,
    currentColumnName: string
  ) => {
    const updatedBoards = boards.map((board) => {
      if (board._id === currentBoard._id) {
        return {
          ...board,
          columns: board.columns.map((col) => {
            if (col.name.toLowerCase() === currentColumnName.toLowerCase()) {
              const updatedTasks = [...col.tasks];
              updatedTasks.splice(taskIndex, 1);
              return { ...col, tasks: updatedTasks };
            }
            return col;
          })
        };
      }
      return board;
    });

    updateBoards(updatedBoards);
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
