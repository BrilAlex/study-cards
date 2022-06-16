import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './SortButton.module.css';

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SortButtonPropsType = DefaultButtonPropsType & {
  direction: string
  isActive: boolean
  isFetching: boolean
}

export const SortButton: React.FC<SortButtonPropsType> = (
  {
    direction,
    isActive,
    className,
    isFetching,
  }
) => {

  const finalStyle = `${s.btnStyle} ${isActive ? s.active : ''}  ${className ? className : ""}`;
  const indicator = !direction ? '↓' : direction === "0" ? '↓' : '↑';

  return (
    <button className={finalStyle} disabled={isFetching}>{indicator}</button>
  )
};
