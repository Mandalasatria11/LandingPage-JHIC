import MajorCard from "../MajorCard";
import { majors, type Major } from "../../data/majors";

export default function OtherMajors({ current }: { current: Major }) {
    const others = majors.filter((major) => major.slug !== current.slug);

    if (others.length === 0) return null;

    return(
        <section id="jurusan-lainnya" className="relative z-10 scroll-mt-6 overflow-hidden bg-white text-brand-ink px-6 py-20 md:py-24">
            {/* Dekorasi titik-titik */}
            <div aria-hidden="true" className="pointer-events-none absolute right-6 top-8 hidden md:block w-32 h-24 bg-[radial-gradient(circle,var(--color-brand-mist)_3px,transparent_3.5px)] bg-size-[34px_34px]" />
            <div aria-hidden="true" className="pointer-events-none absolute left-0 top-40 hidden md:block w-24 h-56 bg-[radial-gradient(circle,var(--color-brand-mist)_1.5px,transparent_2px)] bg-size-[14px_14px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />

            <div className="relative max-w-6xl mx-auto">
                <div className="grid gap-4 md:grid-cols-2 md:items-end">
                    <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight">
                        Jurusan Lainnya
                        <span className="mt-1 block h-1.5 w-10 bg-brand-warmred" aria-hidden="true" />
                    </h2>
                    <p className="text-base md:text-lg leading-relaxed text-brand-ink/70 md:max-w-md md:justify-self-end">
                        Masih menimbang pilihan? Bandingkan dengan kompetensi keahlian lain di SMK Plus Pelita Nusantara.
                    </p>
                </div>

                <ul className="mt-12 -mx-6 px-6 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:none] lg:mx-0 lg:px-0 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:pb-0">
                    {others.map((major) => (
                        <li key={major.code} className="shrink-0 w-[55%] sm:w-[36%] lg:w-auto snap-start">
                            <MajorCard major={major} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
