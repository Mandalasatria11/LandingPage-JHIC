import { useEffect, useRef, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import Icon from "../Icon";
import TeacherCard from "../TeacherCard";
import SketchFrame, { SketchArrow, SketchBox, SketchRule, SketchSparks, SketchUnderline } from "../SketchFrame";
import { teachers, type Teacher } from "../../data/teachers";
import { majors } from "../../data/majors";

// key dipakai di URL (?jurusan=rpl), jadi filter bisa dibagikan atau ditautkan dari halaman jurusan & profil guru
const filters = [
    { key: "", label: "Semua" },
    { key: "umum", label: "Mapel Umum" },
    ...majors.map((major) => ({ key: major.code.toLowerCase(), label: major.code })),
];

const matchesFilter = (teacher: Teacher, key: string) =>
    key === "" || (key === "umum" ? !teacher.major : teacher.major?.toLowerCase() === key);

export default function DirectoryTeachers() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { hash } = useLocation();
    const [query, setQuery] = useState("");
    const sectionRef = useRef<HTMLElement>(null);

    // Tautan "/profil-guru?jurusan=mm#daftar-guru" dari halaman profil guru langsung membuka section ini.
    // ScrollToTop hanya menggulung ke atas, jadi #hash perlu ditangani sendiri
    useEffect(() => {
        if (hash === "#daftar-guru") sectionRef.current?.scrollIntoView();
    }, [hash]);

    const param = searchParams.get("jurusan")?.toLowerCase() ?? "";
    // Nilai yang tidak dikenal dianggap "Semua"
    const filter = filters.some((f) => f.key === param) ? param : "";
    const keyword = query.trim().toLowerCase();

    const results = teachers.filter(
        (teacher) =>
            matchesFilter(teacher, filter) &&
            `${teacher.name} ${teacher.role} ${teacher.major ?? ""} ${teacher.subjects?.join(" ") ?? ""}`.toLowerCase().includes(keyword)
    );

    const selectFilter = (key: string) => setSearchParams(key ? { jurusan: key } : {}, { replace: true });

    const reset = () => {
        setQuery("");
        selectFilter("");
    };

    return(
        <section ref={sectionRef} id="daftar-guru" className="relative z-10 scroll-mt-6 overflow-hidden bg-brand-softmist text-brand-ink px-6 py-20 md:py-28">
            {/* Dekorasi titik-titik, putih karena latarnya abu-abu */}
            <div aria-hidden="true" className="pointer-events-none absolute right-6 top-8 hidden md:block w-32 h-24 bg-[radial-gradient(circle,white_3px,transparent_3.5px)] bg-size-[34px_34px]" />

            <div className="relative max-w-6xl mx-auto">
                <div className="grid gap-4 md:grid-cols-2 md:items-end">
                    <div>
                        <p className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-darkred">
                            <SketchSparks>Tenaga Pendidik</SketchSparks>
                        </p>
                        <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight text-left">
                            {/* -ml-4 md:-ml-5: teks judul tetap sejajar eyebrow di atasnya, garis sikunya yang menjorok ke kiri */}
                            <SketchFrame className="-ml-4 md:-ml-5">Daftar Guru</SketchFrame>
                        </h2>
                    </div>
                    <p className="text-base md:text-lg leading-relaxed text-brand-ink/70 md:max-w-md md:justify-self-end">
                        Cari guru berdasarkan nama atau mata pelajaran, atau pilih jurusan untuk melihat guru
                        produktif di setiap kompetensi keahlian.
                    </p>
                </div>

                <div className="mt-10 md:mt-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    {/* Filter aktif ditandai coretan bawah seperti kategori berita; py-2.5 memberi ruang untuk coretannya
                        (daftar ini overflow-x-auto di HP, jadi yang keluar dari kotaknya ikut terpotong) */}
                    <div role="group" aria-label="Filter jurusan" className="flex gap-1 overflow-x-auto -mx-6 px-6 lg:mx-0 lg:px-0 lg:-ml-3 [scrollbar-width:none]">
                        {filters.map((f) => (
                            <button
                                key={f.key}
                                type="button"
                                aria-pressed={filter === f.key}
                                onClick={() => selectFilter(f.key)}
                                className={`shrink-0 px-3 py-2.5 text-sm font-medium transition-colors ${
                                    filter === f.key ? "text-brand-darkred" : "text-brand-ink/70 hover:text-brand-ink"
                                }`}
                            >
                                {filter === f.key ? <SketchUnderline size="sm">{f.label}</SketchUnderline> : f.label}
                            </button>
                        ))}
                    </div>

                    {/* Kolom cari bergaris coretan seperti menulis di buku, makin tegas saat sedang diketik */}
                    <label className="group relative block w-full lg:max-w-xs">
                        <span className="sr-only">Cari guru</span>
                        <Icon name="search" className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-darkred" />
                        <input
                            type="search"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Cari nama atau mata pelajaran"
                            className="w-full bg-transparent py-2.5 pl-7 pr-2 text-sm placeholder:text-brand-ink/40 focus:outline-none"
                        />
                        <SketchRule bold className="-left-1 -right-1 -bottom-1.5 h-3 text-brand-darkred/40 transition-colors group-focus-within:text-brand-darkred" />
                    </label>
                </div>

                <p aria-live="polite" className="mt-8 text-sm text-brand-ink/60">
                    Menampilkan {results.length} guru
                </p>

                {results.length > 0 ? (
                    // key: kartu & bingkai coretannya digambar ulang saat filter jurusan diganti (tidak saat mengetik).
                    // gap-6: ujung bingkai coretan kebablasan ±8px, jadi kartu bersebelahan tidak saling tabrak
                    <ul key={filter} className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 animate-fade-up">
                        {results.map((teacher, i) => (
                            <li key={teacher.id}>
                                <TeacherCard teacher={teacher} delay={(i % 5) * 100} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="relative mt-6 px-6 py-14 text-center">
                        <SketchBox tone="text-brand-darkred/40" />
                        <Icon name="search" className="mx-auto w-10 h-10 text-brand-ink/25" />
                        <p className="mt-4 text-base font-semibold">Guru tidak ditemukan</p>
                        <p className="mt-1 text-sm leading-relaxed text-brand-ink/60">
                            Coba kata kunci lain atau pilih jurusan yang berbeda.
                        </p>
                        <button
                            type="button"
                            onClick={reset}
                            className="group mt-6 inline-flex items-center gap-3 text-sm font-semibold text-brand-darkred"
                        >
                            Tampilkan Semua Guru
                            <SketchArrow className="w-7 h-3.5 transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}
