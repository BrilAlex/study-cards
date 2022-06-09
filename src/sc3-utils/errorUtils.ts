import {setAppErrorAC} from "../sc1-main/m2-bll/appReducer";
import {Dispatch} from "redux";
import axios, {AxiosError} from "axios";

export const handleAppRequestError = (error: Error | AxiosError, dispatch: Dispatch) => {
  let errorMessage = axios.isAxiosError(error)
    ? (error.response?.data as { error: string }).error
    : error.message + ', more details in the console';

  console.log('Error: ', errorMessage);
  dispatch(setAppErrorAC(errorMessage));
};
