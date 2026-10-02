import AdminIcon, { type AdminIconName } from "./AdminIcon";
import { iconButton, inputClass } from "./ui";
import { blockLabels, createBlock, type BlockType, type EditorBlock } from "../lib/blocks";

const blockIcons: Record<BlockType, AdminIconName> = {
    paragraph: "paragraph",
    heading: "heading",
    quote: "quote",
    list: "list",
};

// Editor isi artikel: susunan blok paragraf, subjudul, kutipan, dan daftar poin, ditampilkan berurutan di situs.
// errors = pesan validasi dari server, kuncinya "body" atau "body.{urutan}"
export default function BlockEditor({ blocks, onChange, errors, id }: {
    blocks: EditorBlock[];
    onChange: (blocks: EditorBlock[]) => void;
    errors: Record<string, string[]>;
    id?: string;
}) {
    const update = (key: string, changes: Partial<EditorBlock>) =>
        onChange(blocks.map((block) => (block.key === key ? { ...block, ...changes } : block)));

    const move = (index: number, offset: number) => {
        const next = [...blocks];
        const [block] = next.splice(index, 1);
        next.splice(index + offset, 0, block);
        onChange(next);
    };

    const remove = (key: string) => onChange(blocks.filter((block) => block.key !== key));

    return(
        <div id={id} className="space-y-3">
            {blocks.length === 0 && (
                <p className="rounded-xl border border-dashed border-brand-ink/20 px-4 py-8 text-center text-sm text-brand-ink/55">
                    Belum ada isi. Tambahkan blok pertama dengan tombol di bawah.
                </p>
            )}

            {blocks.map((block, index) => {
                const error = errors[`body.${index}`]?.[0];
                const fieldId = `blok-${block.key}`;

                return(
                    <div
                        key={block.key}
                        aria-invalid={error ? true : undefined}
                        className={`rounded-xl border bg-white p-3 sm:p-4 ${error ? "border-brand-signal" : "border-brand-ink/10"}`}
                    >
                        <div className="flex items-center justify-between gap-2">
                            <label htmlFor={fieldId} className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-ink/60">
                                <AdminIcon name={blockIcons[block.type]} className="w-4 h-4 text-brand-darkred" />
                                {blockLabels[block.type]} <span className="font-normal">#{index + 1}</span>
                            </label>
                            <div className="flex items-center">
                                <button type="button" onClick={() => move(index, -1)} disabled={index === 0} aria-label={`Naikkan blok ${index + 1}`} title="Naikkan" className={iconButton}>
                                    <AdminIcon name="arrowUp" className="w-4 h-4" />
                                </button>
                                <button type="button" onClick={() => move(index, 1)} disabled={index === blocks.length - 1} aria-label={`Turunkan blok ${index + 1}`} title="Turunkan" className={iconButton}>
                                    <AdminIcon name="arrowDown" className="w-4 h-4" />
                                </button>
                                <button type="button" onClick={() => remove(block.key)} aria-label={`Hapus blok ${index + 1}`} title="Hapus blok" className={`${iconButton} hover:bg-brand-signal/10 hover:text-brand-signal`}>
                                    <AdminIcon name="trash" className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="mt-2.5 space-y-2.5">
                            {block.type === "heading" ? (
                                <input
                                    id={fieldId}
                                    value={block.text}
                                    onChange={(e) => update(block.key, { text: e.target.value })}
                                    placeholder="Tulis subjudul"
                                    maxLength={255}
                                    className={`${inputClass} font-semibold`}
                                />
                            ) : (
                                <textarea
                                    id={fieldId}
                                    value={block.text}
                                    onChange={(e) => update(block.key, { text: e.target.value })}
                                    placeholder={
                                        block.type === "list" ? "Satu poin per baris" :
                                        block.type === "quote" ? "Tulis kutipan tanpa tanda petik" : "Tulis paragraf"
                                    }
                                    rows={block.type === "paragraph" ? 4 : 3}
                                    className={`${inputClass} field-sizing-content min-h-20 resize-y leading-relaxed ${block.type === "quote" ? "italic" : ""}`}
                                />
                            )}

                            {block.type === "quote" && (
                                <input
                                    value={block.by}
                                    onChange={(e) => update(block.key, { by: e.target.value })}
                                    placeholder="Nama & jabatan yang dikutip (opsional), contoh: Drs. Ahmad Fauzi, M.Pd., Kepala Sekolah"
                                    aria-label={`Nama yang dikutip di blok ${index + 1}`}
                                    maxLength={255}
                                    className={inputClass}
                                />
                            )}
                            {block.type === "list" && (
                                <p className="text-xs text-brand-ink/55">Tekan Enter untuk memulai poin baru.</p>
                            )}
                        </div>

                        {error && <p className="mt-2 text-sm text-brand-signal">{error}</p>}
                    </div>
                );
            })}

            {errors.body?.[0] && <p className="text-sm text-brand-signal">{errors.body[0]}</p>}

            <div className="flex flex-wrap gap-2 pt-1">
                {(Object.keys(blockLabels) as BlockType[]).map((type) => (
                    <button
                        key={type}
                        type="button"
                        onClick={() => onChange([...blocks, createBlock(type)])}
                        className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-brand-ink/25 bg-white px-3.5 py-2 text-xs font-semibold text-brand-ink/75 transition-colors hover:border-brand-darkred hover:text-brand-darkred"
                    >
                        <AdminIcon name="plus" className="w-3.5 h-3.5" />
                        {blockLabels[type]}
                    </button>
                ))}
            </div>
        </div>
    )
}
