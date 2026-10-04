import type { IconName } from "../components/Icon";
// kelas bagian hero
import fotoKelasMM from "../assets/images/majors/mm/heroImage.jpg";
import fotoKelasRPL from "../assets/images/majors/rpl/heroImage.jpeg";
import fotoKelasTKJ from "../assets/images/majors/tkj/heroImage.jpg";
import fotoKelasPKM from "../assets/images/majors/pkm/heroImage.jpg";
import fotoKelasTOI from "../assets/images/majors/toi/heroImage.jpeg";

// ini bagian landingpage
import fotoLandingRPL from "../assets/images/majors/rpl/LandingPageRPL.png";
import fotoLandingTKJ from "../assets/images/majors/tkj/LandingPageTKJ.png";
import fotoLandingPKM from "../assets/images/majors/pkm/LandingPagePKM.png";
import fotoLandingMM from "../assets/images/majors/mm/LandingPageMM.png";
import fotoLandingTOI from "../assets/images/majors/toi/LandingPageTOI.png";

// ini bagian card hero di halaman jurusan
import fotoHeroCardImageMM from "../assets/images/majors/mm/fotoMM.png";
import fotoHeroCardImageRPL from "../assets/images/majors/rpl/fotoRPL.png";
import fotoHeroCardImageTKJ from "../assets/images/majors/tkj/fotoTKJ.png";
import fotoHeroCardImagePKM from "../assets/images/majors/pkm/fotoPKM.png";
import fotoHeroCardImageTOI from "../assets/images/majors/toi/fotoTOI.png";

// ini bagian foto kegiatan Devacto (nama file harus sama persis, huruf besar-kecilnya juga)
import fotoDevactoMM1 from "../assets/images/devacto/mm/DKV5.jpeg";
import fotoDevactoMM2 from "../assets/images/devacto/mm/DKV3.jpg";
import fotoDevactoMM3 from "../assets/images/devacto/mm/DKV7.jpeg";
import fotoDevactoRPL1 from "../assets/images/devacto/rpl/RPL2.jpg";
import fotoDevactoRPL2 from "../assets/images/devacto/rpl/RPL4.jpeg";
import fotoDevactoRPL3 from "../assets/images/devacto/rpl/RPL5.jpeg";
import fotoDevactoTKJ1 from "../assets/images/devacto/tkj/TKJ3.jpg";
import fotoDevactoTKJ2 from "../assets/images/devacto/tkj/TKJ2.jpg";
import fotoDevactoTKJ3 from "../assets/images/devacto/tkj/TKJ6.jpg";
import fotoDevactoPKM1 from "../assets/images/devacto/pkm/LPB1.jpg";
import fotoDevactoPKM2 from "../assets/images/devacto/pkm/LPB3.jpg";
import fotoDevactoPKM3 from "../assets/images/devacto/pkm/LPB4.jpg";
import fotoDevactoTOI1 from "../assets/images/devacto/toi/TOI 1.jpeg";
import fotoDevactoTOI2 from "../assets/images/devacto/toi/TOI 2.jpeg";
import fotoDevactoTOI3 from "../assets/images/devacto/toi/TOI 3.jpeg";

// ini bagian foto Portofolio Karya Siswa. MASIH GAMBAR CONTOH dari internet (CC0 / Public Domain, sumbernya di
// assets/images/showcase/sumber-gambar.json), ganti dengan foto karya siswa asli. Dipanggil dengan "<jurusan>/<nama file>"
const showcasePhotos = import.meta.glob<string>("../assets/images/showcase/*/*.jpg", { eager: true, import: "default" });
const showcasePhoto = (file: string) => showcasePhotos[`../assets/images/showcase/${file}`];

export type MajorTopic = { icon: IconName; title: string; desc: string };

export type DevactoPhoto = {
    caption: string; // keterangan yang tampil di bagian bawah foto
    image?: string; // import foto kegiatan, contoh: import fotoDevacto from "../assets/images/majors/rpl/devacto-1.jpg"
};

// Hasil nyata dari kegiatan Devacto, tampil sebagai daftar di bawah foto kegiatan
export type DevactoWork = { title: string; desc: string };

