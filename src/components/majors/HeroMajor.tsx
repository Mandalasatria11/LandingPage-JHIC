import { Link } from "react-router-dom";
import Icon from "../Icon";
import type { Major } from "../../data/majors";

const chevron = (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m9 6 6 6-6 6" />
    </svg>
);

export default function HeroMajor({ major }: { major: Major }) {
    const name = `${major.highlight} ${major.rest}`.trim();

    const scrollToSection = (id: string) => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    };

    return(
        <section className="relative overflow-hidden bg-brand-ink bg-[radial-gradient(ellipse_at_top_right,var(--color-brand-deepred),transparent_65%)] text-white px-6 pt-36 pb-28 md:pt-40 md:pb-32">
            {/* Dekorasi titik-titik */}
            <div aria-hidden="true" className="pointer-events-none absolute left-6 bottom-20 hidden md:block w-40 h-28 bg-[radial-gradient(circle,rgb(255_255_255/0.1)_2px,transparent_2.5px)] bg-size-[22px_22px]" />

            {/* Kode jurusan besar di latar, sengaja terpotong */}
            <p aria-hidden="true" className="pointer-events-none select-none absolute -right-4 -bottom-[0.18em] font-display text-[42vw] md:text-[26vw] font-bold uppercase leading-none text-white/[0.04]">
                {major.code}
            </p>

            <div className="relative max-w-6xl mx-auto grid gap-12 md:gap-16 md:grid-cols-[1fr_auto] md:items-center">
                <div className="animate-fade-up">
                    <nav aria-label="Breadcrumb">
                        <ol className="flex flex-wrap items-center gap-2 text-sm text-brand-mist/60">
                            <li>
                                <Link to="/" className="transition-colors hover:text-white">Beranda</Link>
                            </li>
                            <li className="flex items-center gap-2">
                                {chevron}
                                Jurusan
                            </li>
                            <li className="flex items-center gap-2">
                                {chevron}
                                <span aria-current="page" className="font-medium text-white">{major.code}</span>
                            </li>
                        </ol>
                    </nav>

                    <p className="mt-8 text-xs sm:text-sm md:text-base uppercase tracking-[0.25em] font-semibold text-brand-mist/80">
                        Kompetensi Keahlian
                    </p>
                    <h1 className="mt-3 font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-wide leading-none">
                        <span className="block text-brand-warmred">{major.highlight}</span>
                        {major.rest && <span className="block">{major.rest}</span>}
                    </h1>

                    <p className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-brand-mist/80">
                        {major.desc}
                    </p>

                    <div className="mt-10 flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={() => scrollToSection("fokus")}
                            className="group inline-flex items-center gap-3 rounded-full bg-linear-to-r from-brand-signal to-brand-darkred px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-brand-darkred/30 transition-transform hover:-translate-y-0.5"
                        >
                            Lihat Materi Belajar
                            <svg className="w-5 h-5 transition-transform group-hover:translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M12 5v14M6 13l6 6 6-6" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            onClick={() => scrollToSection("jurusan-lainnya")}
                            className="inline-flex items-center rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                        >
                            Jurusan Lainnya
                        </button>
                    </div>
                </div>

                {/* Kartu jurusan, sama seperti di beranda */}
                <div className="w-full max-w-60 sm:max-w-72 mx-auto md:w-72 lg:w-80 md:max-w-none animate-fade-up [animation-delay:150ms]">
                    <div className="overflow-hidden rounded-card ring-1 ring-white/10 shadow-2xl shadow-black/40 transition-transform duration-500 md:rotate-2 md:hover:rotate-0">
                        <div className="relative aspect-4/5 overflow-hidden bg-linear-to-b from-brand-rose to-brand-ink">
                            {major.image_detail ? (
                                <img
                                    src={major.image_detail}
                                    alt={`Siswa jurusan ${name}`}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-white/30">
                                    <Icon name={major.icon} className="w-24 h-24 md:w-28 md:h-28" />
                                </div>
                            )}
                            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/60 to-transparent" />
                        </div>

                        <div className="bg-brand-warmred py-6 md:py-8 text-center font-display text-3xl md:text-4xl font-bold uppercase tracking-wide text-white">
                            {major.code}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
