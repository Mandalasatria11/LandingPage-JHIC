import { useMemo, useState, type ReactNode } from "react";
import { ToastContext, type ToastApi } from "./toast-context";
import AdminIcon from "../components/AdminIcon";

type Toast = { id: number; type: "success" | "error"; message: string };

const DURATION = 4000;
let nextId = 0;

export default function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const api = useMemo<ToastApi>(() => {
        const dismiss = (id: number) => setToasts((current) => current.filter((toast) => toast.id !== id));
        const push = (type: Toast["type"], message: string) => {
            const id = nextId++;
            setToasts((current) => [...current.slice(-3), { id, type, message }]);
            window.setTimeout(() => dismiss(id), DURATION);
        };

        return {
            success: (message) => push("success", message),
            error: (message) => push("error", message),
        };
    }, []);

    return(
        <ToastContext.Provider value={api}>
            {children}

            <div aria-live="polite" className="pointer-events-none fixed inset-x-4 bottom-4 z-[60] flex flex-col items-end gap-2 sm:left-auto sm:right-6 sm:bottom-6">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        role={toast.type === "error" ? "alert" : "status"}
                        className={`pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-card px-4 py-3 text-sm font-medium text-white shadow-xl animate-fade-up ${
                            toast.type === "success" ? "bg-brand-ink" : "bg-brand-signal"
                        }`}
                    >
                        <AdminIcon name={toast.type === "success" ? "check" : "alert"} className="mt-0.5 w-4 h-4 shrink-0" />
                        <span className="flex-1">{toast.message}</span>
                        <button
                            type="button"
                            onClick={() => setToasts((current) => current.filter((t) => t.id !== toast.id))}
                            aria-label="Tutup notifikasi"
                            className="-m-1 p-1 rounded-full text-white/70 hover:text-white"
                        >
                            <AdminIcon name="close" className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    )
}