export type Devacto = {
    paragraphs: string[];
    schedule: string; // hari & jam kegiatan, contoh: "Selasa & Kamis, 15.30–17.00"
    topics: string[]; // bidang yang didalami, tampil sebagai label
    photos: DevactoPhoto[]; // foto pertama tampil paling besar
    works: DevactoWork[];
};

// Karya siswa untuk Galeri Showroom. Karya pertama tampil paling besar
export type ShowcaseItem = {
    title: string;
    by: string;       // kelas pembuat karya, contoh: "Kelas XII RPL 1"
    category: string; // jenis karya, tampil sebagai label di pojok foto
    icon: IconName;   // ditampilkan selama belum ada foto
    image?: string;   // import foto/tangkapan layar karya, contoh: import fotoKasir from "../assets/images/majors/rpl/kasir.png"
};

export type Major = {
    code: string;
    slug: string;
    icon: IconName;
    highlight: string; // bagian nama yang berwarna merah
    rest: string;
    tagline: string; // kalimat singkat di bawah judul hero, diberi coretan bawah
    desc: string;
    focus: MajorTopic[];
    practice: string[]; // gambaran kegiatan praktik di ruang praktik jurusan
    kaprogMessage: string[]; // sambutan kepala program; nama & jabatannya diambil dari data/teachers.ts
    devacto: Devacto; // kegiatan Devacto (pendalaman keahlian setelah jam sekolah) di jurusan ini
    showcase: ShowcaseItem[];
    careers: string[];
    image?: string; // foto siswa (PNG tanpa background paling bagus), contoh: import fotoRPL from "../assets/images/rpl.png"
    heroImage?: string; // foto kegiatan untuk latar hero (ditampilkan blur), kalau kosong pakai foto gedung sekolah
    heroCardImage?: string; // foto kegiatan untuk kartu hero (ditampilkan jelas), kalau kosong pakai foto gedung sekolah
};

