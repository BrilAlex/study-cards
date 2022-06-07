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


export const packCardsApi = {
    getAllCards() {
        return instance.get<cardPacksDataType>(`/cards/pack`)
            .then(res => {
                console.log(res)
                return res.data
            })
    },
    addNewPack() {
        return instance.post<cardPacksDataType>(`/cards/pack`, {cardsPack: {}})
    },
    deleteCardsPack(id: string) {
        return instance.delete<cardPacksDataType>(`/cards/pack/?id=${id}`)
    },
    updateCardsPack(_id: string, name: string) {
        return instance.put<cardPacksDataType>(`/cards/pack`, {cardsPack: {_id, name}})
    },
}
