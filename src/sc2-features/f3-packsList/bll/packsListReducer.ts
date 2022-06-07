import {AppThunkType} from "../../../sc1-main/m2-bll/store";
import {packCardsApi, PacksType} from "../../../sc1-main/m3-dal/packCards-api";
import {setAppErrorAC} from "../../../sc1-main/m2-bll/appReducer";

// Types
type InitStateType = typeof initState;
type GetCardsPackActionType =
    ReturnType<typeof setCardsPackAC> |
    ReturnType<typeof loadingCardsPackAC>
export type PacksListActionsType = GetCardsPackActionType


// Initial state
const initState = {
    cardPacks: [] as PacksType[],
    isLoading: false,
};

// Action creators
export const setCardsPackAC = (data: PacksType[]) =>
    ({type: "packsList/GET-CARDS-PACK", data} as const);
export const loadingCardsPackAC = (value: boolean) =>
    ({type: "packsList/LOADING-STATUS", value} as const);

// Thunk creators
export const getCardsPackThunk = (): AppThunkType => (dispatch) => {
    dispatch(loadingCardsPackAC(true));
    packCardsApi.getAllCards()
        .then(res => {
            dispatch(setCardsPackAC(res.cardPacks));
        })
        .catch(e => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            console.log('Error: ', error);
            dispatch(setAppErrorAC(error));
        }).finally(() => dispatch(loadingCardsPackAC(false)));
};

export const addNewPackThunk = (): AppThunkType => (dispatch => {
    dispatch(loadingCardsPackAC(true));
    packCardsApi.addNewPack()
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

export const packsListReducer = (state: InitStateType = initState, action: PacksListActionsType): InitStateType => {
    switch (action.type) {
        case "packsList/GET-CARDS-PACK":
            return {...state, cardPacks: action.data}
        case "packsList/LOADING-STATUS":
            return {...state, isLoading: action.value}
        default:
            return state;
    }
};