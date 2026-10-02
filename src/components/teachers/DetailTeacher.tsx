import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import Icon from "../Icon";
import SketchFrame, { SketchArrow, SketchBox, SketchRule } from "../SketchFrame";
import { teacherGroup, type Teacher } from "../../data/teachers";
import { majors } from "../../data/majors";

export default function DetailTeacher({ teacher }: { teacher: Teacher }) {
    const major = majors.find((m) => m.code === teacher.major);
    const latest = teacher.education?.[0];

    const facts: { label: string; value: ReactNode }[] = [
        { label: "Jabatan", value: teacher.role },
        { label: "Kelompok", value: teacherGroup(teacher) },
        ...(major ? [{
            label: "Jurusan",
            value: (
                <Link to={`/jurusan/${major.slug}`} className="text-brand-darkred underline-offset-4 hover:underline">
                    {`${major.highlight} ${major.rest}`.trim()}
                </Link>
            ),
        }] : []),
        ...(teacher.since ? [{ label: "Mengajar sejak", value: String(teacher.since) }] : []),
        ...(latest ? [{ label: "Pendidikan terakhir", value: `${latest.level} ${latest.field}` }] : []),
    ];

    return(
        // Lanjutan kepala profil (ProfileTeacher) yang juga putih.
        // Jangan beri overflow-hidden: kotak data di kanan memakai sticky, dan sticky tidak berfungsi di dalam overflow-hidden.
        <section className="relative bg-white text-brand-ink px-6 pt-24 pb-20 md:pt-32 md:pb-28">
            <div className="max-w-6xl mx-auto grid gap-16 lg:grid-cols-[1fr_20rem] lg:items-start xl:gap-20">
                <div className="min-w-0 space-y-14 md:space-y-16">
                    {teacher.bio && teacher.bio.length > 0 && (
                        <div>
                            <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight text-left">
                                {/* -ml-4 md:-ml-5: teks judul tetap sejajar paragraf di bawahnya, garis sikunya yang menjorok ke kiri */}
                                <SketchFrame className="-ml-4 md:-ml-5">Profil Singkat</SketchFrame>
                            </h2>
                            <div className="mt-6 space-y-4">
                                {teacher.bio.map((paragraph) => (
                                    <p key={paragraph} className="text-base md:text-lg leading-relaxed text-brand-ink/80">{paragraph}</p>
                                ))}
                            </div>
                        </div>
                    )}

                    {teacher.subjects && teacher.subjects.length > 0 && (
                        <div>
                            <h3 className="font-display text-lg font-bold uppercase tracking-wide">Bidang yang Diampu</h3>
                            {/* Panah coretan sebagai penanda poin, sama seperti daftar misi di beranda */}
                            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                                {teacher.subjects.map((subject, i) => (
                                    <li key={subject} className="flex gap-3">
                                        <span className="shrink-0 mt-1.5 text-brand-darkred">
                                            <SketchArrow delay={i * 200} className="w-8 h-4" />
                                        </span>
                                        <span className="font-medium leading-relaxed">{subject}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {teacher.education && teacher.education.length > 0 && (
                        <div>
                            <h3 className="font-display text-lg font-bold uppercase tracking-wide">Riwayat Pendidikan</h3>
                            <ol className="mt-5">
                                {teacher.education.map((edu, i) => (
                                    <li key={`${edu.level}-${edu.year}`} className="relative grid grid-cols-[3.5rem_1fr] sm:grid-cols-[5rem_1fr] gap-4 py-5 first:pt-0 last:pb-0">
                                        {/* Garis pemisah coretan, pengganti divide-y */}
                                        {i > 0 && <SketchRule delay={i * 100} className="text-brand-darkred/30 -left-1 -right-1 -top-1.5 h-3" />}
                                        <span className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-none text-brand-darkred">
                                            {edu.level}
                                        </span>
                                        <div className="text-left">
                                            <p className="text-base font-semibold leading-snug">{edu.field}</p>
                                            <p className="mt-1 text-sm leading-relaxed text-brand-ink/70">
                                                {edu.school} &middot; Lulus {edu.year}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    )}

                    {teacher.certifications && teacher.certifications.length > 0 && (
                        <div>
                            <h3 className="font-display text-lg font-bold uppercase tracking-wide">Sertifikasi &amp; Pelatihan</h3>
                            {/* Kartu berbingkai coretan seperti "Posisi yang Bisa Ditempati" di halaman jurusan.
                                gap-6: ujung bingkai coretan kebablasan ±8px. text-left: kartu sempit, teks terbungkus jadi renggang kalau justify */}
                            <ul className="mt-6 grid gap-6 sm:grid-cols-2 text-left">
                                {teacher.certifications.map((cert, i) => (
                                    <li key={cert} className="group relative flex items-center gap-4 p-4 md:p-5">
                                        <SketchBox delay={i * 120} />
                                        <span className="w-10 h-10 shrink-0 rounded-xl bg-brand-darkred/10 text-brand-darkred flex items-center justify-center transition-colors group-hover:bg-brand-darkred group-hover:text-white">
                                            <Icon name="award" className="w-5 h-5" />
                                        </span>
                                        <span className="text-base font-semibold leading-snug">{cert}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Bingkai coretan penuh seperti kotak "Berita Terbaru" di halaman berita.
                    Ikut menempel saat discroll di desktop; top-32 = di bawah navbar mengambang */}
                <aside aria-labelledby="data-guru" className="relative p-6 lg:sticky lg:top-32">
                    <SketchBox />
                    <h2 id="data-guru" className="font-display text-lg font-bold uppercase tracking-wide">Data Guru</h2>

                    <dl className="mt-5">
                        {facts.map((fact, i) => (
                            <div key={fact.label} className="relative py-3 first:pt-0 last:pb-0 text-left">
                                {i > 0 && <SketchRule delay={i * 100} className="text-brand-darkred/30 -left-1 -right-1 -top-1.5 h-3" />}
                                <dt className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-ink/50">{fact.label}</dt>
                                <dd className="mt-1 text-sm font-semibold leading-relaxed">{fact.value}</dd>
                            </div>
                        ))}
                    </dl>

                    <div className="mt-8 flex flex-col gap-3">
                        {major && (
                            <Link
                                to={`/profil-guru?jurusan=${major.code.toLowerCase()}#daftar-guru`}
                                className="group inline-flex items-center justify-between gap-3 rounded-full bg-linear-to-r from-brand-signal to-brand-darkred px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-brand-darkred/30 transition-transform hover:-translate-y-0.5"
                            >
                                Guru {major.code} Lainnya
                                <SketchArrow className="w-7 h-3.5 transition-transform group-hover:translate-x-1" />
                            </Link>
                        )}
                        <Link
                            to="/profil-guru#daftar-guru"
                            className="group inline-flex items-center justify-between gap-3 rounded-full border border-brand-ink/15 px-6 py-3 text-sm font-semibold text-brand-darkred transition-colors hover:bg-brand-darkred/5"
                        >
                            Semua Guru
                            <SketchArrow className="w-7 h-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </aside>
            </div>
        </section>
    )
}
