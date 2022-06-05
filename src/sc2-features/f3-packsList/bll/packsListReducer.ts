import {AppThunkType} from "../../../sc1-main/m2-bll/store";
import {packCardsApi} from "../../../sc1-main/m3-dal/packCards-api";
import {setAppErrorAC} from "../../../sc1-main/m2-bll/appReducer";

// Types



type InitStateType = typeof initState;
type GetCardsPackActionType = ReturnType<typeof setCardsPackAC>;
export type PacksListActionsType = GetCardsPackActionType


// Initial state
const initState = {

};

// Action creators
export const setCardsPackAC = (data: any) =>
  ({type: "packsList/GET-CARDS-PACK", data} as const);

// Thunk creators
export const getCardsPackThunk = (): AppThunkType => (dispatch) => {
  packCardsApi.getAllCards()
    .then(res => {
      dispatch(setCardsPackAC(res));
    })
    .catch(e => {
      const error = e.response
        ? e.response.data.error
        : (e.message + ', more details in the console');
      console.log('Error: ', error);
      dispatch(setAppErrorAC(error));
    });
};

export const packsListReducer = (state: InitStateType = initState, action: PacksListActionsType): InitStateType => {
  switch (action.type) {
    default:
      return state;
  }
};
