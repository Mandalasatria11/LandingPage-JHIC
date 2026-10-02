import { SketchArrow, SketchRule } from "./SketchFrame";
import type { NewsBlock } from "../data/news";

// Satu blok isi artikel (paragraf, subjudul, kutipan, atau daftar poin). Dipakai di detail berita & detail program unggulan
export default function ArticleBlock({ block }: { block: NewsBlock }) {
    if (typeof block === "string") {
        return <p className="text-base leading-relaxed text-brand-ink/80">{block}</p>;
    }

    if ("heading" in block) {
        return <h2 className="pt-4 text-left font-display text-lg font-bold uppercase tracking-wide">{block.heading}</h2>;
    }

    if ("quote" in block) {
        return(
            // Garis tegak coretan di kiri kutipan, pengganti border-l
            <figure className="relative my-10 py-1 pl-8 md:pl-10">
                <SketchRule bold vertical className="text-brand-darkred -top-1 -bottom-1 left-0 w-3" />
                <blockquote className="text-lg font-semibold leading-snug">&ldquo;{block.quote}&rdquo;</blockquote>
                {block.by && <figcaption className="mt-3 text-sm text-brand-ink/60">{block.by}</figcaption>}
            </figure>
        );
    }

    return(
        // Panah coretan sebagai penanda poin, sama seperti daftar misi di beranda
        <ul className="space-y-3">
            {block.list.map((point, i) => (
                <li key={point} className="flex gap-3">
                    <span className="shrink-0 mt-1.5 text-brand-darkred">
                        <SketchArrow delay={i * 200} className="w-8 h-4" />
                    </span>
                    <span className="leading-relaxed text-brand-ink/80">{point}</span>
                </li>
            ))}
        </ul>
    );
}
