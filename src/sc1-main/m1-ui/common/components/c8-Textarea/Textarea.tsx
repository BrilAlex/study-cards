import {ChangeEvent, DetailedHTMLProps, FC, TextareaHTMLAttributes, KeyboardEvent} from "react";
import s from "./Textarea.module.css";

type DefaultTextareaPropsType = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

type TextareaPropsType = DefaultTextareaPropsType & {
  onChangeValue?: (value: string) => void
  onEnterKeyPress?: () => void
};

export const Textarea: FC<TextareaPropsType> = (
  {
    value, onChange, onChangeValue,
    onKeyPress, onEnterKeyPress, className,
    ...restProps
  }
) => {
  const onChangeCallback = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange && onChange(e);
    onChangeValue && onChangeValue(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    onKeyPress && onKeyPress(e);
    onEnterKeyPress && e.key === "Enter" && onEnterKeyPress();
  };

  const textareaClassName = `${s.textarea} ${className ? className : ""}`;

  return (
    <textarea
      value={value}
      onChange={onChangeCallback}
      onKeyPress={onKeyPressHandler}
      className={textareaClassName}
      {...restProps}
    />
  );
};
