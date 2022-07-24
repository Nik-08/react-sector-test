import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import css from "../style.module.scss";

export const TableHeader = () => {
  const [search, nextSearch] = useSearchParams({
    order: "asc",
    page: "1",
  });

  const changeSortBy = useCallback(
    (e: any) => {
      const currentOrder = search.get("order") || "asc";
      let nextOrder = currentOrder === "asc" ? "desc" : "asc";

      const currentSort = search.get("sort") || "id";
      const nextSort = e.target.getAttribute("data-sort");

      if (currentSort !== nextSort) {
        nextOrder = "asc";
      }

      nextSearch({ sort: nextSort, order: nextOrder, page: "1" });
    },
    [search, nextSearch]
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
