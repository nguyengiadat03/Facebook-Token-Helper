
import React from 'react';

interface InstructionStepProps {
  stepNumber: number;
  text: React.ReactNode;
}

export const InstructionStep: React.FC<InstructionStepProps> = ({ stepNumber, text }) => {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-blue-600 text-white font-bold rounded-full">
        {stepNumber}
      </div>
      <p className="text-gray-300 pt-1">{text}</p>
    </div>
  );
};
