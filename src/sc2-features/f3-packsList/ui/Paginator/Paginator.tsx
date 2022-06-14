import React from 'react';
import s from './Pagination_.module.css'
import {DOTS, usePagination} from "./UsePagination";

type Pagination_PropsType = {
  totalCount: number;
  siblingCount: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export const Paginator: React.FC<Pagination_PropsType> = (
  {
    onPageChange,
    totalCount,
    siblingCount = 10,
    currentPage,
    pageSize,
  }
) => {

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  // @ts-ignore
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };
  // @ts-ignore
  let lastPage = paginationRange[paginationRange.length - 1];


  return (
    <div className={s.paginationContainer}>
      <ul className={s.paginationBlock}>
        <li onClick={onPrevious}
            className={currentPage === 1 ? s.disabled : s.paginationItem}
        >
          <div className={`${s.arrow} ${s.left}`}/>
        </li>

        {paginationRange?.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return <li key={`${index}-${pageNumber}`} className={s.dots}>&#8230;</li>;
          }
          return (
            <li key={`${index}-${pageNumber}`}
                className={pageNumber === currentPage ? s.selected : s.paginationItem}
              // @ts-ignore
                onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}
        <li
          className={currentPage === lastPage ? s.disabled : s.paginationItem}
          onClick={onNext}
        >
          <div className={`${s.arrow} ${s.right}`}/>
        </li>
      </ul>
    </div>
  );
};

