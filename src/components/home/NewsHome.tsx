import NewsBrowser from "../NewsBrowser";
import { SketchUnderline } from "../SketchFrame";

export default function NewsHome() {
    return(
        <section className="relative z-10 bg-brand-softmist text-brand-ink px-6 py-20 md:py-28">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-center font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight">
                    Berita &amp; Informasi Terkini
                    <span className="block text-brand-darkred">
                        <SketchUnderline>SMK Plus Pelita Nusantara</SketchUnderline>
                    </span>
                </h2>

                {/* Daftar yang sama dengan halaman /berita */}
                <NewsBrowser className="mt-12 md:mt-16" />
            </div>
        </section>
    )
}
