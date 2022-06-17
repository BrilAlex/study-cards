import React from 'react';
import s from "./TableHeaders.module.css";
import {SortButton} from "../../../../../sc1-main/m1-ui/common/components/SortButton/SortButton";
import {useAppDispatch, useAppSelector} from "../../../../../sc1-main/m2-bll/store";
import {ActiveSortType, setActiveSortAC, sortCardsPackThunk} from "../../../bll/packsListReducer";

export const TableHeaders = () => {

  const dispatch = useAppDispatch();
  const isLoading = useAppSelector<boolean>(state => state.app.appIsLoading);
  const currentFilter = useAppSelector<string>(state => state.packsList.filter);
  const activeSort = useAppSelector<ActiveSortType>(store => store.packsList.activeSort);

  //фильтрация колод по типу (тип передаем в виде строки)
  const sortCardsByTypeHandler = (sortType: ActiveSortType) => {
    dispatch(setActiveSortAC(sortType));
    if (currentFilter === "0" + sortType) {
      dispatch(sortCardsPackThunk(`1${sortType}`))
    } else {
      dispatch(sortCardsPackThunk(`0${sortType}`))
    }
  }

  return (
    <thead>
    <tr className={s.trStyle}>
      <th>№</th>
      <th>
        <div className={s.sortBlock}
             onClick={() => !isLoading && sortCardsByTypeHandler('name')}>
          Name
          <SortButton isActive={activeSort === 'name'}
                      direction={currentFilter && currentFilter[0]}
                      isFetching={isLoading}/>
        </div>
      </th>
      <th>
        <div className={s.sortBlock}
             onClick={() => !isLoading && sortCardsByTypeHandler('cardsCount')}>
          Cards
          <SortButton isActive={activeSort === 'cardsCount'}
                      direction={currentFilter && currentFilter[0]}
                      isFetching={isLoading}/>
        </div>
      </th>
      <th>
        <div className={s.sortBlock}
             onClick={() => !isLoading && sortCardsByTypeHandler('updated')}>
          Last Updated
          <SortButton isActive={activeSort === 'updated'}
                      direction={currentFilter && currentFilter[0]}
                      isFetching={isLoading}/>
        </div>
      </th>
      <th>Created by</th>
      <th>Actions</th>
    </tr>
    </thead>
  );
};
