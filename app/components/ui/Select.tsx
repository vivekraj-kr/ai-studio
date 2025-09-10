import { SelectHTMLAttributes, forwardRef } from 'react';

interface SelectOption {
  value: string;
  label: string;
  description?: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, options, placeholder, className = '', ...props }, ref) => {
    const baseClasses = 'w-full px-3 py-2 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed bg-background';
    const errorClasses = error 
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' 
      : 'border-foreground/20 focus:border-foreground focus:ring-foreground/50';
    
    const classes = `${baseClasses} ${errorClasses} ${className}`;
    
    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={classes}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-sm text-foreground/60">{helperText}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select; 