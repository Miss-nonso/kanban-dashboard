import { DotsGrid2X3 } from '@/components/icons';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Image from 'next/image';
import { CSSProperties } from 'react';

type InputAddProps = {
  value: string;
  type: 'add' | 'edit';
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deleteInput: () => void;
  error: string;
  disabled?: boolean;
};

const InputAdd = ({ value, type, onChange, deleteInput, error, disabled }: InputAddProps) => {
  return (
    <div className="col-input-wrapper relative">
      <input
        type="text"
        name={type}
        value={value}
        onChange={onChange}
        className={`${error && 'error'} disabled:opacity-50`}
        disabled={disabled}
      />
      <small className="input-error absolute right-14 text-red-500 text-[14px]">{error}</small>

      <button
        className="cancel-input disabled:opacity-50"
        type="button"
        onClick={deleteInput}
        disabled={disabled}>
        {' '}
        <Image
          className="cursor-pointer cancel-input"
          src="/assets/icons/icon-cross.svg"
          alt="cancel"
          width={14.48}
          height={14.48}
        />
      </button>
    </div>
  );
};

export interface DraggableInputAddProps extends InputAddProps {
  id: string;
}

export const DraggableInputAdd = ({ id, ...props }: DraggableInputAddProps) => {
  const { setNodeRef, listeners, attributes, transform } = useSortable({ id });

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    touchAction: 'none',
  };

  return (
    <div className="w-full !flex items-center gap-2" style={style} ref={setNodeRef}>
      <button type="button" className="flex-none" {...listeners} {...attributes}>
        <i className="text-2xl text-white/75">
          <DotsGrid2X3 />
        </i>
      </button>
      <InputAdd {...props} />
    </div>
  );
};

export default InputAdd;
