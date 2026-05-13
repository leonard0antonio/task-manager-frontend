import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export function Button({ children, isLoading, disabled, ...rest }: ButtonProps) {
  return (
    <button
      disabled={isLoading || disabled}
      className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-100 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2 shadow-sm active:scale-[0.98]"
      {...rest}
    >
      {isLoading ? (
        <span className="inline-block animate-spin text-xl leading-none">↻</span>
      ) : (
        children
      )}
    </button>
  );
}