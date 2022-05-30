import s from "./Snackbar.module.css";
import {useAppDispatch, useAppSelector} from "../../../../m2-bll/store";
import {useEffect} from "react";
import {setAppErrorAC} from "../../../../m2-bll/appReducer";

export const Snackbar = () => {
  const error = useAppSelector<null | string>(state => state.app.appError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timeout_ID = setTimeout(() => {
      dispatch(setAppErrorAC(null));
    }, 3000);
    return () => {
      clearTimeout(timeout_ID);
    }
  }, [dispatch, error]);

  return (
    error ?
      <div className={s.errorSnackbar}>
        {error}
      </div>
      :
      <></>
  );
};