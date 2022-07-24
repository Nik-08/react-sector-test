import { FC, useEffect } from "react";
import { selectors } from "../../store/feature/posts";
import { getAll } from "../../store/feature/posts/slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import css from "./style.module.scss";
import { TableFooter } from "./TableFooter";
import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";
import { Spinner } from "../";
import { createStructuredSelector } from "reselect";

const rootSelector = createStructuredSelector({
  items: selectors.items,
  loading: selectors.loading,
  error: selectors.error,
  total: selectors.total,
  limit: selectors.limit,
});

interface Props {
  page?: number;
  sort?: string;
  order?: string;
  q?: string;
}
export const Table: FC<Props> = ({
  page = 1,
  sort = "id",
  order = "asc",
  q = "",
}) => {
  const { items, loading, error, limit, total } = useAppSelector(rootSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAll({ page, sort, order, q }));
  }, [dispatch, page, sort, order, q]);

  return (
    <div className={css.main__table}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <TableHeader />
          {!error ? (
            <div className={css.main__table_body}>
              {items.map((item, id) => (
                <TableRow key={id} {...item} />
              ))}
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
