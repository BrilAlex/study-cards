import React from 'react';
import {BeautyDate} from "../../../../sc1-main/m1-ui/common/components/BeautyDate/BeautyDate";
import {PacksType} from "../../../../sc1-main/m3-dal/packCards-api";
import s from './Packs.module.css'
import {NavLink} from "react-router-dom";
import {PATH} from "../../../../sc1-main/m1-ui/Main/Pages";
import {Button} from "../../../../sc1-main/m1-ui/common/components/c2-Button/Button";
import {useAppDispatch} from "../../../../sc1-main/m2-bll/store";
import {deleteCardsPackThunk} from "../../bll/packsListReducer";

type PacksPropsType = {
    dataPack: PacksType
}

export const Packs: React.FC<PacksPropsType> = ({dataPack}) => {
    const dispatch = useAppDispatch();

    const deletePackCardsHandler = () => {
        dispatch(deleteCardsPackThunk(dataPack._id))
    }
    return (
        <>
            <div style={{width: "20%"}}>
                <NavLink to={PATH.CARDS_LIST + dataPack._id}>
                    {dataPack.name}
                </NavLink>
            </div>
            <div style={{width: "12%"}}>{dataPack.cardsCount}</div>
            <div style={{width: "20%"}}><BeautyDate date={dataPack.updated}/></div>
            <div style={{width: "18%"}}>{dataPack.user_name}</div>
            <div style={{width: "30%"}}>
                <Button onClick={deletePackCardsHandler} red={true}>Delete</Button>
            </div>
        </>
    );
};
