import { ChevronRight } from 'lucide-react';
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
  showIcon?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  showIcon = true,
  type = 'button',
  disabled = false
}) => {
  const baseStyles = 'group px-6 py-3 rounded-lg font-medium transition-all duration-300 active:scale-95';
  const variants = {
    primary: 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg hover:pr-8',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 hover:shadow-lg hover:pr-8',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      type={type as 'button' | 'submit' | 'reset' | undefined}
      disabled={disabled}
    >
      <span className="flex items-center justify-center text-center gap-2">
        {children}
        {showIcon && (
            <ChevronRight className="w-6 h-6 transition-all duration-300 group-hover:translate-x-1" />
        )}
      </span>
    </button>
  );
};