import {AppThunkType} from "../../../sc1-main/m2-bll/store";
import {packCardsApi, PacksType} from "../../../sc1-main/m3-dal/packCards-api";
import {handleAppRequestError} from "../../../sc3-utils/errorUtils";
import {setAppIsLoadingAC} from "../../../sc1-main/m2-bll/appReducer";

// Types
type InitStateType = typeof initState;
type GetCardsPackActionType =
    ReturnType<typeof setCardsPackAC> |
    ReturnType<typeof loadingCardsPackAC> |
    ReturnType<typeof setCardPacksTotalCountAC> |
    ReturnType<typeof setCurrentPageCardPacksAC> |
    ReturnType<typeof setMaxMinCardsCountAC> |
    ReturnType<typeof setCurrentFilterAC>
export type PacksListActionsType = GetCardsPackActionType


// Initial state
const initState = {
    cardPacks: [] as PacksType[],
    pageCount: 10,
    cardPacksTotalCount: 0,
    min: 3,
    max: 9,
    cardsCount: {
        maxCardsCount: 0,
        minCardsCount: 0,
    },
    page: 1,
    isLoading: false,
    filter: '' as string,
};

export const packsListReducer = (state: InitStateType = initState, action: PacksListActionsType): InitStateType => {
    switch (action.type) {
        case "packsList/GET-CARDS-PACK":
            return {...state, cardPacks: action.data}
        case "packsList/LOADING-STATUS":
            return {...state, isLoading: action.value}
        case "packsList/SET-CARD-PACKS-TOTAL-COUNT":
            return {...state, cardPacksTotalCount: action.totalCount}
        case "packsList/SET_CURRENT_PAGE":
            return {...state, page: action.page}
        case "packsList/SET-MAX-MIN-CARDS-COUNT":
            return {...state, cardsCount: {maxCardsCount: action.max, minCardsCount: action.min}}
        case "packsList/SET-CURRENT-FILTER":
            return {...state, filter: action.sortPacks}
        default:
            return state;
    }
};

// Action creators
export const setCardsPackAC = (data: PacksType[]) =>
    ({type: "packsList/GET-CARDS-PACK", data} as const);
export const setCardPacksTotalCountAC = (totalCount: number) =>
    ({type: "packsList/SET-CARD-PACKS-TOTAL-COUNT", totalCount} as const);
export const setCurrentPageCardPacksAC = (page: number) =>
    ({type: "packsList/SET_CURRENT_PAGE", page} as const);
export const setMaxMinCardsCountAC = (max: number, min: number) =>
    ({type: "packsList/SET-MAX-MIN-CARDS-COUNT", max, min} as const);
export const loadingCardsPackAC = (value: boolean) =>
    ({type: "packsList/LOADING-STATUS", value} as const);
export const setCurrentFilterAC = (sortPacks: string) =>
    ({type: "packsList/SET-CURRENT-FILTER", sortPacks} as const);

// Thunk creators
export const getCardsPackThunk = (): AppThunkType => (dispatch, getState) => {
    const {pageCount, page} = getState().packsList;
    dispatch(loadingCardsPackAC(true));
    dispatch(setAppIsLoadingAC(true));
    packCardsApi.getCardsPack({pageCount, page})
        .then(res => {
            dispatch(setCardsPackAC(res.cardPacks));
            dispatch(setCardPacksTotalCountAC(res.cardPacksTotalCount));
            dispatch(setMaxMinCardsCountAC(res.maxCardsCount, res.minCardsCount));
        })
        .catch(error => handleAppRequestError(error, dispatch))
        .finally(() => {
            dispatch(loadingCardsPackAC(false));
            dispatch(setAppIsLoadingAC(false));
        })
};

export const getMyCardsPackThunk = (): AppThunkType => (dispatch, getState) => {
    const {_id} = getState().profile.user;
    const {pageCount} = getState().packsList;
    dispatch(setAppIsLoadingAC(true));
    packCardsApi.getCardsPack({user_id: _id, pageCount})
        .then(res => {
            dispatch(setCardsPackAC(res.cardPacks));
            dispatch(setCardPacksTotalCountAC(res.cardPacksTotalCount));
        })
        .catch(error => handleAppRequestError(error, dispatch))
        .finally(() => dispatch(setAppIsLoadingAC(false)));
};

export const searchCardsPackThunk = (packName: string): AppThunkType => (
    dispatch, getState) => {
    const {pageCount} = getState().packsList;
    dispatch(setAppIsLoadingAC(true))
    packCardsApi.getCardsPack({pageCount, packName})
        .then(res => {
            dispatch(setCardsPackAC(res.cardPacks));
            dispatch(setCardPacksTotalCountAC(res.cardPacksTotalCount));
        })
        .catch(error => handleAppRequestError(error, dispatch))
        .finally(() => dispatch(setAppIsLoadingAC(false)));
};

export const sortCardsPackThunk = (sortPacks: string): AppThunkType => (
    dispatch, getState) => {
    const {pageCount} = getState().packsList;
    dispatch(setAppIsLoadingAC(true));
    dispatch(setCurrentFilterAC(sortPacks));
    packCardsApi.getCardsPack({pageCount, sortPacks})
        .then(res => {
            dispatch(setCardsPackAC(res.cardPacks));
            dispatch(setCardPacksTotalCountAC(res.cardPacksTotalCount));
        })
        .catch(error => handleAppRequestError(error, dispatch))
        .finally(() => dispatch(setAppIsLoadingAC(false)));
};

export const addNewPackThunk = (name: string, makePrivate: boolean): AppThunkType => (dispatch => {
    dispatch(setAppIsLoadingAC(true));
    packCardsApi.addNewPack(name, makePrivate)
        .then(() => {
            dispatch(getCardsPackThunk());
        })
        .catch(error => handleAppRequestError(error, dispatch))
        .finally(() => dispatch(setAppIsLoadingAC(false)));
});

export const deleteCardsPackThunk = (id: string): AppThunkType => (dispatch => {
    dispatch(setAppIsLoadingAC(true));
    packCardsApi.deleteCardsPack(id)
        .then(() => {
            dispatch(getCardsPackThunk());
        })
        .catch(error => handleAppRequestError(error, dispatch))
        .finally(() => dispatch(setAppIsLoadingAC(false)));
});

export const updateCardsPackThunk = (id: string, name: string, makePrivate: boolean): AppThunkType => (dispatch => {
    dispatch(setAppIsLoadingAC(true));
    packCardsApi.updateCardsPack(id, name,makePrivate)
        .then(() => {
            dispatch(getCardsPackThunk());
        })
        .catch(error => handleAppRequestError(error, dispatch))
        .finally(() => dispatch(setAppIsLoadingAC(false)))
})

