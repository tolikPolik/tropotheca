'use client';

import { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'login';
  fullWidth?: boolean;
}

export const Button: FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = {
    primary: 'bg-[#ff007a] border-none px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:translate-y-[-2px] hover:brightness-110 shadow-[0_0_15px_rgba(255,0,122,0.3)]',
    secondary: 'bg-white/10 border border-white/20 px-6 py-3 rounded-full backdrop-blur-md transition-all duration-300 hover:translate-y-[-2px] hover:brightness-110',
    login: 'bg-[#ff007a] border-none px-5 py-2 rounded-full font-bold transition-all duration-300 hover:translate-y-[-2px] hover:brightness-110 shadow-[0_0_15px_rgba(255,0,122,0.3)]'
  };

  return (
    <button
      className={`${baseStyles[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};