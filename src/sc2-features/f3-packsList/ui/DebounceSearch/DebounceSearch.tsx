import React, {useRef, useState} from 'react';
import {InputText} from "../../../../sc1-main/m1-ui/common/components/c1-InputText/InputText";
import s from './DebounceSearch.module.css'
import {searchCardsPackThunk} from "../../bll/packsListReducer";
import {AppThunkType, useAppDispatch} from "../../../../sc1-main/m2-bll/store";

export const DebounceSearch = () => {

  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState('');

  const Debounced = (func: Function, delay: number) => {
    const ref = useRef(0);
    return (args: AppThunkType) => {
      clearTimeout(ref.current);
      ref.current = Number(setTimeout(() => func(args), delay));
    };
  };
  const debounce = Debounced(dispatch, 1000);

  const handleInputEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    debounce(searchCardsPackThunk(e.currentTarget.value));
    setSearchValue(e.currentTarget.value)
  }

  return (
    <div className={s.mainContent}>
      <InputText placeholder={"Search..."}
                 value={searchValue}
                 onChange={handleInputEvent}
      />
    </div>
  );
};
