import {AppThunkType} from "../../../sc1-main/m2-bll/store";
import {CardType} from "../../../sc1-main/m3-dal/cardsApi";
import {setAppIsLoadingAC} from "../../../sc1-main/m2-bll/appReducer";
import {learnAPI, UpgradeGradeDataType} from "../dal/learnApi";
import {handleAppRequestError} from "../../../sc3-utils/errorUtils";

// Types
type InitStateType = typeof initState;
type ActionType =
  | ReturnType<typeof setLearnPackDataAC>
  | ReturnType<typeof setLearnCardDataAC>;
export type LearnActionsType = ActionType;


// Initial state
const initState = {
  cardsPack_ID: "",
  cardsPackName: "",
  card: {} as CardType,
  isFetching: true,
};

// Action creators
export const setLearnPackDataAC = (cardsPackData: { cardsPack_ID: string, cardsPackName: string }) =>
  ({type: "learn/SET-LEARN-PACK-DATA", cardsPackData} as const);
export const setLearnCardDataAC = (card: CardType) =>
  ({type: "learn/SET-LEARN-CARD-DATA", card} as const);

// Thunk creators
export const gradeCardTC = (data: UpgradeGradeDataType): AppThunkType => (dispatch) => {
  console.log(data);
  dispatch(setAppIsLoadingAC(true));
  learnAPI.gradeCard(data)
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      handleAppRequestError(error, dispatch);
    })
    .finally(() => {
      dispatch(setAppIsLoadingAC(false));
    });
};

export const learnReducer = (state: InitStateType = initState, action: LearnActionsType): InitStateType => {
  switch (action.type) {
    case "learn/SET-LEARN-PACK-DATA":
      return {...state, ...action.cardsPackData};
    case "learn/SET-LEARN-CARD-DATA":
      return {...state, card: action.card};
    default:
      return state;
  }
};