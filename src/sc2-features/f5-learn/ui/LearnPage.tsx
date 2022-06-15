import {FC, useState} from "react";
import s from "./LearnPage.module.css";
import {useAppDispatch, useAppSelector} from "../../../sc1-main/m2-bll/store";
import {CardType} from "../../../sc1-main/m3-dal/cardsApi";
import {useNavigate} from "react-router-dom";
import {Button} from "../../../sc1-main/m1-ui/common/components/c2-Button/Button";
import {PATH} from "../../../sc1-main/m1-ui/Main/Pages";
import RadioInput from "../../../sc1-main/m1-ui/common/components/c5-RadioInput/RadioInput";
import {ButtonLoad} from "../../../sc1-main/m1-ui/common/components/SpButton/ButtonLoad";
import {gradeCardTC} from "../bll/learnReducer";

type GradeType = "Did not know" | "Forgot" | "A lot of thought" | "Confused" | "Knew the answer";

type LearnPagePropsType = {
  card: CardType
};

export const LearnPage: FC<LearnPagePropsType> = ({card}) => {
  console.log("LearnPage");
  const cardPackName = useAppSelector<string>(state => state.learn.cardsPackName);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const grades: Array<GradeType> = ["Did not know", "Forgot", "A lot of thought", "Confused", "Knew the answer"];
  const [grade, setGrade] = useState<GradeType>(grades[2]);

  const cancelHandler = () => {
    navigate(PATH.PACKS_LIST);
  };

  const showAnswerHandler = () => {
    setIsAnswered(true);
  };

  const nextHandler = () => {
    const data = {card_id: card._id, grade: grades.indexOf(grade) + 1};
    setIsAnswered(false);
    dispatch(gradeCardTC(data));
  };

  return (
    <div>
      <h1>Learn pack {cardPackName}</h1>
      {
        card._id === "" ?
          <div className={s.cardBlock}>
            <p>No cards found in this pack</p>
            <Button onClick={cancelHandler}>Chancel</Button>
          </div>
          :
          <div className={s.cardBlock}>
            <div className={s.questionBlock}>
              <p><b>Question:</b> {card.question}</p>
              {isAnswered && <p><b>Answer:</b> {card.answer}</p>}
            </div>
            {isAnswered &&
            <div className={s.rateBlock}>
              <p><b>Rate yourself:</b></p>
              <RadioInput
                name={"grade"}
                options={grades}
                value={grade}
                onChangeOption={setGrade}
              />
            </div>
            }
            <div className={s.buttonsBlock}>
              <ButtonLoad onClick={cancelHandler}>Chancel</ButtonLoad>
              {isAnswered ?
                <Button onClick={nextHandler}>Next</Button>
                :
                <ButtonLoad onClick={showAnswerHandler}>Show answer</ButtonLoad>
              }
            </div>
          </div>
      }
    </div>
  );
};
