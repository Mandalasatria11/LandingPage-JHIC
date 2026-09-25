import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../Icon";
import { programs } from "../../data/programs";
import logoSekolah from "../../assets/images/logosmkpenus.png";

export default function ProgramsHome() {
    const [index, setIndex] = useState(0);  
    const touchStartX = useRef<number | null>(null);
    const program = programs[index];

    const goTo = (i: number) => setIndex((i + programs.length) % programs.length);
    const prev = () => goTo(index - 1);
    const next = () => goTo(index + 1);

    const onTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(delta) > 50) (delta > 0 ? prev : next)();
        touchStartX.current = null;
    };

    if (!program) return null;

    return(
        <section className="relative z-10 bg-brand-softmist text-brand-ink px-6 py-20 md:py-28">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-center font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight">Program Unggulan</h2>

                <div
                    className="mt-12 md:mt-16 grid gap-10 md:gap-12 md:grid-cols-[1.1fr_1fr] items-center"
                    role="region"
                    aria-roledescription="carousel"
                    aria-label="Program unggulan"
                    onKeyDown={(e) => {
                        if (e.key === "ArrowLeft") prev();
                        if (e.key === "ArrowRight") next();
                    }}
                >
                    {/* Gambar + tombol geser */}
                    <div
                        className="relative aspect-[4/3] overflow-hidden rounded-card bg-linear-to-b from-white to-brand-mist shadow-xl"
                        onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
                        onTouchEnd={onTouchEnd}
                    >
                        <div key={program.id} className="absolute inset-0 animate-fade-up">
                            {program.image ? (
                                <img
                                    src={program.image}
                                    alt={program.title}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-brand-ink/80">
                                    <Icon name={program.icon} className="w-28 h-28 md:w-36 md:h-36" />
                                </div>
                            )}
                        </div>

                        <SlideButton direction="left" onClick={prev} />
                        <SlideButton direction="right" onClick={next} />
                    </div>

                    {/* Keterangan */}
                    <div key={program.id} className="animate-fade-up" aria-live="polite">
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white border border-brand-ink/80 shadow-softpill flex items-center justify-center p-3">
                            <img
                                src={program.logo ?? logoSekolah}
                                alt=""
                                className="w-full h-full object-contain"
                            />
                        </div>

                        <h3 className="mt-6 font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight">{program.title}</h3>
                        <p className="mt-4 max-w-lg text-base leading-relaxed text-brand-ink/70">
                            {program.desc}
                        </p>

                        {/* TODO: halaman detail program belum dibuat */}
                        <Link
                            to={`/program/${program.id}`}
                            className="group mt-8 inline-flex items-center gap-3 rounded-full bg-linear-to-r from-brand-darkred to-brand-deepred px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-brand-darkred/25 transition-transform hover:-translate-y-0.5"
                        >
                            Lihat Detail
                            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M5 12h14M13 6l6 6-6 6" />
                            </svg>
                        </Link>

                        <div className="mt-8 flex gap-2">
                            {programs.map((p, i) => (
                                <button
                                    key={p.id}
                                    type="button"
                                    onClick={() => goTo(i)}
                                    aria-label={`Lihat ${p.title}`}
                                    aria-current={i === index}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${
                                        i === index ? "w-8 bg-brand-darkred" : "w-1.5 bg-brand-ink/20 hover:bg-brand-ink/40"
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function SlideButton({ direction, onClick }: { direction: "left" | "right"; onClick: () => void }) {
    return(
        <button
            type="button"
            onClick={onClick}
            aria-label={direction === "left" ? "Program sebelumnya" : "Program berikutnya"}
            className={`absolute top-1/2 -translate-y-1/2 ${direction === "left" ? "left-3 md:left-4" : "right-3 md:right-4"} w-10 h-10 rounded-full bg-white/80 backdrop-blur text-brand-ink flex items-center justify-center shadow-softpill transition-colors hover:bg-white`}
        >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={direction === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
            </svg>
        </button>
    )
}
