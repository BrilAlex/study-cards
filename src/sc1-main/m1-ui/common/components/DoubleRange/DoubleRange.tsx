import React, {DetailedHTMLProps, InputHTMLAttributes, useCallback, useEffect, useRef} from 'react'
import s from "./DoubleRange.module.css";

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type SuperDoubleRangePropsType = DefaultInputPropsType & {
  min: number
  max: number
  value1: number
  value2: number
  setValue1: (value: number) => void
  setValue2: (value: number) => void
}

export const DoubleRange: React.FC<SuperDoubleRangePropsType> = (
  {
    min,
    max,
    value1,
    value2,
    setValue1,
    setValue2,
    step,
    // min, max, step, disable, ...
  }
) => {

  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef<any>(null);

  // Преобразовать в проценты
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Диапазон для уменьшения с левой стороны
  useEffect(() => {
    const minPercent = getPercent(value1);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [value1, getPercent]);

  // Диапазон для уменьшения с правой стороны
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(value2);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [value2, getPercent]);

  return (
    <div className={s.container}>
      <input
        type="range"
        min={min}
        max={max}
        step={step ? step : 1}
        value={value1}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), value2 - 1);
          setValue1(value);
          minValRef.current = value;
        }}
        className={`${s.range} ${s.rangeLeft}`}

        style={{zIndex: value1 > max - 100 ? "5": undefined}}
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step ? step : 1}
        value={value2}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), value1 + 1);
          setValue2(value);
          maxValRef.current = value;
        }}
        className={`${s.range} ${s.rangeRight}`}
      />

      <div className={s.slider}>
        <div className={s.sliderTrack}/>
        <div ref={range} className={s.sliderRange}/>
        <div className={s.sliderLeftValue}>{value1}</div>
        <div className={s.sliderRightValue}>{value2}</div>
      </div>
    </div>
  );
}
