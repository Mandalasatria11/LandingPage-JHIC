import AdminIcon from "./AdminIcon";
import { iconButton, inputClass } from "./ui";
import type { ListItem } from "../lib/forms";

let nextKey = 0;

// Daftar teks pendek yang bisa ditambah, dihapus & diurutkan (mis. isi ruangan fasilitas).
// errorPrefix = kunci error server untuk tiap baris, mis. "features" -> "features.0"
export default function StringListEditor({ id, items, onChange, errors, errorPrefix, placeholder, max = 20 }: {
    id: string;
    items: ListItem[];
    onChange: (items: ListItem[]) => void;
    errors: Record<string, string[]>;
    errorPrefix: string;
    placeholder: string;
    max?: number;
}) {
    const move = (index: number, offset: number) => {
        const next = [...items];
        [next[index], next[index + offset]] = [next[index + offset], next[index]];
        onChange(next);
    };

    const add = () => {
        nextKey++;
        onChange([...items, { key: `baru-${nextKey}`, value: "" }]);
    };

    return(
        <div id={id} className="space-y-2">
            {items.map((item, index) => {
                const error = errors[`${errorPrefix}.${index}`]?.[0];
                return(
                    <div key={item.key}>
                        <div className="flex items-center gap-1">
                            <span aria-hidden="true" className="w-6 shrink-0 text-center text-xs font-semibold text-brand-ink/40">{index + 1}</span>
                            <input
                                value={item.value}
                                onChange={(e) => onChange(items.map((it) => (it.key === item.key ? { ...it, value: e.target.value } : it)))}
                                placeholder={placeholder}
                                aria-label={`Poin ${index + 1}`}
                                aria-invalid={error ? true : undefined}
                                maxLength={255}
                                className={inputClass}
                            />
                            <button type="button" onClick={() => move(index, -1)} disabled={index === 0} aria-label={`Naikkan poin ${index + 1}`} title="Naikkan" className={iconButton}>
                                <AdminIcon name="arrowUp" className="w-4 h-4" />
                            </button>
                            <button type="button" onClick={() => move(index, 1)} disabled={index === items.length - 1} aria-label={`Turunkan poin ${index + 1}`} title="Turunkan" className={iconButton}>
                                <AdminIcon name="arrowDown" className="w-4 h-4" />
                            </button>
                            <button type="button" onClick={() => onChange(items.filter((it) => it.key !== item.key))} aria-label={`Hapus poin ${index + 1}`} title="Hapus" className={`${iconButton} hover:bg-brand-signal/10 hover:text-brand-signal`}>
                                <AdminIcon name="trash" className="w-4 h-4" />
                            </button>
                        </div>
                        {error && <p className="mt-1 pl-7 text-sm text-brand-signal">{error}</p>}
                    </div>
                );
            })}

            {items.length < max && (
                <button
                    type="button"
                    onClick={add}
                    className="ml-7 inline-flex items-center gap-1.5 rounded-full border border-dashed border-brand-ink/25 bg-white px-3.5 py-2 text-xs font-semibold text-brand-ink/75 transition-colors hover:border-brand-darkred hover:text-brand-darkred"
                >
                    <AdminIcon name="plus" className="w-3.5 h-3.5" />
                    Tambah Poin
                </button>
            )}
        </div>
    )
}
