import s from "../../../sc1-main/m1-ui/App.module.css";
import {LearnPage} from "./LearnPage";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getCardsTC, setPageCountAC} from "../../f4-cardsList/bll/cardsListReducer";
import {useAppDispatch, useAppSelector} from "../../../sc1-main/m2-bll/store";
import {CardType} from "../../../sc1-main/m3-dal/cardsApi";
import {MiniSpinner} from "../../../sc1-main/m1-ui/common/components/MiniSpinner/MiniSpinner";
import {getRandomCard} from "../../../sc3-utils/getRandomCard";

export const LearnPageContainer = () => {
  console.log("LearnPage Container");
  const urlParams = useParams<"cardPackID">();
  const cardPack_ID = urlParams.cardPackID;

  const cards = useAppSelector<Array<CardType>>(state => state.cardsList.cards);
  const [randomCard, setRandomCard] = useState<CardType>({
    _id: "",
    cardsPack_id: "",
    user_id: "",
    question: "",
    answer: "",
    grade: 0,
    shots: 0,
    created: "",
    updated: "",
  });
  const [first, setFirst] = useState<boolean>(true);
  const isFetchingCards = useAppSelector<boolean>(state => state.cardsList.isFetchingCards);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("UseEffect in LearnPage Container");
    if (cardPack_ID && first) {
      dispatch(getCardsTC({cardsPack_id: cardPack_ID, pageCount: 1000000}));
      setFirst(false);
    }

    console.log("Cards: ", cards);
    if (cards.length > 0) setRandomCard(getRandomCard(cards));

    return () => {
      console.log("UseEffect cleanup in LearnPage Container");
      dispatch(setPageCountAC(5));
    };
  }, [dispatch, cardPack_ID, cards, first]);

  return (
    <div className={s.smallContainer}>
      {isFetchingCards ?
        <>
          <MiniSpinner/>
          Getting random card...
        </>
        :
        <LearnPage card={randomCard}/>
      }
    </div>
  );
};
