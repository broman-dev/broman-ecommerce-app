import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useState,
  useRef,
  useEffect,
  MouseEventHandler,
  FC,
  useLayoutEffect,
} from "react";
import { Option } from "./Option";
import "./Select.scss";

type SelectProps = {
  selectedIndex: number;
  options: Option[];
  placeholder?: string;
  onChange?: (option: Option, index: number) => void;
  onClose?: () => void;
};

export const Select: FC<SelectProps> = ({
  options = [],
  placeholder,
  selectedIndex = 0,
  onChange,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<Option>(
    options[selectedIndex]
  );
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { target } = event;
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        isOpen && onClose?.();
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [isOpen, onClose]);

  const handleOptionClick = (value: Option, index: number) => {
    setIsOpen(false);
    setCurrentValue(value);
    onChange?.(value, index);
  };
  const handlePlaceHolderClick: MouseEventHandler<HTMLDivElement> = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div ref={rootRef} className="select-list" data-is-active={isOpen}>
      <div className="arrow">
        <FontAwesomeIcon icon={faCaretDown} />
      </div>

      <div
        className="placeholder"
        data-selected={!!currentValue?.value}
        onClick={handlePlaceHolderClick}
      >
        {currentValue?.title ?? placeholder}
      </div>

      {isOpen && (
        <ul className="select">
          {options.map((option, index) => (
            <Option
              key={option.value}
              index={index}
              option={option}
              onClick={handleOptionClick}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
