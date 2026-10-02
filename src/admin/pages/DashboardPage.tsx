import { Link } from "react-router-dom";
import { useAuth } from "../auth/auth-context";
import AdminIcon, { type AdminIconName } from "../components/AdminIcon";
import PageHeader from "../components/PageHeader";
import PanelState from "../components/PanelState";
import StatusBadge from "../components/StatusBadge";
import Thumbnail from "../components/Thumbnail";
import { buttonPrimary, buttonSecondary, cardClass } from "../components/ui";
import { formatDateTime, useDocumentTitle } from "../lib/format";
import type { News } from "../../data/news";
import type { Resource } from "../../lib/api";
import { useApi } from "../../lib/useApi";

type Dashboard = {
    news: { total: number; published: number; scheduled: number; draft: number };
    programs: number;
    facilities: number;
    recent_news: News[];
};

export default function DashboardPage() {
    useDocumentTitle("Dasbor");
    const { user } = useAuth();
    const { data, error, reload } = useApi<Resource<Dashboard>>("/admin/dashboard");
    const stats = data?.data;

    return(
        <>
            <PageHeader
                title={`Halo, ${user?.name ?? "Admin"}`}
                description="Ringkasan konten situs sekolah. Perubahan yang Anda simpan langsung tampil di situs."
                actions={
                    <Link to="/admin/berita/baru" className={buttonPrimary}>
                        <AdminIcon name="plus" className="w-4 h-4" />
                        Tulis Berita
                    </Link>
                }
            />

            {!stats ? (
                <PanelState error={error} onRetry={reload} label="Memuat ringkasan" />
            ) : (
                <div className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        <StatCard to="/admin/berita" icon="news" label="Berita" value={stats.news.total}
                            detail={`${stats.news.published} terbit · ${stats.news.scheduled} terjadwal · ${stats.news.draft} draf`} />
                        <StatCard to="/admin/berita?status=draft" icon="pencil" label="Draf Berita" value={stats.news.draft}
                            detail="Belum tampil di situs" />
                        <StatCard to="/admin/program" icon="star" label="Program Unggulan" value={stats.programs}
                            detail="Tampil di carousel beranda" />
                        <StatCard to="/admin/fasilitas" icon="building" label="Fasilitas" value={stats.facilities}
                            detail="Ruang praktik & sarana penunjang" />
                    </div>

                    <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
                        {/* min-w-0: judul berita panjang (truncate) tidak boleh melebarkan kolom grid */}
                        <section className={`${cardClass} min-w-0`} aria-labelledby="recent-news">
                            <div className="flex items-center justify-between gap-4 border-b border-brand-ink/10 px-5 py-4">
                                <h2 id="recent-news" className="font-semibold">Berita Terakhir Diubah</h2>
                                <Link to="/admin/berita" className="text-sm font-semibold text-brand-darkred hover:underline">Lihat semua</Link>
                            </div>
                            {stats.recent_news.length === 0 ? (
                                <p className="px-5 py-10 text-center text-sm text-brand-ink/55">Belum ada berita.</p>
                            ) : (
                                <ul className="divide-y divide-brand-ink/10">
                                    {stats.recent_news.map((news) => (
                                        <li key={news.id}>
                                            <Link to={`/admin/berita/${news.id}`} className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-brand-softmist/50">
                                                <Thumbnail src={news.image} />
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-sm font-semibold">{news.title}</p>
                                                    <p className="mt-0.5 text-xs text-brand-ink/55">{news.category} · {formatDateTime(news.date)}</p>
                                                </div>
                                                <StatusBadge status={news.status} />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </section>

                        <section className={`${cardClass} p-5`} aria-labelledby="quick-actions">
                            <h2 id="quick-actions" className="font-semibold">Tambah Konten</h2>
                            <div className="mt-4 grid gap-2">
                                <Link to="/admin/berita/baru" className={`${buttonSecondary} justify-start`}>
                                    <AdminIcon name="news" className="w-4 h-4 text-brand-darkred" /> Berita baru
                                </Link>
                                <Link to="/admin/program/baru" className={`${buttonSecondary} justify-start`}>
                                    <AdminIcon name="star" className="w-4 h-4 text-brand-darkred" /> Program unggulan baru
                                </Link>
                                <Link to="/admin/fasilitas/baru" className={`${buttonSecondary} justify-start`}>
                                    <AdminIcon name="building" className="w-4 h-4 text-brand-darkred" /> Fasilitas baru
                                </Link>
                            </div>
                        </section>
                    </div>
                </div>
            )}
        </>
    )
}

function StatCard({ to, icon, label, value, detail }: { to: string; icon: AdminIconName; label: string; value: number; detail: string }) {
    return(
        <Link to={to} className={`${cardClass} group block p-5 transition-shadow hover:shadow-md`}>
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-brand-ink/60">{label}</p>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-darkred/10 text-brand-darkred transition-colors group-hover:bg-brand-darkred group-hover:text-white">
                    <AdminIcon name={icon} className="w-4 h-4" />
                </span>
            </div>
            <p className="mt-3 font-display text-4xl font-bold tracking-wide">{value}</p>
            <p className="mt-1 text-xs text-brand-ink/55">{detail}</p>
        </Link>
    )
}
