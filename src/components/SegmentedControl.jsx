import React from 'react';
import '../styles/SegmentedControl.css';
import { PERIODS } from "../lib/utils";

const SegmentedControl = ({ selectedPeriod, onPeriodChange }) => {
  return (
    <div className="segmented-control">
      {PERIODS.map((period) => (
        <button
          key={period.value}
          className={`segment ${selectedPeriod === period.value ? 'active' : ''}`}
          onClick={() => onPeriodChange(period.value)}
        >
          {period.label}
        </button>
      ))}
    </div>
  );
};

export default SegmentedControl;

