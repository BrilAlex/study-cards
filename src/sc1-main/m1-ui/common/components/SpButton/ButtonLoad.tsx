import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './ButtonLoad.module.css';

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type ButtonLoadPropsType = DefaultButtonPropsType & {
  red?: boolean
  isSpinner?: boolean;
}

export const ButtonLoad: React.FC<ButtonLoadPropsType> = (
  {
    red,
    isSpinner,
    className,
    ...restProps
  }
) => {

  const finalStyle = `${s.btnStyle} ${isSpinner ? s.spinner : ''} ${red ? s.red : ""} ${className ? className : ""}`;

  return (
    <button className={finalStyle} {...restProps}/>
  )
};