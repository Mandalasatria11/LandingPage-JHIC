import { createContext, useContext } from "react";

export type ToastApi = {
    success: (message: string) => void;
    error: (message: string) => void;
};

export const ToastContext = createContext<ToastApi | null>(null);

// Notifikasi singkat di pojok layar, mis. "Berita disimpan"
export function useToast() {
    const context = useContext(ToastContext);
    if (!context) throw new Error("useToast harus dipakai di dalam ToastProvider");
    return context;
}
