import React from 'react';

type ToastProps = {
  message: string;
  type?: string;
};

const ToastContainer = ({ message, type }: ToastProps) => {
  return (
    <div
      className={`${
        type === 'error'
          ? 'bg-red-500'
          : type === 'warning'
            ? 'bg-yellow-300 text-black text-[15px]'
            : 'bg-green-800'
      } absolute top-5 min-w-[150px] p-4 rounded-md text-white`}>
      {message}
    </div>
  );
};

export default ToastContainer;
