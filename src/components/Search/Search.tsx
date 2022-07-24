import {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useState,
} from "react";

import { setSearch } from "../../store/feature/posts/slice";
import { useAppDispatch } from "../../store/hooks";
import { Input } from "../ui";
import css from "./style.module.scss";

export const Search = () => {
  const [value, setValue] = useState<string>("");

  const getValue: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const dispatch = useAppDispatch();

  const InputChange: FormEventHandler<HTMLFormElement> = useCallback(
    (e: any) => {
      e.preventDefault();

      dispatch(setSearch(value));
    },
    [dispatch, value]
  );

  return (
    <form className={css.form} onSubmit={InputChange}>
      <Input placeholder='Поиск' type='text' onChange={getValue} />
      <button className={css.form__button}></button>
    </form>
  );
};
