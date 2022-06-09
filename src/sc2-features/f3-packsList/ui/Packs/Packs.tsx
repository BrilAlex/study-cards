import React from 'react';
import {BeautyDate} from "../../../../sc1-main/m1-ui/common/components/BeautyDate/BeautyDate";
import {PacksType} from "../../../../sc1-main/m3-dal/packCards-api";
import {NavLink} from "react-router-dom";
import {PATH} from "../../../../sc1-main/m1-ui/Main/Pages";
import {Button} from "../../../../sc1-main/m1-ui/common/components/c2-Button/Button";
import {useAppSelector} from "../../../../sc1-main/m2-bll/store";
import s from './Packs.module.css'


type PacksPropsType = {
    dataPack: PacksType
    editHandler: () => void
    deletePackCardsHandler: () => void
}

export const Packs: React.FC<PacksPropsType> = ({dataPack, editHandler, deletePackCardsHandler}) => {

    const userId = useAppSelector<string>(state => state.profile.user._id)

    return (
        <>
            <div style={{width: "20%"}}>
                <NavLink to={PATH.CARDS_LIST + dataPack._id}>
                    {dataPack.name}
                </NavLink>
            </div>
            <div style={{width: "2%"}}>{dataPack.cardsCount}</div>
            <div style={{width: "30%"}}><BeautyDate date={dataPack.updated}/></div>
            <div style={{width: "18%"}}>{dataPack.user_name}</div>
            <div style={{width: "30%"}}>
              <div className={s.buttonBlock}>
                <Button onClick={deletePackCardsHandler} red={true} disabled={!(dataPack.user_id === userId)}>Delete</Button>
                <Button onClick={editHandler} disabled={!(dataPack.user_id === userId)}>Edit</Button>
              </div>
            </div>

        </>
    );
};
