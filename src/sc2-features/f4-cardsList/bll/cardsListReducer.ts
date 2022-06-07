import {AppStateType, AppThunkType} from "../../../sc1-main/m2-bll/store";
import {setAppErrorAC, setAppIsLoadingAC} from "../../../sc1-main/m2-bll/appReducer";
import {
  cardsAPI,
  CardType,
  GetCardsQueryParams, GetCardsResponseDataType,
  NewCardDataType,
  UpdateCardModelType
} from "../api/cardsApi";

// Types
type InitStateType = typeof initState;
type ActionType = ReturnType<typeof setCardsDataAC>;
export type CardsListActionsType = ActionType;

// Initial state
const initState = {
  cards: null as null | Array<CardType>,
  packUserId: undefined as undefined | string,
  cardsTotalCount: undefined as undefined | number,
  maxGrade: undefined as undefined | number,
  minGrade: undefined as undefined | number,
  page: undefined as undefined | number,
  pageCount: undefined as undefined | number,
  cardAnswer: undefined as undefined | string,
  cardQuestion: undefined as undefined | string,
  min: undefined as undefined | number,
  max: undefined as undefined | number,
  sortCards: undefined as undefined | string,
};

// Action creators
export const setCardsDataAC = (data: GetCardsResponseDataType) =>
  ({type: "cards/SET-CARDS", payload: data} as const);

// Thunk creators
export const getCardsTC = (cardsPack_ID: string): AppThunkType => (dispatch, getState: () => AppStateType) => {
  const {cardAnswer, cardQuestion, min, max, sortCards, page, pageCount} = getState().cardsList;
  const queryParams: GetCardsQueryParams = {
    cardsPack_id: cardsPack_ID,
    cardAnswer,
    cardQuestion,
    min,
    max,
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
      const errorMessage = error.response
        ? error.response.data.error
        : (error.message + ', more details in the console');

      console.log('Error: ', errorMessage);
      dispatch(setAppErrorAC(errorMessage));
    })
    .finally(() => {
      dispatch(setAppIsLoadingAC(false));
    });
};
export const addNewCardTC = (cardsPack_ID: string): AppThunkType => (dispatch) => {
  const newCard: NewCardDataType = {
    cardsPack_id: cardsPack_ID,
    question: "Some random question",
  };

  dispatch(setAppIsLoadingAC(true));
  cardsAPI.createCard(newCard)
    .then((data) => {
      console.log(data);
      dispatch(getCardsTC(cardsPack_ID));
    })
    .catch(error => {
      const errorMessage = error.response
        ? error.response.data.error
        : (error.message + ', more details in the console');

      console.log('Error: ', errorMessage);
      dispatch(setAppErrorAC(errorMessage));
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
      const errorMessage = error.response
        ? error.response.data.error
        : (error.message + ', more details in the console');

      console.log('Error: ', errorMessage);
      dispatch(setAppErrorAC(errorMessage));
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
      const errorMessage = error.response
        ? error.response.data.error
        : (error.message + ', more details in the console');

      console.log('Error: ', errorMessage);
      dispatch(setAppErrorAC(errorMessage));
    })
    .finally(() => {
      dispatch(setAppIsLoadingAC(false));
    });
};

export const cardsListReducer = (state: InitStateType = initState, action: CardsListActionsType): InitStateType => {
  switch (action.type) {
    case "cards/SET-CARDS":
      return {...state, ...action.payload};
    default:
      return state;
  }
};
