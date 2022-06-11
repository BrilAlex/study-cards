import React, {useState} from 'react';
import s from './PacksListTable.module.css'
import {PacksType} from "../../../../sc1-main/m3-dal/packCards-api";
import {useAppDispatch, useAppSelector} from "../../../../sc1-main/m2-bll/store";
import {Button} from "../../../../sc1-main/m1-ui/common/components/c2-Button/Button";
import {NavLink} from "react-router-dom";
import {PATH} from "../../../../sc1-main/m1-ui/Main/Pages";
import {BeautyDate} from "../../../../sc1-main/m1-ui/common/components/BeautyDate/BeautyDate";
import {deleteCardsPackThunk, updateCardsPackThunk} from "../../bll/packsListReducer";
import {EditModal} from "../../../f2-profile/ui/EditModal/EditModal";
import {DeleteModal} from "../ModalWindows/DeleteModal/DeleteModal";

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
  const dispatch = useAppDispatch();

  const [activeDeleteModal, setActiveDeleteModal] = useState(false);
  const [activeEditModal, setActiveEditModal] = useState(false);
  const [id, setId] = useState<string>('');

  const userId = useAppSelector<string>(state => state.profile.user._id);
  const dataPack = useAppSelector<PacksType[]>(store => store.packsList.cardPacks);
  const columnName = useAppSelector<string[]>(store => store.packsList.columnName);

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
  const learnHandler = (id: string, name: string) => {
    alert('learnHandler in development...')
  }
  //ф-ия изменения имени колоды и закрытия окна
  const changeName = () => {
    dispatch(updateCardsPackThunk(id, name))
    setActiveEditModal(false);
  }
  //ф-ия удаления колоды и закрытия окна
  const deletePack = () => {
    dispatch(deleteCardsPackThunk(id))
    setActiveDeleteModal(false);
  }

  return (
    <div className={s.tableMainBlock}>
      {
        <table>
          <thead className={s.theadStyle}>
          <tr className={s.trStyle}>
            {columnName.map((name, index) => {
              return <th key={`${index}-${name}`}>
                {name.toUpperCase()}
              </th>
            })}
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
                    {el.user_id === userId &&
                      <Button onClick={() => deletePackCardsHandler(el._id, el.name)} red>Delete</Button>}
                    {el.user_id === userId &&
                      <Button onClick={() => editHandler(el._id, el.name)}>Edit</Button>}
                    <Button onClick={() => learnHandler(el._id, el.name)}>Learn</Button>
                  </div>
                </td>
              </tr>
            )
          })}
          </tbody>
        </table>
      }
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
    </div>
  );
};
