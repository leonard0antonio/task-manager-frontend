import type { InputHTMLAttributes } from 'react';

// Estende as propriedades nativas do input do HTML
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, ...rest }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-slate-700">
        {label}
      </label>
      <input
        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white outline-none transition-all text-sm text-slate-800 placeholder:text-slate-400"
        {...rest}
      />
    </div>
  );
}