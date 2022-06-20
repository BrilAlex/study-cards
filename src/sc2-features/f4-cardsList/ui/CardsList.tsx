import React, {useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../sc1-main/m2-bll/store";
import {
  addNewCardTC,
  getCardsTC,
  setCurrentPageCardsListAC, setSearchQueryByAnswerAC,
  setSearchQueryByQuestionAC
} from "../bll/cardsListReducer";
import {CardType, NewCardDataType} from "../../../sc1-main/m3-dal/cardsApi";
import s from "./CardsList.module.css";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {PATH} from "../../../sc1-main/m1-ui/Main/Pages";
import {CardsListItem} from "./CardsListItem/CardsListItem";
import {Button} from "../../../sc1-main/m1-ui/common/components/c2-Button/Button";
import {MiniSpinner} from "../../../sc1-main/m1-ui/common/components/MiniSpinner/MiniSpinner";
import {Paginator} from "../../f3-packsList/ui/Paginator/Paginator";
import {DebounceSearch} from "../../../sc1-main/m1-ui/common/components/c7-DebounceSearch/DebounceSearch";
import {EditAddModal} from "./EditAddModal/EditAddModal";

export const CardsList = () => {
  const urlParams = useParams<'cardPackID'>();
  const cardsPack_ID = urlParams.cardPackID;

  const user_ID = useAppSelector(state => state.profile.user._id);
  const cards = useAppSelector<Array<CardType>>(state => state.cardsList.cards);
  const cardsTotalCount = useAppSelector<number>(state => state.cardsList.cardsTotalCount);
  const pageSize = useAppSelector<number>(store => store.cardsList.pageCount);
  const currentPage = useAppSelector<number>(state => state.cardsList.page);
  const isFetchingCards = useAppSelector<boolean>(state => state.cardsList.isFetchingCards);
  const cardQuestion = useAppSelector<string>(state => state.cardsList.cardQuestion);
  const cardAnswer = useAppSelector<string>(state => state.cardsList.cardAnswer);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string>("");
  const [question, setQuestion] = useState<string>("");

  useEffect(() => {
    if (cardsPack_ID) dispatch(getCardsTC({cardsPack_id: cardsPack_ID}));
  }, [dispatch, cardsPack_ID, currentPage, cardQuestion, cardAnswer]);

  const addCardHandler = useCallback(() => {
    const newCard: NewCardDataType = {
      cardsPack_id: cardsPack_ID as string,
      question: question,
      answer: answer,
    };
    dispatch(addNewCardTC(newCard));

  }, [dispatch, cardsPack_ID, question, answer]);

  const changePageHandler = (page: number) => {
    dispatch(setCurrentPageCardsListAC(page));
  };

  const searchCardsByQuestion = (value: string) => {
    dispatch(setSearchQueryByQuestionAC(value));
  };

  const searchCardsByAnswer = (value: string) => {
    dispatch(setSearchQueryByAnswerAC(value));
  };

  const backButtonHandler = () => {
    navigate(PATH.PACKS_LIST);
  };

  if (!user_ID) {
    return <Navigate to={PATH.LOGIN}/>
  }

  return (
    <div className={s.cardsPage}>
      <div>
        <Button onClick={backButtonHandler}>&#10094; Back to Packs List</Button>
      </div>
      <div>
        <DebounceSearch
          searchValue={cardQuestion}
          setSearchValue={searchCardsByQuestion}
          placeholder={"Search by question..."}
        />
        <DebounceSearch
          searchValue={cardAnswer}
          setSearchValue={searchCardsByAnswer}
          placeholder={"Search by answer..."}
        />
        <Button onClick={() => setActiveModal(true)} disabled={isFetchingCards}>Add card</Button>
      </div>
      <EditAddModal inputAnswer={answer} setInputAnswer={setAnswer} inputQuestion={question}
                    setInputQuestion={setQuestion} active={activeModal}
                    setActive={setActiveModal} setCard={addCardHandler}/>
      {isFetchingCards ?
        <MiniSpinner/>
        :
        cards.length === 0 ?
          <div>No cards found. Press "Add card" to create new card in this pack</div>
          :
          <div className={s.tableMainBlock}>
            <table>
              <thead className={s.theadStyle}>
              <tr className={s.trStyle}>
                <th>Question</th>
                <th>Answer</th>
                <th>Last Updated</th>
                <th>Grade</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody className={s.tbodyStyle}>
              {cards.map(c => {
                return (
                  <CardsListItem key={c._id} card={c}/>
                );
              })}
              </tbody>
            </table>
            <div className={s.paginator}>
              <Paginator
                siblingCount={3}
                totalCount={cardsTotalCount}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={changePageHandler}
              />
            </div>
          </div>
      }
    </div>
  );
};
