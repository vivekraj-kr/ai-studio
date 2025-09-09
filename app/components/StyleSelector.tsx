'use client';

import { StyleSelectorProps } from '../types';
import { STYLE_OPTIONS } from '../lib/constants';
import Select from './ui/Select';

const StyleSelector = ({ selectedStyle, onStyleChange }: StyleSelectorProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStyleChange(e.target.value as any);
  };

  return (
    <div className="space-y-3">
      <Select
        label="Style"
        value={selectedStyle}
        onChange={handleChange}
        options={STYLE_OPTIONS}
        helperText="Choose the artistic style for your image transformation"
      />
      
    </div>
  );
};

export default StyleSelector; 