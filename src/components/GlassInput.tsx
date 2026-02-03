import { InputHTMLAttributes } from 'react';

type GlassInputProps = InputHTMLAttributes<HTMLInputElement> & {
  wrapperClassName?: string;
};

export function GlassInput({ placeholder = '', wrapperClassName = '', className = '', ...props }: GlassInputProps) {
  return (
    <div className={`glass-input-wrapper ${wrapperClassName}`.trim()}>
      <input
        type="text"
        className={`glass-input ${className}`.trim()}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}
