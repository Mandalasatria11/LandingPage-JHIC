import { useState } from "react";
import { Swiper, SwiperSlide, type SwiperClass } from "swiper/react";
import { A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import MajorCard from "../MajorCard";
import SketchFrame from "../SketchFrame";
import SlideArrow from "../SlideArrow";
import { majors } from "../../data/majors";

export default function MajorsHome() {
    const [swiper, setSwiper] = useState<SwiperClass | null>(null);
    const [active, setActive] = useState(0);
    const activeMajor = majors[active];
    // Geser otomatis dimatikan untuk pengguna yang memilih "kurangi animasi" di perangkatnya
    const [reduceMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    return(
        <section className="relative z-10 overflow-hidden bg-white text-brand-ink px-6 py-20 md:py-24">
            {/* Dekorasi titik-titik */}
            <div aria-hidden="true" className="pointer-events-none absolute right-6 top-8 hidden md:block w-32 h-24 bg-[radial-gradient(circle,var(--color-brand-mist)_3px,transparent_3.5px)] bg-size-[34px_34px]" />
            <div aria-hidden="true" className="pointer-events-none absolute left-0 top-40 hidden md:block w-24 h-56 bg-[radial-gradient(circle,var(--color-brand-mist)_1.5px,transparent_2px)] bg-size-[14px_14px] mask-[linear-gradient(to_bottom,black,transparent)]" />

            <div className="relative max-w-6xl mx-auto">
                <h2 className="font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight">
                    {/* Margin negatif supaya teks tetap sejajar kartu, garisnya menjorok ke kiri */}
                    <SketchFrame className="-ml-4 md:-ml-5">Jurusan</SketchFrame>
                </h2>

                {/* HP & tablet: carousel, kartu aktif di tengah dan kartu di sampingnya mengecil */}
                <div className="mt-10 lg:hidden">
                    <Swiper
                        modules={[A11y, Autoplay]}
                        loop
                        // Geser sendiri tiap 4 detik. Tetap jalan setelah pengguna swipe / menekan panah
                        // (timer diulang dari awal), berhenti sementara saat kursor ada di atas carousel
                        autoplay={reduceMotion ? false : { delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                        centeredSlides
                        slidesPerView={1.6}
                        spaceBetween={12}
                        breakpoints={{ 640: { slidesPerView: 2.6, spaceBetween: 20 } }}
                        onSwiper={setSwiper}
                        onRealIndexChange={(s) => setActive(s.realIndex)}
                        // "!" menimpa margin & padding bawaan swiper.css. -mx-6 = selebar layar,
                        // padding atas-bawah supaya bayangan kartu tidak terpotong
                        className="-mx-6! pt-2! pb-8!"
                    >
                        {majors.map((major) => (
                            <SwiperSlide key={major.code}>
                                <div className="scale-90 opacity-50 transition duration-300 in-[.swiper-slide-active]:scale-100 in-[.swiper-slide-active]:opacity-100 motion-reduce:transition-none">
                                    <MajorCard major={major} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Kartu hanya menampilkan kode, jadi nama lengkap jurusan aktif ditulis di bawahnya.
                        aria-hidden: nama lengkap sudah dibacakan dari link kartu, Swiper juga punya live region sendiri */}
                    <p aria-hidden="true" className="text-center text-lg font-semibold">
                        {activeMajor && `${activeMajor.highlight} ${activeMajor.rest}`.trim()}
                    </p>

                    <div className="mt-3 flex items-center justify-center gap-4 sm:gap-6">
                        <SlideArrow direction="left" label="Jurusan sebelumnya" onClick={() => swiper?.slidePrev()} />

                        <div className="flex gap-3">
                            {majors.map((major, i) => (
                                <button
                                    key={major.code}
                                    type="button"
                                    onClick={() => swiper?.slideToLoop(i)}
                                    aria-label={`Tampilkan jurusan ${major.code}`}
                                    aria-current={i === active ? "true" : undefined}
                                    className={`h-2.5 rounded-full transition-all duration-300 ${
                                        i === active ? "w-8 bg-brand-darkred" : "w-2.5 bg-brand-ink/20 hover:bg-brand-ink/40"
                                    }`}
                                />
                            ))}
                        </div>

                        <SlideArrow direction="right" label="Jurusan berikutnya" onClick={() => swiper?.slideNext()} />
                    </div>
                </div>

                {/* Desktop: kelima kartu berjajar */}
                <ul className="mt-12 hidden lg:grid lg:grid-cols-5 lg:gap-4">
                    {majors.map((major) => (
                        <li key={major.code}>
                            <MajorCard major={major} />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
