import Icon from "../Icon";
import type { Major } from "../../data/majors";

export default function CareerMajor({ major }: { major: Major }) {
    return(
        <section className="relative z-10 bg-brand-softmist text-brand-ink px-6 py-20 md:py-28">
            <div className="max-w-6xl mx-auto grid gap-10 lg:gap-16 lg:grid-cols-[2fr_3fr] lg:items-center">
                <div className="max-w-2xl">
                    <p className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-darkred">
                        Prospek Karier
                    </p>
                    <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight">
                        Peluang Kerja Lulusan {major.code}
                    </h2>
                    <p className="mt-4 text-base md:text-lg leading-relaxed text-brand-ink/70">
                        Melalui Bursa Kerja Khusus (BKK), sekolah membantu menyalurkan lulusan ke industri mitra.
                        Lulusan juga bisa melanjutkan kuliah atau membuka usaha sendiri.
                    </p>
                </div>

                <ul className="grid gap-4 sm:grid-cols-2">
                    {major.careers.map((career) => (
                        <li
                            key={career}
                            className="group flex items-center gap-4 rounded-card bg-white p-4 md:p-5 border border-brand-ink/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-softpill"
                        >
                            <span className="w-10 h-10 shrink-0 rounded-xl bg-brand-darkred/10 text-brand-darkred flex items-center justify-center transition-colors group-hover:bg-brand-darkred group-hover:text-white">
                                <Icon name="briefcase" className="w-5 h-5" />
                            </span>
                            <span className="text-base font-semibold leading-snug">{career}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
