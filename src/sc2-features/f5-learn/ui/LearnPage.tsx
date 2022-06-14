import commonStyles from "../../../sc1-main/m1-ui/App.module.css";
import s from "./LearnPage.module.css";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../sc1-main/m2-bll/store";
import {getCardsTC} from "../../f4-cardsList/bll/cardsListReducer";
import {CardType} from "../../../sc1-main/m3-dal/cardsApi";
import {useNavigate, useParams} from "react-router-dom";
import {Button} from "../../../sc1-main/m1-ui/common/components/c2-Button/Button";
import {MiniSpinner} from "../../../sc1-main/m1-ui/common/components/MiniSpinner/MiniSpinner";
import {PATH} from "../../../sc1-main/m1-ui/Main/Pages";
import {setLearnCardDataAC} from "../bll/learnReducer";

export const LearnPage = () => {
  const urlParams = useParams<"cardPackID">();
  const cardPack_ID = urlParams.cardPackID;

  const cardPackName = useAppSelector<string>(state => state.learn.cardsPackName);
  console.log(cardPack_ID, cardPackName);
  const cards = useAppSelector<Array<CardType>>(state => state.cardsList.cards);
  const isFetching = useAppSelector<boolean>(state => state.cardsList.isFetching);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (cardPack_ID) dispatch(getCardsTC(cardPack_ID));
  }, [dispatch, cardPack_ID]);

  const getRandomCard = (array: Array<CardType>) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };

  const randomCard = getRandomCard(cards);

  const cancelHandler = () => {
    navigate(PATH.PACKS_LIST);
  };

  const showAnswerHandler = () => {
    dispatch(setLearnCardDataAC(randomCard));
    navigate(PATH.CARD + randomCard._id);
  };

  return (
    <div className={commonStyles.smallContainer}>
      <h1>Learn pack {cardPackName}</h1>
      {isFetching ?
        <MiniSpinner/>
        :
        cards.length === 0 ?
          <div>
            <p>No cards found in this pack</p>
            <Button onClick={cancelHandler}>Chancel</Button>
          </div>
          :
          <div className={s.cardBlock}>
            <div className={s.questionBlock}>
              <p><b>Question:</b> {randomCard.question}</p>
            </div>
            <div className={s.buttonsBlock}>
              <Button onClick={cancelHandler}>Chancel</Button>
              <Button onClick={showAnswerHandler}>Show answer</Button>
            </div>
          </div>
      }
    </div>
  );
};
