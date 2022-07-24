import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react';
import css from './style.module.scss';

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return <input ref={ref} className={css.input} {...props} />;
});
