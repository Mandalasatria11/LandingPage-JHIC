import { majors } from "./majors";
import { ppdbLink, type MenuLink } from "./navigation";

export type Faq = {
    question: string;
    answer: string;
    link?: MenuLink; // tautan lanjutan di bawah jawaban
};

const majorNames = majors.map((major) => `${major.highlight} ${major.rest}`.trim());

// TODO: cocokkan jawaban dengan kebijakan terbaru sekolah (terutama biaya & asrama) setiap tahun ajaran
export const faqs: Faq[] = [
    {
        question: "Bagaimana cara mendaftar di SMK Plus Pelita Nusantara?",
        answer: "Pendaftaran dilakukan secara online melalui halaman PPDB. Isi formulir, unggah berkas yang diminta, lalu pantau status pendaftaran dan pengumuman seleksi menggunakan NISN calon siswa.",
        link: { label: "Buka Formulir PPDB", href: ppdbLink.href, external: true },
    },
    {
        question: "Jurusan apa saja yang tersedia?",
        answer: `Tersedia ${majors.length} kompetensi keahlian: ${majorNames.join(", ")}. Setiap jurusan memiliki ruang praktik sendiri dengan peralatan standar industri.`,
    },
    {
        question: "Apakah sekolah sudah terakreditasi?",
        answer: "Sudah. SMK Plus Pelita Nusantara terakreditasi A dari BAN-PDM dengan SK No. 104/BAN-PDM/SK/2024 yang berlaku hingga 2029.",
        link: { label: "Lihat Profil Sekolah", href: "/tentang" },
    },
    {
        question: "Berapa biaya sekolah di SMK Plus Pelita Nusantara?",
        answer: "Rincian biaya pendaftaran dan SPP diumumkan setiap tahun ajaran di halaman PPDB. Untuk informasi terbaru, orang tua dapat menghubungi panitia PPDB melalui WhatsApp.",
    },
    {
        question: "Apakah tersedia asrama untuk siswa dari luar daerah?",
        answer: "Ya. Informasi fasilitas, kapasitas, dan ketentuan tinggal di asrama dapat dilihat pada halaman Akomodasi & Asrama di situs PPDB.",
        link: { label: "Detail Akomodasi & Asrama", href: `${ppdbLink.href}/akomodasi`, external: true },
    },
    {
        question: "Apakah siswa mendapat kesempatan PKL dan bantuan mencari kerja?",
        answer: "Setiap siswa menjalani Praktik Kerja Lapangan (PKL) di perusahaan mitra. Setelah lulus, Bursa Kerja Khusus (BKK) sekolah membantu menyalurkan alumni ke lowongan dari industri mitra.",
        link: { label: "Kunjungi BKK", href: "/bkk", external: true },
    },
    {
        question: "Apakah lulusan SMK bisa melanjutkan kuliah?",
        answer: "Bisa. Lulusan SMK dapat melanjutkan ke perguruan tinggi melalui jalur SNBP, SNBT, maupun seleksi mandiri, dengan bekal sertifikat kompetensi yang menjadi nilai tambah.",
    },
];
