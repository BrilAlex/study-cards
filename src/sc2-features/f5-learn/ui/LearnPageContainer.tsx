import s from "../../../sc1-main/m1-ui/App.module.css";
import {LearnPage} from "./LearnPage";
import {Navigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getCardsTC, setPageCountAC} from "../../f4-cardsList/bll/cardsListReducer";
import {useAppDispatch, useAppSelector} from "../../../sc1-main/m2-bll/store";
import {CardType} from "../../../sc1-main/m3-dal/cardsApi";
import {MiniSpinner} from "../../../sc1-main/m1-ui/common/components/MiniSpinner/MiniSpinner";
import {getRandomCard} from "../../../sc3-utils/getRandomCard";
import {PATH} from "../../../sc1-main/m1-ui/Main/Pages";

export const LearnPageContainer = () => {
  console.log("LearnPage Container");
  const urlParams = useParams<"cardPackID">();
  const cardPack_ID = urlParams.cardPackID;

  const user_ID = useAppSelector(state => state.profile.user._id);
  const cardPackName = useAppSelector<string>(state => state.learn.cardsPackName);
  const cards = useAppSelector<Array<CardType>>(state => state.cardsList.cards);
  const isFetchingCards = useAppSelector<boolean>(state => state.cardsList.isFetchingCards);
  const dispatch = useAppDispatch();

  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
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

  useEffect(() => {
    console.log("UseEffect in LearnPage Container");
    if (cardPack_ID && isFirstLoad) {
      dispatch(getCardsTC({cardsPack_id: cardPack_ID, pageCount: 1000000}));
      setIsFirstLoad(false);
    }

    console.log("Cards in useEffect: ", cards);
    if (cards.length > 0) setRandomCard(getRandomCard(cards));

    return () => {
      console.log("UseEffect cleanup in LearnPage Container");
      dispatch(setPageCountAC(5));
    };
  }, [dispatch, cardPack_ID, cards, isFirstLoad]);

  if (!user_ID) {
    return <Navigate to={PATH.LOGIN}/>
  }

  return (
    <div className={s.smallContainer}>
      <h1>Learn pack: {cardPackName}</h1>
      {isFetchingCards ?
        <div>
          <MiniSpinner/>
          <p>Just a moment, please :)</p>
          <p>Getting random card for You...</p>
        </div>
        :
        <LearnPage card={randomCard}/>
      }
    </div>
  );
};
