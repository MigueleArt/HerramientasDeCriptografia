import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper para combinar clases de Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Card Component ---
export const Card = ({ children, className }: { children?: React.ReactNode; className?: string }) => (
  <div className={cn("bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden", className)}>
    {children}
  </div>
);

export const CardHeader = ({ title, description, icon: Icon }: { title: string; description: string; icon?: React.ElementType }) => (
  <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
    <div className="flex items-center gap-3 mb-2">
      {Icon && <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Icon size={20} /></div>}
      <h2 className="text-xl font-bold text-slate-800">{title}</h2>
    </div>
    <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
  </div>
);

export const CardContent = ({ children, className }: { children?: React.ReactNode; className?: string }) => (
  <div className={cn("p-6", className)}>{children}</div>
);

// --- Form Elements ---
export const Label = ({ children }: { children?: React.ReactNode }) => (
  <label className="block text-sm font-medium text-slate-700 mb-1.5">{children}</label>
);

export const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={cn(
      "w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm",
      className
    )}
    {...props}
  />
);

export const TextArea = ({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea
    className={cn(
      "w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm min-h-[100px]",
      className
    )}
    {...props}
  />
);

export const Button = ({ children, variant = 'primary', className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' }) => {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20",
    secondary: "bg-slate-800 hover:bg-slate-900 text-white shadow-md",
    outline: "border-2 border-slate-200 hover:border-blue-500 hover:text-blue-600 text-slate-600 bg-transparent"
  };

  return (
    <button
      className={cn(
        "px-4 py-2 rounded-lg font-medium transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};