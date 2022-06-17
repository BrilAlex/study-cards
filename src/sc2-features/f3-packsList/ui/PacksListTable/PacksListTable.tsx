import React, {useState} from 'react';
import s from './PacksListTable.module.css'
import {PacksType} from "../../../../sc1-main/m3-dal/packCards-api";
import {useAppDispatch, useAppSelector} from "../../../../sc1-main/m2-bll/store";
import {Button} from "../../../../sc1-main/m1-ui/common/components/c2-Button/Button";
import {NavLink, useNavigate} from "react-router-dom";
import {PATH} from "../../../../sc1-main/m1-ui/Main/Pages";
import {BeautyDate} from "../../../../sc1-main/m1-ui/common/components/BeautyDate/BeautyDate";
import {
  ActiveSortType,
  deleteCardsPackThunk, setActiveSortAC, setSearchResultAC,
  sortCardsPackThunk,
  updateCardsPackThunk
} from "../../bll/packsListReducer";
import {DeleteModal} from "../ModalWindows/DeleteModal/DeleteModal";
import {EditPackModal} from '../ModalWindows/EditPackModal/EditPackModal';
import {setLearnPackNameAC} from "../../../f5-learn/bll/learnReducer";
import {SortButton} from "../../../../sc1-main/m1-ui/common/components/SortButton/SortButton";

type PacksListTableType = {
  name: string
  onFocusHandler: () => void
  setName: (value: string) => void
}

export const PacksListTable: React.FC<PacksListTableType> = (
  {
    name,
    onFocusHandler,
    setName,
  }
) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [activeEditModal, setActiveEditModal] = useState(false);
  const [activeDeleteModal, setActiveDeleteModal] = useState(false);
  const [id, setId] = useState<string>('');
  const [makePrivate, setMakePrivate] = useState(false);

  const userId = useAppSelector<string>(state => state.profile.user._id);
  const currentFilter = useAppSelector<string>(state => state.packsList.filter);
  const dataPack = useAppSelector<PacksType[]>(store => store.packsList.cardPacks);
  const activeSort = useAppSelector<ActiveSortType>(store => store.packsList.activeSort);
  const isLoading = useAppSelector<boolean>(state => state.app.appIsLoading)

  //ф-ия вызова модального окна при изменении имени колоды
  const editHandler = (id: string, name: string) => {
    dispatch(setSearchResultAC(''));
    setActiveEditModal(true);
    setName(name);
    setId(id);
  }
  //ф-ия вызова модального окна при удалении колоды
  const deletePackCardsHandler = (id: string, name: string) => {
    dispatch(setSearchResultAC(''));
    setActiveDeleteModal(true);
    setId(id);
    setName(name);
  }
  const learnHandler = (id: string, name: string) => {
    dispatch(setLearnPackNameAC(name));
    navigate(PATH.LEARN + id);
  }
  //ф-ия изменения имени колоды и закрытия окна
  const changeName = () => {
    dispatch(updateCardsPackThunk(id, name, makePrivate))
    setActiveEditModal(false);
  }
  //ф-ия удаления колоды и закрытия окна
  const deletePack = () => {
    dispatch(deleteCardsPackThunk(id))
    setActiveDeleteModal(false);
  }

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
    <div className={s.tableMainBlock}>
      {
        <table>
          <thead className={s.theadStyle}>
          <tr className={s.trStyle}>
            <th>№</th>
            <th onClick={() => !isLoading && sortCardsByTypeHandler('name')}>
              Name
              <SortButton isActive={activeSort === 'name'}
                          direction={currentFilter && currentFilter[0]}
                          isFetching={isLoading}/>
            </th>
            <th onClick={() => !isLoading && sortCardsByTypeHandler('cardsCount')}>
              Cards
              <SortButton isActive={activeSort === 'cardsCount'}
                          direction={currentFilter && currentFilter[0]}
                          isFetching={isLoading}/>
            </th>
            <th onClick={() => !isLoading && sortCardsByTypeHandler('updated')}>
              Last Updated
              <SortButton isActive={activeSort === 'updated'}
                          direction={currentFilter && currentFilter[0]}
                          isFetching={isLoading}/>
            </th>
            <th>Created by</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody className={s.tbodyStyle}>
          {dataPack.map((el, index) => {
            return (
              <tr key={el._id}>
                <td>{index + 1}</td>
                <td className={s.nameStyle}>
                  <NavLink to={PATH.CARDS_LIST + el._id}>
                    {el.name}
                  </NavLink>
                </td>
                <td>{el.cardsCount}</td>
                <td><BeautyDate date={el.updated}/></td>
                <td>{el.user_name}</td>
                <td className={s.actions}>
                  <div className={s.buttonBlock}>
                    <Button onClick={() => learnHandler(el._id, el.name)}
                    >Learn</Button>
                    {el.user_id === userId &&
                      <Button onClick={() => editHandler(el._id, el.name)}
                      >Edit</Button>}
                    {el.user_id === userId &&
                      <Button onClick={() => deletePackCardsHandler(el._id, el.name)}
                              red>Delete</Button>}
                  </div>
                </td>
              </tr>
            )
          })}
          </tbody>
        </table>
      }
      <EditPackModal active={activeEditModal}
                     setActive={setActiveEditModal}
                     name={name}
                     inputValue={name}
                     setInputValue={setName}
                     inputFocus={onFocusHandler}
                     changeName={changeName}
                     makePrivate={(isPrivate) => setMakePrivate(isPrivate)}
      />
      <DeleteModal active={activeDeleteModal}
                   setActive={setActiveDeleteModal}
                   name={name}
                   deletePack={deletePack}
      />
    </div>
  );
};
