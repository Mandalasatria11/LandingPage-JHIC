import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import Icon, { type IconName } from "./Icon";
import { navItems, ppdbLink } from "../data/navigation";
import { majors } from "../data/majors";
import logoSekolah from "../assets/images/logosmkpenus.png";

// Halaman jurusan tidak diulang karena sudah punya kolom sendiri
const footerLinks = [...navItems, ppdbLink]
    .flatMap((item) => ("links" in item ? item.links : [item]))
    .filter((link) => !link.href.startsWith("/jurusan/"));

// TODO: ganti dengan alamat & kontak asli sekolah
const contacts: { icon: IconName; label: string; value: string; href?: string }[] = [
    { icon: "mapPin", label: "Alamat", value: "Jl. Pendidikan No. 1, Indonesia" },
    { icon: "phone", label: "WhatsApp", value: "0812-3456-7890", href: "https://wa.me/6281234567890" },
    { icon: "mail", label: "Email", value: "info@pelitanusantara.sch.id", href: "mailto:info@pelitanusantara.sch.id" },
    { icon: "clock", label: "Jam layanan", value: "Senin – Jumat, 07.00 – 15.00 WIB" },
];

// TODO: isi dengan link akun resmi sekolah
const socials: { icon: IconName; label: string; href: string }[] = [
    { icon: "instagram", label: "Instagram", href: "#" },
    { icon: "youtube", label: "YouTube", href: "#" },
    { icon: "tiktok", label: "TikTok", href: "#" },
    { icon: "facebook", label: "Facebook", href: "#" },
];

export default function Footer() {
    const scrollToTop = () => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    };

    return(
        // "relative z-10" + background supaya menutupi video hero yang sticky
        <footer className="relative z-10 overflow-hidden bg-brand-deepred text-brand-mist px-6 pt-16 md:pt-20">
            {/* Dekorasi titik-titik */}
            <div aria-hidden="true" className="pointer-events-none absolute right-6 top-10 hidden md:block w-40 h-28 bg-[radial-gradient(circle,rgb(255_255_255/0.1)_2px,transparent_2.5px)] bg-size-[22px_22px]" />

            <div className="relative max-w-6xl mx-auto">
                <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-[1.5fr_1fr_1.2fr_1.5fr] lg:gap-10">
                    {/* Identitas sekolah */}
                    <div className="col-span-2 md:col-span-3 lg:col-span-1">
                        <Link to="/" className="group inline-flex items-center gap-3">
                            <span className="w-14 h-14 shrink-0 rounded-full bg-white p-2 shadow-softpill transition-transform group-hover:scale-105">
                                <img src={logoSekolah} alt="" className="w-full h-full object-contain" loading="lazy" />
                            </span>
                            <span className="flex flex-col">
                                <span className="font-display text-base font-bold uppercase tracking-wide leading-tight text-white">SMK PLUS PELITA NUSANTARA</span>
                                <span className="mt-0.5 text-[10px] uppercase font-semibold tracking-wider text-brand-mist/70">
                                    We Are Different
                                </span>
                            </span>
                        </Link>

                        <p className="mt-6 max-w-sm text-sm leading-relaxed text-brand-mist/75">
                            Sekolah Menengah Kejuruan yang mencetak lulusan terampil, berkarakter, dan siap bersaing
                            di dunia kerja maupun wirausaha.
                        </p>

                        <ul className="mt-6 flex gap-3" aria-label="Media sosial">
                            {socials.map((social) => (
                                <li key={social.label}>
                                    <a
                                        href={social.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={social.label}
                                        className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center transition-colors hover:bg-brand-warmred"
                                    >
                                        <Icon name={social.icon} className="w-5 h-5" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <nav aria-label="Navigasi footer">
                        <FooterHeading>Navigasi</FooterHeading>
                        <ul className="mt-6 space-y-3">
                            {footerLinks.map((link) => (
                                <li key={link.href}>
                                    <FooterLink to={link.href} external={link.external}>{link.label}</FooterLink>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div>
                        <FooterHeading>Jurusan</FooterHeading>
                        <ul className="mt-6 space-y-3">
                            {majors.map((major) => (
                                <li key={major.code}>
                                    <FooterLink to={`/jurusan/${major.slug}`}>
                                        {`${major.highlight} ${major.rest}`.trim()}
                                    </FooterLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-span-2 md:col-span-1">
                        <FooterHeading>Hubungi Kami</FooterHeading>
                        <address className="mt-6 not-italic">
                            <ul className="space-y-4">
                                {contacts.map((contact) => {
                                    const content = (
                                        <>
                                            <span className="w-9 h-9 shrink-0 rounded-lg bg-white/10 text-white flex items-center justify-center transition-colors group-hover:bg-brand-warmred">
                                                <Icon name={contact.icon} className="w-[18px] h-[18px]" />
                                            </span>
                                            <span className="pt-2 text-sm leading-snug text-brand-mist/85 [overflow-wrap:anywhere]">
                                                <span className="sr-only">{contact.label}: </span>
                                                {contact.value}
                                            </span>
                                        </>
                                    );

                                    return(
                                        <li key={contact.label}>
                                            {contact.href ? (
                                                <a href={contact.href} className="group flex gap-3 transition-colors hover:text-white">
                                                    {content}
                                                </a>
                                            ) : (
                                                <div className="flex gap-3">{content}</div>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </address>
                    </div>
                </div>

                <div className="mt-14 md:mt-16 flex flex-col-reverse items-center gap-4 border-t border-white/10 py-6 sm:flex-row sm:justify-between">
                    <p className="text-center text-xs sm:text-sm text-brand-mist/65">
                        &copy; {new Date().getFullYear()} SMK Plus Pelita Nusantara. Seluruh hak cipta dilindungi.
                    </p>

                    <button
                        type="button"
                        onClick={scrollToTop}
                        className="group inline-flex items-center gap-3 text-sm font-semibold text-brand-mist/80 transition-colors hover:text-white"
                    >
                        Kembali ke atas
                        <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center transition-colors group-hover:bg-brand-warmred">
                            <svg className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <path d="M12 19V5M6 11l6-6 6 6" />
                            </svg>
                        </span>
                    </button>
                </div>
            </div>

            {/* Tulisan besar di dasar footer, sengaja terpotong */}
            <p aria-hidden="true" className="pointer-events-none select-none -mx-6 -mb-[0.12em] text-center font-display text-[11vw] font-bold uppercase tracking-wide leading-none whitespace-nowrap text-white/[0.06]">
                Pelita Nusantara
            </p>
        </footer>
    )
}

function FooterHeading({ children }: { children: ReactNode }) {
    return(
        <h2 className="font-display text-lg font-bold uppercase tracking-wide text-white">
            {children}
            <span className="mt-1 block h-1 w-8 bg-brand-warmred" aria-hidden="true" />
        </h2>
    )
}

function FooterLink({ to, external, children }: { to: string; external?: boolean; children: ReactNode }) {
    return(
        <Link to={to} reloadDocument={external} className="group inline-flex items-center text-sm text-brand-mist/75 transition-colors hover:text-white">
            <span className="h-px w-0 bg-brand-warmred transition-all duration-300 group-hover:w-3 group-hover:mr-2" aria-hidden="true" />
            {children}
        </Link>
    )
}
