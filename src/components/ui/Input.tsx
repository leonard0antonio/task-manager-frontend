import type { InputHTMLAttributes, ReactNode } from 'react';

// Estende as propriedades nativas do input do HTML
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  labelAction?: ReactNode; // NOVO: Propriedade flexível para injetar links (ex: Esqueceu a senha)
}

export function Input({ label, labelAction, disabled, ...rest }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-700">
          {label}
        </label>
        {/* Renderiza a ação extra apenas se ela for enviada */}
        {labelAction && <div>{labelAction}</div>}
      </div>
      <input
        disabled={disabled}
        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white outline-none transition-all text-sm text-slate-800 placeholder:text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed"
        {...rest}
      />
    </div>
  );
}