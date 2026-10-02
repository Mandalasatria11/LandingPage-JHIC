import { SketchArrow } from "./SketchFrame";

// Panah carousel versi HP: garis panjang tanpa latar; area sentuh 64x44px supaya mudah ditekan di HP.
// Saat ditekan: muncul latar pill tipis, panah mengecil & terdorong ke arah geser, lalu memantul balik saat dilepas.
// Highlight abu-abu bawaan browser HP dimatikan karena sudah diganti efek ini. label = teks untuk pembaca layar.
export default function SlideArrow({ direction, label, onClick }: {
    direction: "left" | "right";
    label: string;
    onClick: () => void;
}) {
    const left = direction === "left";

    return(
        <button
            type="button"
            onClick={onClick}
            aria-label={label}
            className="group shrink-0 w-16 h-11 flex items-center justify-center rounded-full text-brand-darkred select-none transition-colors duration-200 [-webkit-tap-highlight-color:transparent] hover:text-brand-signal hover:bg-brand-darkred/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-darkred"
        >
            {/* Efek tekan (mengecil & terdorong) di span luar, cermin untuk panah kiri di dalamnya.
                Kalau digabung, scale-90 saat ditekan akan menimpa -scale-x-100 dan panahnya ikut terbalik. */}
            <span
                className={`block transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-active:scale-90 group-active:duration-100 motion-reduce:transition-none ${
                    left ? "group-hover:-translate-x-1 group-active:-translate-x-1.5" : "group-hover:translate-x-1 group-active:translate-x-1.5"
                }`}
            >
                <SketchArrow className={`w-12 h-6 ${left ? "-scale-x-100" : ""}`} />
            </span>
        </button>
    )
}
