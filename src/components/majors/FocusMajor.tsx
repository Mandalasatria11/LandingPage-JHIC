import Icon from "../Icon";
import type { Major } from "../../data/majors";

export default function FocusMajor({ major }: { major: Major }) {
    return(
        // "-mt-10" + rounded-t supaya menumpuk di atas hero, seperti section pertama di beranda
        <section id="fokus" className="relative z-10 -mt-10 scroll-mt-6 overflow-hidden bg-white text-brand-ink rounded-t-[2.5rem] px-6 py-20 md:py-28">
            {/* Dekorasi titik-titik */}
            <div aria-hidden="true" className="pointer-events-none absolute right-6 top-10 hidden md:block w-40 h-28 bg-[radial-gradient(circle,var(--color-brand-mist)_2px,transparent_2.5px)] bg-size-[22px_22px]" />

            <div className="relative max-w-6xl mx-auto">
                <div className="grid gap-4 md:grid-cols-2 md:items-end">
                    <div>
                        <p className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-darkred">
                            Materi Pembelajaran
                        </p>
                        <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight">
                            Apa Saja yang Dipelajari di {major.code}?
                        </h2>
                    </div>
                    <p className="text-base md:text-lg leading-relaxed text-brand-ink/70 md:max-w-md md:justify-self-end">
                        Sebagian besar waktu belajar diisi dengan praktik di lab dan proyek nyata, sehingga siswa
                        lulus dengan keahlian yang benar-benar terpakai di dunia kerja.
                    </p>
                </div>

                <ol className="mt-12 md:mt-16 grid gap-5 md:grid-cols-3">
                    {major.focus.map((item, i) => (
                        <li key={item.title}>
                            <article className="group h-full rounded-card bg-white p-6 md:p-7 border border-brand-ink/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-softpill">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-brand-darkred/10 text-brand-darkred flex items-center justify-center transition-colors group-hover:bg-brand-darkred group-hover:text-white">
                                        <Icon name={item.icon} className="w-6 h-6" />
                                    </div>
                                    <span aria-hidden="true" className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-none text-brand-ink/10 transition-colors group-hover:text-brand-warmred/40">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                </div>
                                <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-brand-ink/70">{item.desc}</p>
                            </article>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    )
}
