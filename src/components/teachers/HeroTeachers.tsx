import { Link } from "react-router-dom";
import { SketchArrow, SketchBox, SketchLoop, SketchSparks, SketchUnderline } from "../SketchFrame";
import { TeacherPhoto } from "../TeacherCard";
import { allTeachers, leaders, teachers } from "../../data/teachers";
import { majors } from "../../data/majors";

const chevron = (
    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m9 6 6 6-6 6" />
    </svg>
);

// Dihitung dari data, jadi otomatis ikut berubah saat data guru diganti
const stats = [
    { label: "Tenaga Pendidik", value: allTeachers.length },
    { label: "Guru Produktif", value: teachers.filter((teacher) => teacher.major).length },
    { label: "Kompetensi Keahlian", value: majors.length },
];

const [head] = leaders;

export default function HeroTeachers() {
    const scrollToSection = (id: string) => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    };

    return(
        <section className="relative overflow-hidden bg-brand-ink bg-[radial-gradient(ellipse_at_top_right,var(--color-brand-deepred),transparent_65%)] text-white px-6 pt-36 pb-28 md:pt-40 md:pb-32">
            {/* Dekorasi titik-titik */}
            <div aria-hidden="true" className="pointer-events-none absolute left-6 bottom-20 hidden md:block w-40 h-28 bg-[radial-gradient(circle,rgb(255_255_255/0.1)_2px,transparent_2.5px)] bg-size-[22px_22px]" />

            {/* Tulisan besar di latar, sengaja terpotong */}
            <p aria-hidden="true" className="pointer-events-none select-none absolute -right-4 -bottom-[0.18em] font-display text-[42vw] md:text-[26vw] font-bold uppercase leading-none text-white/[0.04]">
                Guru
            </p>

            <div className="relative max-w-6xl mx-auto grid gap-16 lg:grid-cols-[1fr_auto] lg:items-center">
                <div className="animate-fade-up">
                    <nav aria-label="Breadcrumb">
                        <ol className="flex flex-wrap items-center gap-2 text-sm text-brand-mist/60">
                            <li>
                                <Link to="/" className="transition-colors hover:text-white">Beranda</Link>
                            </li>
                            <li className="flex items-center gap-2">
                                {chevron}
                                Profil
                            </li>
                            <li className="flex items-center gap-2">
                                {chevron}
                                <span aria-current="page" className="font-medium text-white">Profil Guru</span>
                            </li>
                        </ol>
                    </nav>

                    <p className="mt-8 text-xs sm:text-sm md:text-base uppercase tracking-[0.25em] font-semibold text-brand-mist/80">
                        <SketchSparks tone="text-brand-warmred">Guru &amp; Pimpinan</SketchSparks>
                    </p>
                    <h1 className="mt-3 font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-wide leading-none">
                        <span className="block text-brand-warmred">Profil</span>
                        {/* Coretan hanya di satu kata, sama seperti hero Fasilitas. delay: mulai setelah teks selesai muncul */}
                        <span className="block">
                            <SketchUnderline size="lg" tone="text-brand-signal" delay={500}>Guru</SketchUnderline>
                        </span>
                    </h1>

                    {/* mt-8 md:mt-10: memberi ruang untuk garis coretan yang menggantung di bawah judul */}
                    <p className="mt-8 md:mt-10 max-w-xl text-base md:text-lg leading-relaxed text-brand-mist/80">
                        Kenali para pendidik yang membimbing siswa SMK Plus Pelita Nusantara, mulai dari pimpinan
                        sekolah, guru mata pelajaran umum, hingga guru produktif di setiap kompetensi keahlian.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={() => scrollToSection("daftar-guru")}
                            className="group inline-flex items-center gap-3 rounded-full bg-linear-to-r from-brand-signal to-brand-darkred px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-brand-darkred/30 transition-transform hover:-translate-y-0.5"
                        >
                            Cari Guru
                            <SketchArrow direction="down" className="w-3 h-6 -my-0.5 transition-transform group-hover:translate-y-0.5" />
                        </button>
                        <button
                            type="button"
                            onClick={() => scrollToSection("pimpinan")}
                            className="inline-flex items-center rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                        >
                            Pimpinan Sekolah
                        </button>
                    </div>

                    {/* gap-6: ujung bingkai coretan kebablasan ±8px, jadi kotak bersebelahan tidak saling tabrak.
                        text-left: kotak sempit, label yang terbungkus jadi renggang kalau ikut justify dari body */}
                    <dl className="mt-14 grid max-w-xl grid-cols-3 gap-6 text-left">
                        {stats.map((stat, i) => (
                            <div key={stat.label} className="relative flex flex-col-reverse justify-end bg-white/5 p-3 sm:p-5 backdrop-blur">
                                {/* Bingkai coretan penuh seperti kotak angka di hero Fasilitas, putih tipis karena latarnya gelap */}
                                <SketchBox tone="text-white/40" delay={300 + i * 150} />
                                <dt className="mt-2 text-sm text-brand-mist/70">{stat.label}</dt>
                                <dd className={`font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-none ${i === 0 ? "text-brand-warmred" : "text-white"}`}>
                                    {stat.value}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>

                {/* Tumpukan kartu profil (desktop): kepala sekolah di depan, dua kartu miring di belakangnya */}
                {head && (
                    <div className="relative hidden lg:block w-80 animate-fade-up [animation-delay:150ms]">
                        {/* Lingkaran coretan besar yang "mengorbit" di belakang kartu, sama seperti kartu di hero jurusan.
                            Ditaruh paling awal supaya tertutup kartu-kartu di atasnya. Lebih lebar dari hero jurusan
                            karena dua kartu miring di belakang ikut menutupi sisi kiri-kanannya */}
                        <SketchLoop delay={600} className="-left-20 -right-20 top-[30%] h-[38%] text-brand-warmred -rotate-12" />

                        <div aria-hidden="true" className="absolute inset-0 rounded-card bg-linear-to-b from-brand-rose to-brand-ink ring-1 ring-white/10 shadow-2xl shadow-black/40 -rotate-6 -translate-x-8 translate-y-3" />
                        <div aria-hidden="true" className="absolute inset-0 rounded-card bg-linear-to-b from-brand-signal to-brand-deepred ring-1 ring-white/10 shadow-2xl shadow-black/40 rotate-6 translate-x-8 translate-y-1" />

                        <Link
                            to={`/profil-guru/${head.id}`}
                            className="group relative block overflow-hidden rounded-card ring-1 ring-white/10 shadow-2xl shadow-black/40 rotate-2 transition-transform duration-500 hover:rotate-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                        >
                            <TeacherPhoto teacher={head} zoom className="aspect-4/5" initialsSize="text-8xl" />
                            <div className="flex items-center justify-between gap-4 bg-brand-warmred px-5 py-4 text-left">
                                <div>
                                    <p className="text-lg font-semibold leading-snug">{head.name}</p>
                                    <p className="mt-0.5 text-sm text-white/80">{head.role}</p>
                                </div>
                                <SketchArrow className="w-7 h-3.5 shrink-0 transition-transform group-hover:translate-x-1" />
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    )
}
