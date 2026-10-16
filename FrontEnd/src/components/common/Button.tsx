import type { ButtonHTMLAttributes } from 'react';

import { cn } from '../../utils/cn';

type ButtonVariant =
  'primary' | 'soft' | 'neutral' | 'outline' | 'danger' | 'danger-ghost';
type ButtonSize = 'sm' | 'md';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white font-bold shadow',
  soft: 'bg-blue-50 text-blue-700 hover:bg-blue-100 font-semibold',
  neutral: 'bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold',
  outline:
    'border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-semibold',
  danger: 'bg-rose-600 hover:bg-rose-700 text-white font-bold shadow',
  'danger-ghost': 'text-red-600 hover:bg-red-50 font-semibold',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 rounded-lg text-xs',
  md: 'px-4 py-2 rounded-xl text-xs',
};

function Button({
  variant = 'primary',
  size = 'md',
  type = 'button',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-1.5 transition-all disabled:cursor-not-allowed disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}

export default Button;
