import type { IconName } from "../components/Icon";

export type Facility = {
    id: string;
    title: string;
    desc: string;
    icon: IconName; // ditampilkan selama belum ada foto
    image?: string; // import foto, contoh: import fotoLab from "../assets/images/fasilitas/lab.jpg"
};

// TODO: ganti dengan fasilitas & foto asli sekolah
// Fasilitas pertama tampil sebagai kartu besar (unggulan)
export const facilities: Facility[] = [
    {
        id: "lab-komputer",
        title: "Laboratorium Komputer",
        desc: "Ruang praktik ber-AC dengan komputer spesifikasi tinggi dan software standar industri untuk pemrograman, desain, dan editing video.",
        icon: "monitor",
    },
    {
        id: "studio-multimedia",
        title: "Studio Multimedia",
        desc: "Studio foto dan video lengkap dengan lighting, green screen, dan kamera profesional.",
        icon: "camera",
    },
    {
        id: "lab-jaringan",
        title: "Lab Jaringan",
        desc: "Perangkat Mikrotik, Cisco, dan server untuk praktik instalasi jaringan.",
        icon: "network",
    },
    {
        id: "bank-mini",
        title: "Bank Mini",
        desc: "Simulasi layanan bank sungguhan untuk praktik teller dan customer service.",
        icon: "bank",
    },
    {
        id: "bengkel-otomasi",
        title: "Bengkel Otomasi",
        desc: "Trainer PLC, pneumatik, dan panel listrik industri untuk praktik otomasi.",
        icon: "cpu",
    },
    {
        id: "perpustakaan",
        title: "Perpustakaan Digital",
        desc: "Koleksi buku cetak dan e-book, ruang baca yang nyaman, serta akses internet cepat untuk belajar mandiri.",
        icon: "book",
    },
    {
        id: "masjid",
        title: "Masjid Sekolah",
        desc: "Pusat kegiatan ibadah, kajian rutin, dan pembinaan karakter siswa setiap hari.",
        icon: "mosque",
    },
];
