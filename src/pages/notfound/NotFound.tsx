import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Icon from "../../components/Icon";
import { majors } from "../../data/majors";

export default function NotFound() {
    const { pathname, key } = useLocation();
    const navigate = useNavigate();
    // key "default" = halaman dibuka langsung, belum ada riwayat untuk kembali
    const canGoBack = key !== "default";

    return(
        <>
            <Navbar />
            <main className="relative overflow-hidden min-h-svh flex items-center justify-center bg-brand-ink bg-[radial-gradient(ellipse_at_top,var(--color-brand-deepred),transparent_70%)] text-white px-6 pt-36 pb-24">
                {/* Dekorasi titik-titik */}
                <div aria-hidden="true" className="pointer-events-none absolute right-6 top-32 hidden md:block w-40 h-28 bg-[radial-gradient(circle,rgb(255_255_255/0.1)_2px,transparent_2.5px)] bg-size-[22px_22px]" />
                <div aria-hidden="true" className="pointer-events-none absolute left-0 bottom-16 hidden md:block w-24 h-56 bg-[radial-gradient(circle,rgb(255_255_255/0.1)_1.5px,transparent_2px)] bg-size-[14px_14px] [mask-image:linear-gradient(to_top,black,transparent)]" />

                <div className="relative w-full max-w-3xl text-center animate-fade-up">
                    <p aria-hidden="true" className="font-display text-[7rem] sm:text-[10rem] md:text-[13rem] font-bold tracking-wide leading-none">
                        4<span className="text-brand-warmred">0</span>4
                    </p>

                    <h1 className="mt-4 font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight">
                        Halaman Tidak Ditemukan
                    </h1>
                    <p className="mt-4 mx-auto max-w-xl text-base md:text-lg leading-relaxed text-brand-mist/75">
                        Maaf, halaman{" "}
                        <code className="rounded-full bg-white/10 px-2.5 py-0.5 text-sm text-white [overflow-wrap:anywhere]">{pathname}</code>{" "}
                        tidak tersedia. Mungkin alamatnya salah ketik, atau halamannya sudah dipindahkan.
                    </p>

                    <div className="mt-10 flex flex-wrap justify-center gap-3">
                        <Link
                            to="/"
                            className="group inline-flex items-center gap-3 rounded-full bg-linear-to-r from-brand-signal to-brand-darkred px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-brand-darkred/30 transition-transform hover:-translate-y-0.5"
                        >
                            Kembali ke Beranda
                            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M5 12h14M13 6l6 6-6 6" />
                            </svg>
                        </Link>
                        {canGoBack && (
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="group inline-flex items-center gap-3 rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                            >
                                <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <path d="M19 12H5M11 18l-6-6 6-6" />
                                </svg>
                                Halaman Sebelumnya
                            </button>
                        )}
                    </div>

                    <nav aria-label="Jurusan" className="mt-14 border-t border-white/10 pt-8">
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
