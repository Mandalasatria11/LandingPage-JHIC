// Kelas Tailwind yang dipakai berulang di panel admin, supaya tombol & isian terlihat seragam

export const inputClass =
    "block w-full rounded-xl border border-brand-ink/15 bg-white px-4 py-2.5 text-sm text-brand-ink placeholder:text-brand-ink/40 transition focus:border-brand-darkred focus:outline-none focus:ring-4 focus:ring-brand-darkred/10 aria-invalid:border-brand-signal aria-invalid:ring-brand-signal/10 disabled:bg-brand-softmist/60";

export const buttonPrimary =
    "inline-flex items-center justify-center gap-2 rounded-full bg-brand-darkred px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-brand-darkred/20 transition-colors hover:bg-brand-deepred focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-darkred disabled:cursor-not-allowed disabled:opacity-60";

export const buttonSecondary =
    "inline-flex items-center justify-center gap-2 rounded-full border border-brand-ink/15 bg-white px-5 py-2.5 text-sm font-semibold text-brand-ink transition-colors hover:bg-brand-softmist focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-darkred disabled:cursor-not-allowed disabled:opacity-60";

export const buttonDanger =
    "inline-flex items-center justify-center gap-2 rounded-full bg-brand-signal px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-darkred focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-signal disabled:cursor-not-allowed disabled:opacity-60";

// Tombol ikon kecil di baris tabel/kartu (edit, hapus, naik, turun)
export const iconButton =
    "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-brand-ink/60 transition-colors hover:bg-brand-softmist hover:text-brand-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-darkred disabled:pointer-events-none disabled:opacity-30";

export const cardClass = "rounded-card border border-brand-ink/10 bg-white shadow-sm";
