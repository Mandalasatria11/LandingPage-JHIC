import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../Icon";
import LoadError from "../LoadError";
import Skeleton from "../Skeleton";
import SketchFrame, { SketchArrow, SketchUnderline } from "../SketchFrame";
import { usePrograms } from "../../lib/content";

export default function ProgramsHome() {
    const [index, setIndex] = useState(0);
    const touchStartX = useRef<number | null>(null);
    const { programs = [], error, loading, reload } = usePrograms();
    // % length: kalau jumlah program berkurang, tetap menunjuk program yang ada
    const program = programs.length > 0 ? programs[index % programs.length] : undefined;

    const goTo = (i: number) => setIndex((i + programs.length) % programs.length);
    const prev = () => goTo(index - 1);
    const next = () => goTo(index + 1);

    const onTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(delta) > 50) (delta > 0 ? prev : next)();
        touchStartX.current = null;
    };

    // Belum ada program sama sekali: section tidak ditampilkan
    if (!loading && !error && !program) return null;

    return(
        <section className="relative z-10 bg-brand-softmist text-brand-ink px-6 py-20 md:py-28">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-center font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight">
                    <SketchFrame>Program Unggulan</SketchFrame>
                </h2>

                {error ? (
                    <LoadError message={error.message} onRetry={reload} className="mt-8" />
                ) : !program ? (
                    <div role="status" aria-label="Memuat program unggulan" className="mt-12 md:mt-16 grid gap-10 md:gap-12 md:grid-cols-[1.1fr_1fr] items-center">
                        <Skeleton className="aspect-4/3 rounded-card" />
                        <div>
                            <Skeleton className="h-10 w-3/4 rounded-lg" />
                            <Skeleton className="mt-8 h-4 w-full max-w-lg rounded-full" />
                            <Skeleton className="mt-3 h-4 w-5/6 max-w-md rounded-full" />
                            <Skeleton className="mt-10 h-12 w-44 rounded-full" />
                        </div>
                    </div>
                ) : (
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
                            className="relative aspect-4/3 overflow-hidden rounded-card bg-linear-to-b from-white to-brand-mist shadow-xl"
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

                            {programs.length > 1 && (
                                <>
                                    <SlideButton direction="left" onClick={prev} />
                                    <SlideButton direction="right" onClick={next} />
                                </>
                            )}
                        </div>

                        {/* Keterangan */}
                        <div key={program.id} className="animate-fade-up" aria-live="polite">
                            <SketchUnderline size="lg" tone="text-brand-signal" delay={700}>
                                <h3 className="mt-6 font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight">{program.title}</h3>
                            </SketchUnderline>

                            <p className="mt-4 max-w-lg text-base leading-relaxed text-brand-ink/70 pt-3">
                                {program.description}
                            </p>

                            <Link
                                to={`/program/${program.slug}`}
                                className="group mt-8 inline-flex items-center gap-3 rounded-full bg-linear-to-r px-7 py-3.5 text-sm font-semibold text-brand-darkred transition-transform hover:-translate-y-0.5"
                            >
                                <SketchFrame>
                                    {/* SketchArrow berupa block, jadi teks & panah dijejerkan dengan inline-flex supaya tidak turun baris */}
                                    <span className="inline-flex items-center gap-3">
                                        Lihat Detail
                                        <SketchArrow className="w-8 h-4 transition-transform group-hover:translate-x-1" />
                                    </span>
                                </SketchFrame>
                            </Link>

                            <div className="mt-8 flex gap-2">
                                {programs.map((p) => (
                                    <button
                                        key={p.id}
                                        type="button"
                                        onClick={() => setIndex(programs.indexOf(p))}
                                        aria-label={`Lihat ${p.title}`}
                                        aria-current={p.id === program.id}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${
                                            p.id === program.id ? "w-8 bg-brand-darkred" : "w-1.5 bg-brand-ink/20 hover:bg-brand-ink/40"
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
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
            className={`absolute top-1/2 -translate-y-1/2 ${direction === "left" ? "left-3 md:left-4" : "right-3 md:right-4"} w-10 h-10 rounded-full bg-white/80 backdrop-blur text-brand-ink flex items-center justify-center shadow-softpill transition-colors hover:bg-brand-softmist hover:cursor-pointer`}
        >
            <SketchArrow className={`w-6 h-3 ${direction === "left" ? "-scale-x-100" : ""}`} />
        </button>
    )
}
