import React, {useEffect, useRef, useState} from 'react';
import {InputText} from "../../../../sc1-main/m1-ui/common/components/c1-InputText/InputText";
import s from './DebounceSearch.module.css'
import {searchCardsPackThunk} from "../../bll/packsListReducer";
import {useAppDispatch} from "../../../../sc1-main/m2-bll/store";

export const DebounceSearch = () => {

  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [info, setInfo] = useState<string>('');
  const [focusInput, setFocusInput] = useState(false);

  useEffect(() => {
    debouncedLogging(searchValue);
  }, [searchValue])

  useEffect(() => {
    if (focusInput) {
      startSearch(searchValue);
    }
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

  return (
    <div className={s.mainContent}>
      <InputText placeholder={"Search..."}
                 value={searchValue}
                 onChangeText={setSearchValue}
                 onFocus={()=> setFocusInput(true)}
                 onBlur={() => setFocusInput(false)}
      />
    </div>
  );
};
