import React, {useState} from 'react';
import s from './PacksListTable.module.css'
import {PacksType} from "../../../../sc1-main/m3-dal/packCards-api";
import {useAppDispatch, useAppSelector} from "../../../../sc1-main/m2-bll/store";
import {Button} from "../../../../sc1-main/m1-ui/common/components/c2-Button/Button";
import {NavLink, useNavigate} from "react-router-dom";
import {PATH} from "../../../../sc1-main/m1-ui/Main/Pages";
import {BeautyDate} from "../../../../sc1-main/m1-ui/common/components/BeautyDate/BeautyDate";
import {
  deleteCardsPackThunk,
  sortCardsPackThunk,
  updateCardsPackThunk
} from "../../bll/packsListReducer";
import {DeleteModal} from "../ModalWindows/DeleteModal/DeleteModal";
import {EditPackModal} from '../ModalWindows/EditPackModal/EditPackModal';
import {setLearnPackNameAC} from "../../../f5-learn/bll/learnReducer";

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

  const sortCardsByNameHandler = () => {
    // let filter;
    // if(currentFilter)
    if (currentFilter === "0name") {
      dispatch(sortCardsPackThunk('1name'))
    }
    if (currentFilter === "1name") {
      dispatch(sortCardsPackThunk(''))
    } else {
      dispatch(sortCardsPackThunk('0name'))
    }
  }
  const sortCardsByUpdatedHandler = () => {
    console.log(currentFilter)
    if (currentFilter === "0updated") {
      dispatch(sortCardsPackThunk('1updated'))
    }
    if (currentFilter === "1updated") {
      dispatch(sortCardsPackThunk(''))
    } else {
      dispatch(sortCardsPackThunk('0updated'))
    }
  }
  const sortCardsByCardsCountHandler = () => {
    if (currentFilter === "0cardsCount") {
      dispatch(sortCardsPackThunk('1cardsCount'))
    } else if (currentFilter === "1cardsCount") {
      dispatch(sortCardsPackThunk(''))
    } else {
      dispatch(sortCardsPackThunk('0cardsCount'))
    }
  }

  return (
    <div className={s.tableMainBlock}>
      {
        <table>
          <thead className={s.theadStyle}>
          <tr className={s.trStyle}>
            <th>№</th>
            <th onClick={sortCardsByNameHandler}
                style={{cursor: 'pointer'}}>Name {currentFilter === '1name'
              ? '↓'
              : currentFilter === '0name' ? '↑' : ''}</th>
            <th onClick={sortCardsByCardsCountHandler}
                style={{cursor: 'pointer'}}>Cards {currentFilter === '1cardsCount'
              ? '↓'
              : currentFilter === '0cardsCount' ? '↑' : ''}</th>
            <th onClick={sortCardsByUpdatedHandler}
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
