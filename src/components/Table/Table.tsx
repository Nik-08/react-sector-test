import { useEffect } from "react";
import { selectors } from "../../store/feature/posts";
import { getAll } from "../../store/feature/posts/slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import css from "./style.module.scss";
import { TableFooter } from "./TableFooter";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import { Spinner } from "../";

export const Table = () => {
  const { items, loading, error, limit, total, page, sort, order, q } =
    useAppSelector((state: AppState) => ({
      items: selectors.items(state),
      loading: selectors.loading(state),
      error: selectors.error(state),
      page: selectors.page(state),
      total: selectors.total(state),
      limit: selectors.limit(state),
      sort: selectors.sort(state),
      order: selectors.order(state),
      q: selectors.q(state),
    }));

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch, page, sort, order, q]);

  console.log(items);

  return (
    <div className={css.main__table}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <TableHeader />
          {!error ? (
            <div className={css.main__table_body}>
              {items &&
                items.map((item, id) => <TableRow key={id} {...item} />)}
            </div>
          ) : null}

          {items.length === 0 ? (
            <div className={css.main__table_message}>Not Found</div>
          ) : (
            <TableFooter page={page} total={total} limit={limit} />
          )}
        </>
      )}
    </div>
  );
};
