import Icon, { type IconName } from "../Icon";
import SketchFrame, { SketchBox, SketchRule, SketchSparks } from "../SketchFrame";
import type { Major } from "../../data/majors";

// Tiga jalur setelah lulus, sama untuk semua jurusan
const paths: { icon: IconName; title: string; desc: string }[] = [
    { icon: "briefcase", title: "Bekerja", desc: "Disalurkan ke industri mitra lewat Bursa Kerja Khusus (BKK)" },
    { icon: "book", title: "Kuliah", desc: "Melanjutkan ke perguruan tinggi di bidang yang sejalan" },
    { icon: "bulb", title: "Wirausaha", desc: "Membuka usaha sendiri dengan bekal keahlian jurusan" },
];

export default function CareerMajor({ major }: { major: Major }) {
    return(
        <section className="relative z-10 overflow-hidden bg-white text-brand-ink px-6 py-20 md:py-28">
            {/* Dekorasi titik-titik */}
            <div aria-hidden="true" className="pointer-events-none absolute right-6 top-10 hidden md:block w-40 h-28 bg-[radial-gradient(circle,var(--color-brand-mist)_2px,transparent_2.5px)] bg-size-[22px_22px]" />

            <div className="relative max-w-6xl mx-auto">
                <div className="grid gap-4 md:grid-cols-2 md:items-end">
                    <div>
                        <p className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-darkred">
                            <SketchSparks>Prospek Karier</SketchSparks>
                        </p>
                        <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight text-left">
                            {/* -ml-4 md:-ml-5: teks judul tetap sejajar eyebrow di atasnya, garis sikunya yang menjorok ke kiri */}
                            <SketchFrame className="-ml-4 md:-ml-5">Peluang Kerja Lulusan {major.code}</SketchFrame>
                        </h2>
                    </div>
                    <p className="text-base md:text-lg leading-relaxed text-brand-ink/70 md:max-w-md md:justify-self-end">
                        Lulusan bebas memilih jalannya sendiri. Sekolah mendampingi lewat BKK, bimbingan karier,
                        dan jejaring alumni.
                    </p>
                </div>

                {/* Panel tiga jalur, sama seperti deretan angka di section "Mengapa Memilih" beranda */}
                <dl className="mt-12 md:mt-16 grid md:grid-cols-3 gap-y-8 rounded-card bg-white py-8 shadow-softpill">
                    {paths.map((path, i) => (
                        <div key={path.title} className="relative px-6 text-center">
                            {/* Garis pemisah kolom coretan (desktop), garis baris coretan (HP) */}
                            {i > 0 && (
                                <>
                                    <SketchRule vertical scale={1.6} delay={i * 150} className="hidden md:block text-brand-darkred/50 -top-1 -bottom-1 -left-1.5 w-3" />
                                    <SketchRule delay={i * 150} className="md:hidden text-brand-darkred/30 left-6 right-6 -top-5.5 h-3" />
                                </>
                            )}
                            <dt className="flex items-center justify-center gap-2 font-display text-3xl md:text-4xl font-bold uppercase tracking-wide text-brand-darkred">
                                <Icon name={path.icon} className="w-7 h-7 shrink-0" />
                                {path.title}
                            </dt>
                            <dd className="mt-2 text-sm leading-relaxed text-brand-ink/70">{path.desc}</dd>
                        </div>
                    ))}
                </dl>

                <h3 className="mt-16 md:mt-20 font-display text-lg font-bold uppercase tracking-wide">Posisi yang Bisa Ditempati</h3>

                {/* gap-6: ujung bingkai coretan kebablasan ±8px, jadi kartu bersebelahan tidak saling tabrak.
                    text-left: kartu sempit, teks yang terbungkus jadi renggang kalau ikut justify dari body */}
                <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-left">
                    {major.careers.map((career, i) => (
                        <li key={career} className="group relative flex items-center gap-4 p-4 md:p-5 transition-transform duration-300 hover:-translate-y-0.5">
                            <SketchBox delay={i * 120} />
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
