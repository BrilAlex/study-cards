import React, {useEffect, useRef, useState} from 'react';
import {InputText} from "../../../../sc1-main/m1-ui/common/components/c1-InputText/InputText";
import s from './DebounceSearch.module.css'
import {getCardsPackThunk, searchCardsPackThunk} from "../../bll/packsListReducer";
import {useAppDispatch} from "../../../../sc1-main/m2-bll/store";
import {Button} from "../../../../sc1-main/m1-ui/common/components/c2-Button/Button";

export const DebounceSearch = () => {

  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [info, setInfo] = useState<string>('');

  useEffect(() => {
    debouncedLogging(searchValue);
  }, [searchValue])

  useEffect(() => {
    if (searchValue) startSearch(searchValue);
  }, [info])

  const startSearch = (value: string) => {
    dispatch(searchCardsPackThunk(value));
  }
  const Debounced = (func: Function, delay: number) => {
    const ref = useRef(0);
    return (...args: any) => {
      clearTimeout(ref.current);
      ref.current = Number(setTimeout(() => func(...args), delay));
    };
  };

  const debouncedLogging = Debounced(setInfo, 1000);

  const cancelHandler = () => {
    setSearchValue('');
    dispatch(getCardsPackThunk());
  }

  return (
    <div className={s.mainContent}>
      <InputText placeholder={"Search..."}
                 value={searchValue}
                 onChangeText={setSearchValue}
      />
      <Button className={s.buttonStyle}
              onClick={cancelHandler}>Cancel</Button>
    </div>
  );
};