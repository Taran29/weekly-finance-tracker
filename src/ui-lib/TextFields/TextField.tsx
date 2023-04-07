import { ChangeEventHandler, FunctionComponent } from "react";

type Props = {
  placeholder: string;
  handleChange?: ChangeEventHandler;
  required?: boolean;
  min?: number;
  max?: number;
  name?: string;
  id?: string;
  value?: string;
};

const TextField: FunctionComponent<Props> = ({
  placeholder,
  handleChange,
  required,
  min,
  max,
  name,
  id,
  value,
}) => {
  return (
    <>
      <input
        type="text"
        className="focus:border-3 rounded-md border-2 border-solid border-white py-3 pl-2 outline-none transition-all duration-200 ease-in focus:border-purple-800 focus:shadow-md focus:shadow-purple-950"
        placeholder={placeholder}
        onChange={handleChange}
        required={required}
        minLength={min}
        maxLength={max}
        name={name}
        id={id}
        value={value}
      />
    </>
  );
};

export default TextField;
