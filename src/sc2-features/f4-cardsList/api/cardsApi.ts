import {instance} from "../../../sc1-main/m3-dal/instance";

export type CardsListItemType = {
  _id: string
  cardsPack_id: string
  question: string
  answer: string
  grade: number
  shots: number
  user_id: string
  created: string
  updated: string
};

type CardType = {
  _id: string
  question: string
  comments: string
}

export type CardRequestDataType = {
  cardsPack_id: string
  question?: string
  answer?: string
  grade?: number
  shots?: number
  answerImg?: string
  questionImg?: string
  questionVideo?: string
  answerVideo?: string
};

export type CardsResponseDataType = {
  cards: Array<CardsListItemType>
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
  packUserId: string
};

export const cardsAPI = {
  getCards(pack_ID: string) {
    return instance.get<CardsResponseDataType>("/cards/card", {params: {cardsPack_id: pack_ID}});
  },
  createCard(newCard: CardRequestDataType) {
    return instance.post("/cards/card", {card: newCard});
  },
  deleteCard(id: string) {
    return instance.delete("cards/card", {params: {id}});
  },
  updateCard(cardModel: CardType) {
    return instance.put("cards/card", {card: cardModel});
  },
};