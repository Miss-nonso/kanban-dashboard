'use client';
import { nanoid } from 'nanoid';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BoardProps } from '../utils/interface';
import { staticBoards } from '@/public/assets/data';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

interface BoardContextProps {
  boards: BoardProps[];
  createNewBoard: (boardObj: Omit<BoardProps, '_id'>) => void;
  getCurrentBoard: (id: string) => BoardProps | undefined;
  editBoard: (updatedBoard: BoardProps[]) => void;
  updateBoard: (id: string, boardUpdate: BoardProps) => void;
  editTask: (updatedBoard: BoardProps[]) => void;
  deleteBoard: (boardId: string) => void;
  deleteTask: (taskId: string, boardId: string, currentColumnName: string) => void;
  isLoading: boolean;
  setIsLoadingTrue: () => void;
  setIsLoadingFalse: () => void;
}

const setToLocalStorage = (key: string, value: BoardProps[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    console.log('did not save');
  }
};

const getFromLocalStorage = (key: string): BoardProps[] | null => {
  if (typeof window !== 'undefined') {
    const JSONBoard = localStorage.getItem(key);
    return JSONBoard ? JSON.parse(JSONBoard) : null;
  }
  return null;
};

const BoardContext = createContext<BoardContextProps | undefined>(undefined);

export function BoardProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [boards, setBoards] = useState<BoardProps[]>(getFromLocalStorage('boards') || staticBoards);

  useEffect(() => {
    const storedBoards = getFromLocalStorage('boards');
    if (storedBoards) {
      setBoards(storedBoards);
    } else {
      setBoards(staticBoards);
      setToLocalStorage('boards', staticBoards);
    }
  }, []);

  useEffect(() => {
    setToLocalStorage('boards', boards);
  }, [boards]);

  const updateBoards = (newBoards: BoardProps[]) => {
    setBoards(newBoards);
    setToLocalStorage('boards', newBoards);
  };

  const getCurrentBoard = (id: string) => {
    const board = boards.find(board => board._id === id);
    if (!board) {
      return;
    } else {
      return board;
    }
  };

  const updateBoard = (id: string, boardUpdate: BoardProps) => {
    const boardIndex = boards.findIndex(item => item._id === id);

    if (boardIndex < 0) return;

    setBoards(prev => {
      const prevCopy = [...prev];

      prevCopy[boardIndex] = boardUpdate;
      setToLocalStorage('boards', prevCopy);

      return prevCopy;
    });
  };

  const createNewBoard = (boardObj: Omit<BoardProps, '_id'>) => {
    setIsLoadingTrue();

    if (boardObj.name) {
      const newBoard = {
        ...boardObj,
        _id: nanoid(10),
      };

      const updated = [...boards, newBoard];
      updateBoards(updated);

      router.push(`/boards/${newBoard._id}/${newBoard.name.replace(/ /g, '-')}`);
    }

    setTimeout(() => {
      toast({ title: 'Board created ✅' });
    }, 2000);
  };

  const editBoard = (updatedBoard: BoardProps[]) => {
    updateBoards(updatedBoard);
  };

  const editTask = (updatedBoard: BoardProps[]) => {
    updateBoards(updatedBoard);
  };

  const deleteBoard = (boardId: string) => {
    setIsLoadingTrue();
    const allBoards = [...boards];

    const boardIndex = allBoards.findIndex(board => board._id === boardId);

    const modifiedBoards = allBoards.filter(board => board._id !== boardId);

    updateBoards(modifiedBoards);

    const boardsLeft = [...modifiedBoards];

    const fallback = boardsLeft[boardIndex - 1] || boardsLeft[boardIndex] || boardsLeft[0] || null;

    if (fallback) {
      router.push(`/boards/${fallback._id}/${fallback.name.replace(/ /g, '-')}`);
    } else {
      router.push(`/boards`);
    }

    setTimeout(() => {
      toast({ title: 'Board deleted' });
    }, 2000);
  };

  const deleteTask = (taskId: string, boardId: string, currentColumnName: string) => {
    console.log(taskId, boardId, currentColumnName);
    const modifiedBoards = boards.map(board => {
      if (board._id === boardId) {
        return {
          ...board,
          columns: board.columns.map(col => {
            if (col.name.toLowerCase() === currentColumnName) {
              const tasks = [...col.tasks];

              const updatedTasks = tasks.filter(task => task._id !== taskId);
              return { ...col, tasks: updatedTasks };
            }
            return col;
          }),
        };
      }
      return board;
    });

    updateBoards(modifiedBoards);
    toast({ title: 'Task deleted' });
  };

  const setIsLoadingTrue = () => {
    setIsLoading(true);
  };
  const setIsLoadingFalse = () => {
    setIsLoading(false);
  };

  return (
    <BoardContext.Provider
      value={{
        boards,
        getCurrentBoard,
        createNewBoard,
        editBoard,
        updateBoard,
        deleteBoard,
        deleteTask,
        editTask,
        isLoading,
        setIsLoadingTrue,
        setIsLoadingFalse,
      }}>
      {children}
    </BoardContext.Provider>
  );
}

export function useBoards(): BoardContextProps {
  const context = useContext(BoardContext);
  if (context === undefined) {
    throw new Error('useBoards must be used within a BoardProvider');
  }
  return context;
}
