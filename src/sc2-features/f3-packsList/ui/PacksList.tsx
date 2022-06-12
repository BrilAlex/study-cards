import React, {useEffect, useState} from 'react';
import s from './PacksList.module.css'
import {Button} from "../../../sc1-main/m1-ui/common/components/c2-Button/Button";
import {DoubleRange} from "../../../sc1-main/m1-ui/common/components/DoubleRange/DoubleRange";
import {useAppDispatch, useAppSelector} from "../../../sc1-main/m2-bll/store";
import {
  addNewPackThunk,
  getCardsPackThunk,
  setCurrentPageCardPacksAC, getMyCardsPackThunk
} from "../bll/packsListReducer";
import {MiniSpinner} from "../../../sc1-main/m1-ui/common/components/MiniSpinner/MiniSpinner";
import {Navigate} from "react-router-dom";
import {PATH} from "../../../sc1-main/m1-ui/Main/Pages";
import {AddPackModal} from "./ModalWindows/AddPackModal/AddPackModal";
import {Paginator} from "./Paginator/Paginator";
import {DebounceSearch} from "./DebounceSearch/DebounceSearch";
import {PacksListTable} from "./PacksListTable/PacksListTable";

export const PacksList = () => {

  const dispatch = useAppDispatch();

  const [value, setValue] = useState([0, 100]);
  const [name, setName] = useState<string>('');
  const [activeAddPackModal, setActiveAddPackModal] = useState(false);
  const [makePrivate, setMakePrivate] = useState(false);
  const [isActivePack, setIsActivePack] = useState(false);

  const userNameStore = useAppSelector<string>(store => store.profile.user.name);
  const isLoading = useAppSelector<boolean>(store => store.packsList.isLoading);
  const currentPage = useAppSelector<number>(store => store.packsList.page);
  const pageSize = useAppSelector<number>(store => store.packsList.pageCount);
  const totalCountPage = useAppSelector<number>(store => store.packsList.cardPacksTotalCount);
  const maxNumberOfCards = useAppSelector<number>(store => store.packsList.cardsCount.maxCardsCount);
  const minNumberOfCards = useAppSelector<number>(store => store.packsList.cardsCount.minCardsCount);

  useEffect(() => {
    dispatch(getCardsPackThunk());
  }, [dispatch, currentPage]);

  useEffect(() => {
    setValue([minNumberOfCards, maxNumberOfCards])
  }, [minNumberOfCards, maxNumberOfCards]);

  const changePageHandler = (page: number) => {
    dispatch(setCurrentPageCardPacksAC(page))
  }
  const onFocusHandler = () => {
    name ? setName(name) : setName("userNameStore")
  }

  //ф-ия вызова модального окна при добавлении колоды
  const addCardsPackHandler = () => {
    setActiveAddPackModal(true)
    setName('pack name')
  }
  const addPack = () => {
    dispatch(addNewPackThunk(name, makePrivate));
    setActiveAddPackModal(false);
  }
  const getMyPackHandler = () => {
    setIsActivePack(true);
    dispatch(getMyCardsPackThunk());
  }
  const getAllPackHandler = () => {
    setIsActivePack(false);
    dispatch(getCardsPackThunk());
  }

  if (!userNameStore) {
    return <Navigate to={PATH.LOGIN}/>;
  }

  return (<>
      <div className={s.mainBlock}>
        <section className={s.settingsSide}>
          <h2>Show packs cards</h2>
          <div className={s.userChooseButton}>
            <span className={isActivePack ? s.active : s.inactive} onClick={getMyPackHandler}>MY</span>
            <span className={isActivePack ? s.inactive : s.active} onClick={getAllPackHandler}>ALL</span>
          </div>
          {isLoading
            ? <MiniSpinner/>
            : <div className={s.rangeBlock}>
              <h3>Number of cards</h3>
              <DoubleRange min={minNumberOfCards} max={maxNumberOfCards} valueArr={value} setValueArr={setValue}/>
              <h2>{value[0] > 10 || value[1] < 90 ? 'Игнат, где мой офер!?' : ''}</h2>
            </div>}
        </section>
        <section className={s.packList}>
          <h1>PacksList</h1>
          <div className={s.searchHeader}>
            <DebounceSearch/>
            <Button onClick={addCardsPackHandler}>Add new pack</Button>
          </div>
          {isLoading
            ? <MiniSpinner customSizeStyle={s.spinnerSize}/>
            : <PacksListTable name={name}
                              setName={setName}
                              onFocusHandler={onFocusHandler}/>
          }
          <Paginator totalItemCount={totalCountPage}
                     currentPage={currentPage}
                     pageSize={pageSize}
                     spanClick={changePageHandler}
          />
        </section>
      </div>
      <AddPackModal active={activeAddPackModal}
                    setActive={setActiveAddPackModal}
                    name={name}
                    inputValue={name}
                    setInputValue={setName}
                    inputFocus={onFocusHandler}
                    addPack={addPack}
                    makePrivate={(isPrivate) => setMakePrivate(isPrivate)}
      />
    </>
  );
};
