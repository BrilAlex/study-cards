import React, {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  KeyboardEvent,
  useState
} from "react";
import s from "./InputPassword.module.css";
import eyeIcon from "../../assets/Icons/eye.png";
import blind from "../../assets/Icons/blind.png";

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type SuperInputTextPropsType = DefaultInputPropsType & {
  onChangeText?: (value: string) => void
  onEnter?: () => void
  error?: string
  spanClassName?: string
};

export const InputPassword: React.FC<SuperInputTextPropsType> = (
  {
    type,
    onChange, onChangeText,
    onKeyPress, onEnter,
    error,
    className, spanClassName,
    ...restProps
  }
) => {
  const [passwordType, setPasswordType] = useState(true);
  const inputType = passwordType ? "password" : "text";

  const changeInputTypeHandler = () => {
    setPasswordType(!passwordType);
  };

  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
    onChangeText && onChangeText(e.currentTarget.value);
  };

  const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyPress && onKeyPress(e);
    onEnter && e.key === 'Enter' && onEnter();
  }

  const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ''}`;
  const finalInputClassName = `${s.superInput} ${error ? s.errorInput : ""} ${className ? className : ""}`;

  return (
    <div className={s.inputPassword}>
      <input
        type={inputType}
        onChange={onChangeCallback}
        onKeyDown={onKeyPressCallback}
        className={finalInputClassName}

        {...restProps}
      />
      <div className={s.eyeButton} onClick={changeInputTypeHandler}>
        {passwordType
          ? <img src={blind} alt={"closed eye icon"}/>
          : <img src={eyeIcon} alt={"eye icon"}/>}
      </div>
      {error && <span className={finalSpanClassName}>{error}</span>}
    </div>
  );
};
