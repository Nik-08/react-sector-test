import classNames from "classnames";
import { FC, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../../ui";
import css from "../style.module.scss";

interface TableFooterProps {
  page: number;
  total: number;
  limit: number;
}

export const TableFooter: FC<TableFooterProps> = ({ page, limit, total }) => {
  const [, nextSearch] = useSearchParams({
    page: "1",
  });

  const maxPage = useMemo(() => Math.ceil(total / limit), [total, limit]);

  const changePage = useCallback(
    (page: number) => {
      const safeNextPage = Math.min(maxPage, Math.max(page, 1));

      nextSearch({ page: String(safeNextPage) });
    },
    [maxPage, nextSearch]
  );
  return (
    <div className={css.main__table_footer}>
      <Button
        text='Назад'
        disabled={page <= 1}
        onClick={() => changePage(page - 1)}
      />

      <div className={css.main__table_paginations}>
        {new Array(maxPage).fill(0).map((_, i) => (
          <button
            key={i + 1}
            onClick={() => changePage(i + 1)}
            data-page={i + 1}
            className={classNames(css.main__table_pagination, {
              [css._active]: i + 1 === page,
            })}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <Button
        disabled={page >= maxPage}
        text='Далее'
        onClick={() => changePage(page + 1)}
      />
    </div>
  );
};
