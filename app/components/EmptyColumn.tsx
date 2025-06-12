import { useModal } from '../context/ModalContext';
import BoardModal from './ModalContent/BoardModal';

const EmptyColumn = () => {
  const { handleModalOpen } = useModal();

  return (
    <div
      className="empty-col min-h-[60vh] cursor-pointer mt-[3.5rem] my-auto grid place-items-center bg-[var(--contrastGray)] min-w-[230px] md:min-w-[270px]"
      onClick={() => handleModalOpen(<BoardModal type="addColumn" />)}>
      <p className="flex justify-center items-center text-center ">
        <span className="font-bold text-[1.3rem]  text-[var(--textcolor)] pr-[0.3rem]">+</span>
        New Column
      </p>
    </div>
  );
};

export default EmptyColumn;
