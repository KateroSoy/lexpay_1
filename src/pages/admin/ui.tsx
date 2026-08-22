import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

/** Shared primitives for the admin screens. Dense desktop styling, theme-aware. */

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border-main bg-bg-card overflow-hidden',
        className,
      )}
    >
      {children}
    </div>
  );
}

export function SectionTitle({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
      <div>
        <h1 className="text-2xl font-black tracking-tight">{title}</h1>
        {subtitle && (
          <p className="text-sm text-text-secondary mt-0.5">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}

type ButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none',
        size === 'sm' ? 'text-xs px-3 h-8' : 'text-sm px-5 h-10',
        variant === 'primary' &&
          'bg-lex-purple text-white hover:bg-lex-purple-dark shadow-sm',
        variant === 'outline' &&
          'border border-border-main text-text-primary hover:bg-black/5 dark:hover:bg-white/10',
        variant === 'ghost' &&
          'text-text-secondary hover:bg-black/5 dark:hover:bg-white/10 hover:text-text-primary',
        variant === 'danger' &&
          'bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20',
        className,
      )}
    >
      {children}
    </button>
  );
}

const TONE_CLASSES: Record<string, string> = {
  green: 'bg-emerald-500/12 text-emerald-700 dark:text-emerald-400',
  amber: 'bg-amber-500/15 text-amber-700 dark:text-amber-400',
  blue: 'bg-blue-500/12 text-blue-700 dark:text-blue-400',
  purple: 'bg-lex-purple/12 text-lex-purple dark:text-lex-purple-light',
  red: 'bg-red-500/12 text-red-600 dark:text-red-400',
  gray: 'bg-black/6 text-text-secondary dark:bg-white/10',
};

export function Badge({
  children,
  tone = 'gray',
}: {
  children: ReactNode;
  tone?: keyof typeof TONE_CLASSES;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold whitespace-nowrap',
        TONE_CLASSES[tone] ?? TONE_CLASSES.gray,
      )}
    >
      {children}
    </span>
  );
}

/** Small square image with a letter fallback, used as the first table cell. */
export function Thumb({ src, alt }: { src?: string | null; alt: string }) {
  if (!src) {
    return (
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-black/6 text-xs font-black text-text-secondary dark:bg-white/10">
        {alt.slice(0, 1).toUpperCase()}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      className="h-9 w-9 shrink-0 rounded-lg object-cover"
    />
  );
}

/** Primary table cell: thumbnail, title, and a muted second line. */
export function TitleCell({
  image,
  title,
  subtitle,
}: {
  image?: string | null;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <Thumb src={image} alt={title} />
      <div className="min-w-0">
        <div className="truncate font-bold">{title}</div>
        {subtitle && (
          <div className="truncate text-[11px] text-text-secondary">{subtitle}</div>
        )}
      </div>
    </div>
  );
}

export function Field({
  label,
  required,
  help,
  error,
  children,
  className,
}: {
  label: string;
  required?: boolean;
  help?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn('block', className)}>
      <span className="block text-xs font-bold mb-1.5 text-text-primary">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </span>
      {children}
      {error ? (
        <span className="block text-[11px] font-semibold text-red-500 mt-1">
          {error}
        </span>
      ) : (
        help && (
          <span className="block text-[11px] text-text-secondary mt-1">{help}</span>
        )
      )}
    </label>
  );
}

export const inputClass =
  'w-full rounded-xl border border-border-main bg-bg-main px-3.5 h-10 text-sm outline-none transition focus:border-lex-purple focus:ring-2 focus:ring-lex-purple/20 placeholder:text-text-secondary/60';

export function EmptyState({
  title,
  hint,
  action,
}: {
  title: string;
  hint?: string;
  action?: ReactNode;
}) {
  return (
    <div className="py-16 px-6 text-center">
      <p className="font-bold">{title}</p>
      {hint && <p className="text-sm text-text-secondary mt-1">{hint}</p>}
      {action && <div className="mt-4 flex justify-center">{action}</div>}
    </div>
  );
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Hapus',
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-bg-main border border-border-main p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="font-black text-lg">{title}</h3>
        <p className="text-sm text-text-secondary mt-1.5">{message}</p>
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="ghost" onClick={onCancel}>
            Batal
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
