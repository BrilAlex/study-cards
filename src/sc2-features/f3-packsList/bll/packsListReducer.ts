

// Types
type InitStateType = typeof initState;
type GetCardsPackActionType = ReturnType<typeof getCardsPackAC>;
export type PacksListActionsType = GetCardsPackActionType


// Initial state
const initState = {

};

// Action creators
export const getCardsPackAC = (data: any) =>
  ({type: "packsList/GET-CARDS-PACK", data} as const);

// Thunk creators


export const packsListReducer = (state: InitStateType = initState, action: PacksListActionsType): InitStateType => {
  switch (action.type) {
    default:
      return state;
  }
};
