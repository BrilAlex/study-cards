import {AppThunkType} from "../../../sc1-main/m2-bll/store";
import {packCardsApi, PacksType} from "../../../sc1-main/m3-dal/packCards-api";
import {setAppErrorAC} from "../../../sc1-main/m2-bll/appReducer";

// Types
type InitStateType = typeof initState;
type GetCardsPackActionType =
  ReturnType<typeof setCardsPackAC> |
  ReturnType<typeof loadingCardsPackAC> |
  ReturnType<typeof setCardPacksTotalCountAC> |
  ReturnType<typeof setCurrentPageCardPacksAC> |
  ReturnType<typeof setMaxMinCardsCountAC>
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
  sortPacks: '0updated',
  page: 1,
  isLoading: false,
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

// Thunk creators
export const getCardsPackThunk = (currentPage: number = 1): AppThunkType => (dispatch) => {
  dispatch(loadingCardsPackAC(true));
  packCardsApi.getAllCards(currentPage)
    .then(res => {
      dispatch(setCardsPackAC(res.cardPacks));
      dispatch(setCardPacksTotalCountAC(res.cardPacksTotalCount));
      dispatch(setMaxMinCardsCountAC(res.maxCardsCount, res.minCardsCount));
    })
    .catch(e => {
      const error = e.response
        ? e.response.data.error
        : (e.message + ', more details in the console');
      console.log('Error: ', error);
      dispatch(setAppErrorAC(error));
    }).finally(() => dispatch(loadingCardsPackAC(false)));
};

export const searchCardsPackThunk = (searchValue: string): AppThunkType => (
  dispatch) => {
  dispatch(loadingCardsPackAC(true));
  packCardsApi.searchCards(searchValue)
    .then(res => {
      dispatch(setCardsPackAC(res.cardPacks));
      dispatch(setCardPacksTotalCountAC(res.cardPacksTotalCount));
    })
    .catch(e => {
      const error = e.response
        ? e.response.data.error
        : (e.message + ', more details in the console');
      console.log('Error: ', error);
      dispatch(setAppErrorAC(error));
    }).finally(() => dispatch(loadingCardsPackAC(false)));
};

export const getMyCardsPackThunk = (userId: string): AppThunkType => (
  dispatch) => {
  dispatch(loadingCardsPackAC(true));
  packCardsApi.getMyCards(userId)
    .then(res => {
      dispatch(setCardsPackAC(res.cardPacks));
      dispatch(setCardPacksTotalCountAC(res.cardPacksTotalCount));
    })
    .catch(e => {
      const error = e.response
        ? e.response.data.error
        : (e.message + ', more details in the console');
      console.log('Error: ', error);
      dispatch(setAppErrorAC(error));
    }).finally(() => dispatch(loadingCardsPackAC(false)));
};

export const addNewPackThunk = (name: string, makePrivate: boolean): AppThunkType => (dispatch => {
    dispatch(loadingCardsPackAC(true));
    packCardsApi.addNewPack(name, makePrivate)
        .then(() => {
            dispatch(getCardsPackThunk());
        })
        .catch(e => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            console.log('Error: ', error);
            dispatch(setAppErrorAC(error));
            dispatch(loadingCardsPackAC(false));
        });
});

export const deleteCardsPackThunk = (id: string): AppThunkType => (dispatch => {
    dispatch(loadingCardsPackAC(true));
    packCardsApi.deleteCardsPack(id)
        .then(() => {
            dispatch(getCardsPackThunk());
        })
        .catch(e => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            console.log('Error: ', error);
            dispatch(setAppErrorAC(error));
            dispatch(loadingCardsPackAC(false));
        });
});

export const updateCardsPackThunk = (id: string, name: string): AppThunkType => (dispatch => {
    dispatch(loadingCardsPackAC(true));
    packCardsApi.updateCardsPack(id, name)
        .then(() => {
            dispatch(getCardsPackThunk());
        })
        .catch(e => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            console.log('Error: ', error);
            dispatch(setAppErrorAC(error));
            dispatch(loadingCardsPackAC(false));
        });
})

