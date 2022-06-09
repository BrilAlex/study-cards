import React, {useState} from 'react';
import {BeautyDate} from "../../../../sc1-main/m1-ui/common/components/BeautyDate/BeautyDate";
import {PacksType} from "../../../../sc1-main/m3-dal/packCards-api";
import {NavLink} from "react-router-dom";
import {PATH} from "../../../../sc1-main/m1-ui/Main/Pages";
import {Button} from "../../../../sc1-main/m1-ui/common/components/c2-Button/Button";
import {useAppDispatch, useAppSelector} from "../../../../sc1-main/m2-bll/store";
import s from './Packs.module.css'
import {DeleteModal} from "../ModalWindows/DeleteModal/DeleteModal";
import {deleteCardsPackThunk, updateCardsPackThunk} from "../../bll/packsListReducer";
import {EditModal} from "../../../f2-profile/ui/EditModal/EditModal";


type PacksPropsType = {
  name: string
  onFocusHandler: () => void
  setName: (value: string) => void
}

export const Packs: React.FC<PacksPropsType> = (
  {
    name,
    setName,
    onFocusHandler,
  }) => {

  const dispatch = useAppDispatch();

  const [activeDeleteModal, setActiveDeleteModal] = useState(false);
  const [activeEditModal, setActiveEditModal] = useState(false);
  const [id, setId] = useState<string>('');

  const userId = useAppSelector<string>(state => state.profile.user._id);
  const dataPack = useAppSelector<PacksType[]>(store => store.packsList.cardPacks);

  //ф-ия вызова модального окна при изменении имени колоды
  const editHandler = (id: string, name: string) => {
    setActiveEditModal(true);
    setName(name);
    setId(id);
  }
  //ф-ия изменения имени колоды и закрытия окна
  const changeName = () => {
    dispatch(updateCardsPackThunk(id, name))
    setActiveEditModal(false);
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

  return (
    <>
      <div className={s.cardsPackTable}>
        <div className={s.tableHeader}>
          <div style={{width: "20%"}}>Name</div>
          <div style={{width: "16%"}}>Cards</div>
          <div style={{width: "24%"}}>Last Updated</div>
          <div style={{width: "30%"}}>Created by</div>
          <div style={{width: "17%"}}>Actions</div>
        </div>
        {dataPack.map(el => {
          return (
            <div key={el._id} className={s.tableString}>
              <div style={{width: "20%"}}>
                <NavLink to={PATH.CARDS_LIST + el._id}>
                  {el.name}
                </NavLink>
              </div>
              <div style={{width: "2%"}}>{el.cardsCount}</div>
              <div style={{width: "30%"}}><BeautyDate date={el.updated}/></div>
              <div style={{width: "18%"}}>{el.user_name}</div>
              <div style={{width: "30%"}}>
                <div className={s.buttonBlock}>
                  <Button onClick={() => deletePackCardsHandler(el._id, el.name)} red={true}
                          disabled={!(el.user_id === userId)}>Delete</Button>
                  <Button onClick={() => editHandler(el._id, el.name)} disabled={!(el.user_id === userId)}>Edit</Button>
                </div>
              </div>
            </div>
          )
        })}
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
    </>
  );
};
