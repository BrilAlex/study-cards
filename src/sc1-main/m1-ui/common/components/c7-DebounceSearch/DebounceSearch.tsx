import React, {FC, useEffect, useState} from "react";
import {InputText} from "../c1-InputText/InputText";

type DebounceSearchPropsType = {
  searchValue: string
  setSearchValue: (value: string) => void
};

export const DebounceSearch: FC<DebounceSearchPropsType> = ({searchValue, setSearchValue}) => {
  const [inputValue, setInputValue] = useState<string>(searchValue);

  useEffect(() => {
    const id: number = +setTimeout(() => {
      setSearchValue(inputValue);
    }, 1500);

    return () => {
      clearTimeout(id);
    };
  }, [setSearchValue, inputValue]);

  const onChangeValue = (value: string) => {
    setInputValue(value);
  };

  return (
    <InputText
      placeholder={"Search by pack name..."}
      value={inputValue}
      onChangeText={onChangeValue}
    />
  );
};
