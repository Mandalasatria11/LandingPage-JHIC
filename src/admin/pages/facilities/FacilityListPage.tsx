import { useState } from "react";
import { Link } from "react-router-dom";
import AdminIcon from "../../components/AdminIcon";
import ConfirmDialog from "../../components/ConfirmDialog";
import PageHeader from "../../components/PageHeader";
import PanelState from "../../components/PanelState";
import Thumbnail from "../../components/Thumbnail";
import { buttonPrimary, cardClass, iconButton } from "../../components/ui";
import { useToast } from "../../toast/toast-context";
import { useDocumentTitle } from "../../lib/format";
import { facilityCategoryLabels, type Facility, type FacilityCategory } from "../../../data/facilities";
import { ApiError, apiRequest, type Resource } from "../../../lib/api";
import { invalidateApiCache, setApiCache, useApi } from "../../../lib/useApi";

const categories: FacilityCategory[] = ["praktik", "penunjang"];

const categoryDescriptions: Record<FacilityCategory, string> = {
    praktik: "Tampil bergantian foto & keterangan di halaman Fasilitas, dan di halaman jurusan yang memakainya.",
    penunjang: "Tampil sebagai kartu di bagian Sarana Penunjang halaman Fasilitas.",
};

export default function FacilityListPage() {
    useDocumentTitle("Fasilitas");
    const toast = useToast();
    const { data, error, reload } = useApi<Resource<Facility[]>>("/admin/facilities");
    const [pendingDelete, setPendingDelete] = useState<Facility | null>(null);
    const [deleting, setDeleting] = useState(false);
    const [reordering, setReordering] = useState(false);
    const facilities = data?.data;

    const groups = categories.map((category) => ({
        category,
        items: (facilities ?? []).filter((facility) => facility.category === category),
    }));

    // Urutan hanya berarti di dalam kategori yang sama, jadi daftar dikirim per kategori berurutan
    const move = async (category: FacilityCategory, index: number, offset: number) => {
        const ordered = groups.map((group) => {
            const ids = group.items.map((facility) => facility.id);
            if (group.category === category) [ids[index], ids[index + offset]] = [ids[index + offset], ids[index]];
            return ids;
        }).flat();

        setReordering(true);
        try {
            const reordered = await apiRequest<Resource<Facility[]>>("/admin/facilities/reorder", { method: "POST", body: { ids: ordered } });
            invalidateApiCache();
            setApiCache("/admin/facilities", reordered);
        } catch (err) {
            toast.error(err instanceof ApiError ? err.message : "Gagal mengubah urutan.");
        } finally {
            setReordering(false);
        }
    };

    const confirmDelete = async () => {
        if (!pendingDelete) return;
        setDeleting(true);
        try {
            await apiRequest(`/admin/facilities/${pendingDelete.id}`, { method: "DELETE" });
            invalidateApiCache();
            toast.success(`Fasilitas "${pendingDelete.title}" dihapus.`);
            setPendingDelete(null);
        } catch (err) {
            toast.error(err instanceof ApiError ? err.message : "Gagal menghapus fasilitas.");
        } finally {
            setDeleting(false);
        }
    };

    return(
        <>
            <PageHeader
                title="Fasilitas"
                description="Fasilitas yang punya foto juga tampil di slider beranda, dengan foto pertama sebagai sampul."
                actions={
                    <Link to="/admin/fasilitas/baru" className={buttonPrimary}>
                        <AdminIcon name="plus" className="w-4 h-4" />
                        Tambah Fasilitas
                    </Link>
                }
            />

            {!facilities ? (
                <PanelState error={error} onRetry={reload} label="Memuat fasilitas" />
            ) : (
                <div className="space-y-8">
                    {groups.map((group) => (
                        <section key={group.category} aria-labelledby={`group-${group.category}`}>
                            <div className="mb-3">
                                <h2 id={`group-${group.category}`} className="font-semibold">
                                    {facilityCategoryLabels[group.category]} <span className="font-normal text-brand-ink/50">({group.items.length})</span>
                                </h2>
                                <p className="mt-0.5 text-xs text-brand-ink/55">{categoryDescriptions[group.category]}</p>
                            </div>

                            {group.items.length === 0 ? (
                                <p className={`${cardClass} px-6 py-10 text-center text-sm text-brand-ink/55`}>Belum ada fasilitas di kategori ini.</p>
                            ) : (
                                <ol className={`${cardClass} divide-y divide-brand-ink/10`} aria-busy={reordering}>
                                    {group.items.map((facility, index) => (
                                        <li key={facility.id} className="flex items-center gap-3 px-4 py-3 sm:gap-4 sm:px-5">
                                            <span className="w-6 shrink-0 text-center font-display text-lg font-bold text-brand-ink/30">{index + 1}</span>
                                            <span className="hidden sm:block"><Thumbnail src={facility.images[0]?.url ?? null} className="h-14 w-20" /></span>
                                            <div className="min-w-0 flex-1">
                                                <Link to={`/admin/fasilitas/${facility.id}`} className="text-sm font-semibold hover:text-brand-darkred">{facility.title}</Link>
                                                <p className="mt-0.5 text-xs text-brand-ink/55">
                                                    {facility.images.length > 0 ? `${facility.images.length} foto` : "Belum ada foto"}
                                                    {facility.majors.length > 0 && ` · ${facility.majors.join(", ")}`}
                                                </p>
                                            </div>
                                            <div className="flex shrink-0 items-center">
                                                <button type="button" onClick={() => move(group.category, index, -1)} disabled={index === 0 || reordering} aria-label={`Naikkan "${facility.title}"`} title="Naikkan" className={iconButton}>
                                                    <AdminIcon name="arrowUp" className="w-4 h-4" />
                                                </button>
                                                <button type="button" onClick={() => move(group.category, index, 1)} disabled={index === group.items.length - 1 || reordering} aria-label={`Turunkan "${facility.title}"`} title="Turunkan" className={iconButton}>
                                                    <AdminIcon name="arrowDown" className="w-4 h-4" />
                                                </button>
                                                <Link to={`/admin/fasilitas/${facility.id}`} aria-label={`Edit "${facility.title}"`} title="Edit" className={iconButton}>
                                                    <AdminIcon name="pencil" className="w-4 h-4" />
                                                </Link>
                                                <button type="button" onClick={() => setPendingDelete(facility)} aria-label={`Hapus "${facility.title}"`} title="Hapus" className={`${iconButton} hover:bg-brand-signal/10 hover:text-brand-signal`}>
                                                    <AdminIcon name="trash" className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            )}
                        </section>
                    ))}
                </div>
            )}

            <ConfirmDialog
                open={pendingDelete !== null}
                title="Hapus fasilitas ini?"
                message={`"${pendingDelete?.title ?? ""}" beserta semua fotonya akan dihapus permanen dan tidak bisa dikembalikan.`}
                busy={deleting}
                onConfirm={confirmDelete}
                onCancel={() => setPendingDelete(null)}
            />
        </>
    )
}
