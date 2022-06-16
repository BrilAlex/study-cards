import React, {FC, useState} from "react";
import {CardType, UpdateCardModelType} from "../../../../sc1-main/m3-dal/cardsApi";
import {Button} from "../../../../sc1-main/m1-ui/common/components/c2-Button/Button";
import {useAppDispatch, useAppSelector} from "../../../../sc1-main/m2-bll/store";
import {deleteCardTC, updateCardTC} from "../../bll/cardsListReducer";
import {BeautyDate} from "../../../../sc1-main/m1-ui/common/components/BeautyDate/BeautyDate";
import {DeleteModal} from "../DeleteModal/DeleteModal";

type CardsListItemPropsType = {
  card: CardType
};

export const CardsListItem: FC<CardsListItemPropsType> = ({card}) => {
  const isFetchingCards = useAppSelector<boolean>(state => state.cardsList.isFetchingCards);
  const dispatch = useAppDispatch();

  const [activeDeleteModal, setActiveDeleteModal] = useState(false);

  const editCardHandler = () => {
    const cardUpdateModel: UpdateCardModelType = {
      _id: card._id,
      answer: "New answer",
      question: "ffsfsdf",
    };
    dispatch(updateCardTC(card.cardsPack_id, cardUpdateModel));
  };
  const deleteCardHandler = () => {
    dispatch(deleteCardTC(card.cardsPack_id, card._id));
    setActiveDeleteModal(false);
  };
  const deleteButtonHandler = () => {
    setActiveDeleteModal(true);
  };

  return (
    <>
      <div style={{width: "30%"}}>{card.question}</div>
      <div style={{width: "30%"}}>{card.answer}</div>
      <div style={{width: "10%"}}><BeautyDate date={card.updated}/></div>
      <div style={{width: "15%"}}>{card.grade}</div>
      <div style={{width: "15%"}}>
        <Button onClick={editCardHandler} disabled={isFetchingCards}>Edit</Button>
        <Button onClick={deleteButtonHandler} disabled={isFetchingCards} red>Delete</Button>
      </div>

      <DeleteModal
        cardsPack_id={card.cardsPack_id}
        card_id={card._id}
        active={activeDeleteModal}
        setActive={setActiveDeleteModal}
        deletePack={deleteCardHandler}
      />

    </>
  );
};