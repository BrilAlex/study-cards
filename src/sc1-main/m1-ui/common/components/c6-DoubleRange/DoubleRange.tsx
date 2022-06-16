import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useState} from "react";
import s from "./DoubleRange.module.css";

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type DoubleRangePropsType = DefaultInputPropsType & {
  onChangeRange?: (value: [number, number]) => void
  rangeValues?: [number, number]
  min?: number
  max?: number
  step?: number
  disabled?: boolean
};

const DoubleRange: React.FC<DoubleRangePropsType> = (
  {
    type, value, rangeValues, onChange, onChangeRange,
    min, max, step, disabled,
    ...restProps
  }
) => {
  const initMin = min ? min : 0;
  const initMax = max ? max : 100;
  const stepValue = step ? step : 1;
  const initMinValue = rangeValues ? rangeValues[0] : initMin;
  const initMaxValue = rangeValues ? rangeValues[1] : initMax;

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
          style={{zIndex: minValue === maxValue && minValue !== 0 ? 1 : 0}}
          min={initMin}
          max={initMax}
          step={stepValue}
          disabled={disabled}
          {...restProps}
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
          {...restProps}
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
