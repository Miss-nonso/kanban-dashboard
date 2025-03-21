import Image from "next/image";
import Button from "./Button";
import Dropdown from "./Dropdown";
import { useState } from "react";
import Modal from "./Modal";
import TaskModal from "./ModalContent/TaskModal";
type HeaderProps = { boardName: string };

const handleBoardControl = () => {
  console.log("Board work...");
};

const Header = ({ boardName }: HeaderProps) => {
  const [displayDropdown, setDisplayDropdown] = useState(false);
  const [taskModal, setTaskModal] = useState(false);
  return (
    <header>
      <h2 className="text-[24px] font-bold tracking-[0.045em]">{boardName}</h2>
      <div className="flex items-center gap-4 pr-4">
        <Button
          type="add"
          text="Add New Task"
          state={taskModal}
          stateFn={setTaskModal}
          // fn={openAddTaskModal()}
          btnClass="primary"
        />
        <div className="relative board-option-btn">
          <button onClick={() => setDisplayDropdown(!displayDropdown)}>
            <Image
              src="/assets/icons/icon-vertical-ellipsis.svg"
              alt="options"
              width={4.62}
              height={20}
            />
          </button>

          {displayDropdown && (
            <Dropdown taskOrBoard="board" fn={handleBoardControl} />
          )}
        </div>
      </div>

      {/* <Modal ModalContent={TaskModal} type="add" /> */}
    </header>
  );
};

export default Header;
