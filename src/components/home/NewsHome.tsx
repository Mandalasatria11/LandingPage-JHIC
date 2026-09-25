import { useState } from "react";
import { Link } from "react-router-dom";
import Icon, { type IconName } from "../Icon";
import { news, newsCategories, type News, type NewsCategory } from "../../data/news";

const PAGE_SIZE = 6;

// Ikon placeholder selama berita belum punya foto
const categoryIcon: Record<NewsCategory, IconName> = {
    "Kegiatan Sekolah": "user",
    "Prestasi": "award",
    "Pengumuman": "bulb",
    "Kemitraan & Kerja Sama": "briefcase",
    "Karya & Inovasi Siswa": "code",
    "Artikel & Edukasi": "book",
    "Alumni": "globe",
};

const sortedNews = [...news].sort((a, b) => b.date.localeCompare(a.date));

export default function NewsHome() {
    const [category, setCategory] = useState<NewsCategory | "Semua">("Semua");
    const [page, setPage] = useState(0);

    const filtered = category === "Semua" ? sortedNews : sortedNews.filter((n) => n.category === category);
    // Berita terbaru tampil besar di halaman pertama, sisanya dibagi per PAGE_SIZE kartu
    const featured = page === 0 ? filtered[0] : undefined;
    const pageCount = Math.max(1, Math.ceil((filtered.length - 1) / PAGE_SIZE));
    const start = 1 + page * PAGE_SIZE;
    const items = filtered.slice(start, start + PAGE_SIZE);

    const selectCategory = (c: NewsCategory | "Semua") => {
        setCategory(c);
        setPage(0);
    };

    return(
        <section className="relative z-10 bg-brand-softmist text-brand-ink px-6 py-20 md:py-28">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-center font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight">
                    Berita &amp; Informasi Terkini
                    <span className="block text-brand-darkred">SMK Plus Pelita Nusantara</span>
                </h2>

                <div className="mt-12 md:mt-16 grid gap-8 lg:gap-12 lg:grid-cols-[13rem_1fr]">
                    {/* Kategori: sidebar di desktop, deretan chip yang bisa digeser di HP */}
                    <nav aria-label="Kategori berita" className="min-w-0">
                        <h3 className="hidden lg:block font-display text-lg font-bold uppercase tracking-wide">Kategori Berita</h3>
                        <ul className="flex lg:flex-col gap-2 lg:gap-1 lg:mt-5 overflow-x-auto -mx-6 px-6 lg:mx-0 lg:px-0 [scrollbar-width:none]">
                            {(["Semua", ...newsCategories] as const).map((c) => (
                                <li key={c} className="shrink-0">
                                    <button
                                        type="button"
                                        onClick={() => selectCategory(c)}
                                        aria-pressed={category === c}
                                        className={`rounded-full lg:rounded-none px-4 py-2 lg:px-0 lg:py-2 text-sm font-medium text-left transition-colors ${
                                            category === c
                                                ? "bg-brand-darkred text-white lg:bg-transparent lg:text-brand-darkred"
                                                : "bg-white lg:bg-transparent text-brand-ink/70 hover:text-brand-ink"
                                        }`}
                                    >
                                        {c}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="min-w-0">
                        {filtered.length > 0 ? (
                            <div key={`${category}-${page}`} className="grid gap-5 animate-fade-up">
                                {featured && <NewsCard item={featured} featured />}

                                {items.length > 0 && (
                                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                                        {items.map((item) => (
                                            <NewsCard key={item.slug} item={item} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <p className="py-16 text-center text-brand-ink/60">Belum ada berita di kategori ini.</p>
                        )}

                        {pageCount > 1 && (
                            <div className="mt-10 flex items-center justify-between gap-4">
                                <PageButton direction="left" disabled={page === 0} onClick={() => setPage(page - 1)} />

                                <div className="flex flex-wrap justify-center gap-3">
                                    {Array.from({ length: pageCount }, (_, i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            onClick={() => setPage(i)}
                                            aria-label={`Halaman ${i + 1}`}
                                            aria-current={i === page ? "page" : undefined}
                                            className={`w-2.5 h-2.5 rounded-full transition-colors ${
                                                i === page ? "bg-brand-darkred" : "bg-brand-ink/20 hover:bg-brand-ink/40"
                                            }`}
                                        />
                                    ))}
                                </div>

                                <PageButton direction="right" disabled={page === pageCount - 1} onClick={() => setPage(page + 1)} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

function NewsCard({ item, featured = false }: { item: News; featured?: boolean }) {
    return(
        <Link
            to={`/berita/${item.slug}`}
            className={`group relative block overflow-hidden rounded-card bg-linear-to-br from-brand-signal to-brand-deepred shadow-lg shadow-brand-ink/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-darkred ${
                featured ? "aspect-4/3 sm:aspect-5/2 lg:aspect-7/2" : "aspect-video"
            }`}
        >
            {item.image ? (
                <img
                    src={item.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center text-white/15 transition-transform duration-500 group-hover:scale-110">
                    <Icon name={categoryIcon[item.category]} className={featured ? "w-28 h-28 md:w-36 md:h-36" : "w-16 h-16"} />
                </div>
            )}

            <div className="absolute inset-0 bg-linear-to-t from-brand-ink/90 via-brand-ink/40 to-transparent" />

            <div className={`absolute inset-x-0 bottom-0 ${featured ? "pl-5 pr-14 py-5 md:pl-7 md:py-7" : "pl-4 pr-11 py-4"}`}>
                {featured && (
                    <p className="font-display text-4xl md:text-5xl font-bold uppercase tracking-wide leading-none text-white">
                        Newest
                        <span aria-hidden="true" className="mt-1.5 block h-1 w-10 md:w-12 bg-brand-warmred" />
                    </p>
                )}
                <h3 className={`font-semibold leading-snug text-white ${
                    featured ? "mt-3 md:mt-4 max-w-xl text-lg line-clamp-3 md:line-clamp-2" : "text-base line-clamp-3"
                }`}>
                    {item.title}
                </h3>
            </div>

            <svg
                className={`absolute w-5 h-5 text-white transition-transform group-hover:translate-x-1 ${featured ? "bottom-5 right-5 md:bottom-7 md:right-7" : "bottom-4 right-4"}`}
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
            >
                <path d="M9 18l6-6-6-6" />
            </svg>
        </Link>
    )
}

function PageButton({ direction, disabled, onClick }: { direction: "left" | "right"; disabled: boolean; onClick: () => void }) {
    return(
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            aria-label={direction === "left" ? "Halaman sebelumnya" : "Halaman berikutnya"}
            className="shrink-0 w-12 h-12 rounded-lg bg-brand-darkred text-white flex items-center justify-center transition-colors hover:bg-brand-deepred disabled:bg-brand-darkred/40 disabled:cursor-not-allowed"
        >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={direction === "left" ? "M19 12H5M11 18l-6-6 6-6" : "M5 12h14M13 6l6 6-6 6"} />
            </svg>
        </button>
    )
}
