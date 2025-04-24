import Image from "next/image";

type InputAddProps = {
  value: string;
  type: "add" | "edit";
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deleteInput: () => void;
  error: string;
  disabled?: boolean;
};

const InputAdd = ({
  value,
  type,
  onChange,
  deleteInput,
  error,
  disabled
}: InputAddProps) => {
  return (
    <div className="col-input-wrapper relative">
      <input
        type="text"
        name={type}
        value={value}
        onChange={onChange}
        className={`${error && "error"} disabled:opacity-50`}
        disabled={disabled}
      />
      <small className="input-error absolute right-14 text-red-500 text-[14px]">
        {error}
      </small>

      <button className="cancel-input" type="button" onClick={deleteInput}>
        {" "}
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

export default InputAdd;
