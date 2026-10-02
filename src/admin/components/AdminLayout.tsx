import { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import AdminIcon, { type AdminIconName } from "./AdminIcon";
import { useAuth } from "../auth/auth-context";
import logoSekolah from "../../assets/images/logosmkpenus.png";

const navItems: { to: string; label: string; icon: AdminIconName; end?: boolean }[] = [
    { to: "/admin", label: "Dasbor", icon: "dashboard", end: true },
    { to: "/admin/berita", label: "Berita", icon: "news" },
    { to: "/admin/program", label: "Program Unggulan", icon: "star" },
    { to: "/admin/fasilitas", label: "Fasilitas", icon: "building" },
    { to: "/admin/akun", label: "Akun", icon: "user" },
];

// Kerangka semua halaman admin: sidebar di desktop, bar atas + menu geser di HP & tablet.
// text-left: body situs diset rata kiri-kanan, panel admin tidak
export default function AdminLayout() {
    const [menuOpen, setMenuOpen] = useState(false);

    // Menu geser ditutup dengan Escape, dan halaman di belakangnya tidak ikut tergulir
    useEffect(() => {
        if (!menuOpen) return;
        const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
        document.addEventListener("keydown", onKeyDown);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    return(
        <div className="min-h-svh bg-brand-softmist/50 text-left text-brand-ink lg:grid lg:grid-cols-[16rem_1fr]">
            <aside className="hidden lg:block">
                <div className="sticky top-0 h-svh">
                    <Sidebar />
                </div>
            </aside>

            {/* Bar atas di HP & tablet */}
            <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-brand-ink/10 bg-white/90 px-4 py-3 backdrop-blur lg:hidden">
                <Link to="/admin" className="flex items-center gap-2.5">
                    <img src={logoSekolah} alt="" className="h-9 w-9 object-contain" />
                    <span className="font-display text-base font-bold uppercase tracking-wide">Panel Admin</span>
                </Link>
                <button
                    type="button"
                    onClick={() => setMenuOpen(true)}
                    aria-label="Buka menu"
                    aria-expanded={menuOpen}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-brand-ink hover:bg-brand-softmist"
                >
                    <AdminIcon name="menu" className="w-6 h-6" />
                </button>
            </header>

            {menuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu admin">
                    <div className="absolute inset-0 bg-brand-ink/50 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
                    <div className="absolute inset-y-0 left-0 w-72 max-w-[85%] animate-fade-up shadow-2xl">
                        <Sidebar onNavigate={() => setMenuOpen(false)} />
                        <button
                            type="button"
                            onClick={() => setMenuOpen(false)}
                            aria-label="Tutup menu"
                            className="absolute right-3 top-4 flex h-9 w-9 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white"
                        >
                            <AdminIcon name="close" className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}

            <main className="min-w-0 px-4 py-6 sm:px-6 md:py-8 lg:px-10 lg:py-10">
                <div className="mx-auto max-w-6xl">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
    const { user, logout } = useAuth();

    return(
        <div className="flex h-full flex-col bg-brand-ink text-white">
            <Link to="/admin" onClick={onNavigate} className="flex items-center gap-3 px-6 pt-6 pb-8">
                <img src={logoSekolah} alt="" className="h-11 w-11 object-contain" />
                <span className="leading-tight">
                    <span className="block font-display text-base font-bold uppercase tracking-wide">Panel Admin</span>
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-brand-mist/60">SMK Plus Pelita Nusantara</span>
                </span>
            </Link>

            <nav aria-label="Menu admin" className="flex-1 overflow-y-auto px-3">
                <ul className="space-y-1">
                    {navItems.map((item) => (
                        <li key={item.to}>
                            <NavLink
                                to={item.to}
                                end={item.end}
                                onClick={onNavigate}
                                className={({ isActive }) =>
                                    `relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                                        isActive ? "bg-white/10 text-white" : "text-brand-mist/70 hover:bg-white/5 hover:text-white"
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && <span aria-hidden="true" className="absolute inset-y-2 left-0 w-1 rounded-full bg-brand-warmred" />}
                                        <AdminIcon name={item.icon} className="w-5 h-5" />
                                        {item.label}
                                    </>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="border-t border-white/10 p-3">
                <a
                    href="/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-brand-mist/70 transition-colors hover:bg-white/5 hover:text-white"
                >
                    <AdminIcon name="globe" className="w-5 h-5" />
                    Lihat Situs
                    <AdminIcon name="external" className="ml-auto w-4 h-4" />
                </a>

                <div className="mt-2 flex items-center gap-3 rounded-xl bg-white/5 px-3 py-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-darkred text-sm font-semibold uppercase">
                        {user?.name.charAt(0) ?? "A"}
                    </span>
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">{user?.name}</p>
                        <p className="truncate text-xs text-brand-mist/60">{user?.email}</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => void logout()}
                        aria-label="Keluar"
                        title="Keluar"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-brand-mist/70 transition-colors hover:bg-white/10 hover:text-white"
                    >
                        <AdminIcon name="logout" className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}
