import s from "./CardPage.module.css";
import RadioInput from "../../../sc1-main/m1-ui/common/components/c5-RadioInput/RadioInput";
import {Button} from "../../../sc1-main/m1-ui/common/components/c2-Button/Button";
import {CardType} from "../../../sc1-main/m3-dal/cardsApi";
import {useState} from "react";
import {PATH} from "../../../sc1-main/m1-ui/Main/Pages";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../sc1-main/m2-bll/store";
import {gradeCardTC} from "../bll/learnReducer";
import {ButtonLoad} from "../../../sc1-main/m1-ui/common/components/SpButton/ButtonLoad";

type GradeType = "Did not know" | "Forgot" | "A lot of thought" | "Confused" | "Knew the answer";

export const CardPage = (props: { card: CardType }) => {
  const navigate = useNavigate();

  const {card} = props;
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector<boolean>(state => state.app.appIsLoading);

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
    <div className={s.cardBlock}>
      <div className={s.questionBlock}>
        <p><b>Question:</b> {card.question}</p>
        {isAnswered && <p><b>Answer:</b> {card.answer}</p>}
      </div>
      {isAnswered &&
      <div className={s.rateBlock}>
        <p>Rate yourself:</p>
        <RadioInput
          name={"grade"}
          options={grades}
          value={grade}
          onChangeOption={setGrade}
        />
      </div>
      }
      <div className={s.buttonsBlock}>
        <ButtonLoad isSpinner={isLoading} onClick={cancelHandler}>Chancel</ButtonLoad>
        {isAnswered ?
          <Button onClick={nextHandler}>Next</Button>
          :
          <ButtonLoad isSpinner={isLoading} onClick={showAnswerHandler}>Show answer</ButtonLoad>
        }
      </div>
    </div>
  );
};
