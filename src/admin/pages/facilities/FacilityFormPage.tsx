import { useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Field from "../../components/Field";
import IconPicker from "../../components/IconPicker";
import PageHeader from "../../components/PageHeader";
import PanelState from "../../components/PanelState";
import PhotoListInput, { type PhotoItem } from "../../components/PhotoListInput";
import Spinner from "../../components/Spinner";
import StringListEditor from "../../components/StringListEditor";
import { buttonPrimary, buttonSecondary, cardClass, inputClass } from "../../components/ui";
import { useToast } from "../../toast/toast-context";
import { useDocumentTitle } from "../../lib/format";
import { scrollToFirstError, toListItems } from "../../lib/forms";
import type { IconName } from "../../../components/Icon";
import { facilityCategoryLabels, type Facility, type FacilityCategory } from "../../../data/facilities";
import { majors } from "../../../data/majors";
import { ApiError, apiRequest, type Resource } from "../../../lib/api";
import { invalidateApiCache, useApi } from "../../../lib/useApi";

// /admin/fasilitas/baru = tambah fasilitas, /admin/fasilitas/{id} = edit fasilitas
export default function FacilityFormPage() {
    const { id } = useParams();
    const isNew = id === undefined;
    useDocumentTitle(isNew ? "Tambah Fasilitas" : "Edit Fasilitas");
    const { data, error, reload, refreshing } = useApi<Resource<Facility>>(isNew ? null : `/admin/facilities/${id}`);

    // Tunggu data terbaru: form diisi sekali saat dibuka, jadi data lama dari cache tidak boleh ikut terisi
    if (!isNew && (!data || refreshing)) {
        return(
            <>
                <PageHeader title="Edit Fasilitas" back={{ to: "/admin/fasilitas", label: "Semua fasilitas" }} />
                <PanelState error={error} onRetry={reload} label="Memuat fasilitas" />
            </>
        )
    }

    return <FacilityForm key={id ?? "baru"} facility={data?.data ?? null} />;
}

function FacilityForm({ facility }: { facility: Facility | null }) {
    const navigate = useNavigate();
    const toast = useToast();

    const [title, setTitle] = useState(facility?.title ?? "");
    const [category, setCategory] = useState<FacilityCategory>(facility?.category ?? "praktik");
    const [selectedMajors, setSelectedMajors] = useState<string[]>(facility?.majors ?? []);
    const [description, setDescription] = useState(facility?.description ?? "");
    const [features, setFeatures] = useState(() => toListItems(facility?.features ?? [""]));
    const [icon, setIcon] = useState<IconName>(facility?.icon ?? "monitor");
    const [photos, setPhotos] = useState<PhotoItem[]>(() =>
        (facility?.images ?? []).map((image) => ({ kind: "existing", key: `foto-${image.id}`, id: image.id, url: image.url })),
    );
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [saving, setSaving] = useState(false);

    const err = (key: string) => errors[key]?.[0];
    // Error per foto baru ("images.0") ditampilkan sebagai satu pesan di bawah daftar foto
    const photoError = err("images") ?? Object.entries(errors).find(([key]) => key.startsWith("images.") || key.startsWith("image_ids"))?.[1][0];

    const toggleMajor = (code: string) =>
        setSelectedMajors((current) => (current.includes(code) ? current.filter((c) => c !== code) : [...current, code]));

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setErrors({});

        const form = new FormData();
        if (facility) form.append("_method", "PUT");
        form.append("title", title.trim());
        form.append("category", category);
        form.append("description", description.trim());
        form.append("icon", icon);
        form.append("features", JSON.stringify(features.map((item) => item.value.trim())));
        // Urutkan sesuai daftar jurusan supaya tampil konsisten di situs
        form.append("majors", JSON.stringify(category === "praktik" ? majors.map((m) => m.code).filter((code) => selectedMajors.includes(code)) : []));
        if (facility) {
            form.append("image_ids", JSON.stringify(photos.flatMap((photo) => (photo.kind === "existing" ? [photo.id] : []))));
        }
        for (const photo of photos) {
            if (photo.kind === "new") form.append("images[]", photo.file);
        }

        try {
            await apiRequest(facility ? `/admin/facilities/${facility.id}` : "/admin/facilities", { method: "POST", body: form });
            invalidateApiCache();
            toast.success(facility ? "Perubahan fasilitas disimpan." : "Fasilitas ditambahkan.");
            navigate("/admin/fasilitas");
        } catch (error) {
            if (error instanceof ApiError) {
                setErrors(error.errors);
                toast.error(error.status === 422 ? "Periksa kembali isian yang ditandai merah." : error.message);
                scrollToFirstError();
            }
        } finally {
            setSaving(false);
        }
    };

    const saveLabel = facility ? "Simpan Perubahan" : "Tambah Fasilitas";

    return(
        <form onSubmit={submit} noValidate>
            <PageHeader
                title={facility ? "Edit Fasilitas" : "Tambah Fasilitas"}
                back={{ to: "/admin/fasilitas", label: "Semua fasilitas" }}
                actions={
                    <>
                        <Link to="/admin/fasilitas" className={buttonSecondary}>Batal</Link>
                        <button type="submit" disabled={saving} className={buttonPrimary}>
                            {saving && <Spinner className="w-4 h-4" label="Menyimpan" />}
                            {saveLabel}
                        </button>
                    </>
                }
            />

            <div className="grid gap-6 lg:grid-cols-[1fr_20rem] lg:items-start">
                <div className="min-w-0 space-y-6">
                    <div className={`${cardClass} space-y-6 p-5 sm:p-6`}>
                        <Field label="Nama Fasilitas" htmlFor="title" error={err("title")}>
                            <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={255} aria-invalid={err("title") ? true : undefined} className={`${inputClass} text-base font-semibold`} placeholder="Contoh: Laboratorium RPL" />
                        </Field>

                        <div>
                            <p id="category-label" className="text-sm font-semibold">Kategori</p>
                            <div role="radiogroup" aria-labelledby="category-label" className="mt-2 grid gap-2 sm:grid-cols-2">
                                {(Object.keys(facilityCategoryLabels) as FacilityCategory[]).map((value) => (
                                    <button
                                        key={value}
                                        type="button"
                                        role="radio"
                                        aria-checked={category === value}
                                        onClick={() => setCategory(value)}
                                        className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                                            category === value ? "border-brand-darkred bg-brand-darkred/5 ring-1 ring-brand-darkred" : "border-brand-ink/15 bg-white hover:border-brand-ink/30"
                                        }`}
                                    >
                                        <span className="block text-sm font-semibold">{facilityCategoryLabels[value]}</span>
                                        <span className="mt-0.5 block text-xs text-brand-ink/55">
                                            {value === "praktik" ? "Ruang praktik milik jurusan tertentu" : "Sarana untuk semua siswa"}
                                        </span>
                                    </button>
                                ))}
                            </div>
                            {err("category") && <p className="mt-1.5 text-sm text-brand-signal">{err("category")}</p>}
                        </div>

                        {category === "praktik" && (
                            <fieldset>
                                <legend className="text-sm font-semibold">Dipakai Jurusan</legend>
                                <p className="mt-1 text-xs text-brand-ink/55">Ruang ini juga tampil di halaman jurusan yang dipilih.</p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {majors.map((major) => {
                                        const checked = selectedMajors.includes(major.code);
                                        return(
                                            <label
                                                key={major.code}
                                                className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand-darkred ${
                                                    checked ? "border-brand-darkred bg-brand-darkred text-white" : "border-brand-ink/15 bg-white text-brand-ink/75 hover:border-brand-darkred/40"
                                                }`}
                                            >
                                                <input type="checkbox" checked={checked} onChange={() => toggleMajor(major.code)} className="sr-only" />
                                                {major.code}
                                                <span className={`font-normal ${checked ? "text-white/80" : "text-brand-ink/50"}`}>{`${major.highlight} ${major.rest}`.trim()}</span>
                                            </label>
                                        );
                                    })}
                                </div>
                                {(err("majors") ?? err("majors.0")) && <p className="mt-1.5 text-sm text-brand-signal">{err("majors") ?? err("majors.0")}</p>}
                            </fieldset>
                        )}

                        <Field label="Deskripsi" htmlFor="description" error={err("description")}>
                            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} maxLength={1000} aria-invalid={err("description") ? true : undefined} className={`${inputClass} field-sizing-content min-h-24 leading-relaxed`} />
                        </Field>

                        <div>
                            <p className="text-sm font-semibold">Isi Ruangan / Peralatan</p>
                            <p className="mt-1 mb-3 text-xs text-brand-ink/55">Ditampilkan sebagai daftar poin. Minimal satu poin.</p>
                            <StringListEditor id="features" items={features} onChange={setFeatures} errors={errors} errorPrefix="features" placeholder="Contoh: Komputer untuk praktik pemrograman" />
                            {err("features") && <p className="mt-1.5 text-sm text-brand-signal">{err("features")}</p>}
                        </div>
                    </div>

                    <section className={`${cardClass} p-5 sm:p-6`} aria-labelledby="photos-heading">
                        <h2 id="photos-heading" className="mb-4 font-semibold">Foto</h2>
                        <PhotoListInput id="photos" photos={photos} onChange={setPhotos} error={photoError} />
                    </section>
                </div>

                <div className="space-y-6">
                    <section className={`${cardClass} p-5`}>
                        <h2 id="icon-heading" className="font-semibold">Ikon</h2>
                        <p className="mt-1 mb-4 text-xs text-brand-ink/55">Ditampilkan di situs selama fasilitas belum punya foto.</p>
                        <IconPicker value={icon} onChange={setIcon} error={err("icon")} labelledBy="icon-heading" />
                    </section>

                    <button type="submit" disabled={saving} className={`${buttonPrimary} w-full py-3 lg:hidden`}>
                        {saving && <Spinner className="w-4 h-4" label="Menyimpan" />}
                        {saveLabel}
                    </button>
                </div>
            </div>
        </form>
    )
}
