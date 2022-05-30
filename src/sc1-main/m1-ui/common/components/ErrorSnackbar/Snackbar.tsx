import s from "./Snackbar.module.css";
import {useAppSelector} from "../../../../m2-bll/store";

export const Snackbar = () => {
  const error = useAppSelector<null | string>(state => state.app.appError);

  return (
    error ?
      <div className={s.errorSnackbar}>
        {error}
      </div>
      :
      <></>
  );
};