import { Link } from "react-router-dom";
import Icon from "../Icon";
import { SketchSparks, SketchUnderline } from "../SketchFrame";
import { defaultNewsAuthor, type NewsDetail } from "../../data/news";

const chevron = (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m9 6 6 6-6 6" />
    </svg>
);

// Perkiraan waktu baca dengan kecepatan rata-rata 200 kata per menit
function readingMinutes(item: NewsDetail) {
    const text = [item.excerpt, ...item.body.map((block) =>
        typeof block === "string" ? block
            : "heading" in block ? block.heading
            : "quote" in block ? block.quote
            : block.list.join(" ")
    )].join(" ");
    return Math.max(1, Math.round(text.split(/\s+/).length / 200));
}

export default function HeroNews({ item }: { item: NewsDetail }) {
    const date = new Date(item.date);
    const day = date.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    const time = date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

    // Coretan hanya di kata terakhir judul, sama seperti judul halaman detail program:
    // kalau seluruh judul, garisnya ikut melebar saat judul terlipat beberapa baris
    const words = item.title.split(" ");
    const lastWord = words.pop();
    const firstWords = words.join(" ");

    const meta = [
        { icon: "user", label: item.author ?? defaultNewsAuthor },
        { icon: "calendar", label: <time dateTime={item.date}>{day}, {time} WIB</time> },
        { icon: "clock", label: `${readingMinutes(item)} menit baca` },
    ] as const;

    return(
        // Kepala artikel berlatar terang seperti halaman detail program; pt besar supaya tidak tertutup navbar.
        // Section artikel di bawahnya juga putih, jadi keduanya menyatu.
        <section className="relative bg-white text-brand-ink px-6 pt-32 md:pt-40">
            {/* Dekorasi titik-titik */}
            <div aria-hidden="true" className="pointer-events-none absolute right-6 top-28 hidden md:block w-40 h-28 bg-[radial-gradient(circle,var(--color-brand-mist)_2px,transparent_2.5px)] bg-size-[22px_22px]" />

            <div className="relative max-w-6xl mx-auto animate-fade-up">
                <nav aria-label="Breadcrumb">
                    {/* Tanpa flex-wrap: judul berita yang menyusut & terpotong, supaya breadcrumb tetap satu baris di HP */}
                    <ol className="flex items-center gap-2 text-sm text-brand-ink/50">
                        <li className="shrink-0">
                            <Link to="/" className="transition-colors hover:text-brand-darkred">Beranda</Link>
                        </li>
                        <li className="flex shrink-0 items-center gap-2">
                            {chevron}
                            <Link to="/berita" className="transition-colors hover:text-brand-darkred">Berita</Link>
                        </li>
                        <li className="flex min-w-0 items-center gap-2">
                            {chevron}
                            {/* Judul lengkap sudah ada di h1, di sini cukup dipotong satu baris */}
                            <span aria-current="page" className="truncate sm:max-w-sm font-medium text-brand-ink">{item.title}</span>
                        </li>
                    </ol>
                </nav>

                <p className="mt-10 md:mt-12 text-xs sm:text-sm md:text-base uppercase tracking-[0.25em] font-semibold text-brand-darkred">
                    <SketchSparks>{item.category}</SketchSparks>
                </p>
                {/* text-left: judul panjang yang rata kiri-kanan jadi renggang antar katanya.
                    delay: coretan mulai setelah teks selesai muncul */}
                <h1 className="mt-4 max-w-4xl text-left font-display text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wide leading-tight">
                    {firstWords && `${firstWords} `}
                    <SketchUnderline size="lg" tone="text-brand-signal" delay={500}>{lastWord}</SketchUnderline>
                </h1>

                {/* mt-10: memberi ruang untuk garis coretan yang menggantung di bawah judul */}
                <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-brand-ink/70">
                    {meta.map((m) => (
                        <li key={m.icon} className="flex items-center gap-2">
                            <Icon name={m.icon} className="w-4 h-4 shrink-0 text-brand-darkred" />
                            {m.label}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