// TODO: ganti deskripsi dengan kurikulum asli & tambahkan foto siswa tiap jurusan
// TODO: isi "devacto" masih contoh, ganti dengan cerita & foto kegiatan Devacto yang sebenarnya di tiap jurusan
// TODO: tagline, practice, kaprogMessage, & showcase masih contoh, ganti dengan isi asli & foto karya siswa
export const majors: Major[] = [
    {
        code: "MM",
        slug: "multimedia",
        icon: "camera",
        highlight: "Multimedia",
        rest: "",
        tagline: "Ubah Ide Jadi Karya Visual yang Bercerita",
        desc: "Program yang mempelajari pembuatan konten visual dan digital untuk kebutuhan media, periklanan, dan industri kreatif.",
        focus: [
            { icon: "pen", title: "Desain Grafis", desc: "Membuat logo, poster, dan identitas visual menggunakan software desain standar industri." },
            { icon: "video", title: "Videografi & Editing", desc: "Merekam, menyunting, dan memproduksi video untuk iklan, dokumenter, dan media sosial." },
            { icon: "camera", title: "Fotografi & Animasi", desc: "Teknik fotografi produk serta pembuatan animasi 2D dan 3D." },
        ],
        practice: [
            "Mendesain poster, logo, dan materi promosi untuk klien sungguhan",
            "Memproduksi video, mulai dari menulis naskah, syuting, hingga editing",
            "Memotret produk di studio dengan pencahayaan profesional",
            "Merekam dan menyunting audio di Studio Podcast",
        ],
        kaprogMessage: [
            "Di Multimedia, kreativitas saja tidak cukup. Kami melatih siswa memadukan ide dengan keterampilan teknis dan disiplin kerja, sehingga karya mereka layak dipakai klien sungguhan.",
            "Setiap siswa kami dorong membangun portofolio sejak kelas X. Portofolio inilah yang nanti membuka pintu PKL, pekerjaan, maupun proyek lepas.",
        ],
        devacto: {
            paragraphs: [
                "Di Devacto, siswa Multimedia mendalami desain grafis, ilustrasi digital, dan motion graphic lebih jauh dari materi di kelas. Setiap pertemuan biasanya membahas satu topik, misalnya teknik lighting untuk foto produk atau membuat animasi teks untuk video pendek.",
                "Siswa yang sudah lebih mahir bergantian membagikan trik dan alur kerja mereka, lalu anggota lain langsung mempraktikkannya. Hasil karya dibahas bersama supaya setiap anggota tahu bagian mana yang masih bisa diperbaiki.",
            ],
            schedule: "Selasa & Kamis, 15.30–17.00",
            topics: ["Desain Grafis", "Ilustrasi Digital", "Motion Graphic", "Fotografi Produk"],
            photos: [
                { caption: "Produksi video dengan green screen", image: fotoDevactoMM1 },
                { caption: "Latihan fotografi & editing di workshop", image: fotoDevactoMM2 },
                { caption: "Syuting talk show di studio", image: fotoDevactoMM3 },
            ],
            works: [
                { title: "Poster Kampanye Sekolah", desc: "Seri poster kampanye kebersihan dan anti-perundungan yang dipasang di lingkungan sekolah." },
                { title: "Bumper Video Kegiatan", desc: "Animasi pembuka singkat yang dipakai di setiap video dokumentasi kegiatan sekolah." },
                { title: "Katalog Foto Produk KBS", desc: "Foto produk untuk katalog dan media sosial KBS (Toko Sekolah)." },
            ],
        },
        showcase: [
            { title: "Identitas Visual Kedai Kopi", by: "Kelas XII MM 1", category: "Desain Grafis", icon: "pen", image: showcasePhoto("mm/kedai-kopi.jpg") },
            { title: "Film Pendek \"Pulang\"", by: "Kelas XII MM 2", category: "Video", icon: "video", image: showcasePhoto("mm/film-pendek.jpg") },
            { title: "Foto Produk UMKM Cibinong", by: "Kelas XI MM 1", category: "Fotografi", icon: "camera", image: showcasePhoto("mm/foto-produk.jpg") },
            { title: "Animasi Maskot Sekolah", by: "Kelas XI MM 2", category: "Animasi", icon: "play", image: showcasePhoto("mm/animasi-maskot.jpg") },
            { title: "Poster Hari Pendidikan", by: "Kelas X MM 1", category: "Desain Grafis", icon: "pen", image: showcasePhoto("mm/poster-pendidikan.jpg") },
            { title: "Podcast Cerita Alumni", by: "Kelas XI MM 1", category: "Audio", icon: "headphones", image: showcasePhoto("mm/podcast-alumni.jpg") },
        ],
        careers: ["Desainer Grafis", "Video Editor", "Content Creator", "Fotografer", "Animator", "Motion Designer"],
        image: fotoLandingMM,
        heroImage: fotoKelasMM,
        heroCardImage: fotoHeroCardImageMM,
    },
    {
        code: "RPL",
        slug: "rekayasa-perangkat-lunak",
        icon: "code",
        highlight: "Rekayasa",
        rest: "Perangkat Lunak",
        tagline: "Bangun Aplikasi yang Dipakai Banyak Orang",
        desc: "Program yang mempelajari perancangan dan pembuatan aplikasi, mulai dari logika pemrograman hingga aplikasi yang siap dipakai pengguna.",
        focus: [
            { icon: "monitor", title: "Pengembangan Web", desc: "Membangun website dan aplikasi web yang modern, cepat, dan responsif." },
            { icon: "phone", title: "Aplikasi Mobile", desc: "Membuat aplikasi Android yang fungsional dan mudah digunakan." },
            { icon: "database", title: "Basis Data", desc: "Merancang, mengelola, dan mengamankan database untuk aplikasi." },
        ],
        practice: [
            "Membuat website mulai dari desain tampilan hingga siap dipakai",
            "Membangun aplikasi Android lengkap dengan basis datanya",
            "Bekerja dalam tim memakai Git, seperti di perusahaan perangkat lunak",
            "Menguji aplikasi dan memperbaiki bug sebelum diserahkan ke pengguna",
        ],
        kaprogMessage: [
            "Kami ingin lulusan RPL tidak sekadar bisa menulis kode, tetapi mampu memecahkan masalah nyata dengan teknologi. Karena itu siswa terbiasa mengerjakan proyek untuk pengguna sungguhan sejak kelas XI.",
            "Dunia teknologi berubah sangat cepat. Bekal terpenting yang kami tanamkan adalah kebiasaan belajar mandiri, rasa ingin tahu, dan keberanian untuk bertanya.",
        ],
        devacto: {
            paragraphs: [
                "Di Devacto, siswa RPL mendalami bidang yang paling mereka minati, seperti pengembangan web dan cyber security. Materinya melanjutkan apa yang dipelajari di kelas, misalnya memakai framework web modern atau mencari celah keamanan pada aplikasi.",
                "Kegiatannya berjalan seperti komunitas: siswa yang lebih dulu menguasai suatu topik membagikan ilmunya, lalu anggota lain mencoba langsung dan saling membantu saat menemui error. Anggota juga bisa mengerjakan proyek kecil bersama atau berlatih lewat soal CTF.",
            ],
            schedule: "Senin & Rabu, 15.30–17.30",
            topics: ["Web Development", "Cyber Security", "UI/UX", "Latihan CTF"],
            photos: [
                { caption: "Sesi sharing web development", image: fotoDevactoRPL1 },
                { caption: "Latihan ngoding bareng", image: fotoDevactoRPL2 },
                { caption: "Diskusi proyek bersama", image: fotoDevactoRPL3 },
            ],
            works: [
                { title: "Aplikasi Kasir Koperasi", desc: "Aplikasi kasir berbasis web yang kini dipakai untuk transaksi harian koperasi sekolah." },
                { title: "Website Kegiatan OSIS", desc: "Situs informasi kegiatan dan pendaftaran acara OSIS yang dikelola langsung oleh siswa." },
                { title: "Bank Soal CTF Internal", desc: "Kumpulan soal keamanan siber buatan anggota untuk latihan sebelum mengikuti lomba." },
            ],
        },
        showcase: [
            { title: "Aplikasi Kasir Koperasi", by: "Kelas XI RPL 1", category: "Aplikasi Web", icon: "monitor", image: showcasePhoto("rpl/aplikasi-kasir.jpg") },
            { title: "Aplikasi Presensi QR Code", by: "Kelas XII RPL 1", category: "Aplikasi Mobile", icon: "phone", image: showcasePhoto("rpl/presensi-qr.jpg") },
            { title: "Portal Lowongan BKK", by: "Kelas XII RPL 2", category: "Aplikasi Web", icon: "monitor", image: showcasePhoto("rpl/portal-bkk.jpg") },
            { title: "Desain UI Aplikasi Perpustakaan", by: "Kelas XI RPL 2", category: "UI/UX", icon: "pen", image: showcasePhoto("rpl/ui-perpustakaan.jpg") },
            { title: "Sistem Inventaris Lab", by: "Kelas XII RPL 1", category: "Basis Data", icon: "database", image: showcasePhoto("rpl/inventaris-lab.jpg") },
            { title: "Game Edukasi Matematika", by: "Kelas X RPL 1", category: "Game", icon: "play", image: showcasePhoto("rpl/game-matematika.jpg") },
        ],
        careers: ["Web Developer", "Mobile App Developer", "Software Engineer", "UI/UX Designer", "Software Tester"],
        image: fotoLandingRPL,
        heroImage: fotoKelasRPL,
        heroCardImage: fotoHeroCardImageRPL
    },
    {
        code: "TKJ",
        slug: "teknik-komputer-jaringan",
        icon: "network",
        highlight: "Teknik Komputer",
        rest: "dan Jaringan",
        tagline: "Jaga Koneksi Dunia Tetap Menyala",
        desc: "Program yang mempelajari perakitan komputer, pembangunan jaringan, dan pengelolaan server yang dibutuhkan hampir semua perusahaan.",
        focus: [
            { icon: "network", title: "Instalasi Jaringan", desc: "Merancang dan memasang jaringan LAN, WAN, dan wireless menggunakan Mikrotik dan Cisco." },
            { icon: "server", title: "Administrasi Server", desc: "Mengonfigurasi server Linux dan layanan seperti web, DNS, dan mail server." },
            { icon: "shield", title: "Keamanan Jaringan", desc: "Dasar-dasar mengamankan jaringan dari gangguan dan serangan." },
        ],
        practice: [
            "Memasang dan mengonfigurasi jaringan kabel maupun wireless",
            "Menyambung dan menguji kabel fiber optik",
            "Membangun server Linux untuk layanan web, DNS, dan berbagi file",
            "Merakit, merawat, dan memperbaiki komputer",
        ],
        kaprogMessage: [
            "Hampir semua perusahaan bergantung pada jaringan dan server. Di TKJ, siswa belajar langsung dengan perangkat yang sama seperti di lapangan, mulai dari router Mikrotik hingga alat sambung fiber optik.",
            "Kami juga membiasakan siswa bekerja rapi, teliti, dan mendokumentasikan pekerjaannya, karena itulah yang dicari industri dari seorang teknisi.",
        ],
        devacto: {
            paragraphs: [
                "Di Devacto, siswa TKJ mendalami konfigurasi jaringan dan server lebih jauh dari materi di kelas, misalnya routing dengan Mikrotik, membangun server Linux, dan dasar keamanan jaringan.",
                "Siswa bergantian menjadi pemateri untuk topik yang mereka kuasai, lalu anggota lain mempraktikkannya langsung di lab jaringan atau lewat simulasi. Kalau ada konfigurasi yang gagal, masalahnya dicari dan dipecahkan bersama.",
            ],
            schedule: "Selasa & Jumat, 15.30–17.00",
            topics: ["Routing Mikrotik", "Server Linux", "Keamanan Jaringan", "Fiber Optik"],
            photos: [
                { caption: "Penyambungan kabel fiber optik", image: fotoDevactoTKJ1 },
                { caption: "Pengukuran jaringan fiber optik", image: fotoDevactoTKJ2 },
                { caption: "Merakit & menyolder perangkat", image: fotoDevactoTKJ3 },
            ],
            works: [
                { title: "Wi-Fi Perpustakaan", desc: "Merancang ulang dan memasang titik akses supaya sinyal Wi-Fi merata di seluruh ruang perpustakaan." },
                { title: "Server Ujian Lokal", desc: "Server lokal untuk ujian berbasis komputer agar tidak bergantung pada koneksi internet." },
                { title: "Simulasi Jaringan Kantor", desc: "Topologi jaringan kantor lengkap dengan VLAN dan hotspot, dipakai sebagai bahan latihan LKS." },
            ],
        },
        showcase: [
            { title: "Topologi Jaringan Sekolah", by: "Kelas XII TKJ 1", category: "Jaringan", icon: "network", image: showcasePhoto("tkj/topologi-jaringan.jpg") },
            { title: "Server Web & DNS Lokal", by: "Kelas XII TKJ 2", category: "Server", icon: "server", image: showcasePhoto("tkj/server-dns.jpg") },
            { title: "Instalasi Fiber Optik Lab", by: "Kelas XI TKJ 1", category: "Fiber Optik", icon: "zap", image: showcasePhoto("tkj/fiber-optik.jpg") },
            { title: "Hotspot dengan Voucher Login", by: "Kelas XI TKJ 2", category: "Jaringan", icon: "network", image: showcasePhoto("tkj/hotspot-voucher.jpg") },
            { title: "Firewall Jaringan Lab", by: "Kelas XII TKJ 1", category: "Keamanan", icon: "shield", image: showcasePhoto("tkj/firewall.jpg") },
            { title: "Perakitan PC Lab Komputer", by: "Kelas X TKJ 1", category: "Perakitan", icon: "cpu", image: showcasePhoto("tkj/perakitan-pc.jpg") },
        ],
        careers: ["Network Administrator", "IT Support", "System Administrator", "Teknisi Komputer", "Network Engineer"],
        image: fotoLandingTKJ,
        heroImage: fotoKelasTKJ,
        heroCardImage: fotoHeroCardImageTKJ
    },
    {
        code: "PKM",
        slug: "perbankan-keuangan-mikro",
        icon: "bank",
        highlight: "Perbankan",
        rest: "dan Keuangan Mikro",
        tagline: "Melayani dengan Teliti dan Tepercaya",
        desc: "Program yang mempelajari layanan perbankan, akuntansi, dan operasional lembaga keuangan seperti bank, BPR, dan koperasi.",
        focus: [
            { icon: "user", title: "Layanan Nasabah", desc: "Melayani nasabah secara profesional sebagai teller dan customer service." },
            { icon: "calculator", title: "Akuntansi Keuangan", desc: "Mencatat transaksi dan menyusun laporan keuangan sederhana." },
            { icon: "bank", title: "Operasional Lembaga Keuangan", desc: "Memahami alur kredit, tabungan, dan aplikasi perbankan." },
        ],
        practice: [
            "Melayani nasabah sebagai teller dan customer service di Bank Mini",
            "Mencatat transaksi dan menyusun laporan keuangan dengan aplikasi akuntansi",
            "Mengelola penjualan dan stok barang di KBS (Toko Sekolah)",
            "Simulasi pengajuan dan analisis kredit usaha mikro",
        ],
        kaprogMessage: [
            "Bekerja di lembaga keuangan berarti dipercaya mengelola uang orang lain. Karena itu, di PKM kami menanamkan kejujuran dan ketelitian sama kuatnya dengan keterampilan teknis.",
            "Lewat Bank Mini dan KBS, siswa terbiasa melayani pelanggan sungguhan setiap hari, sehingga lebih percaya diri saat PKL maupun bekerja.",
        ],
        devacto: {
            paragraphs: [
                "Di Devacto, siswa Perbankan dan Keuangan Mikro mendalami akuntansi dengan aplikasi, literasi keuangan, dan keterampilan melayani nasabah.",
                "Kegiatannya diisi diskusi dan simulasi, misalnya berlatih public speaking atau bergantian memerankan teller dan nasabah. Siswa saling memberi masukan supaya lebih percaya diri saat praktik maupun PKL.",
            ],
            schedule: "Rabu & Kamis, 15.30–17.00",
            topics: ["Akuntansi dengan Aplikasi", "Literasi Keuangan", "Pelayanan Prima", "Public Speaking"],
            photos: [
                { caption: "Simulasi layanan teller", image: fotoDevactoPKM1 },
                { caption: "Praktik customer service di Bank Mini", image: fotoDevactoPKM2 },
                { caption: "Latihan melayani nasabah", image: fotoDevactoPKM3 },
            ],
            works: [
                { title: "Kelas Literasi Keuangan", desc: "Materi menabung dan mengatur uang saku yang dibawakan anggota Devacto untuk siswa kelas X." },
                { title: "Laporan Keuangan KBS", desc: "Laporan penjualan bulanan KBS (Toko Sekolah) yang disusun dengan aplikasi akuntansi." },
                { title: "Video Panduan Bank Mini", desc: "Video singkat cara membuka tabungan dan bertransaksi di Bank Mini sekolah." },
            ],
        },
        showcase: [
            { title: "Laporan Keuangan Koperasi", by: "Kelas XII PKM 1", category: "Akuntansi", icon: "calculator", image: showcasePhoto("pkm/laporan-koperasi.jpg") },
            { title: "Simulasi Layanan Teller", by: "Kelas XI PKM 1", category: "Layanan Nasabah", icon: "user", image: showcasePhoto("pkm/layanan-teller.jpg") },
            { title: "Rencana Usaha Mikro", by: "Kelas XII PKM 2", category: "Keuangan Mikro", icon: "briefcase", image: showcasePhoto("pkm/rencana-usaha.jpg") },
            { title: "Kampanye Gemar Menabung", by: "Kelas XI PKM 2", category: "Literasi Keuangan", icon: "bank", image: showcasePhoto("pkm/gemar-menabung.jpg") },
            { title: "Analisis Kredit UMKM", by: "Kelas XII PKM 1", category: "Keuangan Mikro", icon: "calculator", image: showcasePhoto("pkm/analisis-kredit.jpg") },
            { title: "Panduan Produk Tabungan", by: "Kelas X PKM 1", category: "Layanan Nasabah", icon: "book", image: showcasePhoto("pkm/produk-tabungan.jpg") },
        ],
        careers: ["Teller", "Customer Service Bank", "Staf Administrasi Keuangan", "Staf Koperasi", "Staf Akuntansi"],
        image: fotoLandingPKM,
        heroImage: fotoKelasPKM,
        heroCardImage: fotoHeroCardImagePKM
    },
    {
        code: "TOI",
        slug: "teknik-otomasi-industri",
        icon: "cpu",
        highlight: "Teknik Otomasi",
        rest: "Industri",
        tagline: "Kendalikan Mesin, Gerakkan Industri",
        desc: "Program yang mempelajari sistem kendali dan otomasi mesin yang digunakan di pabrik dan industri manufaktur.",
        focus: [
            { icon: "cpu", title: "PLC & Sistem Kendali", desc: "Memprogram PLC untuk mengendalikan mesin dan jalur produksi otomatis." },
            { icon: "zap", title: "Listrik Industri", desc: "Instalasi dan perawatan sistem kelistrikan di lingkungan industri." },
            { icon: "monitor", title: "Sensor & Pneumatik", desc: "Merangkai sensor, aktuator, dan sistem pneumatik untuk otomasi." },
        ],
        practice: [
            "Memprogram PLC untuk menjalankan mesin secara otomatis",
            "Merangkai panel listrik dan instalasi motor industri",
            "Merakit sistem sensor, aktuator, dan pneumatik",
            "Merawat dan mencari kerusakan pada perangkat otomasi",
        ],
        kaprogMessage: [
            "Industri manufaktur semakin bergantung pada mesin otomatis, dan kebutuhan teknisi yang memahaminya terus bertambah. Di TOI, siswa belajar merancang, memprogram, dan merawat sistem otomasi tersebut.",
            "Keselamatan kerja selalu menjadi yang utama. Siswa terbiasa bekerja sesuai prosedur sejak praktik pertama di bengkel.",
        ],
        devacto: {
            paragraphs: [
                "Di Devacto, siswa Teknik Otomasi Industri mendalami pemrograman PLC, mikrokontroler seperti Arduino, dan dasar-dasar IoT.",
                "Anggota saling berbagi cara merangkai dan memprogram perangkat, lalu mencobanya bersama dalam proyek kecil, misalnya sistem otomatis sederhana yang bisa dipantau dari ponsel.",
            ],
            schedule: "Senin & Kamis, 15.30–17.00",
            topics: ["Pemrograman PLC", "Arduino", "Internet of Things", "Pneumatik"],
            photos: [
                { caption: "Praktik di lab otomasi industri", image: fotoDevactoTOI1 },
                { caption: "Praktik instalasi listrik", image: fotoDevactoTOI2 },
                { caption: "Merakit & memprogram drone", image: fotoDevactoTOI3 },
            ],
            works: [
                { title: "Robot Penyortir Barang", desc: "Prototipe penyortir otomatis berbasis PLC dengan sensor warna dan pendorong pneumatik." },
                { title: "Penyiram Tanaman Otomatis", desc: "Sistem berbasis Arduino yang menyiram sendiri saat tanah kering dan bisa dipantau dari ponsel." },
                { title: "Pemantau Listrik Bengkel", desc: "Alat IoT sederhana untuk memantau pemakaian listrik di bengkel praktik." },
            ],
        },
        showcase: [
            { title: "Robot Penyortir Barang", by: "Kelas XII TOI 1", category: "PLC", icon: "cpu", image: showcasePhoto("toi/robot-penyortir.jpg") },
            { title: "Panel Kontrol Motor 3 Fasa", by: "Kelas XI TOI 1", category: "Listrik Industri", icon: "zap", image: showcasePhoto("toi/panel-motor.jpg") },
            { title: "Smart Home Berbasis IoT", by: "Kelas XII TOI 1", category: "IoT", icon: "phone", image: showcasePhoto("toi/smart-home-iot.jpg") },
            { title: "Lengan Pneumatik Sederhana", by: "Kelas XI TOI 1", category: "Pneumatik", icon: "factory", image: showcasePhoto("toi/lengan-pneumatik.jpg") },
            { title: "Lampu Lalu Lintas PLC", by: "Kelas X TOI 1", category: "PLC", icon: "cpu", image: showcasePhoto("toi/lampu-lalu-lintas.jpg") },
            { title: "Pengukur Suhu Ruang", by: "Kelas X TOI 1", category: "IoT", icon: "monitor", image: showcasePhoto("toi/pengukur-suhu.jpg") },
        ],
        careers: ["Teknisi Otomasi", "Teknisi Listrik Industri", "Operator Mesin Produksi", "Maintenance Engineer"],
        image: fotoLandingTOI,
        heroImage: fotoKelasTOI,
        heroCardImage: fotoHeroCardImageTOI
    },
];
