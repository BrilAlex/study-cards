import {AppThunkType} from "../../../sc1-main/m2-bll/store";
import {packCardsApi, PacksType} from "../../../sc1-main/m3-dal/packCards-api";
import {handleAppRequestError} from "../../../sc3-utils/errorUtils";
import {setAppIsLoadingAC} from "../../../sc1-main/m2-bll/appReducer";

// Types

enum ActionsTypes {
  getCardsPack = 'packsList/GET-CARDS-PACK',
  loadingStatus = 'packsList/LOADING-STATUS',
  setCardPacksTotalCount = 'packsList/SET-CARD-PACKS-TOTAL-COUNT',
  setCurrentPage = 'packsList/SET-CURRENT-PAGE',
  setMaxMinCardsCount = 'packsList/SET-MAX-MIN-CARDS-COUNT',
  setCurrentFilter = 'packsList/SET-CURRENT-FILTER',
  setViewPacks = 'packsList/SET-VIEW-PACKS',
  setSearchResult = 'packsList/SET-SEARCH-RESULT',
  filterCardsCount = 'packsList/FILTER-CARDS-COUNT',
}

type InitStateType = typeof initState;
type GetCardsPackActionType =
  ReturnType<typeof getCardsPackAC> |
  ReturnType<typeof loadingCardsPackAC> |
  ReturnType<typeof setCardPacksTotalCountAC> |
  ReturnType<typeof setCurrentPageCardPacksAC> |
  ReturnType<typeof setMaxMinCardsCountAC> |
  ReturnType<typeof setCurrentFilterAC> |
  ReturnType<typeof setViewPacksAC> |
  ReturnType<typeof setSearchResultAC> |
  ReturnType<typeof filterCardsCountAC>

export type PacksListActionsType = GetCardsPackActionType

// Initial state
const initState = {
  cardPacks: [] as PacksType[],
  pageCount: 10,
  cardPacksTotalCount: 0,
  min: undefined as number | undefined, // o_O
  max: undefined as number | undefined, // o_O
  cardsCount: {
    maxCardsCount: 0,
    minCardsCount: 0,
  },
  page: 1,
  isLoading: false,
  filter: '0updated' as string,
  isMyPacks: false,
  searchResult: '',
};

export const packsListReducer = (state: InitStateType = initState, action: PacksListActionsType): InitStateType => {
  switch (action.type) {
    case ActionsTypes.getCardsPack:
    case ActionsTypes.loadingStatus:
    case ActionsTypes.setCardPacksTotalCount:
    case ActionsTypes.setCurrentPage:
    case ActionsTypes.setCurrentFilter:
    case ActionsTypes.setViewPacks:
    case ActionsTypes.setSearchResult:
      return {...state, ...action.payload}
    case ActionsTypes.setMaxMinCardsCount:
      return {...state, cardsCount: {maxCardsCount: action.max, minCardsCount: action.min}}
    case ActionsTypes.filterCardsCount:
      return {...state, ...action.cardsCount};
    default:
      return state;
  }
};

// Action creators
export const getCardsPackAC = (cardPacks: PacksType[]) =>
  ({type: ActionsTypes.getCardsPack, payload: {cardPacks}} as const);
export const setCardPacksTotalCountAC = (cardPacksTotalCount: number) =>
  ({type: ActionsTypes.setCardPacksTotalCount, payload: {cardPacksTotalCount}} as const);
export const setCurrentPageCardPacksAC = (page: number) =>
  ({type: ActionsTypes.setCurrentPage, payload: {page}} as const);
export const setMaxMinCardsCountAC = (max: number, min: number) =>
  ({type: ActionsTypes.setMaxMinCardsCount, max, min} as const);
export const loadingCardsPackAC = (isLoading: boolean) =>
  ({type: ActionsTypes.loadingStatus, payload: {isLoading}} as const);
export const setCurrentFilterAC = (filter: string) =>
  ({type: ActionsTypes.setCurrentFilter, payload: {filter}} as const);
export const setViewPacksAC = (isMyPacks: boolean) =>
  ({type: ActionsTypes.setViewPacks, payload: {isMyPacks}} as const);
export const setSearchResultAC = (searchResult: string) =>
  ({type: ActionsTypes.setSearchResult, payload: {searchResult}} as const);
export const filterCardsCountAC = (min: number, max: number) =>
  ({type: ActionsTypes.filterCardsCount, cardsCount: {min, max}} as const);

// Thunk creators
export const getCardsPackThunk = (): AppThunkType => (dispatch, getState) => {
  const {pageCount, page, filter, isMyPacks, searchResult, min, max} = getState().packsList;
  const {_id} = getState().profile.user;
  const user_id = isMyPacks ? _id : '';
  const packName = searchResult ? searchResult : '';
  dispatch(loadingCardsPackAC(true));
  dispatch(setAppIsLoadingAC(true));
  packCardsApi.getCardsPack({
    pageCount,
    page,
    sortPacks: filter,
    user_id,
    packName,
    min,
    max,
  })
    .then(res => {
      dispatch(getCardsPackAC(res.cardPacks));
      dispatch(setCardPacksTotalCountAC(res.cardPacksTotalCount));
      dispatch(setMaxMinCardsCountAC(res.maxCardsCount, res.minCardsCount));
      if (!min && !max) {
        dispatch(filterCardsCountAC(res.minCardsCount, res.maxCardsCount));
      }
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
  dispatch(setSearchResultAC(''));
  dispatch(setCurrentFilterAC('0updated'));
  packCardsApi.getCardsPack({user_id: _id, pageCount})
    .then(res => {
      dispatch(getCardsPackAC(res.cardPacks));
      dispatch(setCardPacksTotalCountAC(res.cardPacksTotalCount));
    })
    .catch(error => handleAppRequestError(error, dispatch))
    .finally(() => dispatch(setAppIsLoadingAC(false)));
};

export const searchCardsPackThunk = (packName: string): AppThunkType => (
  dispatch, getState) => {
  const {pageCount, isMyPacks} = getState().packsList;
  const {_id} = getState().profile.user;
  const user_id = isMyPacks ? _id : '';
  dispatch(setAppIsLoadingAC(true))
  packCardsApi.getCardsPack({pageCount, packName, user_id})
    .then(res => {
      dispatch(getCardsPackAC(res.cardPacks));
      dispatch(setCardPacksTotalCountAC(res.cardPacksTotalCount));
    })
    .catch(error => handleAppRequestError(error, dispatch))
    .finally(() => dispatch(setAppIsLoadingAC(false)));
};

export const sortCardsPackThunk = (sortPacks: string): AppThunkType => (
  dispatch, getState) => {
  const {pageCount, isMyPacks, searchResult} = getState().packsList;
  const packName = searchResult ? searchResult : '';
  const {_id} = getState().profile.user;
  const user_id = isMyPacks ? _id : '';
  dispatch(setAppIsLoadingAC(true));
  dispatch(setCurrentFilterAC(sortPacks));
  packCardsApi.getCardsPack({pageCount, sortPacks, user_id, packName})
    .then(res => {
      dispatch(getCardsPackAC(res.cardPacks));
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
  packCardsApi.updateCardsPack(id, name, makePrivate)
    .then(() => {
      dispatch(getCardsPackThunk());
    })
    .catch(error => handleAppRequestError(error, dispatch))
    .finally(() => dispatch(setAppIsLoadingAC(false)))
})

