import {AppThunkType} from "../../../sc1-main/m2-bll/store";
import {setAppErrorAC, setAppIsLoadingAC} from "../../../sc1-main/m2-bll/appReducer";
import {cardsAPI, CardsListItemType} from "../api/cardsApi";

// Types
type InitStateType = typeof initState;
type ActionType = ReturnType<typeof setCardsAC>;
export type CardsListActionsType = ActionType;

// Initial state
const initState = {
  cards: [] as Array<CardsListItemType>,
};

// Action creators
export const setCardsAC = (cards: Array<CardsListItemType>) =>
  ({type: "cards/SET-CARDS", cards} as const);

// Thunk creators
export const getCardsTC = (pack_ID: string): AppThunkType => (dispatch) => {
  dispatch(setAppIsLoadingAC(true));
  cardsAPI.getCards(pack_ID)
    .then(response => {
      console.log(response);
      dispatch(setCardsAC(response.data.cards));
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
      return {...state, cards: action.cards};
    default:
      return state;
  }
};
