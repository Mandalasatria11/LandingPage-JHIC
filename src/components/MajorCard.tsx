import { Link } from "react-router-dom";
import Icon from "./Icon";
import type { Major } from "../data/majors";

export default function MajorCard({ major }: { major: Major }) {
    const name = `${major.highlight} ${major.rest}`.trim();

    return(
        <Link
            to={`/jurusan/${major.slug}`}
            aria-label={`${name} (${major.code})`}
            className="group block overflow-hidden rounded-card shadow-softpill transition-transform duration-300 hover:-translate-y-1"
        >
            <div className="relative aspect-4/7 overflow-hidden bg-linear-to-b from-brand-rose to-brand-ink">
                {major.image ? (
                    <img
                        src={major.image}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-white/30">
                        <Icon name={major.icon} className="w-16 h-16" />
                    </div>
                )}

                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/80 to-transparent" />

                <span className="absolute bottom-3 right-3 flex items-center gap-1 text-sm font-semibold text-white">
                    See More
                    <svg className="w-4 h-4 text-brand-warmred transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="m9 6 6 6-6 6" />
                    </svg>
                </span>
            </div>

            {/* <div className="bg-brand-warmred py-6 md:py-8 text-center font-display text-3xl md:text-4xl font-bold uppercase tracking-wide text-white transition-colors group-hover:bg-brand-signal">
                {major.code}
            </div> */}
        </Link>
    )
}
