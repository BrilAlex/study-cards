import React, {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../sc1-main/m2-bll/store";
import {addNewCardTC, getCardsTC, setCurrentPageCardsListAC} from "../bll/cardsListReducer";
import {CardType, NewCardDataType} from "../../../sc1-main/m3-dal/cardsApi";
import s from "./CardsList.module.css";
import {Navigate, NavLink, useParams} from "react-router-dom";
import {PATH} from "../../../sc1-main/m1-ui/Main/Pages";
import {CardsListItem} from "./CardsListItem/CardsListItem";
import {Button} from "../../../sc1-main/m1-ui/common/components/c2-Button/Button";
import {MiniSpinner} from "../../../sc1-main/m1-ui/common/components/MiniSpinner/MiniSpinner";
import {InputText} from "../../../sc1-main/m1-ui/common/components/c1-InputText/InputText";
import {Paginator} from "../../f3-packsList/ui/Paginator/Paginator";

export const CardsList = () => {
  const urlParams = useParams<'cardPackID'>();
  const cardsPack_ID = urlParams.cardPackID;

  const user_ID = useAppSelector(state => state.profile.user._id);
  const cards = useAppSelector<null | Array<CardType>>(state => state.cardsList.cards);
  const cardsTotalCount = useAppSelector<number>(state => state.cardsList.cardsTotalCount);
  const pageSize = useAppSelector<number>(store => store.cardsList.pageCount);
  const currentPage = useAppSelector<number>(state => state.cardsList.page);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (cardsPack_ID) dispatch(getCardsTC(cardsPack_ID));
  }, [dispatch, cardsPack_ID, currentPage]);

  const addCardHandler = useCallback(() => {
    if (cardsPack_ID) {
      const newCard: NewCardDataType = {
        cardsPack_id: cardsPack_ID,
        question: "Some question",
      };
      dispatch(addNewCardTC(newCard));
    }
  }, [dispatch, cardsPack_ID]);

  const changePageHandler = (page: number) => {
    dispatch(setCurrentPageCardsListAC(page));
  };

  if (!user_ID) {
    return <Navigate to={PATH.PACKS_LIST}/>
  }

  return (
    <div className={s.cardsPage}>
      <NavLink to={PATH.PACKS_LIST}>
        <h2>Back to Packs List</h2>
      </NavLink>
      <div>
        <InputText type={"text"} placeholder={"Filter by Question"}/>
        <InputText type={"text"} placeholder={"Filter by Answer"}/>
        <Button onClick={addCardHandler}>Add card</Button>
      </div>
      {!cards ?
        <MiniSpinner/>
        :
        cards.length === 0 ?
          <div>No cards found. Press "Add card" to create new card in this pack</div>
          :
          <>
            <div className={s.cardsListTable}>
              <div className={s.tableHeader}>
                <div style={{width: "30%"}}>Question</div>
                <div style={{width: "30%"}}>Answer</div>
                <div style={{width: "10%"}}>Last Updated</div>
                <div style={{width: "15%"}}>Grade</div>
                <div style={{width: "15%"}}>Actions</div>
              </div>
              {cards.map(c => {
                return (
                  <div key={c._id} className={s.tableString}>
                    <CardsListItem card={c}/>
                  </div>
                );
              })}
            </div>
            <Paginator
              totalItemCount={cardsTotalCount}
              currentPage={currentPage}
              pageSize={pageSize}
              spanClick={changePageHandler}
            />
          </>
      }
    </div>
  );
};