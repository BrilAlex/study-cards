import React, {useEffect, useState} from 'react';
import s from './PacksList.module.css'
import {PacksType} from "../../../sc1-main/m3-dal/packCards-api";
import {Button} from "../../../sc1-main/m1-ui/common/components/c2-Button/Button";
import {DoubleRange} from "../../../sc1-main/m1-ui/common/components/DoubleRange/DoubleRange";
import {useAppDispatch, useAppSelector} from "../../../sc1-main/m2-bll/store";
import {
  addNewPackThunk,
  deleteCardsPackThunk,
  getCardsPackThunk,
  updateCardsPackThunk,
  setCurrentPageCardPacksAC
} from "../bll/packsListReducer";
import {Packs} from "./Packs/Packs";
import {MiniSpinner} from "../../../sc1-main/m1-ui/common/components/MiniSpinner/MiniSpinner";
import {Navigate} from "react-router-dom";
import {PATH} from "../../../sc1-main/m1-ui/Main/Pages";
import {EditModal} from "../../f2-profile/ui/EditModal/EditModal";
import {DeleteModal} from './ModalWindows/DeleteModal/DeleteModal';
import {AddPackModal} from "./ModalWindows/AddPackModal/AddPackModal";
import {Paginator} from "./Paginator/Paginator";
import {DebounceSearch} from "./DebounceSearch/DebounceSearch";

export const PacksList = () => {

  const dispatch = useAppDispatch();

  const [value, setValue] = useState([0, 100]);
  const [name, setName] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [activeEditModal, setActiveEditModal] = useState(false);
  const [activeDeleteModal, setActiveDeleteModal] = useState(false);
  const [activeAddPackModal, setActiveAddPackModal] = useState(false);
  const [makePrivate, setMakePrivate] = useState(false);

  const packData = useAppSelector<PacksType[]>(store => store.packsList.cardPacks);
  const isLoading = useAppSelector<boolean>(store => store.packsList.isLoading);
  const userNameStore = useAppSelector<string>(store => store.profile.user.name);
  const currentPage = useAppSelector<number>(store => store.packsList.page);
  const pageSize = useAppSelector<number>(store => store.packsList.pageCount);
  const totalCountPage = useAppSelector<number>(store => store.packsList.cardPacksTotalCount);

  useEffect(() => {
    dispatch(getCardsPackThunk(currentPage));
  }, [dispatch, currentPage]);

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
  //ф-ия изменения имени колоды и закрытия окна
  const addPack = () => {
    dispatch(addNewPackThunk(name, makePrivate));
    setActiveAddPackModal(false);
  }
  //ф-ия изменения имени колоды и закрытия окна
  const changeName = () => {
    dispatch(updateCardsPackThunk(id, name))
    setActiveEditModal(false);
  }
  //ф-ия вызова модального окна при изменении имени колоды
  const editHandler = (id: string, name: string) => {
    setActiveEditModal(true);
    setName(name);
    setId(id);
  }
  //ф-ия вызова модального окна при удалении колоды
  const deletePackCardsHandler = (id: string, name: string) => {
    setActiveDeleteModal(true);
    setId(id);
    setName(name);
  }
  //ф-ия удаления колоды и закрытия окна
  const deletePack = () => {
    dispatch(deleteCardsPackThunk(id))
    setActiveDeleteModal(false);
  }

  if (!userNameStore) {
    return <Navigate to={PATH.LOGIN}/>;
  }

  return (<>
      <div className={s.mainBlock}>
        <section className={s.settingsSide}>
          <h2>Show packs cards</h2>
          <div className={s.userChooseButton}>
            <span className={s.active}>MY</span>
            <span className={s.inactive}>ALL</span>
          </div>
          <h4 style={{margin: "20px"}}>Number of cards</h4>
          <DoubleRange min={0} max={100} valueArr={value} setValueArr={setValue}/>
          <h2>{value[0] > 10 || value[1] < 90 ? 'in developing...' : ''}</h2>
        </section>
        <section className={s.packList}>
          <h1>PacksList</h1>
          <div className={s.searchHeader}>
            <DebounceSearch/>
            <Button onClick={addCardsPackHandler}>Add new pack</Button>
          </div>
          <div className={s.cardsPackTable}>
            <div className={s.tableHeader}>
              <div style={{width: "20%"}}>Name</div>
              <div style={{width: "16%"}}>Cards</div>
              <div style={{width: "24%"}}>Last Updated</div>
              <div style={{width: "30%"}}>Created by</div>
              <div style={{width: "17%"}}>Actions</div>
            </div>
            {isLoading ? <MiniSpinner customSizeStyle={s.spinnerSize}/> : packData.map(el => {
              return (
                <div key={el._id} className={s.tableString}>
                  <Packs dataPack={el}
                         editHandler={() => editHandler(el._id, el.name)}
                         deletePackCardsHandler={() => deletePackCardsHandler(el._id, el.name)}/>
                </div>
              )
            })}
          </div>
          <Paginator totalItemCount={totalCountPage}
                     currentPage={currentPage}
                     pageSize={pageSize}
                     spanClick={changePageHandler}
          />
        </section>
      </div>
      <EditModal active={activeEditModal}
                 setActive={setActiveEditModal}
                 name={name}
                 inputValue={name}
                 setInputValue={setName}
                 inputFocus={onFocusHandler}
                 changeName={changeName}
      />
      <DeleteModal active={activeDeleteModal}
                   setActive={setActiveDeleteModal}
                   name={name}
                   deletePack={deletePack}
      />
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
