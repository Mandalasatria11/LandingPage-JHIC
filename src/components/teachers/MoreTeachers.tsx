import { Link } from "react-router-dom";
import TeacherCard from "../TeacherCard";
import SketchFrame, { SketchArrow } from "../SketchFrame";
import type { Teacher } from "../../data/teachers";

export default function MoreTeachers({ items }: { items: Teacher[] }) {
    if (items.length === 0) return null;

    return(
        // Abu-abu supaya terpisah dari isi profil (putih) di atasnya dan footer (putih) di bawahnya
        <section className="relative z-10 overflow-hidden bg-brand-softmist text-brand-ink px-6 py-20 md:py-28">
            {/* Dekorasi titik-titik, putih karena latarnya abu-abu */}
            <div aria-hidden="true" className="pointer-events-none absolute right-6 top-8 hidden md:block w-32 h-24 bg-[radial-gradient(circle,white_3px,transparent_3.5px)] bg-size-[34px_34px]" />

            <div className="relative max-w-6xl mx-auto">
                <div className="grid gap-4 md:grid-cols-2 md:items-end">
                    <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight text-left">
                        {/* Margin negatif supaya teks tetap sejajar kartu, garisnya menjorok ke kiri, sama seperti "Jurusan Lainnya" */}
                        <SketchFrame className="-ml-4 md:-ml-5">Guru Lainnya</SketchFrame>
                    </h2>
                    <p className="text-base md:text-lg leading-relaxed text-brand-ink/70 md:max-w-md md:justify-self-end">
                        Kenali juga rekan pengajar lain yang bersama-sama membimbing siswa SMK Plus Pelita Nusantara.
                    </p>
                </div>

                {/* gap-6: ujung bingkai coretan kebablasan ±8px, jadi kartu bersebelahan tidak saling tabrak */}
                <ul className="mt-12 md:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {items.map((teacher, i) => (
                        <li key={teacher.id}>
                            <TeacherCard teacher={teacher} delay={i * 150} />
                        </li>
                    ))}
                </ul>

                {/* Tombol bergaris siku coretan, sama seperti "Lihat Profil Selengkapnya" di beranda */}
                <div className="mt-14 text-center">
                    <Link
                        to="/profil-guru#daftar-guru"
                        className="group inline-flex items-center px-7 py-3.5 text-sm font-semibold text-brand-darkred transition-transform hover:-translate-y-0.5"
                    >
                        <SketchFrame>
                            {/* SketchArrow berupa block, jadi teks & panah dijejerkan dengan inline-flex supaya tidak turun baris */}
                            <span className="inline-flex items-center gap-3">
                                Lihat Semua Guru <SketchArrow className="w-8 h-4 transition-transform group-hover:translate-x-1" />
                            </span>
                        </SketchFrame>
                    </Link>
                </div>
            </div>
        </section>
    )
}
