import type { IconName } from "../components/Icon";

// Fasilitas diambil dari API (GET /api/facilities) dan dikelola admin di panel /admin/fasilitas.
// Urutannya (sort_order) = urutan tampil di halaman /fasilitas dan slider beranda
export type FacilityCategory = "praktik" | "penunjang";

export const facilityCategoryLabels: Record<FacilityCategory, string> = {
    praktik: "Ruang Praktik Jurusan",
    penunjang: "Sarana Penunjang",
};

export type FacilityImage = {
    id: number;
    url: string;
};

export type Facility = {
    id: number;
    title: string;
    description: string;
    icon: IconName;           // ditampilkan selama belum ada foto
    category: FacilityCategory; // "praktik" = ruang praktik jurusan, "penunjang" = sarana untuk semua siswa
    features: string[];       // isi atau peralatan utama, tampil di halaman /fasilitas
    majors: string[];         // kode jurusan yang memakai ruang ini, contoh ["RPL", "MM"] (hanya ruang praktik)
    images: FacilityImage[];  // foto pertama jadi sampul (dipakai juga di slider beranda), kosong kalau belum ada foto
    sort_order: number;
};
