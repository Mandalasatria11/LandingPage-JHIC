import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import AdminIcon from "../../components/AdminIcon";
import ConfirmDialog from "../../components/ConfirmDialog";
import PageHeader from "../../components/PageHeader";
import PanelState from "../../components/PanelState";
import StatusBadge from "../../components/StatusBadge";
import Thumbnail from "../../components/Thumbnail";
import { buttonPrimary, buttonSecondary, cardClass, iconButton, inputClass } from "../../components/ui";
import { useToast } from "../../toast/toast-context";
import { formatDateTime, useDocumentTitle } from "../../lib/format";
import { newsCategories, type News } from "../../../data/news";
import { ApiError, apiRequest, type Paginated } from "../../../lib/api";
import { invalidateApiCache, useApi } from "../../../lib/useApi";

const statusOptions = [
    { value: "", label: "Semua status" },
    { value: "published", label: "Terbit" },
    { value: "scheduled", label: "Terjadwal" },
    { value: "draft", label: "Draf" },
];

// Filter & halaman disimpan di alamat (?search=&category=&status=&page=), jadi tetap sama setelah kembali dari form edit
export default function NewsListPage() {
    useDocumentTitle("Berita");
    const toast = useToast();
    const [params, setParams] = useSearchParams();
    const search = params.get("search") ?? "";
    const category = params.get("category") ?? "";
    const status = params.get("status") ?? "";
    const page = Math.max(1, Number(params.get("page")) || 1);

    const [searchInput, setSearchInput] = useState(search);
    const [pendingDelete, setPendingDelete] = useState<News | null>(null);
    const [deleting, setDeleting] = useState(false);

    const updateParams = (changes: Record<string, string>) => {
        setParams((current) => {
            const next = new URLSearchParams(current);
            for (const [key, value] of Object.entries(changes)) {
                if (value) next.set(key, value);
                else next.delete(key);
            }
            return next;
        }, { replace: true });
    };

    // Pencarian dijalankan 400 ms setelah berhenti mengetik, bukan di setiap huruf
    useEffect(() => {
        if (searchInput.trim() === search) return;
        const timer = window.setTimeout(() => {
            setParams((current) => {
                const next = new URLSearchParams(current);
                if (searchInput.trim()) next.set("search", searchInput.trim());
                else next.delete("search");
                next.delete("page");
                return next;
            }, { replace: true });
        }, 400);
        return () => window.clearTimeout(timer);
    }, [searchInput, search, setParams]);

    const query = new URLSearchParams({ page: String(page) });
    if (search) query.set("search", search);
    if (category) query.set("category", category);
    if (status) query.set("status", status);
    const { data, error, reload } = useApi<Paginated<News>>(`/admin/news?${query}`);

    const filtered = Boolean(search || category || status);

    const confirmDelete = async () => {
        if (!pendingDelete) return;
        setDeleting(true);
        try {
            await apiRequest(`/admin/news/${pendingDelete.id}`, { method: "DELETE" });
            invalidateApiCache();
            toast.success(`Berita "${pendingDelete.title}" dihapus.`);
            setPendingDelete(null);
            // Halaman terakhir jadi kosong setelah berita terakhirnya dihapus, mundur satu halaman
            if (data && data.data.length === 1 && page > 1) updateParams({ page: String(page - 1) });
        } catch (err) {
            toast.error(err instanceof ApiError ? err.message : "Gagal menghapus berita.");
        } finally {
            setDeleting(false);
        }
    };

    return(
        <>
            <PageHeader
                title="Berita"
                description="Berita yang terbit tampil di beranda dan halaman Berita. Draf hanya terlihat di sini."
                actions={
                    <Link to="/admin/berita/baru" className={buttonPrimary}>
                        <AdminIcon name="plus" className="w-4 h-4" />
                        Tulis Berita
                    </Link>
                }
            />

            <div className="mb-4 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
                <div className="relative">
                    <AdminIcon name="search" className="pointer-events-none absolute left-3.5 top-1/2 w-4 h-4 -translate-y-1/2 text-brand-ink/40" />
                    <input
                        type="search"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Cari judul atau isi pembuka"
                        aria-label="Cari berita"
                        className={`${inputClass} pl-10`}
                    />
                </div>
                <select
                    value={category}
                    onChange={(e) => updateParams({ category: e.target.value, page: "" })}
                    aria-label="Filter kategori"
                    className={inputClass}
                >
                    <option value="">Semua kategori</option>
                    {newsCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <select
                    value={status}
                    onChange={(e) => updateParams({ status: e.target.value, page: "" })}
                    aria-label="Filter status"
                    className={inputClass}
                >
                    {statusOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
            </div>

            {!data ? (
                <PanelState error={error} onRetry={reload} label="Memuat berita" />
            ) : data.data.length === 0 ? (
                <div className={`${cardClass} px-6 py-16 text-center`}>
                    <p className="text-sm text-brand-ink/60">{filtered ? "Tidak ada berita yang cocok dengan filter." : "Belum ada berita."}</p>
                    {filtered ? (
                        <button type="button" onClick={() => { setSearchInput(""); setParams({}, { replace: true }); }} className={`${buttonSecondary} mt-4`}>
                            Hapus Filter
                        </button>
                    ) : (
                        <Link to="/admin/berita/baru" className={`${buttonPrimary} mt-4`}>Tulis Berita Pertama</Link>
                    )}
                </div>
            ) : (
                <div className={cardClass}>
                    <ul className="divide-y divide-brand-ink/10">
                        {data.data.map((news) => (
                            <li key={news.id} className="flex items-center gap-3 px-4 py-3 sm:gap-4 sm:px-5">
                                <span className="hidden sm:block"><Thumbnail src={news.image} className="h-14 w-20" /></span>
                                <div className="min-w-0 flex-1">
                                    <Link to={`/admin/berita/${news.id}`} className="line-clamp-2 text-sm font-semibold hover:text-brand-darkred">
                                        {news.title}
                                    </Link>
                                    <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-brand-ink/55">
                                        <StatusBadge status={news.status} />
                                        <span>{news.category}</span>
                                        <span aria-hidden="true">·</span>
                                        <time dateTime={news.date}>{formatDateTime(news.date)}</time>
                                    </div>
                                </div>
                                <div className="flex shrink-0 items-center">
                                    {news.status === "published" && (
                                        <a href={`/berita/${news.slug}`} target="_blank" rel="noreferrer" aria-label={`Lihat "${news.title}" di situs`} title="Lihat di situs" className={iconButton}>
                                            <AdminIcon name="external" className="w-4 h-4" />
                                        </a>
                                    )}
                                    <Link to={`/admin/berita/${news.id}`} aria-label={`Edit "${news.title}"`} title="Edit" className={iconButton}>
                                        <AdminIcon name="pencil" className="w-4 h-4" />
                                    </Link>
                                    <button type="button" onClick={() => setPendingDelete(news)} aria-label={`Hapus "${news.title}"`} title="Hapus" className={`${iconButton} hover:bg-brand-signal/10 hover:text-brand-signal`}>
                                        <AdminIcon name="trash" className="w-4 h-4" />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-brand-ink/10 px-4 py-3 sm:px-5">
                        <p className="text-xs text-brand-ink/55">
                            Menampilkan {data.meta.from}–{data.meta.to} dari {data.meta.total} berita
                        </p>
                        {data.meta.last_page > 1 && (
                            <div className="flex items-center gap-2">
                                <button type="button" disabled={page <= 1} onClick={() => updateParams({ page: String(page - 1) })} className={`${buttonSecondary} px-3 py-1.5 text-xs`}>
                                    <AdminIcon name="chevronLeft" className="w-4 h-4" /> Sebelumnya
                                </button>
                                <span className="text-xs font-medium text-brand-ink/60">{data.meta.current_page} / {data.meta.last_page}</span>
                                <button type="button" disabled={page >= data.meta.last_page} onClick={() => updateParams({ page: String(page + 1) })} className={`${buttonSecondary} px-3 py-1.5 text-xs`}>
                                    Berikutnya <AdminIcon name="chevronRight" className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <ConfirmDialog
                open={pendingDelete !== null}
                title="Hapus berita ini?"
                message={`"${pendingDelete?.title ?? ""}" beserta fotonya akan dihapus permanen dan tidak bisa dikembalikan.`}
                busy={deleting}
                onConfirm={confirmDelete}
                onCancel={() => setPendingDelete(null)}
            />
        </>
    )
}
