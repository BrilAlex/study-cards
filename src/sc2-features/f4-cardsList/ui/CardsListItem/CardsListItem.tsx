import React, {FC, useState} from "react";
import {CardType, UpdateCardModelType} from "../../../../sc1-main/m3-dal/cardsApi";
import {Button} from "../../../../sc1-main/m1-ui/common/components/c2-Button/Button";
import {useAppDispatch, useAppSelector} from "../../../../sc1-main/m2-bll/store";
import {deleteCardTC, updateCardTC} from "../../bll/cardsListReducer";
import {BeautyDate} from "../../../../sc1-main/m1-ui/common/components/BeautyDate/BeautyDate";
import {DeleteModal} from "../DeleteModal/DeleteModal";
import {EditAddModal} from "../EditAddModal/EditAddModal";
import {PATH} from "../../../../sc1-main/m1-ui/Main/Pages";
import {useNavigate} from "react-router-dom";

type CardsListItemPropsType = {
  card: CardType
};

export const CardsListItem: FC<CardsListItemPropsType> = ({card}) => {

  const navigate = useNavigate();
  const isFetchingCards = useAppSelector<boolean>(state => state.cardsList.isFetchingCards);
  const userId = useAppSelector<string>(state => state.profile.user._id);
  const dispatch = useAppDispatch();

  const [activeDeleteModal, setActiveDeleteModal] = useState(false);
  const [answer, setAnswer] = useState<string>(card.answer)
  const [question, setQuestion] = useState<string>(card.question)
  const [activeModal, setActiveModal] = useState<boolean>(false)

  const editCardHandler = () => {
    const cardUpdateModel: UpdateCardModelType = {
      _id: card._id,
      question: question,
      answer: answer,
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

  const learnHandler = (id: string) => {
    navigate(PATH.LEARN + id);
  }

  return (
    <>
      <EditAddModal
        inputAnswer={answer}
        setInputAnswer={setAnswer}
        inputQuestion={question}
        setInputQuestion={setQuestion}
        active={activeModal}
        setActive={setActiveModal}
        setCard={editCardHandler}
      />

      <tr>
        <td>{card.question}</td>
        <td>{card.answer}</td>
        <td><BeautyDate date={card.updated}/></td>
        <td>{card.grade}</td>
        <td>
          {card.user_id === userId &&
            <Button onClick={() => setActiveModal(true)} disabled={isFetchingCards}>Edit</Button>}
          {card.user_id === userId &&
            <Button onClick={deleteButtonHandler} disabled={isFetchingCards} red>Delete</Button>}
          <Button onClick={() => learnHandler(card.cardsPack_id)}>Learn</Button>
        </td>
      </tr>

      <DeleteModal
        active={activeDeleteModal}
        setActive={setActiveDeleteModal}
        deletePack={deleteCardHandler}
      />
    </>
  );
};
