import fotoKepsek from "../../assets/images/Kepsek.png";

// TODO: ganti dengan data asli dari sekolah
const visi =
    "Menjadi SMK unggulan yang menghasilkan lulusan berkarakter, kompeten, dan siap bersaing di dunia kerja maupun wirausaha.";

const misi = [
    "Menyelenggarakan pembelajaran berbasis industri yang relevan dengan kebutuhan zaman.",
    "Membangun kemitraan yang kuat dengan dunia usaha dan dunia industri (DUDI).",
    "Membentuk peserta didik yang religius, disiplin, dan berjiwa kepemimpinan.",
    "Mengembangkan budaya kewirausahaan dan literasi digital di lingkungan sekolah.",
];

export default function IntroHome() {
    return(
        <section className="relative z-10 bg-white text-brand-ink rounded-t-[2.5rem] px-6 py-20 md:py-28">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-center font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight">
                    Mengenal SMK Plus Pelita Nusantara
                </h2>

                <div className="mt-12 md:mt-16 grid gap-10 md:gap-16 md:grid-cols-[2fr_3fr] items-start">
                    <figure className="w-full max-w-sm mx-auto md:max-w-none">
                        <img
                            src={fotoKepsek}
                            alt="Kepala Sekolah SMK Plus Pelita Nusantara"
                            className="w-full aspect-[4/5] object-cover rounded-card bg-brand-softmist shadow-2xl"
                            loading="lazy"
                        />
                        <figcaption className="mt-4 text-center md:text-left">
                            <span className="block font-semibold">Drs. Ahmad Fauzi, M.Pd.</span>
                            <span className="text-sm text-brand-ink/60">Kepala Sekolah</span>
                        </figcaption>
                    </figure>

                    <div className="space-y-8">
                        <p className="text-base md:text-lg leading-relaxed text-brand-ink/80">
                            SMK Plus Pelita Nusantara berkomitmen mencetak generasi vokasi yang terampil dan
                            berakhlak. Melalui Bursa Kerja Khusus (BKK), kami menjembatani siswa dan alumni dengan
                            peluang Praktik Kerja Lapangan serta karier di berbagai industri mitra.
                        </p>

                        <div>
                            <h3 className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-darkred">Visi</h3>
                            <p className="mt-3 text-lg font-semibold leading-snug">{visi}</p>
                        </div>

                        <div>
                            <h3 className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-darkred">Misi</h3>
                            <ol className="mt-4 space-y-3">
                                {misi.map((item, i) => (
                                    <li key={item} className="flex gap-4">
                                        <span className="shrink-0 w-7 h-7 rounded-full bg-brand-darkred/10 text-brand-darkred text-sm font-semibold flex items-center justify-center">
                                            {i + 1}
                                        </span>
                                        <span className="leading-relaxed text-brand-ink/80">{item}</span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
