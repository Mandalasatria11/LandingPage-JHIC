import NewsBrowser from "../NewsBrowser";
import { SketchUnderline } from "../SketchFrame";

// Section berita beranda versi satu halaman penuh: judul & daftarnya sama, tetapi lebih banyak kartu per halaman
export default function ListNews() {
    return(
        // Tanpa hero, jadi pt besar supaya judul tidak tertutup navbar.
        // Selebar layar (tanpa max-w): px-6 di bawah lg sengaja sama dengan -mx-6 deretan kategori supaya tetap mentok ke tepi layar
        <section className="relative bg-brand-softmist text-brand-ink px-6 lg:px-10 pt-32 pb-20 md:pt-40 md:pb-28">
            <div>
                <h1 className="text-center font-display text-3xl md:text-4xl font-bold uppercase tracking-wide leading-tight animate-fade-up">
                    Berita &amp; Informasi Terkini
                    <span className="block text-brand-darkred">
                        {/* delay: coretan mulai setelah teks selesai muncul */}
                        <SketchUnderline delay={500}>SMK Plus Pelita Nusantara</SketchUnderline>
                    </span>
                </h1>

                {/* 12 kartu = baris selalu penuh, baik di 2, 3, maupun 4 kolom (layar sangat lebar) */}
                <NewsBrowser pageSize={12} wide className="mt-12 md:mt-16" />
            </div>
        </section>
    )
}
