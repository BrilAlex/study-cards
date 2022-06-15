import {CardType} from "../sc1-main/m3-dal/cardsApi";

export const getRandomCard = (cards: Array<CardType>): CardType => {
  const sum = cards.reduce((acc, card) => acc + ((6 - card.grade) ** 2), 0);
  const randomNumber = Math.random() * sum;
  let s = 0;
  let i = 0;

  while (s < randomNumber) {
    s += (6 - cards[i].grade) ** 2;
    i++;
  }

  console.log("random data:", sum, randomNumber, s ,i);
  console.log("random card:", cards[i - 1]);
  return cards[i - 1];
};
