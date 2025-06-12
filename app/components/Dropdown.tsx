'use client';
import { Ref } from 'react';
import { useModal } from '../context/ModalContext';
import BoardModal from './ModalContent/BoardModal';
import TaskModal from './ModalContent/TaskModal';
import DeleteModal from './ModalContent/DeleteModal';
import { useParams } from 'next/navigation';
import { TaskProps } from '../utils/interface';
import { useBoards } from '../context/BoardContext';

type DropdownProps = {
  dropdownRef?: Ref<HTMLDivElement>;
  taskOrBoard: 'task' | 'board';
  setDisplayDropdown: (val: boolean) => void;
  taskItem?: TaskProps;
  taskId?: string;
};

const Dropdown = ({
  dropdownRef,
  taskOrBoard,
  setDisplayDropdown,
  taskItem,
  taskId,
}: DropdownProps) => {
  const { handleModalOpen } = useModal();
  const params = useParams();
  const { id } = params;
  const { getCurrentBoard } = useBoards();
  const currentBoard = getCurrentBoard(`${id}`);

  if (!currentBoard) return;

  return (
    <div className="dropdown" ref={dropdownRef}>
      <ul>
        <li>
          <button
            onClick={() => {
              setDisplayDropdown(false);

              if (taskOrBoard === 'task' && id && taskItem) {
                return handleModalOpen(<TaskModal type="edit" />, taskId, taskItem);
              }

              if (taskOrBoard === 'board') {
                return handleModalOpen(<BoardModal type="edit" />);
              }
            }}>
            Edit {taskOrBoard === 'task' ? 'task' : 'board'}
          </button>
        </li>
        <li className="delete-list-item">
          <button
            onClick={() => {
              setDisplayDropdown(false);

              if (taskOrBoard === 'task' && id && currentBoard && taskItem) {
                handleModalOpen(<DeleteModal taskOrBoard="task" />, taskId, taskItem.status);
              }
              if (taskOrBoard === 'board' && currentBoard) {
                handleModalOpen(<DeleteModal taskOrBoard="board" />, currentBoard._id);
              }
            }}>
            Delete {taskOrBoard === 'task' ? 'task' : 'board'}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
