import { ButtonHTMLAttributes } from 'react';

import { classList } from '../utils';


type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button
      type='button'
      className={classList('flex items-center w-full mx-auto my-2 px-2 ring-1 ring-black rounded-sm enabled:hover:bg-zinc-300 enabled:cursor-pointer', className)}
      {...props}
    >
      {children}
    </button>
  );
}
