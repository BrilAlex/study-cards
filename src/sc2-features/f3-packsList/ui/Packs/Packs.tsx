import React from 'react';
import {BeautyDate} from "../../../../sc1-main/m1-ui/common/components/BeautyDate/BeautyDate";
import {PacksType} from "../../../../sc1-main/m3-dal/packCards-api";
import s from './Packs.module.css'

type PacksPropsType = {
  dataPack: PacksType
}

export const Packs:React.FC<PacksPropsType> = ({dataPack}) => {
  return (
    <>
      <div style={{width: "20%"}}>{dataPack.name}</div>
      <div style={{width: "12%"}}>{dataPack.cardsCount}</div>
      <div style={{width: "20%"}}><BeautyDate date={dataPack.updated}/></div>
      <div style={{width: "18%"}}>{dataPack.user_name}</div>
      <div style={{width: "30%"}}>*Action buttons*</div>
    </>
  );
};
