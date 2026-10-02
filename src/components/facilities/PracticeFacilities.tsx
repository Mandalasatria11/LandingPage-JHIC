import { Link } from "react-router-dom";
import SketchFrame, { SketchArrow, SketchBox, SketchRule, SketchUnderline } from "../SketchFrame";
import FacilityCarousel from "./FacilityCarousel";
import FacilityPhotos from "./FacilityPhotos";
import FacilityListState from "./FacilityListState";
import type { Facility } from "../../data/facilities";
import { majors } from "../../data/majors";
import { useFacilities } from "../../lib/content";

export default function PracticeFacilities() {
    const { facilities, error, reload } = useFacilities();
    const practiceRooms = (facilities ?? []).filter((f) => f.category === "praktik");

    return(
        // "-mt-10" + rounded-t supaya menumpuk di atas hero, seperti section pertama di beranda
        <section id="ruang-praktik" className="relative z-10 -mt-10 scroll-mt-6 overflow-hidden bg-white text-brand-ink rounded-t-[2.5rem] px-6 py-20 md:py-28">
            {/* Dekorasi titik-titik */}
            <div aria-hidden="true" className="pointer-events-none absolute right-6 top-10 hidden md:block w-40 h-28 bg-[radial-gradient(circle,var(--color-brand-mist)_2px,transparent_2.5px)] bg-size-[22px_22px]" />

            <div className="relative max-w-6xl mx-auto">
                <div className="grid gap-4 md:grid-cols-2 md:items-end">
                    <div>
                        <p className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-darkred">
                            Ruang Praktik Jurusan
                        </p>
                        <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight text-left">
                            {/* -ml-4 md:-ml-5: teks judul tetap sejajar eyebrow di atasnya, garis sikunya yang menjorok ke kiri */}
                            <SketchFrame className="-ml-4 md:-ml-5">Setiap Jurusan Punya Ruang Praktik Sendiri</SketchFrame>
                        </h2>
                    </div>
                    <p className="text-base md:text-lg leading-relaxed text-brand-ink/70 md:max-w-md md:justify-self-end">
                        Siswa terbiasa memakai peralatan yang sama dengan yang digunakan di tempat kerja, sehingga
                        tidak canggung saat PKL maupun setelah lulus.
                    </p>
                </div>

                <FacilityListState loaded={facilities !== undefined} error={error} onRetry={reload} />

                {/* HP: carousel kartu berbingkai coretan, digeser dengan panah.
                    text-left: kartu sempit, teks yang terbungkus jadi renggang kalau ikut justify dari body */}
                {practiceRooms.length > 0 && (
                    <FacilityCarousel
                        items={practiceRooms}
                        className="mt-10"
                        renderSlide={(facility, i) => (
                            <article className="relative h-full flex flex-col p-3 text-left">
                                <SketchBox />
                                <PracticePhoto facility={facility} index={i} className="aspect-4/3" />
                                <PracticeDetails facility={facility} className="flex-1 px-2 pt-6 pb-3" />
                            </article>
                        )}
                    />
                )}

                {/* Tablet & desktop: foto dan keterangan bergantian kiri-kanan */}
                <ol className="mt-16 hidden md:block space-y-24">
                    {practiceRooms.map((facility, i) => (
                        <li key={facility.id} className="grid gap-12 lg:gap-16 grid-cols-2 items-center">
                            <PracticePhoto
                                facility={facility}
                                index={i}
                                className={`aspect-4/3 rounded-card shadow-xl shadow-brand-ink/20 ${i % 2 === 1 ? "order-last" : ""}`}
                            />
                            <PracticeDetails facility={facility} />
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    )
}

function PracticePhoto({ facility, index, className }: { facility: Facility; index: number; className: string }) {
    return(
        <FacilityPhotos
            facility={facility}
            className={className}
            iconSize="w-28 h-28 md:w-36 md:h-36"
            thumbsPosition="right-5 bottom-5 md:right-7 md:bottom-7"
            thumbSize="w-14 h-10 md:w-16 md:h-12"
        >
            <div className="absolute inset-0 bg-linear-to-t from-brand-ink/70 via-transparent to-transparent" />

            {/* Posisi lebih tinggi dari thumbnail karena garis coretannya menggantung di bawah angka */}
            <p aria-hidden="true" className="absolute left-6 bottom-8 md:left-8 md:bottom-10 font-display text-4xl md:text-5xl font-bold uppercase tracking-wide leading-none text-white">
                <SketchUnderline tone="text-brand-warmred">{String(index + 1).padStart(2, "0")}</SketchUnderline>
            </p>
        </FacilityPhotos>
    )
}

function PracticeDetails({ facility, className = "" }: { facility: Facility; className?: string }) {
    const users = facility.majors.flatMap((code) => majors.filter((m) => m.code === code));

    return(
        <div className={`flex flex-col ${className}`}>
            <h3 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight text-left">
                {facility.title}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-brand-ink/70">{facility.description}</p>

            {/* Panah coretan sebagai penanda poin, sama seperti daftar misi di beranda */}
            <ul className="mt-6 space-y-3 text-left">
                {facility.features.map((feature, i) => (
                    <li key={feature} className="flex items-start gap-3 text-sm font-medium">
                        <span className="shrink-0 mt-1 text-brand-darkred">
                            <SketchArrow delay={i * 200} className="w-6 h-3" />
                        </span>
                        {feature}
                    </li>
                ))}
            </ul>

            {users.length > 0 && (
                // mt-auto: di kartu carousel yang tingginya disamakan, daftar jurusan menempel di bawah kartu
                <div className="mt-auto pt-8">
                    <div className="relative flex flex-wrap items-center gap-2 pt-6">
                        <SketchRule className="text-brand-darkred/30 -left-1 -right-1 -top-1.5 h-3" />
                        <span className="mr-1 text-sm text-brand-ink/60">Dipakai jurusan</span>
                        {users.map((major) => (
                            <Link
                                key={major.code}
                                to={`/jurusan/${major.slug}`}
                                className="inline-flex rounded-full bg-brand-darkred/10 px-3 py-1 text-xs font-semibold text-brand-darkred transition-colors hover:bg-brand-darkred hover:text-white"
                            >
                                {`${major.highlight} ${major.rest}`.trim()}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
