import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export function Button({ children, isLoading, ...rest }: ButtonProps) {
  return (
    <button
      disabled={isLoading}
      className="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-100 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2 shadow-sm"
      {...rest}
    >
      {isLoading ? (
        <span className="inline-block animate-spin text-lg leading-none">↻</span>
      ) : (
        children
      )}
    </button>
  );
}