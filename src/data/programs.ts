import type { IconName } from "../components/Icon";

export type Program = {
    id: string;
    title: string;
    desc: string;
    icon: IconName; // ditampilkan selama belum ada foto
    image?: string;
    logo?: string; 
};

// TODO: ganti dengan program unggulan asli sekolah
export const programs: Program[] = [
    {
        id: "kelas-industri",
        title: "Kelas Industri",
        desc: "Kelas khusus yang kurikulumnya disusun bersama perusahaan mitra. Siswa belajar langsung dari praktisi industri dan berpeluang direkrut setelah lulus.",
        icon: "briefcase",
    },
    {
        id: "teaching-factory",
        title: "Teaching Factory",
        desc: "Siswa mengerjakan pesanan dan proyek sungguhan dari klien, sehingga terbiasa dengan standar dan ritme kerja industri.",
        icon: "factory",
    },
    {
        id: "sertifikasi",
        title: "Sertifikasi Kompetensi",
        desc: "Uji kompetensi keahlian dengan sertifikat resmi yang diakui industri sebagai bekal melamar kerja.",
        icon: "award",
    },
    {
        id: "bahasa-asing",
        title: "Kelas Bahasa Asing",
        desc: "Pembelajaran Bahasa Inggris dan Jepang untuk persiapan kerja dan magang di luar negeri.",
        icon: "globe",
    },
    {
        id: "technopreneur",
        title: "Technopreneur",
        desc: "Pendampingan siswa membangun usaha sendiri, mulai dari ide bisnis hingga pemasaran digital.",
        icon: "bulb",
    },
    {
        id: "pembinaan-karakter",
        title: "Pembinaan Karakter",
        desc: "Program keagamaan, kedisiplinan, dan kepemimpinan yang berjalan setiap hari untuk membentuk lulusan yang berakhlak.",
        icon: "book",
    },
];
