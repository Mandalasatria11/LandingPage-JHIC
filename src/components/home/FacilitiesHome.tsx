import Icon from "../Icon";
import { facilities, type Facility } from "../../data/facilities";

const [featured, ...others] = facilities;

export default function FacilitiesHome() {
    return(
        <section className="relative z-10 overflow-hidden bg-white text-brand-ink px-6 py-20 md:py-28">
            {/* Dekorasi titik-titik */}
            <div aria-hidden="true" className="pointer-events-none absolute right-6 top-10 hidden md:block w-40 h-28 bg-[radial-gradient(circle,var(--color-brand-mist)_2px,transparent_2.5px)] bg-size-[22px_22px]" />

            <div className="relative max-w-6xl mx-auto">
                <div className="grid gap-4 md:grid-cols-2 md:items-end">
                    <div>
                        <p className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-darkred">
                            Fasilitas Sekolah
                        </p>
                        <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight">
                            Belajar dengan Peralatan Standar Industri
                        </h2>
                    </div>
                    <p className="text-base md:text-lg leading-relaxed text-brand-ink/70 md:max-w-md md:justify-self-end">
                        Setiap jurusan punya ruang praktik sendiri, sehingga siswa terbiasa memakai alat yang sama
                        dengan yang digunakan di tempat kerja nanti.
                    </p>
                </div>

                {/* Desktop: kartu unggulan memanjang ke bawah di kolom kiri, sisanya di 2 kolom kanan */}
                <div className="mt-12 md:mt-16 grid gap-5 lg:grid-cols-3">
                    {featured && <FacilityCard facility={featured} featured />}

                    {others.length > 0 && (
                        <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-2">
                            {others.map((facility) => (
                                <li key={facility.id}>
                                    <FacilityCard facility={facility} />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </section>
    )
}

function FacilityCard({ facility, featured = false }: { facility: Facility; featured?: boolean }) {
    return(
        <article
            className={`group relative overflow-hidden rounded-card bg-linear-to-br from-brand-signal to-brand-deepred shadow-lg shadow-brand-ink/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                featured ? "aspect-4/3 sm:aspect-5/2 lg:aspect-auto" : "aspect-video"
            }`}
        >
            {facility.image ? (
                <img
                    src={facility.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center text-white/15 transition-transform duration-500 group-hover:scale-110">
                    <Icon name={facility.icon} className={featured ? "w-28 h-28 md:w-36 md:h-36" : "w-16 h-16"} />
                </div>
            )}

            <div className="absolute inset-0 bg-linear-to-t from-brand-ink/90 via-brand-ink/40 to-transparent" />

            <div className={`absolute inset-x-0 bottom-0 ${featured ? "p-5 md:p-7" : "p-4"}`}>
                {featured ? (
                    <h3 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-wide leading-none text-white">
                        {facility.title}
                        <span aria-hidden="true" className="mt-1.5 block h-1 w-10 md:w-12 bg-brand-warmred" />
                    </h3>
                ) : (
                    <h3 className="text-base font-semibold leading-snug text-white line-clamp-2">
                        {facility.title}
                    </h3>
                )}
                <p className={`leading-relaxed text-brand-mist/75 ${
                    featured ? "mt-3 md:mt-4 max-w-xl text-base line-clamp-3 md:line-clamp-2 lg:line-clamp-5" : "mt-1 text-sm line-clamp-2"
                }`}>
                    {facility.desc}
                </p>
            </div>
        </article>
    )
}
