import React from 'react';

interface SectionHeaderProps {
  number: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeader({
  number,
  title,
  subtitle,
  className = 'mb-16 sm:mb-20'
}: SectionHeaderProps) {
  return (
    <div className={`flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-neutral-500 ${className}`}>
      <span className="text-neutral-950 font-semibold">{number}</span>
      <span className="text-neutral-300 select-none">/</span>
      <span className="text-neutral-700">{title}</span>
      {subtitle && (
        <>
          <span className="text-neutral-300 select-none">&bull;</span>
          <span className="text-neutral-500">{subtitle}</span>
        </>
      )}
    </div>
  );
}
