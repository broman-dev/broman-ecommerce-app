import { FC, useEffect, useState } from "react";
import "./QuantityPicker.scss";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type QuantityPickerProps = {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (newValue: number) => void;
};

const QuantityPicker: FC<QuantityPickerProps> = ({
  min,
  max,
  step,
  value,
  onChange,
}) => {
  const [count, setCount] = useState<number>(value);

  useEffect(() => {
    onChange(count);
  }, [count]);

  const onDecrease = () => {
    setCount((prev) => {
      if (prev - step < min) return prev;
      return prev - step;
    });
  };

  const onIncrease = () => {
    setCount((prev) => {
      if (prev + step > max) return prev;
      return prev + step;
    });
  };

  return (
    <div className="quantity-picker">
      <button className="decrease" onClick={onDecrease}>
        <FontAwesomeIcon icon={faMinus} />
      </button>
      <span className="current-value">{count}</span>
      <button className="increase" onClick={onIncrease}>
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  );
};

export default QuantityPicker;
