import React from 'react';
import s from './MySpinner.module.css'

type SpinnerPropsType = {
  customMainStyle?: string
  customSizeStyle?: string
}

export const Spinner: React.FC<SpinnerPropsType> = (
  {
    customMainStyle,
    customSizeStyle,
  }
) => {

  const finalMainStyle = `${s.mainBlock} ${customMainStyle ? customMainStyle : ''}`
  const finalSizeStyle = `${s.speedingWheel} ${customSizeStyle ? customSizeStyle : ''}`

  return (
    <div className={finalMainStyle}>
      <div className={s.container}>
        <div className={finalSizeStyle}/>
      </div>
    </div>

  );
};

