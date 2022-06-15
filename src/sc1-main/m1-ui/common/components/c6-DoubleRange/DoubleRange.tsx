import React, {ChangeEvent, useState} from "react";
import s from "./DoubleRange.module.css";

type SuperDoubleRangePropsType = {
  onChangeRange?: (value: [number, number]) => void
  value?: [number, number]
  min?: number
  max?: number
  step?: number
  disabled?: boolean
};

const DoubleRange: React.FC<SuperDoubleRangePropsType> = (
  {
    onChangeRange, value,
    min, max, step,
    disabled,
  }
) => {
  const initMin = min ? min : 0;
  const initMax = max ? max : 100;
  const stepValue = step ? step : 1;
  const initMinValue = value ? value[0] : initMin;
  const initMaxValue = value ? value[1] : initMax;

  const [minValue, setMinValue] = useState(initMinValue);
  const [maxValue, setMaxValue] = useState(initMaxValue);

  const onMinValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(+e.currentTarget.value, maxValue);
    setMinValue(value);
  };

  const onMaxValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(+e.currentTarget.value, minValue);
    setMaxValue(value);
  };

  const onMouseUpHandler = () => {
    onChangeRange && onChangeRange([minValue, maxValue]);
  };

  return (
    <>
      <div className={s.doubleRange}>
        <div className={s.doubleRangeTrack}/>
        <input
          type={"range"}
          value={minValue}
          onChange={onMinValueChange}
          onMouseUp={onMouseUpHandler}
          className={s.doubleRangeThumb}
          style={{zIndex: minValue === maxValue ? 1 : 0}}
          min={initMin}
          max={initMax}
          step={stepValue}
          disabled={disabled}
        />
        <input
          type={"range"}
          value={maxValue}
          onChange={onMaxValueChange}
          onMouseUp={onMouseUpHandler}
          className={`${s.doubleRangeThumb} ${s.doubleRangeRightThumb}`}
          min={initMin}
          max={initMax}
          step={stepValue}
          disabled={disabled}
        />
      </div>
      <div className={s.doubleRangeValues}>
        <span>{minValue}</span>
        <span>{maxValue}</span>
      </div>
    </>
  );
}

export default DoubleRange;
