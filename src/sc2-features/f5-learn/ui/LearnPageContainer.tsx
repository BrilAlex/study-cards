import {LearnPage} from "./LearnPage";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {getCardsTC} from "../../f4-cardsList/bll/cardsListReducer";
import {useAppDispatch, useAppSelector} from "../../../sc1-main/m2-bll/store";
import {CardType} from "../../../sc1-main/m3-dal/cardsApi";
import {MiniSpinner} from "../../../sc1-main/m1-ui/common/components/MiniSpinner/MiniSpinner";

export const LearPageContainer = () => {
  const urlParams = useParams<"cardPackID">();
  const cardPack_ID = urlParams.cardPackID;

  const cards = useAppSelector<Array<CardType>>(state => state.cardsList.cards);
  const isFetching = useAppSelector<boolean>(state => state.cardsList.isFetching);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (cardPack_ID) dispatch(getCardsTC({cardsPack_id: cardPack_ID, pageCount: 1000000}));
  }, [dispatch, cardPack_ID]);

  if (isFetching) {
    return <MiniSpinner/>;
  }

  return (
    <div>
      <LearnPage cards={cards}/>
    </div>
  );
};