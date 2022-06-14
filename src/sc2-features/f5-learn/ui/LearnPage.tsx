import commonStyles from "../../../sc1-main/m1-ui/App.module.css";
import {useAppSelector} from "../../../sc1-main/m2-bll/store";
import {CardType} from "../../../sc1-main/m3-dal/cardsApi";
import {useNavigate} from "react-router-dom";
import {Button} from "../../../sc1-main/m1-ui/common/components/c2-Button/Button";
import {PATH} from "../../../sc1-main/m1-ui/Main/Pages";
import {CardPage} from "./CardPage";
import {FC} from "react";

type LearnPagePropsType = {
  cards: Array<CardType>
};

export const LearnPage: FC<LearnPagePropsType> = ({cards}) => {
  const cardPackName = useAppSelector<string>(state => state.learn.cardsPackName);
  const navigate = useNavigate();

  const getRandomCard = (array: Array<CardType>) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };

  const randomCard = getRandomCard(cards);

  const cancelHandler = () => {
    navigate(PATH.PACKS_LIST);
  };

  return (
    <div className={commonStyles.smallContainer}>
      <h1>Learn pack {cardPackName}</h1>
      {
        cards.length === 0 ?
          <div>
            <p>No cards found in this pack</p>
            <Button onClick={cancelHandler}>Chancel</Button>
          </div>
          :
          <CardPage card={randomCard}/>
      }
    </div>
  );
};
