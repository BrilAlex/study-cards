import {FC} from "react";
import {CardType} from "../../api/cardsApi";

type CardsListItemPropsType = {
  card: CardType
};

export const CardsListItem: FC<CardsListItemPropsType> = (props) => {
  return (
    <>
      <div style={{width: "35%"}}>{props.card.question}</div>
      <div style={{width: "35%"}}>{props.card.answer}</div>
      <div style={{width: "20%"}}>{props.card.updated}</div>
      <div style={{width: "10%"}}>{props.card.grade}</div>
    </>
  );
};