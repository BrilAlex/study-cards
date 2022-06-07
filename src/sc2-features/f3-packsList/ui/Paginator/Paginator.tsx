import React, {useState} from 'react';
import s from "./Paginator.module.css";
import {Button} from "../../../../sc1-main/m1-ui/common/components/c2-Button/Button";

type PaginatorMyType = {
  totalItemCount: number
  pageSize: number
  currentPage: number
  spanClick?: (page: number) => void
  portionSize?: number
}

export const Paginator: React.FC<PaginatorMyType> = (
  {
    totalItemCount,
    pageSize,
    currentPage,
    spanClick,
    portionSize = 10,
  }
) => {

  const pagesCount = Math.ceil(totalItemCount / pageSize);

  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  const portionCount = Math.ceil(pagesCount / pageSize);
  const [range, setRange] = useState(1);
  const leftNumber = (range - 1) * portionSize + 1;
  const rightNumber = range * portionSize;

  const back = () => {
    setRange(range - 1)
  }
  const forward = () => {
    setRange(range + 1)
  }
  const spanHandler = (page: number) => {
    spanClick && spanClick(page);
  }

  return (
    <div className={s.mainBlock}>
      <Button onClick={back}
                disabled={range <= 1}
      >
        back
      </Button>
      <div>{pages
        .filter(el => el >= leftNumber && el <= rightNumber)
        .map(el => {
          return <span key={el.toString()}
                       className={currentPage === el ? s.selectPage : s.page}
                       onClick={() => spanHandler(el)}
          >{el}</span>
        })}</div>

      <Button onClick={forward}
                disabled={portionCount <= range}
      >
        forward
      </Button>
    </div>
  );
};

