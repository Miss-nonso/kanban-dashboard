import Image from "next/image";
import Button from "./Button";
type HeaderProps = { boardName: string };

const openAddTaskModal = () => {
  return;
};

const Header = ({ boardName }: HeaderProps) => {
  return (
    <header>
      <h2 className="text-[24px] font-bold tracking-[0.045em]">{boardName}</h2>
      <div className="flex items-center gap-4 pr-4">
        <Button
          type="add"
          text="Add New Task"
          fn={openAddTaskModal()}
          btnClass="primary"
        />
        <button>
          <Image
            src="/assets/icons/icon-vertical-ellipsis.svg"
            alt="options"
            width={4.62}
            height={20}
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
