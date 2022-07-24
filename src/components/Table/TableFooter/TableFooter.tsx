import classNames from "classnames";
import { FC, useCallback } from "react";
import { setNextPage } from "../../../store/feature/posts/slice";
import { useAppDispatch } from "../../../store/hooks";
import { Button } from "../../ui";
import css from "../style.module.scss";

interface TableFooterProps {
  page: number;
  total: number;
  limit: number;
}

export const TableFooter: FC<TableFooterProps> = ({ page, limit, total }) => {
  const maxPage = Math.ceil(total / limit);
  let paginationArr = [];

  for (let i = maxPage; i > 0; i--) {
    paginationArr.push(i);
  }

  const dispatch = useAppDispatch();

  const nextPage = useCallback(
    (page: number) => {
      dispatch(setNextPage(page + 1));
    },
    [dispatch]
  );

  const prevPage = useCallback(
    (page: number) => {
      dispatch(setNextPage(page - 1));
    },
    [dispatch]
  );

  const changePage = useCallback(
    (e: any) => {
      if (typeof Number(e.target.value) === "number") {
        dispatch(setNextPage(Number(e.target.value)));
      }
    },
    [dispatch]
  );
  return (
    <div className={css.main__table_footer}>
      {page > 1 ? (
        <Button text='Назад' onClick={() => prevPage(page)} />
      ) : (
        <Button text='Назад' disabled />
      )}

      <div className={css.main__table_paginations}>
        {paginationArr.reverse().map((item, i) => (
          <button
            key={i + item}
            value={item}
            onClick={changePage}
            className={classNames(css.main__table_pagination, {
              [css._active]: item === page,
            })}
          >
            {item}
          </button>
        ))}
      </div>
      {page < maxPage ? (
        <Button text='Далее' onClick={() => nextPage(page)} />
      ) : (
        <Button text='Далее' disabled />
      )}
    </div>
  );
};
