import React, {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../sc1-main/m2-bll/store";
import {addNewCardTC, getCardsTC} from "../bll/cardsListReducer";
import {CardType} from "../api/cardsApi";
import s from "./CardsList.module.css";
import {NavLink, useParams} from "react-router-dom";
import {PATH} from "../../../sc1-main/m1-ui/Main/Pages";
import {CardsListItem} from "./CardsListItem/CardsListItem";
import {Button} from "../../../sc1-main/m1-ui/common/components/c2-Button/Button";
import {MiniSpinner} from "../../../sc1-main/m1-ui/common/components/MiniSpinner/MiniSpinner";

export const CardsList = () => {
  const isLoading = useAppSelector<boolean>(state => state.app.appIsLoading);
  const urlParams = useParams<'cardPackID'>();
  // const cardsPack_ID = "617ff51fd7b1030004090a1f";
  const cardsPack_ID = urlParams.cardPackID;
  const cards = useAppSelector<null | Array<CardType>>(state => state.cardsList.cards);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (cardsPack_ID) dispatch(getCardsTC(cardsPack_ID));
  }, [dispatch, cardsPack_ID]);

  const addCardHandler = useCallback(() => {
    if (cardsPack_ID) dispatch(addNewCardTC(cardsPack_ID));
  }, [dispatch, cardsPack_ID]);

  if (isLoading) {
    return <MiniSpinner/>;
  }

  return (
    <div className={s.cardsPage}>
      <NavLink to={PATH.PACKS_LIST}>
        <h2>Back to Packs List</h2>
      </NavLink>
      <Button onClick={addCardHandler}>Add card</Button>
      {!cards ?
        <MiniSpinner/>
        :
        cards.length === 0 ?
          <div>No cards found. Press "Add card" to create new card in this pack</div>
          :
          <div className={s.cardsListTable}>
            <div className={s.tableHeader}>
              <div style={{width: "30%"}}>Question</div>
              <div style={{width: "30%"}}>Answer</div>
              <div style={{width: "10%"}}>Last Updated</div>
              <div style={{width: "15%"}}>Grade</div>
              <div style={{width: "15%"}}>Actions</div>
            </div>
            {cards.map(c => {
              return (
                <div key={c._id} className={s.tableString}>
                  <CardsListItem card={c}/>
                </div>
              );
            })}
          </div>
      }
    </div>
  );
};