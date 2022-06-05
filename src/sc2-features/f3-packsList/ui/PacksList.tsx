import React, {useState} from 'react';
import s from './PacksList.module.css'
import {cardPacksDataType, packCardsApi} from "../../../sc1-main/m3-dal/packCards-api";
import {Button} from "../../../sc1-main/m1-ui/common/components/c2-Button/Button";

export const PacksList = () => {

  const [packData, setPackData] = useState<cardPacksDataType>();

  const getTasksHandler = () => {
    packCardsApi.getAllCards().then(res => {
      setPackData(res);
    })
  }

  return (<>
      <div className={s.mainBlock}>
        <h1>PacksList</h1>
        <Button onClick={getTasksHandler}>Get PackData</Button>
        <div>
          {packData?.cardPacks.map(el => {
            return <div key={el._id}>
              <div>_id: {el._id}</div>
              <div>user_id: {el.user_id}</div>
              <div>user_name: {el.user_name}</div>
              <div>name: {el.name}</div>
              <div>cardsCount: {el.cardsCount}</div>
              <div>created: {el.created}</div>
              <div>updated: {el.updated}</div>
              <div>******************************</div>
            </div>
          })}
        </div>
      </div>
    </>
  );
};
