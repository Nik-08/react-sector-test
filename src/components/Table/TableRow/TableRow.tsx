import React, { FC } from "react";
import css from "../style.module.scss";

interface TableRowProps {
  id: number;
  title: string;
  body: string;
}

export const TableRow: FC<TableRowProps> = ({ id, title, body }) => {
  return (
    <div className={css.main__table_row}>
      <div className={css.main__table_id}>
        <span className={css.main__header_text}>{id}</span>
      </div>
      <div className={css.main__table_title}>
        <span className={css.main__header_text}>{title}</span>
      </div>
      <div className={css.main__table_description}>
        <span className={css.main__header_text}>{body}</span>
      </div>
    </div>
  );
};
