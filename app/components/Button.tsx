import { ButtonHTMLAttributes } from 'react';
import Image from 'next/image';

type BtnProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'className'> & {
  type?: string;
  text: string;
  fn?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  btnClass: 'primary' | 'secondary' | 'danger';
  btnType: 'button' | 'submit';
};

const Button = ({ type, text, fn, btnClass, btnType, ...props }: BtnProps) => {
  return (
    <button
      className={`${btnClass} btn ${type !== 'add' && 'btnLg'} disabled:opacity-60`}
      onClick={e => fn && fn(e)}
      type={btnType}
      {...props}>
      {type === 'add' && (
        <span className="  grid place-items-center">
          {text === 'Add New Task' ? (
            <Image
              src="/assets/icons/icon-add-task-mobile.svg"
              alt={`${text}`}
              width={15}
              height={16}
              className="mb-0 py-0.5 "
            />
          ) : (
            <b className="font-extrabold mb-[0.1rem]">+</b>
          )}
        </span>
      )}
      {text === 'Add New Task' ? <p className="hidden md:block"> {text}</p> : <p> {text}</p>}
    </button>
  );
};

export default Button;
