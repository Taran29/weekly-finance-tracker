import type { FunctionComponent, MouseEventHandler } from "react";

type Props = {
  buttonText: string;
  extraStyles?: string;
  handleClick?: MouseEventHandler;
  type?: "submit" | "reset" | "button";
};

const Button: FunctionComponent<Props> = ({
  buttonText,
  extraStyles,
  handleClick,
  type,
}) => {
  return (
    <button
      className={`aspect-2/1 w-150 rounded-md border border-solid border-white bg-transparent px-5 py-2.5 text-lg text-white transition-all duration-200 ease-in-out hover:cursor-pointer hover:bg-white hover:text-black ${extraStyles}`}
      onClick={handleClick}
      type={type}
    >
      {buttonText}
    </button>
  );
};

export default Button;
