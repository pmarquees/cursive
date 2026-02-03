import { ReactNode } from 'react';

interface GlassButtonProps {
  children: ReactNode;
  onClick?: () => void;
  active?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function GlassButton({
  children,
  onClick,
  active = false,
  className = '',
  type = 'button'
}: GlassButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`glass-button ${active ? 'active' : ''} ${className}`.trim()}
    >
      {children}
    </button>
  );
}
