import { FormEventHandler, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Input } from '../ui';
import css from './style.module.scss';

export const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [search, nextSearch] = useSearchParams({
    q: '',
  });
  const defaultValue = search.get('q') || '';

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    e => {
      e.preventDefault();

      const nextValue = inputRef.current?.value || '';
      nextSearch({ q: nextValue });
    },
    [nextSearch]
  );

  return (
    <form className={css.form} onSubmit={onSubmit}>
      <Input
        defaultValue={defaultValue}
        ref={inputRef}
        placeholder="Поиск"
        type="text"
      />
      <button className={css.form__button}></button>
    </form>
  );
};
