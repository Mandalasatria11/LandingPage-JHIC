import { useState } from "react";
import AdminIcon from "./AdminIcon";
import { iconButton } from "./ui";
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_BYTES } from "../lib/format";

// Banyak foto (fasilitas). Foto lama tetap di depan sesuai urutannya, foto baru selalu ditambahkan di belakang
// karena server menambahkan unggahan baru setelah foto lama. Foto pertama menjadi sampul.
export type PhotoItem =
    | { kind: "existing"; key: string; id: number; url: string }
    | { kind: "new"; key: string; file: File; url: string };

export const MAX_PHOTOS = 12;

let nextKey = 0;

export default function PhotoListInput({ id, photos, onChange, error }: {
    id: string;
    photos: PhotoItem[];
    onChange: (photos: PhotoItem[]) => void;
    error?: string;
}) {
    const [notice, setNotice] = useState<string | null>(null);

    const add = (files: FileList | null) => {
        if (!files) return;
        const accepted = [...files].filter((file) => file.size <= MAX_IMAGE_BYTES);
        const room = MAX_PHOTOS - photos.length;
        const added = accepted.slice(0, Math.max(0, room)).map((file): PhotoItem => {
            nextKey++;
            return { kind: "new", key: `baru-${nextKey}`, file, url: URL.createObjectURL(file) };
        });

        const skipped = files.length - added.length;
        setNotice(skipped > 0 ? `${skipped} foto tidak ditambahkan (lebih dari 5 MB atau melebihi ${MAX_PHOTOS} foto).` : null);
        onChange([...photos, ...added]);
    };

    const remove = (key: string) => {
        const photo = photos.find((p) => p.key === key);
        if (photo?.kind === "new") URL.revokeObjectURL(photo.url);
        onChange(photos.filter((p) => p.key !== key));
    };

    // Hanya bertukar dengan foto sejenis (lama dengan lama, baru dengan baru), lihat keterangan di atas
    const canMove = (index: number, offset: number) => photos[index + offset]?.kind === photos[index].kind;
    const move = (index: number, offset: number) => {
        const next = [...photos];
        [next[index], next[index + offset]] = [next[index + offset], next[index]];
        onChange(next);
    };

    const message = error ?? notice;

    return(
        <div>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {photos.map((photo, index) => (
                    <li key={photo.key} className="group relative overflow-hidden rounded-xl border border-brand-ink/10 bg-brand-softmist/60">
                        <img src={photo.url} alt={`Foto ${index + 1}`} className="aspect-4/3 w-full object-cover" />
                        <div className="absolute left-2 top-2 flex gap-1">
                            {index === 0 && <span className="rounded-full bg-brand-darkred px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">Sampul</span>}
                            {photo.kind === "new" && <span className="rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-ink">Baru</span>}
                        </div>
                        <div className="flex items-center justify-between bg-white px-1 py-1">
                            <div className="flex">
                                <button type="button" onClick={() => move(index, -1)} disabled={!canMove(index, -1)} aria-label={`Geser foto ${index + 1} ke kiri`} title="Geser ke kiri" className={iconButton}>
                                    <AdminIcon name="arrowLeft" className="w-4 h-4" />
                                </button>
                                <button type="button" onClick={() => move(index, 1)} disabled={!canMove(index, 1)} aria-label={`Geser foto ${index + 1} ke kanan`} title="Geser ke kanan" className={iconButton}>
                                    <AdminIcon name="arrowRight" className="w-4 h-4" />
                                </button>
                            </div>
                            <button type="button" onClick={() => remove(photo.key)} aria-label={`Hapus foto ${index + 1}`} title="Hapus foto" className={`${iconButton} hover:bg-brand-signal/10 hover:text-brand-signal`}>
                                <AdminIcon name="trash" className="w-4 h-4" />
                            </button>
                        </div>
                    </li>
                ))}

                {photos.length < MAX_PHOTOS && (
                    <li>
                        <label
                            htmlFor={id}
                            className={`flex h-full min-h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-3 py-6 text-center text-brand-ink/55 transition-colors hover:border-brand-darkred hover:text-brand-darkred focus-within:border-brand-darkred ${
                                message ? "border-brand-signal" : "border-brand-ink/20"
                            }`}
                        >
                            <AdminIcon name="plus" className="w-6 h-6" />
                            <span className="text-xs font-semibold">Tambah Foto</span>
                            <input
                                id={id}
                                type="file"
                                multiple
                                accept={ACCEPTED_IMAGE_TYPES}
                                onChange={(e) => {
                                    add(e.target.files);
                                    e.target.value = "";
                                }}
                                className="sr-only"
                            />
                        </label>
                    </li>
                )}
            </ul>

            {message ? (
                <p className="mt-1.5 text-sm text-brand-signal">{message}</p>
            ) : (
                <p className="mt-1.5 text-xs leading-relaxed text-brand-ink/55">
                    JPG, PNG, atau WEBP, maksimal 5 MB per foto dan {MAX_PHOTOS} foto. Foto pertama menjadi sampul dan tampil di slider beranda;
                    fasilitas tanpa foto hanya tampil di halaman Fasilitas dengan ikon.
                </p>
            )}
        </div>
    )
}
