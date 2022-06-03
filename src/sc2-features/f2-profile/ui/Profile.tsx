import React, {useState} from 'react';
import {Button} from "../../../sc1-main/m1-ui/common/components/c2-Button/Button";
import {useAppDispatch, useAppSelector} from "../../../sc1-main/m2-bll/store";
import {updateNameThunk} from "../bll/profileReducer";
import {EditModal} from "./EditModal/EditModal";
import {MiniSpinner} from "../../../sc1-main/m1-ui/common/components/MiniSpinner/MiniSpinner";
import s from './Profile.module.css'
import {Navigate} from "react-router-dom";
import {PATH} from "../../../sc1-main/m1-ui/Main/Pages";
import {DoubleRange} from "../../../sc1-main/m1-ui/common/components/DoubleRange/DoubleRange";
import {Debounce} from "../../../sc1-main/m1-ui/common/components/Debounce/Debounce";

export const Profile = () => {

  const [name, setName] = useState<string>('');
  const [activeModal, setActiveModal] = useState(false);
  const [valueArr, setValueArr] = useState([0, 100]);

  const dispatch = useAppDispatch();
  const userNameStore = useAppSelector<string>(store => store.profile.user.name);
  const userAva = useAppSelector<string | undefined>(store => store.profile.user.avatar);
  const isLoading = useAppSelector<boolean>(state => state.profile.loading);

  const changeName = () => {
    dispatch(updateNameThunk(name, ''));
    setActiveModal(false);
  }
  const editHandler = () => {
    setActiveModal(true);
  }
  const onFocusHandler = () => {
    name ? setName(name) : setName(userNameStore)
  }

  if (!userNameStore) {
    return <Navigate to={PATH.LOGIN}/>;
  }

  return (
    <div className={s.mainBlock}>

      <div className={s.editBlock}>
        <div className={s.edit}>
          <div className={s.profileAva}>
            <img src={userAva ? userAva : 'https://clck.ru/WQq57'} alt="user-ava"/>
          </div>
          {isLoading
            ? <MiniSpinner/>
            : <>
              <div className={s.profileInfo}>
                <h3>{userNameStore}</h3>
                <Button onClick={editHandler}>Edit</Button>
              </div>
            </>
          }
        </div>

        <div className={s.numberCards}>
          <h3>Number of cards</h3>

          <DoubleRange min={0}
                       max={100}
                       valueArr={valueArr}
                       setValueArr={setValueArr}/>
          <h2>{valueArr[0] > 50 || valueArr[1] < 50 ? 'Хватит уже крутить!!!' : ''}</h2>
        </div>

      </div>

      <div className={s.packs}>
        <h1>My packs list</h1>
        <Debounce props={valueArr}/>
      </div>

      <EditModal active={activeModal}
                 setActive={setActiveModal}
                 name={userNameStore}
                 inputValue={name}
                 setInputValue={setName}
                 inputFocus={onFocusHandler}
                 changeName={changeName}
      />

    </div>
  );
};
