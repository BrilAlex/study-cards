import React, {FC} from "react";
import {CardType, UpdateCardModelType} from "../../api/cardsApi";
import {Button} from "../../../../sc1-main/m1-ui/common/components/c2-Button/Button";
import {useAppDispatch} from "../../../../sc1-main/m2-bll/store";
import {deleteCardTC, updateCardTC} from "../../bll/cardsListReducer";
import {BeautyDate} from "../../../../sc1-main/m1-ui/common/components/BeautyDate/BeautyDate";

type CardsListItemPropsType = {
  card: CardType
};

export const CardsListItem: FC<CardsListItemPropsType> = ({card}) => {
  const dispatch = useAppDispatch();
  const editCardHandler = () => {
    const cardUpdateModel: UpdateCardModelType = {
      _id: card._id,
      answer: "New answer",
    };
    dispatch(updateCardTC(card.cardsPack_id, cardUpdateModel));
  };
  const deleteCardHandler = () => {
    dispatch(deleteCardTC(card.cardsPack_id, card._id));
  };

  return (
    <>
      <div style={{width: "30%"}}>{card.question}</div>
      <div style={{width: "30%"}}>{card.answer}</div>
      <div style={{width: "10%"}}><BeautyDate date={card.updated}/></div>
      <div style={{width: "15%"}}>{card.grade}</div>
      <div style={{width: "15%"}}>
        <Button onClick={editCardHandler}>Edit</Button>
        <Button onClick={deleteCardHandler}>Delete</Button>
      </div>
    </>
  );
};