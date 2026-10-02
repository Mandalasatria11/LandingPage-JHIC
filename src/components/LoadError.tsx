import Icon from "./Icon";

// Pesan saat data dari server gagal dimuat, dengan tombol untuk mencoba lagi.
// dark = dipasang di atas latar gelap
export default function LoadError({ message, onRetry, dark = false, className = "" }: {
    message: string;
    onRetry: () => void;
    dark?: boolean;
    className?: string;
}) {
    return(
        <div role="alert" className={`flex flex-col items-center gap-4 py-12 text-center ${className}`}>
            <span className={`w-12 h-12 rounded-full flex items-center justify-center ${dark ? "bg-white/10 text-white" : "bg-brand-darkred/10 text-brand-darkred"}`}>
                <Icon name="bulb" className="w-6 h-6" />
            </span>
            <p className={`max-w-md text-sm leading-relaxed ${dark ? "text-brand-mist/80" : "text-brand-ink/70"}`}>{message}</p>
            <button
                type="button"
                onClick={onRetry}
                className="inline-flex items-center rounded-full bg-brand-darkred px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-deepred"
            >
                Coba Lagi
            </button>
        </div>
    )
}
