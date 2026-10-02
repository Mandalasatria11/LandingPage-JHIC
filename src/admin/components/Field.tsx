import type { ReactNode } from "react";

// Label + isian + petunjuk/pesan error. htmlFor = id isian di dalamnya
export default function Field({ label, htmlFor, hint, error, optional = false, children, className = "" }: {
    label: string;
    htmlFor?: string;
    hint?: ReactNode;
    error?: string;
    optional?: boolean;
    children: ReactNode;
    className?: string;
}) {
    return(
        <div className={className}>
            <label htmlFor={htmlFor} className="block text-sm font-semibold text-brand-ink">
                {label}
                {optional && <span className="ml-1.5 font-normal text-brand-ink/50">(opsional)</span>}
            </label>
            <div className="mt-2">{children}</div>
            {error ? (
                <p className="mt-1.5 text-sm text-brand-signal">{error}</p>
            ) : hint ? (
                <p className="mt-1.5 text-xs leading-relaxed text-brand-ink/55">{hint}</p>
            ) : null}
        </div>
    )
}
