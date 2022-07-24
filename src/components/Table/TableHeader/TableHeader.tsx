import { useCallback, useState } from "react";
import { setSort } from "../../../store/feature/posts/slice";
import { useAppDispatch } from "../../../store/hooks";
import css from "../style.module.scss";

export const TableHeader = () => {
  const [toggleSort, setToggleSort] = useState("asc");

  const dispatch = useAppDispatch();

  const changeSortBy = useCallback(
    (e: any) => {
      setToggleSort((prev) => (prev === "asc" ? "desc" : "asc"));
      dispatch(
        setSort({ sort: e.target.getAttribute("data-sort"), order: toggleSort })
      );
    },
    [dispatch, toggleSort]
  );

  return (
    <div className={css.main__table_header}>
      <div className={css.main__table_id}>
        <span
          className={css.main__header_text}
          data-sort={"id"}
          onClick={changeSortBy}
        >
          ID
        </span>
      </div>
      <div className={css.main__table_title}>
        <span
          className={css.main__header_text}
          data-sort={"title"}
          onClick={changeSortBy}
        >
          Заголовок
        </span>
      </div>
      <div className={css.main__table_description}>
        <span
          className={css.main__header_text}
          data-sort={"body"}
          onClick={changeSortBy}
        >
          Описание
        </span>
      </div>
    </div>
  );
};
