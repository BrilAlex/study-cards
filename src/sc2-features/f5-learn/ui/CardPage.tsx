import commonStyles from "../../../sc1-main/m1-ui/App.module.css";
import s from "./CardPage.module.css";
import RadioInput from "../../../sc1-main/m1-ui/common/components/c5-RadioInput/RadioInput";
import {Button} from "../../../sc1-main/m1-ui/common/components/c2-Button/Button";
import {CardType} from "../../../sc1-main/m3-dal/cardsApi";
import {useState} from "react";
import {PATH} from "../../../sc1-main/m1-ui/Main/Pages";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../sc1-main/m2-bll/store";
import {gradeCardTC} from "../bll/learnReducer";

type GradeType = "Did not know" | "Forgot" | "A lot of thought" | "Confused" | "Knew the answer";

export const CardPage = () => {
  const navigate = useNavigate();

  const card = useAppSelector<CardType>(state => state.learn.card);
  console.log(card);
  const dispatch = useAppDispatch();

  const grades: Array<GradeType> = ["Did not know", "Forgot", "A lot of thought", "Confused", "Knew the answer"];
  const [grade, setGrade] = useState<GradeType>(grades[2]);

  const cancelHandler = () => {
    navigate(PATH.PACKS_LIST);
  };

  const nextHandler = () => {
    const data = {card_id: card._id, grade: grades.indexOf(grade) + 1};
    console.log(data);
    dispatch(gradeCardTC(data));
    navigate(PATH.LEARN + card.cardsPack_id);
  };

  return (
    <div className={`${commonStyles.smallContainer} ${s.cardBlock}`}>
      <div className={s.questionBlock}>
        <p><b>Question:</b> {card.question}</p>
        <p><b>Answer:</b> {card.answer}</p>
      </div>
      <div className={s.rateBlock}>
        <p>Rate yourself:</p>
        <RadioInput
          name={"grade"}
          options={grades}
          value={grade}
          onChangeOption={setGrade}
        />
      </div>
      <div className={s.buttonsBlock}>
        <Button onClick={cancelHandler}>Chancel</Button>
        <Button onClick={nextHandler}>Next</Button>
      </div>
    </div>
  );
};