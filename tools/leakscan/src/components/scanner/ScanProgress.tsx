
import React from 'react';

interface ScanProgressProps {
  isVisible: boolean;
  current: number;
  total: number;
  stage: string;
}

const ScanProgress: React.FC<ScanProgressProps> = ({
  isVisible,
  current,
  total,
  stage
}) => {
  if (!isVisible) return null;

  return (
    <div className="mt-4">
      <div className="flex justify-between text-sm text-gray-400 mb-2">
        <span>{stage}</span>
        <span>{current}/{total}</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div 
          className="bg-green-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default ScanProgress;
