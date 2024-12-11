import { FC, MouseEventHandler } from "react";

export type Option = {
  value: string;
  title: string;
};

type OptionProps = {
  option: Option;
  index: number;
  onClick: (value: Option, index: number) => void;
};

export const Option: FC<OptionProps> = ({ option, index, onClick }) => {
  const handleClick =
    (clickedValue: Option, index: number): MouseEventHandler<HTMLLIElement> =>
    () => {
      onClick(clickedValue, index);
    };

  return (
    <li
      className="option"
      value={option.value}
      onClick={handleClick(option, index)}
      tabIndex={0}
    >
      {option.title}
    </li>
  );
};
