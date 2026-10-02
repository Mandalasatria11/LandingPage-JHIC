import NewsCard from "../NewsCard";
import SketchFrame from "../SketchFrame";
import type { News } from "../../data/news";

export default function MoreNews({ items }: { items: News[] }) {
    if (items.length === 0) return null;

    return(
        <section className="relative z-10 bg-brand-softmist text-brand-ink px-6 py-20 md:py-28">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-center font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight">
                    <SketchFrame>Berita Lainnya</SketchFrame>
                </h2>

                <ul className="mt-12 md:mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((item, i) => (
                        // Di tablet hanya 2 kolom, jadi kartu ketiga disembunyikan supaya tidak tersisa sendirian
                        <li key={item.slug} className={i === 2 ? "sm:max-lg:hidden" : undefined}>
                            <NewsCard item={item} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
