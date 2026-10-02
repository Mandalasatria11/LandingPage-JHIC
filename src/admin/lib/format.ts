import { useEffect } from "react";

// "22 Sep 2026, 10.15"
export function formatDateTime(iso: string) {
    return new Date(iso).toLocaleString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

// Nilai untuk <input type="datetime-local">. Server mengirim waktu dalam zona waktu sekolah (WIB),
// contoh "2026-09-22T10:15:00+07:00", jadi cukup diambil bagian tanggal & jamnya
export function toDateTimeLocal(iso: string) {
    return iso.slice(0, 16);
}

// Waktu sekarang untuk <input type="datetime-local"> (jam di komputer admin)
export function nowDateTimeLocal() {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
}

// Perkiraan slug untuk pratinjau alamat halaman; slug sebenarnya dibuat server dan dijamin unik
export function slugify(text: string) {
    return text
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/['’]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export function formatFileSize(bytes: number) {
    return bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.ceil(bytes / 1024)} KB`;
}

// Batas ukuran foto, sama dengan validasi server (max:5120 KB)
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export const ACCEPTED_IMAGE_TYPES = "image/jpeg,image/png,image/webp";

export function useDocumentTitle(title: string) {
    useEffect(() => {
        document.title = `${title} · Admin SMK Plus Pelita Nusantara`;
    }, [title]);
}
