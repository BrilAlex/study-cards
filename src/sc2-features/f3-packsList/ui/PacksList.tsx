import React, {useEffect, useState} from 'react';
import s from './PacksList.module.css'
import {PacksType} from "../../../sc1-main/m3-dal/packCards-api";
import {Button} from "../../../sc1-main/m1-ui/common/components/c2-Button/Button";
import {DoubleRange} from "../../../sc1-main/m1-ui/common/components/DoubleRange/DoubleRange";
import {InputText} from "../../../sc1-main/m1-ui/common/components/c1-InputText/InputText";
import {useAppDispatch, useAppSelector} from "../../../sc1-main/m2-bll/store";
import {addNewPackThunk, getCardsPackThunk, setCurrentPageCardPacksAC} from "../bll/packsListReducer";
import {Packs} from "./Packs/Packs";
import {MiniSpinner} from "../../../sc1-main/m1-ui/common/components/MiniSpinner/MiniSpinner";
import {Navigate} from "react-router-dom";
import {PATH} from "../../../sc1-main/m1-ui/Main/Pages";
import {Paginator} from "./Paginator/Paginator";

export const PacksList = () => {

  const dispatch = useAppDispatch();
  const [value, setValue] = useState([0, 10]);
  const packData = useAppSelector<PacksType[]>(store => store.packsList.cardPacks);
  const isLoading = useAppSelector<boolean>(store => store.packsList.isLoading);
  const currentPage = useAppSelector<number>(store => store.packsList.page);
  const pageSize = useAppSelector<number>(store => store.packsList.pageCount);
  const totalCountPage = useAppSelector<number>(store => store.packsList.cardPacksTotalCount);
  const userNameStore = useAppSelector<string>(store => store.profile.user.name);

  useEffect(() => {
    dispatch(getCardsPackThunk(currentPage));
  }, [dispatch, currentPage]);

  const AddCardsPackHandler = () => {
    dispatch(addNewPackThunk());
  }
  const changePageHandler = (page: number) => {
    dispatch(setCurrentPageCardPacksAC(page))
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
          <DoubleRange min={0} max={20} valueArr={value} setValueArr={setValue}/>
        </section>
        <section className={s.packList}>
          <h1>PacksList</h1>
          <InputText placeholder={"Search..."}/>
          <Button onClick={AddCardsPackHandler}>Add new pack</Button>
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
                  <Packs dataPack={el}/>
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
    </>
  );
};
