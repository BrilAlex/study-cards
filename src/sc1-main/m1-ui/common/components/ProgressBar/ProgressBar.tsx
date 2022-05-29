import React from 'react';
import s from './ProgressBar.module.css'

export const ProgressBar = () => {
  return (
    <div className={s.mainBlock}>
      <div className={s.container}>
        <div className={s.loading}/>
      </div>
    </div>
  );
};

