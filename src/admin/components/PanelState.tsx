import LoadError from "../../components/LoadError";
import Spinner from "./Spinner";
import { cardClass } from "./ui";
import type { ApiError } from "../../lib/api";

// Isi kartu selama data admin dimuat atau saat gagal dimuat
export default function PanelState({ error, onRetry, label = "Memuat data" }: {
    error?: ApiError;
    onRetry: () => void;
    label?: string;
}) {
    return(
        <div className={`${cardClass} flex min-h-64 items-center justify-center px-6`}>
            {error ? (
                <LoadError message={error.message} onRetry={onRetry} />
            ) : (
                <Spinner label={label} className="w-8 h-8 text-brand-darkred" />
            )}
        </div>
    )
}
