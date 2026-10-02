import { Link } from "react-router-dom";
import Icon from "../Icon";
import SketchFrame, { SketchArrow } from "../SketchFrame";
import type { Program } from "../../data/programs";

export default function MorePrograms({ items }: { items: Program[] }) {
    if (items.length === 0) return null;

    return(
        <section className="relative z-10 bg-brand-softmist text-brand-ink px-6 py-20 md:py-28">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-center font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight">
                    <SketchFrame>Program Lainnya</SketchFrame>
                </h2>

                <ul className="mt-12 md:mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((program, i) => (
                        // Di tablet hanya 2 kolom, jadi kartu ketiga disembunyikan supaya tidak tersisa sendirian
                        <li key={program.slug} className={i === 2 ? "sm:max-lg:hidden" : undefined}>
                            <ProgramCard program={program} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

// Kartu bergambar penuh, sama seperti kartu berita di "Berita Lainnya"
function ProgramCard({ program }: { program: Program }) {
    return(
        <Link
            to={`/program/${program.slug}`}
            className="group relative block aspect-4/3 overflow-hidden rounded-card bg-linear-to-br from-brand-signal to-brand-deepred shadow-lg shadow-brand-ink/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-darkred"
        >
            {program.image ? (
                <img
                    src={program.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center text-white/15 transition-transform duration-500 group-hover:scale-110">
                    <Icon name={program.icon} className="w-16 h-16" />
                </div>
            )}

            <div className="absolute inset-0 bg-linear-to-t from-brand-ink/90 via-brand-ink/40 to-transparent" />

            {/* text-left: kartu sempit, teks yang terbungkus jadi renggang kalau ikut justify dari body */}
            <div className="absolute inset-x-0 bottom-0 pl-5 pr-14 py-5 text-left">
                <h3 className="text-lg font-semibold text-white">{program.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/75 line-clamp-2">{program.description}</p>
            </div>

            {/* Dibungkus span karena SketchArrow sendiri sudah "relative" */}
            <span className="absolute bottom-6 right-5 text-white transition-transform group-hover:translate-x-1">
                <SketchArrow className="w-7 h-3.5" />
            </span>
        </Link>
    )
}
