import {instance} from "./instance";

export type PacksType = {
  _id: string
  user_id: string
  user_name: string
  private: boolean
  name: string
  path: string
  grade: number
  shots: number
  deckCover: string
  cardsCount: number
  type: string
  rating: number // useless o_O
  created: string // Лёха, тут нужна строка!!!
  updated: string // Лёха, тут нужна строка!!!
  more_id: string
}
export type AddPackType = {
  name: string // если не отправить будет таким
  deckCover: string // не обязателен
  private: boolean
}
export type UpdatePackType = {
  _id: string // если не отправить будет таким
  deckCover: string // не обязателен
  private: boolean
}
export type cardPacksDataType = {
  cardPacks: PacksType[]

  // we need it types ?!
  cardPacksTotalCount: number
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
  token: string
  tokenDeathTime: Date
}

export type requestDataType = {
  pageCount?: number
  page?: number
  packName?: string
  user_id?: string
  sortPacks?: string
  min?: number
  max?: number
}

export const packCardsApi = {
  getCardsPack(requestData: requestDataType) {
    return instance.get<cardPacksDataType>(`/cards/pack`,
      {params: {...requestData}})
      .then(res => {
        return res.data
      })
  },
  addNewPack(name: string, makePrivate: boolean) {
    return instance.post<AddPackType>(`/cards/pack`,
      {cardsPack: {name, private: makePrivate}})
  },
  deleteCardsPack(id: string) {
    return instance.delete<cardPacksDataType>(`/cards/pack/?id=${id}`)
  },
  updateCardsPack(_id: string, name: string, makePrivate: boolean) {
    return instance.put<UpdatePackType>(`/cards/pack`, {cardsPack: {_id, name, private: makePrivate}})
  },
}
