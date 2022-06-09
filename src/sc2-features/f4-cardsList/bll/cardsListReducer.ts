import {AppStateType, AppThunkType} from "../../../sc1-main/m2-bll/store";
import {setAppIsLoadingAC} from "../../../sc1-main/m2-bll/appReducer";
import {
  cardsAPI,
  CardType,
  GetCardsQueryParams, GetCardsResponseDataType,
  NewCardDataType,
  UpdateCardModelType
} from "../../../sc1-main/m3-dal/cardsApi";
import {handleAppRequestError} from "../../../sc3-utils/errorUtils";

// Types
type InitStateType = typeof initState;
export type CardsListActionsType =
  | ReturnType<typeof setCardsDataAC>
  | ReturnType<typeof setCurrentPageCardsListAC>;

// Initial state
const initState = {
  cards: null as null | Array<CardType>,
  packUserId: undefined as undefined | string,
  cardsTotalCount: 0,
  maxGrade: 0,
  minGrade: 5,
  page: 1,
  pageCount: 5,
  cardAnswer: undefined as undefined | string,
  cardQuestion: undefined as undefined | string,
  sortCards: '0updated',
};

// Action creators
export const setCardsDataAC = (data: GetCardsResponseDataType) =>
  ({type: "cardsList/SET-CARDS", payload: data} as const);
export const setCurrentPageCardsListAC = (page: number) =>
  ({type: "cardsList/SET_CURRENT_PAGE", page} as const);

// Thunk creators
export const getCardsTC = (cardsPack_ID: string): AppThunkType => (dispatch, getState: () => AppStateType) => {
  const {
    cardAnswer,
    cardQuestion,
    minGrade,
    maxGrade,
    sortCards,
    page,
    pageCount,
  } = getState().cardsList;

  const queryParams: GetCardsQueryParams = {
    cardsPack_id: cardsPack_ID,
    cardAnswer,
    cardQuestion,
    min: minGrade,
    max: maxGrade,
    sortCards,
    page,
    pageCount,
  };
  console.log("Query params", queryParams);

  dispatch(setAppIsLoadingAC(true));
  cardsAPI.getCards(queryParams)
    .then(data => {
      console.log(data);
      dispatch(setCardsDataAC(data));
    })
    .catch(error => {
      handleAppRequestError(error, dispatch);
    })
    .finally(() => {
      dispatch(setAppIsLoadingAC(false));
    });
};
export const addNewCardTC = (newCard: NewCardDataType): AppThunkType => (dispatch) => {
  dispatch(setAppIsLoadingAC(true));
  cardsAPI.createCard(newCard)
    .then((data) => {
      console.log(data);
      dispatch(getCardsTC(newCard.cardsPack_id));
    })
    .catch(error => {
      handleAppRequestError(error, dispatch);
    })
    .finally(() => {
      dispatch(setAppIsLoadingAC(false));
    });
};
export const deleteCardTC = (cardsPack_ID: string, card_ID: string): AppThunkType => (dispatch) => {
  dispatch(setAppIsLoadingAC(true));
  cardsAPI.deleteCard(card_ID)
    .then((data) => {
      console.log(data);
      dispatch(getCardsTC(cardsPack_ID));
    })
    .catch(error => {
      handleAppRequestError(error, dispatch);
    })
    .finally(() => {
      dispatch(setAppIsLoadingAC(false));
    });
};
export const updateCardTC = (cardsPack_ID: string, cardModel: UpdateCardModelType): AppThunkType => (dispatch) => {
  dispatch(setAppIsLoadingAC(true));
  cardsAPI.updateCard(cardModel)
    .then((data) => {
      console.log(data);
      dispatch(getCardsTC(cardsPack_ID));
    })
    .catch(error => {
      handleAppRequestError(error, dispatch);
    })
    .finally(() => {
      dispatch(setAppIsLoadingAC(false));
    });
};

export const cardsListReducer = (state: InitStateType = initState, action: CardsListActionsType): InitStateType => {
  switch (action.type) {
    case "cardsList/SET-CARDS":
      return {...state, ...action.payload};
    case"cardsList/SET_CURRENT_PAGE":
      return {...state, page: action.page};
    default:
      return state;
  }
};
