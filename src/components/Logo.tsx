/**
 * Logo.tsx - Application logo component
 * Exports: Logo component
 * Side effects: none
 */

import { CheckCircle2, BarChart3 } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ size = 'md' }: LogoProps) {
  const sizes = {
    sm: { container: 'h-8', icon: 'w-4 h-4', text: 'text-sm' },
    md: { container: 'h-10', icon: 'w-5 h-5', text: 'text-lg' },
    lg: { container: 'h-12', icon: 'w-6 h-6', text: 'text-xl' }
  };

  const currentSize = sizes[size];

  return (
    <div className="flex items-center gap-2">
      <div className={`${currentSize.container} aspect-square bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md relative`}>
        <CheckCircle2 className={`${currentSize.icon} text-white absolute`} />
        <BarChart3 className={`${currentSize.icon} text-white/70 absolute translate-x-0.5 translate-y-0.5`} />
      </div>
      <div className="flex flex-col">
        <span className={`${currentSize.text} font-bold text-gray-800 leading-none`}>Mega Step</span>
        <span className="text-xs text-gray-500 leading-none">Calc</span>
      </div>
    </div>
  );
}
