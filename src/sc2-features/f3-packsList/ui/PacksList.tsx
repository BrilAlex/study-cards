import React, {useState} from 'react';
import s from './PacksList.module.css'
import {cardPacksDataType, packCardsApi} from "../../../sc1-main/m3-dal/packCards-api";
import {Button} from "../../../sc1-main/m1-ui/common/components/c2-Button/Button";
import {DoubleRange} from "../../../sc1-main/m1-ui/common/components/DoubleRange/DoubleRange";
import {InputText} from "../../../sc1-main/m1-ui/common/components/c1-InputText/InputText";

export const PacksList = () => {

  const [packData, setPackData] = useState<cardPacksDataType>();
  const [value, setValue] = useState([0, 10])

  const getTasksHandler = () => {
    packCardsApi.getAllCards().then(res => {
      setPackData(res);
    })
  }
  const AddCardsPackHandler = () => {
    console.log("hardcoded pack should be added")
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
          <Button onClick={getTasksHandler}>Get PackData</Button>
          <Button onClick={AddCardsPackHandler}>Add new pack</Button>
          <div className={s.cardsPackTable}>
            <div className={s.tableHeader}>
              <div style={{width: "20%"}}>Name</div>
              <div style={{width: "12%"}}>Cards</div>
              <div style={{width: "20%"}}>Last Updated</div>
              <div style={{width: "18%"}}>Created by</div>
              <div style={{width: "30%"}}>Actions</div>
            </div>
            {packData?.cardPacks.map(el => {
              return (
                <div key={el._id} className={s.tableString}>
                  <div style={{width: "20%"}}>{el.name}</div>
                  <div style={{width: "12%"}}>{el.cardsCount}</div>
                  <div style={{width: "20%"}}>{el.updated.toLocaleString()}
                  </div>
                  <div style={{width: "18%"}}>{el.user_name}</div>
                  <div style={{width: "30%"}}>*Action buttons*</div>
                </div>
              )
            })}
          </div>
        </section>

      </div>
    </>
  );
};
