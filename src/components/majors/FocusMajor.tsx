import { Link } from "react-router-dom";
import Icon from "../Icon";
import SketchFrame, { SketchArrow, SketchBox, SketchCorner } from "../SketchFrame";
import FacilityPhotos from "../facilities/FacilityPhotos";
import { useFacilities } from "../../lib/content";
import type { Major } from "../../data/majors";

export default function FocusMajor({ major }: { major: Major }) {
    // Ruang praktik jurusan diambil dari data fasilitas, jadi foto & namanya ikut berubah kalau data fasilitas diganti.
    // Foto semua ruang digabung jadi satu slideshow
    const { facilities } = useFacilities();
    const rooms = (facilities ?? []).filter((f) => f.majors.includes(major.code));
    const practicePhotos = rooms[0] && {
        ...rooms[0],
        title: `Ruang praktik ${major.code}`,
        images: rooms.flatMap((room) => room.images),
    };

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
                        <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight text-left">
                            {/* -ml-4 md:-ml-5: teks judul tetap sejajar eyebrow di atasnya, garis sikunya yang menjorok ke kiri */}
                            <SketchFrame className="-ml-4 md:-ml-5">Apa Saja yang Dipelajari di {major.code}?</SketchFrame>
                        </h2>
                    </div>
                    <p className="text-base md:text-lg leading-relaxed text-brand-ink/70 md:max-w-md md:justify-self-end">
                        Sebagian besar waktu belajar diisi dengan praktik di lab dan proyek nyata, sehingga siswa
                        lulus dengan keahlian yang benar-benar terpakai di dunia kerja.
                    </p>
                </div>

                {/* gap-6: ujung bingkai coretan kebablasan ±8px, jadi kartu bersebelahan tidak saling tabrak.
                    text-left: kartu sempit, teks yang terbungkus jadi renggang kalau ikut justify dari body */}
                <ol className="mt-12 md:mt-16 grid gap-6 md:grid-cols-3 text-left">
                    {major.focus.map((item, i) => (
                        <li key={item.title}>
                            {/* Bingkai coretan penuh, sama seperti kartu "Mengapa Memilih" di beranda */}
                            <article className="group relative h-full p-6 md:p-7 transition-transform duration-300 hover:-translate-y-1">
                                <SketchBox delay={i * 150} />
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

                {/* Gambaran praktik: foto ruang praktik di kiri, kegiatan praktik di kanan (di HP foto di atas) */}
                <div className="mt-20 md:mt-28 grid gap-14 lg:gap-16 lg:grid-cols-[5fr_6fr] lg:items-center">
                    <div className="relative">
                        {practicePhotos ? (
                            <FacilityPhotos
                                facility={practicePhotos}
                                className="aspect-4/3 rounded-card shadow-2xl"
                                iconSize="w-28 h-28 md:w-36 md:h-36"
                                thumbsPosition="right-4 bottom-4 md:right-5 md:bottom-5"
                                thumbSize="w-9 h-7 md:w-12 md:h-9"
                            >
                                <div className="absolute inset-0 bg-linear-to-t from-brand-ink/50 via-transparent to-transparent" />
                            </FacilityPhotos>
                        ) : (
                            <div className="aspect-4/3 rounded-card bg-linear-to-br from-brand-signal to-brand-deepred shadow-2xl flex items-center justify-center text-white/15">
                                <Icon name={major.icon} className="w-28 h-28 md:w-36 md:h-36" />
                            </div>
                        )}

                        {/* Garis siku coretan di pojok kanan atas & kiri bawah foto, sama seperti bingkai video di beranda */}
                        <SketchCorner className="-top-5 -right-5 w-16 h-16 md:-top-8 md:-right-8 md:w-28 md:h-28 rotate-90" />
                        <SketchCorner delay={350} className="-bottom-5 -left-5 w-16 h-16 md:-bottom-8 md:-left-8 md:w-28 md:h-28 -rotate-90" />
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-darkred">Gambaran Praktik</h3>
                            <p className="mt-3 text-lg font-semibold leading-snug">
                                Praktik langsung di ruang praktik jurusan dengan peralatan yang sama seperti di tempat kerja.
                            </p>
                        </div>

                        {/* Panah coretan sebagai penanda poin, sama seperti daftar misi di beranda */}
                        <ul className="space-y-3">
                            {major.practice.map((item, i) => (
                                <li key={item} className="flex gap-3">
                                    <span className="shrink-0 mt-1.5 text-brand-darkred">
                                        <SketchArrow delay={i * 200} className="w-8 h-4" />
                                    </span>
                                    <span className="leading-relaxed text-brand-ink/80">{item}</span>
                                </li>
                            ))}
                        </ul>

                        {rooms.length > 0 && (
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="mr-1 text-sm text-brand-ink/60">Ruang praktik</span>
                                {rooms.map((room) => (
                                    <span key={room.id} className="inline-flex rounded-full bg-brand-darkred/10 px-3 py-1 text-xs font-semibold text-brand-darkred">
                                        {room.title}
                                    </span>
                                ))}
                            </div>
                        )}

                        <Link
                            to="/fasilitas"
                            className="group inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-semibold text-brand-darkred transition-transform hover:-translate-y-0.5"
                        >
                            <SketchFrame>
                                {/* SketchArrow berupa block, jadi teks & panah dijejerkan dengan inline-flex supaya tidak turun baris */}
                                <span className="inline-flex items-center gap-3">
                                    Lihat Fasilitas Sekolah <SketchArrow className="w-8 h-4 transition-transform group-hover:translate-x-1" />
                                </span>
                            </SketchFrame>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
