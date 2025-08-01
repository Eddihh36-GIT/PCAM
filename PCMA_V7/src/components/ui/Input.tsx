import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input: React.FC<InputProps> = ({ className = '', ...props }) => {
  return (
    <input
      className={`w-full bg-gray-600 text-white px-3 py-2 rounded-lg border border-gray-500 focus:border-blue-400 focus:outline-none transition-colors ${className}`}
      {...props}
    />
  );
};