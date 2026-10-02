import Navbar from "./Navbar";
import Footer from "./Footer";
import LoadError from "./LoadError";
import Skeleton from "./Skeleton";
import type { ApiError } from "../lib/api";

// Halaman detail (berita / program) selama datanya dimuat atau saat gagal dimuat.
// Kerangkanya mengikuti tata letak halaman detail supaya tidak melompat saat isi muncul.
export default function DetailPageState({ error, onRetry }: { error?: ApiError; onRetry: () => void }) {
    return(
        <>
            <Navbar />
            <main className="bg-white text-brand-ink px-6 pt-32 pb-20 md:pt-40 md:pb-28 min-h-svh">
                <div className="max-w-6xl mx-auto">
                    {error ? (
                        <LoadError message={error.message} onRetry={onRetry} className="py-24" />
                    ) : (
                        <div role="status" aria-label="Memuat halaman">
                            <Skeleton className="h-4 w-56 rounded-full" />
                            <Skeleton className="mt-12 h-4 w-32 rounded-full" />
                            <Skeleton className="mt-5 h-10 md:h-12 w-full max-w-3xl rounded-lg" />
                            <Skeleton className="mt-3 h-10 md:h-12 w-2/3 max-w-xl rounded-lg" />
                            <Skeleton className="mt-12 w-full aspect-video max-w-3xl rounded-card" />
                            <div className="mt-12 max-w-3xl space-y-3">
                                <Skeleton className="h-4 w-full rounded-full" />
                                <Skeleton className="h-4 w-full rounded-full" />
                                <Skeleton className="h-4 w-4/5 rounded-full" />
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    )
}
