import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Icon from "../../components/Icon";
import { SketchArrow, SketchBox, SketchSparks, SketchUnderline } from "../../components/SketchFrame";
import { majors } from "../../data/majors";

export default function NotFound() {
    const { pathname, key } = useLocation();
    const navigate = useNavigate();
    // key "default" = halaman dibuka langsung, belum ada riwayat untuk kembali
    const canGoBack = key !== "default";

    return(
        <>
            <Navbar />
            <main className="relative overflow-hidden min-h-svh flex items-center justify-center bg-brand-ink text-white px-6 pt-36 pb-24">
                {/* Dekorasi titik-titik */}
                <div aria-hidden="true" className="pointer-events-none absolute right-6 top-32 hidden md:block w-40 h-28 bg-[radial-gradient(circle,rgb(255_255_255/0.1)_2px,transparent_2.5px)] bg-size-[22px_22px]" />
                <div aria-hidden="true" className="pointer-events-none absolute left-0 bottom-16 hidden md:block w-24 h-56 bg-[radial-gradient(circle,rgb(255_255_255/0.1)_1.5px,transparent_2px)] bg-size-[14px_14px] mask-[linear-gradient(to_top,black,transparent)]" />

                <div className="relative w-full max-w-3xl text-center animate-fade-up">
                    <p className="text-xs sm:text-sm md:text-base uppercase tracking-[0.25em] font-semibold text-brand-mist/80">
                        <SketchSparks tone="text-brand-warmred">Ups, Tersesat?</SketchSparks>
                    </p>

                    <p aria-hidden="true" className="mt-4 font-display text-[7rem] sm:text-[10rem] md:text-[13rem] font-bold tracking-wide leading-none">
                        4
                        <span className="relative inline-block px-[0.08em]">
                            <span className="relative text-brand-warmred">0</span>
                        </span>
                        4
                    </p>

                    <h1 className="mt-4 font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight">
                        {/* Coretan hanya di kata terakhir supaya garisnya tidak melebar saat judul terlipat di HP.
                            delay: coretan mulai setelah teks selesai muncul */}
                        Halaman Tidak <SketchUnderline tone="text-brand-signal" delay={900}>Ditemukan</SketchUnderline>
                    </h1>
                    {/* mt-8: memberi ruang untuk garis coretan yang menggantung di bawah judul */}
                    <p className="mt-8 mx-auto max-w-xl text-base md:text-lg leading-relaxed text-brand-mist/75">
                        Maaf, halaman{" "}
                        <code className="rounded-full bg-white/10 px-2.5 py-0.5 text-sm text-white wrap-anywhere">{pathname}</code>{" "}
                        tidak tersedia. Mungkin alamatnya salah ketik, atau halamannya sudah dipindahkan.
                    </p>

                    <div className="mt-10 flex flex-wrap justify-center gap-3">
                        <Link
                            to="/"
                            className="group inline-flex items-center gap-3 rounded-full bg-linear-to-r from-brand-signal to-brand-darkred px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-brand-darkred/30 transition-transform hover:-translate-y-0.5"
                        >
                            Kembali ke Beranda
                            <SketchArrow className="w-8 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                        {canGoBack && (
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="group inline-flex items-center gap-3 rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                            >
                                <SketchArrow className="w-8 h-4 -scale-x-100 transition-transform group-hover:-translate-x-1" />
                                Halaman Sebelumnya
                            </button>
                        )}
                    </div>

                    {/* Bingkai coretan penuh, putih tipis karena latarnya gelap, sama seperti kotak statistik di hero Fasilitas */}
                    <nav aria-label="Jurusan" className="relative mt-16 bg-white/5 px-6 py-7 backdrop-blur">
                        <SketchBox tone="text-white/40" delay={300} />
                        <p className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-mist/60">
                            Atau jelajahi jurusan kami
                        </p>
                        <ul className="mt-5 flex flex-wrap justify-center gap-3">
                            {majors.map((major) => (
                                <li key={major.code}>
                                    <Link
                                        to={`/jurusan/${major.slug}`}
                                        aria-label={`${major.highlight} ${major.rest}`.trim()}
                                        className="inline-flex items-center gap-2 rounded-full bg-white/10 py-1.5 pl-1.5 pr-4 text-sm font-semibold text-white transition-colors hover:bg-brand-warmred"
                                    >
                                        <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                            <Icon name={major.icon} className="w-4 h-4" />
                                        </span>
                                        {major.code}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </main>
            <Footer />
        </>
    )
}
