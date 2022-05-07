import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import s from "./Button.module.css";

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
  red?: boolean
};

export const Button: React.FC<SuperButtonPropsType> = (
  {
    red, className,
    ...restProps
  }
) => {
  const finalClassName = `${s.default} ${red ? s.red : ""} ${className ? className : ""}`;

  return (
    <button
      className={finalClassName}
      {...restProps}
    />
  );
};
