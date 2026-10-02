import LoadError from "../LoadError";
import Skeleton from "../Skeleton";
import type { ApiError } from "../../lib/api";

// Kerangka (selama data fasilitas dimuat) atau pesan gagal, di tempat daftar fasilitas.
// Tidak menampilkan apa-apa setelah data berhasil dimuat.
export default function FacilityListState({ loaded, error, onRetry }: {
    loaded: boolean;
    error?: ApiError;
    onRetry: () => void;
}) {
    if (error) return <LoadError message={error.message} onRetry={onRetry} className="mt-10" />;
    if (loaded) return null;

    return(
        <div role="status" aria-label="Memuat fasilitas" className="mt-10 md:mt-16 grid gap-6 md:grid-cols-2">
            {[0, 1].map((i) => (
                <div key={i} className={i === 1 ? "hidden md:block" : undefined}>
                    <Skeleton className="aspect-4/3 rounded-card" />
                    <Skeleton className="mt-6 h-8 w-2/3 rounded-lg" />
                    <Skeleton className="mt-4 h-4 w-full rounded-full" />
                    <Skeleton className="mt-3 h-4 w-4/5 rounded-full" />
                </div>
            ))}
        </div>
    )
}
