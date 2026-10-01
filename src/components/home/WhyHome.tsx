import type { ReactNode } from "react";

// TODO: ganti dengan data asli dari sekolah
const stats = [
    { value: "92%", label: "Lulusan terserap kerja" },
    { value: "120+", label: "Mitra industri" },
    { value: "5", label: "Kompetensi keahlian" },
    { value: "6 bln", label: "Program PKL" },
];

const reasons: { title: string; desc: string; icon: ReactNode }[] = [
    {
        title: "Siap Kerja Setelah Lulus",
        desc: "Kurikulum disusun bersama industri, setiap siswa menjalani PKL di perusahaan nyata, dan Bursa Kerja Khusus (BKK) aktif menyalurkan lulusan ke mitra kami.",
        icon: (
            <>
                <rect x="3" y="7" width="18" height="13" rx="2" />
                <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" />
            </>
        ),
    },
    {
        title: "Keahlian Bersertifikat",
        desc: "Diajar oleh guru bersertifikat dan praktisi industri, siswa mengikuti uji kompetensi dan lulus dengan sertifikat keahlian yang diakui dunia kerja.",
        icon: (
            <>
                <circle cx="12" cy="9" r="5" />
                <path d="M9 13.5 8 21l4-2 4 2-1-7.5" />
            </>
        ),
    },
    {
        title: "Terampil, Entrepreneur, Religius",
        desc: "Membentuk siswa yang terampil, berjiwa wirausaha, dan berakhlak melalui pembinaan karakter, kedisiplinan, serta pendampingan yang berkelanjutan.",
        icon: (
            <>
                <path d="M12 3 4 6v6c0 4.5 3.4 8.2 8 9 4.6-.8 8-4.5 8-9V6l-8-3z" />
                <path d="m9 12 2 2 4-4" />
            </>
        ),
    },
];

export default function WhyHome() {
    return(
        <section className="relative z-10 bg-brand-softmist text-brand-ink px-6 py-20 md:py-28">
            <div className="max-w-6xl mx-auto">
                <div className="text-center max-w-2xl mx-auto">
                    <p className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-darkred">
                        Untuk Bapak &amp; Ibu Orang Tua
                    </p>
                    <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight">
                        Mengapa SMK Plus Pelita Nusantara?
                    </h2>
                    <p className="mt-4 text-base md:text-lg leading-relaxed text-brand-ink/70">
                        Kami mempersiapkan putra-putri Anda menjadi lulusan yang kompeten, mandiri, dan 
                        siap menghadapi masa depan — baik untuk bekerja, berwirausaha, maupun melanjutkan pendidikan 
                        ke jenjang yang lebih tinggi.
                    </p>
                </div>

                <dl className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-y-6 rounded-card bg-white py-6 shadow-softpill md:divide-x md:divide-brand-ink/10">
                    {stats.map((stat) => (
                        <div key={stat.label} className="px-5 text-center">
                            <dt className="sr-only">{stat.label}</dt>
                            <dd className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wide text-brand-darkred">{stat.value}</dd>
                            <dd className="mt-1 text-sm text-brand-ink/70">{stat.label}</dd>
                        </div>
                    ))}
                </dl>

                <div className="mt-12 grid gap-5 md:grid-cols-3">
                    {reasons.map((reason) => (
                        <article
                            key={reason.title}
                            className="group rounded-card bg-white p-6 md:p-7 border border-brand-ink/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-softpill"
                        >
                            <div className="w-12 h-12 rounded-xl bg-brand-darkred/10 text-brand-darkred flex items-center justify-center transition-colors group-hover:bg-brand-darkred group-hover:text-white">
                                <svg
                                    className="w-6 h-6"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    {reason.icon}
                                </svg>
                            </div>
                            <h3 className="mt-5 text-lg font-semibold">{reason.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-brand-ink/70">{reason.desc}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}
