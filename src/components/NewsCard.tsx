import { Link } from "react-router-dom";
import Icon from "./Icon";
import { SketchArrow, SketchUnderline } from "./SketchFrame";
import { categoryIcon, type News } from "../data/news";

// Kartu berita bergambar penuh, dipakai di beranda & di bagian "Berita Lainnya" halaman detail berita
export default function NewsCard({ item, featured = false }: { item: News; featured?: boolean }) {
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

            <div className={`absolute inset-x-0 bottom-0 ${featured ? "pl-5 pr-14 py-5 md:pl-7 md:pr-16 md:py-7" : "pl-4 pr-12 py-4"}`}>
                {featured && (
                    <p className="font-display text-4xl md:text-5xl font-bold uppercase tracking-wide leading-none text-white">
                        <SketchUnderline tone="text-brand-warmred">Newest</SketchUnderline>
                    </p>
                )}
                {/* text-left: kartu sempit, judul yang terbungkus jadi renggang antar katanya kalau ikut justify dari body */}
                <h3 className={`text-left font-semibold leading-snug text-white ${
                    featured ? "mt-6 md:mt-7 max-w-xl text-lg line-clamp-3 md:line-clamp-2" : "text-base line-clamp-3"
                }`}>
                    {item.title}
                </h3>
            </div>

            {/* Dibungkus span karena SketchArrow sendiri sudah "relative" */}
            <span className={`absolute text-white transition-transform group-hover:translate-x-1 ${featured ? "bottom-6 right-5 md:bottom-8 md:right-7" : "bottom-5 right-4"}`}>
                <SketchArrow className="w-7 h-3.5" />
            </span>
        </Link>
    )
}
