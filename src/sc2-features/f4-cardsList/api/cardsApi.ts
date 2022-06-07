import {instance} from "../../../sc1-main/m3-dal/instance";

export type GetCardsQueryParams = {
  cardsPack_id: string
  cardAnswer?: string
  cardQuestion?: string
  min?: number
  max?: number
  sortCards?: string
  page?: number
  pageCount?: number
};

export type CardType = {
  _id: string
  cardsPack_id: string
  user_id: string
  question: string
  answer: string
  grade: 0
  shots: 0
  comments: string
  type: string
  rating: 0
  more_id: string
  created: string
  updated: string
  __v: 0
  answerImg: string
  answerVideo: string
  questionImg: string
  questionVideo: string
}

export type NewCardDataType = {
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

export type UpdateCardModelType = {_id: string} & Partial<Omit<CardType, "_id">>;

export type GetCardsResponseDataType = {
  cards: Array<CardType>
  packUserId: string
  cardsTotalCount: number
  maxGrade: number
  minGrade: number
  page: number
  pageCount: number
};

export const cardsAPI = {
  getCards(params: GetCardsQueryParams) {
    return instance.get<GetCardsResponseDataType>("cards/card", {params})
      .then(response => response.data);
  },
  createCard(newCard: NewCardDataType) {
    return instance.post("cards/card", {card: newCard})
      .then(response => response.data);
  },
  deleteCard(id: string) {
    return instance.delete("cards/card", {params: {id}})
      .then(response => response.data);
  },
  updateCard(cardModel: UpdateCardModelType) {
    return instance.put("cards/card", {card: cardModel})
      .then(response => response.data);
  },
};