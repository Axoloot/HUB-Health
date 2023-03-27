import React from 'react';
import { Text } from '@nextui-org/react';

type ButtonProps = {
  label: string;
  onClick: () => void;
};

export const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <>
      <button
        type="button"
        className="bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 ring-2 hover:bg-red-300"
        onClick={() => onClick()}
      >
        <Text>{label}</Text>
      </button>
    </>
  );
};
