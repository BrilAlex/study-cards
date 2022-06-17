import React, {FC, useEffect, useState} from "react";
import {InputText} from "../c1-InputText/InputText";

type DebounceSearchPropsType = {
  searchValue: string
  setSearchValue: (value: string) => void
  placeholder?: string
};

export const DebounceSearch: FC<DebounceSearchPropsType> = (
  {searchValue, setSearchValue, placeholder}
) => {
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
      placeholder={placeholder}
      value={inputValue}
      onChangeText={onChangeValue}
    />
  );
};
