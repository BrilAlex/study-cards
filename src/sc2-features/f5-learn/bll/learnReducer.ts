import {AppThunkType} from "../../../sc1-main/m2-bll/store";
import {setAppIsLoadingAC} from "../../../sc1-main/m2-bll/appReducer";
import {learnAPI, UpdateGradeDataType} from "../dal/learnApi";
import {handleAppRequestError} from "../../../sc3-utils/errorUtils";
import {setIsFetchingCards, updateCardsDataAC} from "../../f4-cardsList/bll/cardsListReducer";

// Types
type InitStateType = typeof initState;
type ActionType =
  | ReturnType<typeof setLearnPackNameAC>;
export type LearnActionsType = ActionType;


// Initial state
const initState = {
  cardsPackName: "",
};

// Action creators
export const setLearnPackNameAC = (cardsPackName: string) =>
  ({type: "learn/SET-LEARN-PACK-DATA", cardsPackName} as const);

// Thunk creators
export const gradeCardTC = (data: UpdateGradeDataType): AppThunkType => (dispatch) => {
  dispatch(setAppIsLoadingAC(true));
  dispatch(setIsFetchingCards(true));
  learnAPI.gradeCard(data)
    .then(data => {
      console.log("Updated grade data: ", data);
      dispatch(updateCardsDataAC(data.updatedGrade));
    })
    .catch(error => {
      handleAppRequestError(error, dispatch);
    })
    .finally(() => {
      dispatch(setAppIsLoadingAC(false));
      dispatch(setIsFetchingCards(false));
    });
};

export const learnReducer = (state: InitStateType = initState, action: LearnActionsType): InitStateType => {
  switch (action.type) {
    case "learn/SET-LEARN-PACK-DATA":
      return {...state, cardsPackName: action.cardsPackName};
    default:
      return state;
  }
};
