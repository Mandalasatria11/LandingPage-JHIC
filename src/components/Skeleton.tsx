// Kotak abu-abu berdenyut sebagai pengganti konten selama data dimuat. className = ukuran, rasio & sudut
export default function Skeleton({ className = "" }: { className?: string }) {
    return <div aria-hidden="true" className={`animate-pulse motion-reduce:animate-none bg-brand-ink/10 ${className}`} />;
}
