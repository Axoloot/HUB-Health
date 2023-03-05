import React from 'react';

type InputProps = {
  placeholder: string;
  onChange: (value: string) => void;
  value: string;
  type?: string;
  required?: boolean;
};

export const Input = ({
  placeholder,
  onChange,
  value,
  type,
  required,
}: InputProps) => {
  return (
    <div className="flex flex-col">
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {placeholder}
      </label>
      <input
        type={type}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        value={value}
      />
    </div>
  );
};
