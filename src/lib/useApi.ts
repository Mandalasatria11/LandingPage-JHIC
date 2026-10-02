import { useCallback, useEffect, useSyncExternalStore } from "react";
import { ApiError, apiRequest } from "./api";

// Cache sederhana untuk permintaan GET: satu entri per path, dipakai bersama semua komponen yang membaca path
// yang sama (mis. data fasilitas dipakai 3 section di halaman /fasilitas tapi hanya diambil sekali), dan tetap
// tersimpan saat pindah halaman supaya kembali ke halaman sebelumnya terasa instan.
// data di entri "loading" = data lama yang tetap ditampilkan selama data baru diambil.
type Entry =
    | { status: "loading"; data?: unknown }
    | { status: "success"; data: unknown; stale: boolean }
    | { status: "error"; error: ApiError };

const cache = new Map<string, Entry>();
const listeners = new Set<() => void>();

function emit() {
    listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
        listeners.delete(listener);
    };
}

function load(path: string) {
    const current = cache.get(path);
    if (current && !(current.status === "success" && current.stale)) return;

    const entry: Entry = { status: "loading", data: current?.status === "success" ? current.data : undefined };
    cache.set(path, entry);
    emit();

    apiRequest(path).then(
        (data) => {
            // Abaikan hasil lama kalau entrinya sudah diganti (invalidateApiCache / reload) selama permintaan berjalan
            if (cache.get(path) !== entry) return;
            cache.set(path, { status: "success", data, stale: false });
            emit();
        },
        (error) => {
            if (cache.get(path) !== entry) return;
            cache.set(path, { status: "error", error: error instanceof ApiError ? error : new ApiError(0, String(error)) });
            emit();
        },
    );
}

// Tandai cache usang supaya diambil ulang, mis. setelah admin menyimpan perubahan. Data lama tetap tampil
// sampai data baru datang. prefix = hanya path yang diawali teks ini, kosongkan untuk semuanya
export function invalidateApiCache(prefix = "") {
    for (const [path, entry] of [...cache]) {
        if (!path.startsWith(prefix)) continue;
        if (entry.status === "success") cache.set(path, { ...entry, stale: true });
        else cache.delete(path);
    }
    emit();
}

// Isi cache langsung dengan data yang sudah diketahui, mis. daftar baru yang dikembalikan server setelah diurutkan ulang
export function setApiCache(path: string, data: unknown) {
    cache.set(path, { status: "success", data, stale: false });
    emit();
}

// Ambil data GET dari API. path = null berarti belum ada yang perlu diambil.
// loading = belum ada data sama sekali; refreshing = data lama tampil sambil mengambil yang baru.
// reload() mengambil ulang (dipakai tombol "Coba lagi")
export function useApi<T>(path: string | null) {
    const entry = useSyncExternalStore(subscribe, () => (path ? cache.get(path) : undefined));

    useEffect(() => {
        if (path && (!entry || (entry.status === "success" && entry.stale))) load(path);
    }, [path, entry]);

    const reload = useCallback(() => {
        if (!path) return;
        cache.delete(path);
        load(path);
    }, [path]);

    const data = entry && entry.status !== "error" ? (entry.data as T | undefined) : undefined;
    const fresh = entry?.status === "success" && !entry.stale;

    return {
        data,
        error: entry?.status === "error" ? entry.error : undefined,
        loading: path !== null && data === undefined && entry?.status !== "error",
        refreshing: data !== undefined && !fresh,
        reload,
    };
}
