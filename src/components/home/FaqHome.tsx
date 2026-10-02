import { useId, useState, type KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import Icon from "../Icon";
import { SketchArrow, SketchSparks, SketchUnderline } from "../SketchFrame";
import { faqs, type Faq } from "../../data/faq";
import { whatsappUrl } from "../../data/navigation";

export default function FaqHome() {
    // Hanya satu jawaban terbuka dalam satu waktu, pertanyaan pertama terbuka dari awal
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    // Navigasi keyboard ala accordion: panah atas/bawah pindah antar pertanyaan (berputar), Home/End ke ujung
    function handleKeyDown(e: KeyboardEvent<HTMLUListElement>) {
        const buttons = Array.from(e.currentTarget.querySelectorAll<HTMLButtonElement>("h3 > button"));
        const current = buttons.indexOf(e.target as HTMLButtonElement);
        if (current === -1) return;

        const targets: Record<string, number> = { ArrowDown: current + 1, ArrowUp: current - 1, Home: 0, End: buttons.length - 1 };
        const next = targets[e.key];
        if (next === undefined) return;

        e.preventDefault();
        buttons[(next + buttons.length) % buttons.length]?.focus();
    }

    return(
        // Tanpa padding bawah: footer setelahnya sudah punya pt-20 dengan background putih yang sama
        <section className="relative z-10 bg-white text-brand-ink px-6 pt-20 md:pt-28">
            <div className="max-w-6xl mx-auto grid gap-10 lg:gap-16 lg:grid-cols-[2fr_3fr] items-start">
                <div className="lg:sticky lg:top-32">
                    <p className="text-xs uppercase tracking-[0.25em] font-semibold text-brand-darkred">
                        <SketchSparks>FAQ</SketchSparks>
                    </p>
                    <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight text-left">
                        Pertanyaan yang Sering Diajukan
                    </h2>
                    <p className="mt-4 text-base md:text-lg leading-relaxed text-brand-ink/70">
                        Jawaban singkat seputar pendaftaran, jurusan, dan kehidupan sekolah untuk calon siswa
                        dan orang tua.
                    </p>

                    <div className="mt-8 rounded-card bg-brand-softmist p-6">
                        <h3 className="text-base font-semibold">Masih punya pertanyaan?</h3>
                        <p className="mt-1 text-sm leading-relaxed text-brand-ink/70">
                            Hubungi panitia PPDB lewat WhatsApp, kami siap membantu.
                        </p>
                        <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-5 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-brand-darkred to-brand-deepred px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-brand-darkred/25 transition-transform hover:-translate-y-0.5"
                        >
                            <Icon name="whatsapp" className="w-5 h-5" />
                            Chat via WhatsApp
                        </a>
                    </div>
                </div>

                <ul className="space-y-3" onKeyDown={handleKeyDown}>
                    {faqs.map((faq, i) => (
                        <li key={faq.question}>
                            <FaqItem
                                faq={faq}
                                number={i + 1}
                                open={openIndex === i}
                                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

function FaqItem({ faq, number, open, onToggle }: { faq: Faq; number: number; open: boolean; onToggle: () => void }) {
    const id = useId();
    const buttonId = `${id}-button`;
    const panelId = `${id}-panel`;

    return(
        // Efek hover juga muncul saat pertanyaan difokus lewat keyboard (has-[:focus-visible])
        <div className={`group rounded-card transition duration-300 ${
            open
                ? "bg-white shadow-softpill ring-1 ring-brand-ink/5"
                : "bg-brand-softmist hover:bg-brand-mist hover:-translate-y-0.5 has-focus-visible:bg-brand-mist has-focus-visible:-translate-y-0.5"
        }`}>
            <h3>
                <button
                    id={buttonId}
                    type="button"
                    onClick={onToggle}
                    aria-expanded={open}
                    aria-controls={panelId}
                    className="flex w-full items-center gap-4 p-5 md:p-6 text-left rounded-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-darkred"
                >
                    <span className="w-7 shrink-0 font-display text-lg font-bold tracking-wide text-brand-darkred" aria-hidden="true">
                        {String(number).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-base md:text-lg font-semibold leading-snug">
                        {open ? <SketchUnderline size="sm">{faq.question}</SketchUnderline> : faq.question}
                    </span>
                    <span className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center transition-colors duration-300 ${
                        open
                            ? "bg-brand-darkred text-white"
                            : "bg-white text-brand-ink group-hover:text-brand-darkred group-has-focus-visible:text-brand-darkred"
                    }`}>
                        {/* Tanda + berputar jadi × saat terbuka */}
                        <svg
                            className={`w-4 h-4 transition-transform duration-300 ${
                                open ? "rotate-45" : "group-hover:rotate-90 group-has-focus-visible:rotate-90"
                            }`}
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"
                        >
                            <path d="M12 5v14M5 12h14" />
                        </svg>
                    </span>
                </button>
            </h3>

            {/* Animasi buka-tutup pakai grid-rows 0fr -> 1fr; inert supaya link di jawaban tertutup tidak bisa di-tab */}
            <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                inert={!open}
                className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
            >
                <div className="overflow-hidden">
                    <div className="pl-16 pr-5 pb-6 md:pl-17 md:pr-8">
                        <p className="text-sm md:text-base leading-relaxed text-brand-ink/70">{faq.answer}</p>
                        {faq.link && (
                            <Link
                                to={faq.link.href}
                                reloadDocument={faq.link.external}
                                className="group mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-darkred"
                            >
                                {faq.link.label}
                                <SketchArrow className="w-6 h-3 transition-transform group-hover:translate-x-1" />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
