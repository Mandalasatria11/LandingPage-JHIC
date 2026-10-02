import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArticleBlock from "../ArticleBlock";
import Icon, { type IconName } from "../Icon";
import { SketchBox, SketchCorner, SketchLine, SketchRule } from "../SketchFrame";
import { categoryIcon, type News, type NewsDetail } from "../../data/news";

export default function ArticleNews({ item, latest }: { item: NewsDetail; latest: News[] }) {
    return(
        // Lanjutan kepala artikel (HeroNews) yang juga putih. pt cukup besar untuk siku coretan di atas foto
        <section className="relative bg-white text-brand-ink px-6 pt-14 pb-20 md:pt-16 md:pb-28">
            <div className="max-w-6xl mx-auto grid gap-16 lg:grid-cols-[1fr_20rem] lg:items-start xl:gap-20">
                <article className="min-w-0">
                    <div className="relative">
                        {item.image ? (
                            <img
                                src={item.image}
                                alt=""
                                className="w-full aspect-video object-cover rounded-card bg-brand-softmist shadow-2xl"
                            />
                        ) : (
                            <div className="w-full aspect-video rounded-card bg-linear-to-br from-brand-signal to-brand-deepred shadow-2xl flex items-center justify-center text-white/15">
                                <Icon name={categoryIcon[item.category]} className="w-28 h-28 md:w-36 md:h-36" />
                            </div>
                        )}

                        {/* Garis siku coretan di pojok kanan atas & kiri bawah foto, sama seperti bingkai video di beranda */}
                        <SketchCorner className="-top-5 -right-5 w-16 h-16 md:-top-8 md:-right-8 md:w-28 md:h-28 rotate-90" />
                        <SketchCorner delay={350} className="-bottom-5 -left-5 w-16 h-16 md:-bottom-8 md:-left-8 md:w-28 md:h-28 -rotate-90" />
                    </div>

                    {/* mt cukup besar supaya paragraf pembuka tidak menempel ke siku kiri bawah foto */}
                    <p className="mt-14 md:mt-16 text-base md:text-lg leading-relaxed font-medium">{item.excerpt}</p>

                    <div className="mt-6 space-y-6">
                        {item.body.map((block, i) => (
                            <ArticleBlock key={i} block={block} />
                        ))}
                    </div>

                    <ShareNews title={item.title} />
                </article>

                <LatestNews items={latest} />
            </div>
        </section>
    )
}

function ShareNews({ title }: { title: string }) {
    const [copied, setCopied] = useState(false);
    const url = window.location.href;

    // Label "Tautan Tersalin" kembali seperti semula setelah 2 detik
    useEffect(() => {
        if (!copied) return;
        const timer = setTimeout(() => setCopied(false), 2000);
        return () => clearTimeout(timer);
    }, [copied]);

    const copyLink = () => {
        // Kalau izin clipboard ditolak browser, tombol cukup tidak berubah
        navigator.clipboard?.writeText(url).then(() => setCopied(true), () => {});
    };

    const links: { icon: IconName; label: string; href: string }[] = [
        { icon: "whatsapp", label: "Bagikan ke WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}` },
        { icon: "facebook", label: "Bagikan ke Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    ];

    return(
        <div className="relative mt-14 pt-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
            {/* Garis coretan panjang memisahkan isi artikel dari tombol bagikan */}
            <SketchLine className="left-0 top-0 w-full h-3" />

            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-darkred">Bagikan Berita Ini</p>

            <div className="flex flex-wrap items-center gap-3">
                {links.map((link) => (
                    <a
                        key={link.icon}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={link.label}
                        title={link.label}
                        className="w-11 h-11 rounded-full bg-brand-darkred/10 text-brand-darkred flex items-center justify-center transition-colors hover:bg-brand-darkred hover:text-white"
                    >
                        <Icon name={link.icon} className="w-5 h-5" />
                    </a>
                ))}
                <button
                    type="button"
                    onClick={copyLink}
                    className="inline-flex items-center gap-2 h-11 rounded-full bg-brand-darkred/10 px-5 text-sm font-semibold text-brand-darkred transition-colors hover:bg-brand-darkred hover:text-white"
                >
                    <Icon name={copied ? "check" : "link"} className="w-4 h-4" />
                    {copied ? "Tautan Tersalin" : "Salin Tautan"}
                </button>
                <span role="status" className="sr-only">{copied ? "Tautan berita berhasil disalin" : ""}</span>
            </div>
        </div>
    )
}

function LatestNews({ items }: { items: News[] }) {
    if (items.length === 0) return null;

    return(
        // Bingkai coretan penuh seperti kotak "Sekolah dalam Angka" di halaman Tentang.
        // Ikut menempel saat discroll di desktop; top-32 = di bawah navbar mengambang
        <aside aria-labelledby="berita-terbaru" className="relative p-6 lg:sticky lg:top-32">
            <SketchBox />
            <h2 id="berita-terbaru" className="font-display text-lg font-bold uppercase tracking-wide">Berita Terbaru</h2>

            <ul className="mt-5">
                {items.map((n, i) => (
                    <li key={n.slug} className="relative py-4 first:pt-0 last:pb-0">
                        {/* Garis pemisah coretan, pengganti divide-y */}
                        {i > 0 && <SketchRule delay={i * 100} className="text-brand-darkred/30 -left-1 -right-1 -top-1.5 h-3" />}

                        <Link to={`/berita/${n.slug}`} className="group flex items-start gap-4">
                            <div className="relative shrink-0 w-20 aspect-square overflow-hidden rounded-card bg-linear-to-br from-brand-signal to-brand-deepred">
                                {n.image ? (
                                    <img
                                        src={n.image}
                                        alt=""
                                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-white/30">
                                        <Icon name={categoryIcon[n.category]} className="w-8 h-8" />
                                    </div>
                                )}
                            </div>

                            <div className="min-w-0">
                                <time dateTime={n.date} className="block text-xs uppercase tracking-[0.25em] font-semibold text-brand-darkred">
                                    {new Date(n.date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                                </time>
                                <h3 className="mt-1.5 text-left text-sm font-semibold leading-snug line-clamp-3 transition-colors group-hover:text-brand-darkred">
                                    {n.title}
                                </h3>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    )
}
