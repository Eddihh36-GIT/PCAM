import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  value?: string;
  onValueChange: (value: string) => void;
  disabled: boolean;
}

const SelectContext = createContext<SelectContextType | null>(null);

interface SelectProps {
  value?: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  disabled?: boolean;
}

export const Select: React.FC<SelectProps> = ({ 
  value, 
  onValueChange, 
  children, 
  disabled = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const contextValue: SelectContextType = {
    isOpen,
    setIsOpen,
    value,
    onValueChange,
    disabled
  };

  return (
    <SelectContext.Provider value={contextValue}>
      <div ref={selectRef} className="relative">
        {children}
      </div>
    </SelectContext.Provider>
  );
};

const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('Select components must be used within a Select provider');
  }
  return context;
};

interface SelectTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export const SelectTrigger: React.FC<SelectTriggerProps> = ({ 
  children, 
  className = ''
}) => {
  const { isOpen, setIsOpen, disabled } = useSelectContext();

  return (
    <button
      type="button"
      onClick={() => !disabled && setIsOpen(!isOpen)}
      disabled={disabled}
      className={`w-full bg-gray-600 text-white px-3 py-2 rounded-lg border border-gray-500 focus:border-blue-400 focus:outline-none transition-colors flex items-center justify-between ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700'
      } ${className}`}
    >
      {children}
      <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </button>
  );
};

interface SelectValueProps {
  placeholder?: string;
}

export const SelectValue: React.FC<SelectValueProps> = ({ placeholder }) => {
  const { value } = useSelectContext();
  return <span>{value || placeholder}</span>;
};

interface SelectContentProps {
  children: React.ReactNode;
}

export const SelectContent: React.FC<SelectContentProps> = ({ children }) => {
  const { isOpen } = useSelectContext();

  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-gray-700 border border-gray-500 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
      {children}
    </div>
  );
};

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
}

export const SelectItem: React.FC<SelectItemProps> = ({ 
  value, 
  children
}) => {
  const { onValueChange, setIsOpen } = useSelectContext();

  const handleClick = () => {
    onValueChange(value);
    setIsOpen(false);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-full text-left px-3 py-2 hover:bg-gray-600 text-white transition-colors"
    >
      {children}
    </button>
  );
};