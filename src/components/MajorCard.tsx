import { Link } from "react-router-dom";
import Icon from "./Icon";
import { SketchArrow } from "./SketchFrame";
import type { Major } from "../data/majors";

export default function MajorCard({ major }: { major: Major }) {
    const name = `${major.highlight} ${major.rest}`.trim();

    return(
        <Link
            to={`/jurusan/${major.slug}`}
            aria-label={`${name} (${major.code})`}
            className="group relative block overflow-hidden rounded-card shadow-softpill transition-transform duration-300 hover:-translate-y-1"
        >
            {/* Foto memenuhi seluruh kartu, bagian bawahnya sengaja tertutup label kode jurusan.
                object-top supaya kepala tidak terpotong kalau foto harus dipotong atas-bawah */}
            {major.image && (
                <img
                    src={major.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />
            )}

            {/* aspect-4/5 menentukan tinggi kartu di atas label */}
            <div className="relative aspect-4/7">
                {!major.image && (
                    <div className="absolute inset-0 flex items-center justify-center text-brand-ink/20">
                        <Icon name={major.icon} className="w-16 h-16" />
                    </div>
                )}

                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/80 to-transparent" />

                <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
    <div className="w-6 h-8 flex items-center justify-center">
        <img
            src={major.cardlogo}
            alt=""
            className="w-8 h-8 object-contain"
        />
    </div>

    <div className="h-10 w-px bg-white/70" />

    <div className="flex flex-col">
        <span className="text-base font-bold text-white">
            {major.cardtagline}
        </span>
        <span className="text-xs text-white/80 italic">
            {major.shorttagline}
        </span>
    </div>
</div>
                
                <span className="absolute bottom-3 right-3 flex items-center gap-1 text-sm font-semibold text-white">
                    See More
                    <span className="text-brand-warmred">
                        <SketchArrow className="w-6 h-3 transition-transform group-hover:translate-x-0.5" />
                    </span>
                </span>
            </div>

        </Link>
    )
}
