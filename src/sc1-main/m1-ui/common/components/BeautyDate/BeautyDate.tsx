import React from 'react';
import s from './BeautyDate.module.css'


type BeautyDateType = {
  date: string
}
export const BeautyDate: React.FC<BeautyDateType> = ({date}) => {
  return (
    <div className={s.main}>
      <div>{new Date(date).toLocaleDateString()}</div>
      <div>{new Date(date).toLocaleTimeString()}</div>
    </div>
  );
};
