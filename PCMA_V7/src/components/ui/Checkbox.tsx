import React from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({ 
  checked, 
  onCheckedChange, 
  className = '',
  disabled = false
}) => {
  return (
    <button
      type="button"
      onClick={() => !disabled && onCheckedChange(!checked)}
      disabled={disabled}
      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
        disabled 
          ? 'border-gray-600 bg-gray-700 cursor-not-allowed' 
          : checked 
            ? 'border-blue-500 bg-blue-600 hover:bg-blue-700' 
            : 'border-gray-500 bg-gray-600 hover:border-blue-400'
      } ${className}`}
    >
      {checked && <Check className="w-3 h-3 text-white" />}
    </button>
  );
};