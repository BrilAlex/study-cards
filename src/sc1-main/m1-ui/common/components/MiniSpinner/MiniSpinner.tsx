import React from 'react';
import s from './MiniSpinner.module.css'

type SpinnerPropsType = {
  customMainStyle?: string
  customSizeStyle?: string
  customContainerStyle?: string
}

export const MiniSpinner: React.FC<SpinnerPropsType> = (
  {
    customMainStyle,
    customSizeStyle,
    customContainerStyle,
  }
) => {

  const finalMainStyle = `${s.mainBlock} ${customMainStyle ? customMainStyle : ''}`
  const finalSizeStyle = `${s.speedingWheel} ${customSizeStyle ? customSizeStyle : ''}`
  const finalContainerStyle = `${s.container} ${customContainerStyle ? customContainerStyle : ''}`

  return (
    <div className={finalMainStyle}>
      <div className={finalContainerStyle}>
        <div className={finalSizeStyle}/>
      </div>
    </div>

  );
};

