import { useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminIcon from "../../components/AdminIcon";
import BlockEditor from "../../components/BlockEditor";
import Field from "../../components/Field";
import ImageInput from "../../components/ImageInput";
import PageHeader from "../../components/PageHeader";
import PanelState from "../../components/PanelState";
import Spinner from "../../components/Spinner";
import StatusBadge from "../../components/StatusBadge";
import { buttonPrimary, buttonSecondary, cardClass, inputClass } from "../../components/ui";
import { useToast } from "../../toast/toast-context";
import { fromEditorBlocks, toEditorBlocks } from "../../lib/blocks";
import { nowDateTimeLocal, slugify, toDateTimeLocal, useDocumentTitle } from "../../lib/format";
import { appendImage, emptyImageValue, scrollToFirstError } from "../../lib/forms";
import { defaultNewsAuthor, newsCategories, type NewsCategory, type NewsDetail } from "../../../data/news";
import { ApiError, apiRequest, type Resource } from "../../../lib/api";
import { invalidateApiCache, useApi } from "../../../lib/useApi";

// /admin/berita/baru = tulis berita baru, /admin/berita/{id} = edit berita
export default function NewsFormPage() {
    const { id } = useParams();
    const isNew = id === undefined;
    useDocumentTitle(isNew ? "Tulis Berita" : "Edit Berita");
    const { data, error, reload, refreshing } = useApi<Resource<NewsDetail>>(isNew ? null : `/admin/news/${id}`);

    // Tunggu data terbaru: form diisi sekali saat dibuka, jadi data lama dari cache tidak boleh ikut terisi
    if (!isNew && (!data || refreshing)) {
        return(
            <>
                <PageHeader title="Edit Berita" back={{ to: "/admin/berita", label: "Semua berita" }} />
                <PanelState error={error} onRetry={reload} label="Memuat berita" />
            </>
        )
    }

    // key: form dibuat ulang (state awal baru) saat berpindah ke berita lain
    return <NewsForm key={id ?? "baru"} news={data?.data ?? null} />;
}

function NewsForm({ news }: { news: NewsDetail | null }) {
    const navigate = useNavigate();
    const toast = useToast();

    const [title, setTitle] = useState(news?.title ?? "");
    const [slug, setSlug] = useState(news?.slug ?? "");
    const [category, setCategory] = useState<NewsCategory>(news?.category ?? newsCategories[0]);
    const [excerpt, setExcerpt] = useState(news?.excerpt ?? "");
    const [blocks, setBlocks] = useState(() => toEditorBlocks(news?.body ?? [""]));
    const [author, setAuthor] = useState(news?.author ?? "");
    const [isPublished, setIsPublished] = useState(news?.is_published ?? true);
    const [publishedAt, setPublishedAt] = useState(() => (news ? toDateTimeLocal(news.date) : nowDateTimeLocal()));
    const [image, setImage] = useState(emptyImageValue);
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [saving, setSaving] = useState(false);

    const err = (key: string) => errors[key]?.[0];

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setErrors({});

        const form = new FormData();
        if (news) form.append("_method", "PUT");
        form.append("title", title.trim());
        form.append("slug", slug.trim());
        form.append("category", category);
        form.append("excerpt", excerpt.trim());
        form.append("body", JSON.stringify(fromEditorBlocks(blocks)));
        form.append("author", author.trim());
        form.append("is_published", isPublished ? "1" : "0");
        form.append("published_at", publishedAt);
        appendImage(form, image);

        try {
            await apiRequest(news ? `/admin/news/${news.id}` : "/admin/news", { method: "POST", body: form });
            invalidateApiCache();
            toast.success(news ? "Perubahan berita disimpan." : isPublished ? "Berita diterbitkan." : "Berita disimpan sebagai draf.");
            navigate("/admin/berita");
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

    const saveLabel = news ? "Simpan Perubahan" : isPublished ? "Terbitkan" : "Simpan Draf";
    const scheduled = isPublished && publishedAt > nowDateTimeLocal();

    return(
        <form id="news-form" onSubmit={submit} noValidate>
            <PageHeader
                title={news ? "Edit Berita" : "Tulis Berita"}
                back={{ to: "/admin/berita", label: "Semua berita" }}
                description={news && (
                    <span className="inline-flex flex-wrap items-center gap-2">
                        <StatusBadge status={news.status} />
                        {news.status === "published" && (
                            <a href={`/berita/${news.slug}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-medium text-brand-darkred hover:underline">
                                Lihat di situs <AdminIcon name="external" className="w-3.5 h-3.5" />
                            </a>
                        )}
                    </span>
                )}
                actions={
                    <>
                        <Link to="/admin/berita" className={buttonSecondary}>Batal</Link>
                        <button type="submit" disabled={saving} className={buttonPrimary}>
                            {saving && <Spinner className="w-4 h-4" label="Menyimpan" />}
                            {saveLabel}
                        </button>
                    </>
                }
            />

            <div className="grid gap-6 lg:grid-cols-[1fr_20rem] lg:items-start">
                <div className={`${cardClass} min-w-0 space-y-6 p-5 sm:p-6`}>
                    <Field label="Judul" htmlFor="title" error={err("title")}>
                        <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={255} aria-invalid={err("title") ? true : undefined} className={`${inputClass} text-base font-semibold`} placeholder="Contoh: Siswa RPL Raih Juara 1 LKS Tingkat Kabupaten" />
                    </Field>

                    <Field
                        label="Alamat Halaman"
                        htmlFor="slug"
                        error={err("slug")}
                        hint={news
                            ? "Mengubah alamat membuat tautan lama yang sudah dibagikan tidak berlaku lagi."
                            : "Kosongkan untuk dibuat otomatis dari judul."}
                    >
                        <div className={`flex items-center rounded-xl border bg-white focus-within:border-brand-darkred focus-within:ring-4 focus-within:ring-brand-darkred/10 ${err("slug") ? "border-brand-signal" : "border-brand-ink/15"}`}>
                            <span className="shrink-0 pl-4 text-sm text-brand-ink/45">/berita/</span>
                            <input
                                id="slug"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                placeholder={slugify(title) || "alamat-berita"}
                                maxLength={255}
                                aria-invalid={err("slug") ? true : undefined}
                                className="min-w-0 flex-1 rounded-r-xl bg-transparent py-2.5 pr-4 text-sm focus:outline-none"
                            />
                        </div>
                    </Field>

                    <Field label="Paragraf Pembuka" htmlFor="excerpt" error={err("excerpt")} hint="Ringkasan berita, tampil tebal di bagian atas halaman berita.">
                        <textarea id="excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3} maxLength={1000} aria-invalid={err("excerpt") ? true : undefined} className={`${inputClass} field-sizing-content min-h-24 leading-relaxed`} />
                    </Field>

                    <div>
                        <p id="body-label" className="text-sm font-semibold">Isi Berita</p>
                        <p className="mt-1 mb-3 text-xs text-brand-ink/55">Susun isi berita dari paragraf, subjudul, kutipan, dan daftar poin.</p>
                        <BlockEditor id="body" blocks={blocks} onChange={setBlocks} errors={errors} />
                    </div>
                </div>

                <div className="space-y-6">
                    <section className={`${cardClass} space-y-5 p-5`} aria-labelledby="publish-heading">
                        <h2 id="publish-heading" className="font-semibold">Publikasi</h2>

                        <div role="radiogroup" aria-label="Status berita" className="grid grid-cols-2 gap-1 rounded-xl bg-brand-softmist p-1">
                            {[
                                { value: true, label: "Terbitkan" },
                                { value: false, label: "Draf" },
                            ].map((option) => (
                                <button
                                    key={option.label}
                                    type="button"
                                    role="radio"
                                    aria-checked={isPublished === option.value}
                                    onClick={() => setIsPublished(option.value)}
                                    className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                                        isPublished === option.value ? "bg-white text-brand-darkred shadow-sm" : "text-brand-ink/60 hover:text-brand-ink"
                                    }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                        {err("is_published") && <p className="text-sm text-brand-signal">{err("is_published")}</p>}

                        <Field
                            label="Tanggal & Jam Terbit"
                            htmlFor="published_at"
                            error={err("published_at")}
                            hint={!isPublished
                                ? "Draf tidak tampil di situs."
                                : scheduled
                                    ? "Tanggal di masa depan: berita otomatis tampil saat waktunya tiba."
                                    : "Berita diurutkan dari tanggal terbaru."}
                        >
                            <input id="published_at" type="datetime-local" value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} aria-invalid={err("published_at") ? true : undefined} className={inputClass} />
                        </Field>
                    </section>

                    <section className={`${cardClass} space-y-5 p-5`} aria-labelledby="detail-heading">
                        <h2 id="detail-heading" className="font-semibold">Detail</h2>
                        <Field label="Kategori" htmlFor="category" error={err("category")}>
                            <select id="category" value={category} onChange={(e) => setCategory(e.target.value as NewsCategory)} aria-invalid={err("category") ? true : undefined} className={inputClass}>
                                {newsCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </Field>
                        <Field label="Penulis" htmlFor="author" optional error={err("author")} hint={`Kosongkan bila ditulis ${defaultNewsAuthor}.`}>
                            <input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} maxLength={255} placeholder={defaultNewsAuthor} aria-invalid={err("author") ? true : undefined} className={inputClass} />
                        </Field>
                    </section>

                    <section className={`${cardClass} p-5`} aria-labelledby="image-heading">
                        <h2 id="image-heading" className="mb-4 font-semibold">Foto Utama</h2>
                        <ImageInput id="image" currentUrl={news?.image ?? null} value={image} onChange={setImage} error={err("image")} />
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
