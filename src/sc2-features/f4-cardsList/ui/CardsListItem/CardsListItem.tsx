import {FC} from "react";
import {CardsListItemType} from "../../api/cardsApi";

type CardsListItemPropsType = {
  card: CardsListItemType
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