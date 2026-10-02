import type { IconName } from "../components/Icon";

// Isi berita diambil dari API (GET /api/news) dan dikelola admin di panel /admin/berita.
// Daftar kategori ini harus sama dengan enum NewsCategory di backend (app/Enums/NewsCategory.php)
export const newsCategories = [
    "Kegiatan Sekolah",
    "Prestasi",
    "Pengumuman",
    "Kemitraan & Kerja Sama",
    "Karya & Inovasi Siswa",
    "Artikel & Edukasi",
    "Alumni",
] as const;

export type NewsCategory = (typeof newsCategories)[number];

// Ikon placeholder selama berita belum punya foto
export const categoryIcon: Record<NewsCategory, IconName> = {
    "Kegiatan Sekolah": "user",
    "Prestasi": "award",
    "Pengumuman": "bulb",
    "Kemitraan & Kerja Sama": "briefcase",
    "Karya & Inovasi Siswa": "code",
    "Artikel & Edukasi": "book",
    "Alumni": "globe",
};

// Isi artikel disusun dari blok-blok berikut, ditampilkan berurutan di halaman detail berita
export type NewsBlock =
    | string                                 // paragraf biasa
    | { heading: string }                    // subjudul
    | { quote: string; by?: string | null }  // kutipan, by = nama & jabatan yang dikutip
    | { list: string[] };                    // daftar poin

// "scheduled" = sudah diterbitkan tapi tanggalnya di masa depan, baru tampil di situs saat tanggalnya tiba
export type NewsStatus = "published" | "scheduled" | "draft";

// Satu berita di daftar (tanpa isi artikel)
export type News = {
    id: number;
    slug: string;
    title: string;
    category: NewsCategory;
    date: string;          // format ISO dengan zona waktu, contoh: "2026-09-20T09:30:00+07:00"
    image: string | null;  // URL foto, null = belum ada foto (tampil ikon kategori)
    author: string | null; // null kalau ditulis Humas sekolah
    excerpt: string;       // paragraf pembuka, tampil paling atas & lebih tebal di halaman detail
    is_published: boolean;
    status: NewsStatus;
};

// Berita lengkap dengan isi artikelnya
export type NewsDetail = News & { body: NewsBlock[] };

export const defaultNewsAuthor = "Humas SMK Plus Pelita Nusantara";
