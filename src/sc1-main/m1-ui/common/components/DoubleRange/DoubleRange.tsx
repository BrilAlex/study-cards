import React, {DetailedHTMLProps, InputHTMLAttributes, useCallback, useEffect, useRef} from 'react'
import s from "./DoubleRange.module.css";

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type SuperDoubleRangePropsType = DefaultInputPropsType & {
  min: number
  max: number
  valueArr: number[]
  setValueArr: (value: number[]) => void
}

export const DoubleRange: React.FC<SuperDoubleRangePropsType> = (
  {
    min,
    max,
    valueArr,
    setValueArr,
    step,
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
    const minPercent = getPercent(valueArr[0]);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [valueArr[0], getPercent]);

  // Диапазон для уменьшения с правой стороны
  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(valueArr[1]);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [valueArr[1], getPercent]);

  return (
    <div className={s.container}>
      <input
        type="range"
        min={min}
        max={max}
        step={step ? step : 1}
        value={valueArr[0]}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), valueArr[1] - 1);
          setValueArr([value, valueArr[1]]);
          minValRef.current = value;
        }}
        className={`${s.range} ${s.rangeLeft}`}

        style={{zIndex: valueArr[0] > max - 100 ? "5": undefined}}
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step ? step : 1}
        value={valueArr[1]}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), valueArr[0] + 1);
          setValueArr([valueArr[0], value]);
          maxValRef.current = value;
        }}
        className={`${s.range} ${s.rangeRight}`}
      />

      <div className={s.slider}>
        <div className={s.sliderTrack}/>
        <div ref={range} className={s.sliderRange}/>
        <div className={s.sliderLeftValue}>{valueArr[0]}</div>
        <div className={s.sliderRightValue}>{valueArr[1]}</div>
      </div>
    </div>
  );
}
