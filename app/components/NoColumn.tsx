import Button from './Button';
import { useModal } from '../context/ModalContext';
import BoardModal from './ModalContent/BoardModal';

const NoColumn = () => {
  const { handleModalOpen } = useModal();

  return (
    <div className={`h-[100vh] px-4 flex flex-col w-full gap-4 justify-center items-center `}>
      <p>This board is empty. Create a new column to get started.</p>
      <Button
        btnClass="primary"
        btnType="button"
        type="add"
        text="Add New Column"
        fn={() => handleModalOpen(<BoardModal type="addColumn" />)}
      />
    </div>
  );
};

export default NoColumn;
