import type { NewsStatus } from "../../data/news";

const styles: Record<NewsStatus, { label: string; className: string }> = {
    published: { label: "Terbit", className: "bg-emerald-50 text-emerald-700 ring-emerald-600/20" },
    scheduled: { label: "Terjadwal", className: "bg-amber-50 text-amber-700 ring-amber-600/20" },
    draft: { label: "Draf", className: "bg-brand-softmist text-brand-ink/70 ring-brand-ink/15" },
};

export default function StatusBadge({ status }: { status: NewsStatus }) {
    const { label, className } = styles[status];

    return(
        <span className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${className}`}>
            {label}
        </span>
    )
}
