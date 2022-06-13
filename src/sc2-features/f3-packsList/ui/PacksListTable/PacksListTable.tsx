import React, {useState} from 'react';
import s from './PacksListTable.module.css'
import {PacksType} from "../../../../sc1-main/m3-dal/packCards-api";
import {useAppDispatch, useAppSelector} from "../../../../sc1-main/m2-bll/store";
import {Button} from "../../../../sc1-main/m1-ui/common/components/c2-Button/Button";
import {NavLink} from "react-router-dom";
import {PATH} from "../../../../sc1-main/m1-ui/Main/Pages";
import {BeautyDate} from "../../../../sc1-main/m1-ui/common/components/BeautyDate/BeautyDate";
import {
  deleteCardsPackThunk, setCurrentFilterAC,
  sortCardsPackThunk,
  updateCardsPackThunk
} from "../../bll/packsListReducer";
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

  const [activeEditModal, setActiveEditModal] = useState(false);
  const [activeDeleteModal, setActiveDeleteModal] = useState(false);
  const [id, setId] = useState<string>('');

  const userId = useAppSelector<string>(state => state.profile.user._id);
  const currentFilter = useAppSelector(state => state.packsList.filter);
  const dataPack = useAppSelector<PacksType[]>(store => store.packsList.cardPacks);

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

  //фильтрация колод по типу (тип передаем в виде строки)
  const sortCardsByTypeHandler = (sortType: string) => {
    if (currentFilter === "0" + sortType) {
      dispatch(sortCardsPackThunk('1' + sortType))
    }
    if (currentFilter === "1" + sortType) {
      dispatch(sortCardsPackThunk(''))
    } else {
      dispatch(sortCardsPackThunk('0' + sortType))
    }
  }

  return (
    <div className={s.tableMainBlock}>
      {
        <table>
          <thead className={s.theadStyle}>
          <tr className={s.trStyle}>
            <th>№</th>
            <th onClick={() => sortCardsByTypeHandler('name')}
                style={{cursor: 'pointer'}}>Name {currentFilter === '1name'
              ? '↓'
              : currentFilter === '0name' ? '↑' : ''}</th>
            <th onClick={() => sortCardsByTypeHandler('cardsCount')}
                style={{cursor: 'pointer'}}>Cards {currentFilter === '1cardsCount'
              ? '↓'
              : currentFilter === '0cardsCount' ? '↑' : ''}</th>
            <th onClick={() => sortCardsByTypeHandler('updated')}
                style={{cursor: 'pointer'}}>Last Updated {currentFilter === '1updated'
              ? '↓'
              : currentFilter === '0updated' ? '↑' : ''}
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
                    {el.user_id === userId &&
						<Button onClick={() => deletePackCardsHandler(el._id, el.name)}
								style={{margin: '5px 5px'}}
								red>Delete</Button>}
                    {el.user_id === userId &&
						<Button onClick={() => editHandler(el._id, el.name)}
								style={{margin: '5px 5px'}}>Edit</Button>}
                    <Button onClick={() => learnHandler(el._id, el.name)}
                            style={{margin: '5px 5px'}}>Learn</Button>
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
