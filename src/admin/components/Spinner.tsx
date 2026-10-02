// Lingkaran berputar. label = teks untuk pembaca layar; className = ukuran & warna
export default function Spinner({ label = "Memuat", className = "w-5 h-5" }: { label?: string; className?: string }) {
    return(
        <span role="status" className="inline-flex">
            <svg className={`animate-spin motion-reduce:animate-none ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.2" strokeWidth="3" />
                <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <span className="sr-only">{label}</span>
        </span>
    )
}
