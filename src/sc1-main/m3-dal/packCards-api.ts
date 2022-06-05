import {instance} from "./instance";

export const packCardsApi = {
  getAllCards() {
    return instance.get<any>(`/cards/pack`)
      .then(res => res.data)
  },
}