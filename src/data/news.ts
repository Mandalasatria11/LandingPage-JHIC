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

export type News = {
    slug: string;
    title: string;
    category: NewsCategory;
    date: string;   // format ISO, contoh: "2026-09-20T09:30"
    image?: string; // import gambar, contoh: import fotoLomba from "../assets/images/berita/lomba.jpg"
};

// TODO: ganti dengan berita asli (nantinya bisa diambil dari API/CMS)
export const news: News[] = [
    {
        slug: "siswa-rpl-juara-1-lks-kabupaten",
        title: "Siswa RPL Raih Juara 1 LKS Tingkat Kabupaten Bidang Web Technologies",
        category: "Prestasi",
        date: "2026-09-22T10:15",
    },
    {
        slug: "mpls-2026",
        title: "MPLS 2026 Resmi Dibuka: 420 Siswa Baru Ikuti Masa Pengenalan Sekolah",
        category: "Kegiatan Sekolah",
        date: "2026-09-19T08:00",
    },
    {
        slug: "mou-dengan-pt-mitra-teknologi",
        title: "SMK Plus Pelita Nusantara Tanda Tangani MoU Kelas Industri dengan Perusahaan Teknologi",
        category: "Kemitraan & Kerja Sama",
        date: "2026-09-17T13:30",
    },
    {
        slug: "jadwal-uji-kompetensi-kelas-xii",
        title: "Jadwal Uji Kompetensi Keahlian Kelas XII Tahun Pelajaran 2026/2027",
        category: "Pengumuman",
        date: "2026-09-15T07:45",
    },
    {
        slug: "aplikasi-kasir-karya-siswa",
        title: "Aplikasi Kasir Buatan Siswa RPL Kini Dipakai Koperasi Sekolah",
        category: "Karya & Inovasi Siswa",
        date: "2026-09-12T15:20",
    },
    {
        slug: "alumni-tkj-network-engineer",
        title: "Cerita Alumni TKJ yang Kini Bekerja sebagai Network Engineer di Jakarta",
        category: "Alumni",
        date: "2026-09-10T11:00",
    },
    {
        slug: "tips-memilih-jurusan-smk",
        title: "5 Tips Memilih Jurusan SMK yang Sesuai Minat dan Bakat Anak",
        category: "Artikel & Edukasi",
        date: "2026-09-08T09:00",
    },
    {
        slug: "film-pendek-multimedia-festival",
        title: "Film Pendek Karya Siswa Multimedia Masuk Nominasi Festival Film Pelajar",
        category: "Prestasi",
        date: "2026-09-05T16:40",
    },
    {
        slug: "pelepasan-siswa-pkl",
        title: "Pelepasan 180 Siswa Kelas XI untuk Praktik Kerja Lapangan di Industri Mitra",
        category: "Kegiatan Sekolah",
        date: "2026-09-02T08:30",
    },
    {
        slug: "robot-sortir-toi",
        title: "Siswa TOI Rancang Robot Penyortir Barang Otomatis Berbasis PLC",
        category: "Karya & Inovasi Siswa",
        date: "2026-08-29T14:10",
    },
    {
        slug: "kunjungan-industri-bank",
        title: "Siswa PBKM Ikuti Kunjungan Industri ke Kantor Bank dan BPR",
        category: "Kegiatan Sekolah",
        date: "2026-08-26T09:50",
    },
    {
        slug: "libur-maulid-nabi",
        title: "Pengumuman Libur Peringatan Maulid Nabi Muhammad SAW",
        category: "Pengumuman",
        date: "2026-08-24T12:00",
    },
    {
        slug: "workshop-literasi-digital-orang-tua",
        title: "Workshop Literasi Digital untuk Orang Tua: Mendampingi Anak di Era Media Sosial",
        category: "Artikel & Edukasi",
        date: "2026-08-20T10:00",
    },
    {
        slug: "reuni-akbar-alumni",
        title: "Reuni Akbar Alumni Pertemukan Lulusan dari Berbagai Angkatan",
        category: "Alumni",
        date: "2026-08-16T19:00",
    },
];
