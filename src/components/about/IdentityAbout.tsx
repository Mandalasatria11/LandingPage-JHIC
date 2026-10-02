import { Link } from "react-router-dom";
import { dataSource, facts, identity } from "../../data/profile";
import { majors } from "../../data/majors";
import { SketchBox, SketchRule, SketchSparks } from "../SketchFrame";

export default function IdentityAbout() {
    return(
        <section className="relative z-10 overflow-hidden bg-brand-mist text-brand-ink px-6 py-20 md:py-28">
            {/* Dekorasi titik-titik */}
            <div aria-hidden="true" className="pointer-events-none absolute left-0 top-40 hidden md:block w-24 h-56 bg-[radial-gradient(circle,var(--color-brand-mist)_1.5px,transparent_2px)] bg-size-[14px_14px] mask-[linear-gradient(to_bottom,black,transparent)]" />

            <div className="relative max-w-6xl mx-auto grid gap-12 lg:gap-16 lg:grid-cols-[2fr_3fr] lg:items-start">
                <div>
                    <p className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-darkred">
                        <SketchSparks>Data Resmi</SketchSparks>
                    </p>
                    <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight">
                        Identitas Sekolah
                    </h2>
                    <p className="mt-4 text-base md:text-lg leading-relaxed text-brand-ink/70">
                        Data sekolah yang tercatat di Kementerian Pendidikan Dasar dan Menengah.
                    </p>

                    <h3 className="mt-10 text-lg font-semibold">Sekolah dalam Angka</h3>
                    {/* gap-6: ujung bingkai coretan kebablasan ±8px, jadi kotak bersebelahan tidak saling tabrak */}
                    <dl className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-6">
                        {facts.map((fact, index) => (
                            <div key={fact.label} className="relative flex flex-col-reverse justify-end p-4 md:p-5">
                                <dt className="mt-1.5 text-sm text-brand-ink/70">{fact.label}</dt>
                                {/* Tanpa "uppercase" supaya satuan m² tidak berubah jadi M² */}
                                <dd className="font-display text-3xl md:text-4xl font-bold tracking-wide leading-none text-brand-darkred">
                                    {fact.value}
                                </dd>
                                {/* Bingkai coretan penuh, sama seperti tabel identitas di sebelahnya */}
                                <SketchBox delay={index * 150} />
                            </div>
                        ))}
                    </dl>
                </div>

                <div>
                    <div className="relative">
                        <SketchBox />
                        {/* Garis kolom di tengah jarak label & isi: padding baris + 11rem + setengah gap, dikurangi setengah lebar span */}
                        <SketchRule vertical delay={600} className="hidden sm:block text-brand-darkred/30 -top-1 -bottom-1 w-3 sm:left-50.5 md:left-51.5" />

                        <dl>
                            {identity.map((row, index) => (
                                <div key={row.label} className="relative grid gap-1 px-5 py-4 md:px-6 sm:grid-cols-[11rem_1fr] sm:gap-6">
                                    <dt className="text-sm text-brand-ink/70">{row.label}</dt>
                                    <dd className="text-sm font-semibold wrap-anywhere">{row.value}</dd>
                                    <SketchRule delay={index * 100} className="text-brand-darkred/30 -left-1 -right-1 -bottom-1.5 h-3" />
                                </div>
                            ))}
                            <div className="grid gap-2 px-5 py-4 md:px-6 sm:grid-cols-[11rem_1fr] sm:gap-6">
                                <dt className="text-sm text-brand-ink/70">Kompetensi Keahlian</dt>
                                <dd>
                                    <ul className="flex flex-wrap gap-2">
                                        {majors.map((major) => {
                                            const name = `${major.highlight} ${major.rest}`.trim();

                                            return(
                                                <li key={major.code}>
                                                    <Link
                                                        to={`/jurusan/${major.slug}`}
                                                        aria-label={name}
                                                        title={name}
                                                        className="inline-flex rounded-full bg-brand-darkred/10 px-3 py-1 text-xs font-semibold text-brand-darkred transition-colors hover:bg-brand-darkred hover:text-white"
                                                    >
                                                        {major.code}
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </dd>
                            </div>
                        </dl>
                    </div>

                    {/* mt-6: beri ruang untuk ujung bingkai coretan yang kebablasan ke bawah */}
                    <p className="mt-6 text-xs leading-relaxed text-brand-ink/60">
                        Sumber: {dataSource}.
                    </p>
                </div>
            </div>
        </section>
    )
}
