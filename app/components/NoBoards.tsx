import Button from './Button';
import BoardModal from './ModalContent/BoardModal';
import { useModal } from '../context/ModalContext';

const NoBoards = () => {
  const { handleModalOpen } = useModal();

  return (
    <div className={`h-[100vh] flex flex-col w-full gap-4 px-4 justify-center items-center `}>
      <p>You have no boards. Create a new board to get started.</p>
      <Button
        btnClass="primary"
        btnType="button"
        type="add"
        text="Add Board"
        fn={() => handleModalOpen(<BoardModal type="add" />)}
      />
    </div>
  );
};

export default NoBoards;
