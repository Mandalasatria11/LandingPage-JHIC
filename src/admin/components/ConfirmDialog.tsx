import { useEffect, useRef } from "react";
import AdminIcon from "./AdminIcon";
import Spinner from "./Spinner";
import { buttonDanger, buttonSecondary } from "./ui";

// Dialog konfirmasi sebelum menghapus. Memakai <dialog> supaya fokus keyboard tertahan & bisa ditutup dengan Escape
export default function ConfirmDialog({ open, title, message, confirmLabel = "Hapus", busy = false, onConfirm, onCancel }: {
    open: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    busy?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (open && !dialog.open) dialog.showModal();
        if (!open && dialog.open) dialog.close();
    }, [open]);

    return(
        <dialog
            ref={dialogRef}
            // Escape menutup dialog; saat sedang menghapus, dialog tidak boleh ditutup
            onCancel={(e) => {
                e.preventDefault();
                if (!busy) onCancel();
            }}
            aria-labelledby="confirm-title"
            className="m-auto w-[calc(100%-2rem)] max-w-md rounded-card bg-white p-0 text-left text-brand-ink shadow-2xl backdrop:bg-brand-ink/50 backdrop:backdrop-blur-sm"
        >
            <div className="p-6">
                <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-signal/10 text-brand-signal">
                        <AdminIcon name="alert" className="w-5 h-5" />
                    </span>
                    <div>
                        <h2 id="confirm-title" className="text-lg font-semibold">{title}</h2>
                        <p className="mt-1.5 text-sm leading-relaxed text-brand-ink/65">{message}</p>
                    </div>
                </div>
                <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                    <button type="button" onClick={onCancel} disabled={busy} className={buttonSecondary}>Batal</button>
                    <button type="button" onClick={onConfirm} disabled={busy} className={buttonDanger}>
                        {busy && <Spinner className="w-4 h-4" label="Menghapus" />}
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </dialog>
    )
}
