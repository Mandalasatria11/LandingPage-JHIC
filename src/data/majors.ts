import type { IconName } from "../components/Icon";

export type Major = {
    code: string;
    slug: string;
    icon: IconName;
    highlight: string; // bagian nama yang berwarna merah
    rest: string;
    desc: string;
    focus: { icon: IconName; title: string; desc: string }[];
    careers: string[];
    image?: string; // foto siswa (PNG tanpa background paling bagus), contoh: import fotoRPL from "../assets/images/rpl.png"
    image_detail?: string; // foto siswa detail (PNG tanpa background paling bagus), contoh: import fotoRPLDetail from "../assets/images/rpl-detail.png"    
};

// TODO: ganti deskripsi dengan kurikulum asli & tambahkan foto siswa tiap jurusan
export const majors: Major[] = [
    {
        code: "RPL",
        slug: "rekayasa-perangkat-lunak",
        icon: "code",
        image: "/src/assets/images/RPL.png",
        image_detail: "/src/assets/images/RPL-detail.png",
        highlight: "Rekayasa",
        rest: "Perangkat Lunak",
        desc: "Program yang mempelajari perancangan dan pembuatan aplikasi, mulai dari logika pemrograman hingga aplikasi yang siap dipakai pengguna.",
        focus: [
            { icon: "monitor", title: "Pengembangan Web", desc: "Membangun website dan aplikasi web yang modern, cepat, dan responsif." },
            { icon: "phone", title: "Aplikasi Mobile", desc: "Membuat aplikasi Android yang fungsional dan mudah digunakan." },
            { icon: "database", title: "Basis Data", desc: "Merancang, mengelola, dan mengamankan database untuk aplikasi." },
        ],
        careers: ["Web Developer", "Mobile App Developer", "Software Engineer", "UI/UX Designer", "Software Tester"],
    },
    {
        code: "TOI",
        slug: "teknik-otomasi-industri",
        icon: "cpu",
        image: "/src/assets/images/TOI.png",
        highlight: "Teknik Otomasi",
        rest: "Industri",
        desc: "Program yang mempelajari sistem kendali dan otomasi mesin yang digunakan di pabrik dan industri manufaktur.",
        focus: [
            { icon: "cpu", title: "PLC & Sistem Kendali", desc: "Memprogram PLC untuk mengendalikan mesin dan jalur produksi otomatis." },
            { icon: "zap", title: "Listrik Industri", desc: "Instalasi dan perawatan sistem kelistrikan di lingkungan industri." },
            { icon: "monitor", title: "Sensor & Pneumatik", desc: "Merangkai sensor, aktuator, dan sistem pneumatik untuk otomasi." },
        ],
        careers: ["Teknisi Otomasi", "Teknisi Listrik Industri", "Operator Mesin Produksi", "Maintenance Engineer"],
    },
    {
        code: "MM",
        slug: "multimedia",
        icon: "camera",
        image: "/src/assets/images/DKV.png",
        highlight: "Multimedia",
        rest: "",
        desc: "Program yang mempelajari pembuatan konten visual dan digital untuk kebutuhan media, periklanan, dan industri kreatif.",
        focus: [
            { icon: "pen", title: "Desain Grafis", desc: "Membuat logo, poster, dan identitas visual menggunakan software desain standar industri." },
            { icon: "video", title: "Videografi & Editing", desc: "Merekam, menyunting, dan memproduksi video untuk iklan, dokumenter, dan media sosial." },
            { icon: "camera", title: "Fotografi & Animasi", desc: "Teknik fotografi produk serta pembuatan animasi 2D dan 3D." },
        ],
        careers: ["Desainer Grafis", "Video Editor", "Content Creator", "Fotografer", "Animator", "Motion Designer"],
    },
    {
        code: "TKJ",
        slug: "teknik-komputer-jaringan",
        icon: "network",
        image: "/src/assets/images/TKJ.png",
        highlight: "Teknik Komputer",
        rest: "dan Jaringan",
        desc: "Program yang mempelajari perakitan komputer, pembangunan jaringan, dan pengelolaan server yang dibutuhkan hampir semua perusahaan.",
        focus: [
            { icon: "network", title: "Instalasi Jaringan", desc: "Merancang dan memasang jaringan LAN, WAN, dan wireless menggunakan Mikrotik dan Cisco." },
            { icon: "server", title: "Administrasi Server", desc: "Mengonfigurasi server Linux dan layanan seperti web, DNS, dan mail server." },
            { icon: "shield", title: "Keamanan Jaringan", desc: "Dasar-dasar mengamankan jaringan dari gangguan dan serangan." },
        ],
        careers: ["Network Administrator", "IT Support", "System Administrator", "Teknisi Komputer", "Network Engineer"],
    },
    {
        code: "PKM",
        slug: "perbankan-keuangan-mikro",
        icon: "bank",
        image: "/src/assets/images/LPB.png",
        highlight: "Perbankan",
        rest: "dan Keuangan Mikro",
        desc: "Program yang mempelajari layanan perbankan, akuntansi, dan operasional lembaga keuangan seperti bank, BPR, dan koperasi.",
        focus: [
            { icon: "user", title: "Layanan Nasabah", desc: "Melayani nasabah secara profesional sebagai teller dan customer service." },
            { icon: "calculator", title: "Akuntansi Keuangan", desc: "Mencatat transaksi dan menyusun laporan keuangan sederhana." },
            { icon: "bank", title: "Operasional Lembaga Keuangan", desc: "Memahami alur kredit, tabungan, dan aplikasi perbankan." },
        ],
        careers: ["Teller", "Customer Service Bank", "Staf Administrasi Keuangan", "Staf Koperasi", "Staf Akuntansi"],
    },
];
