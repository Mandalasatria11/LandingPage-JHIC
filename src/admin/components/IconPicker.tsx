import Icon, { type IconName } from "../../components/Icon";
import { iconNames } from "../../components/icons";

// Ikon media sosial & tombol pemutar tidak cocok untuk program/fasilitas
const hiddenIcons: IconName[] = ["instagram", "youtube", "tiktok", "facebook", "whatsapp", "play", "pause", "search", "link", "externalLink"];
const choices = iconNames.filter((name) => !hiddenIcons.includes(name));

// Pilihan ikon yang tampil di situs selama konten belum punya foto
export default function IconPicker({ value, onChange, error, labelledBy }: {
    value: IconName;
    onChange: (icon: IconName) => void;
    error?: string;
    labelledBy: string;
}) {
    return(
        <div>
            <div role="radiogroup" aria-labelledby={labelledBy} className="grid grid-cols-6 gap-1.5 sm:grid-cols-8">
                {choices.map((name) => (
                    <button
                        key={name}
                        type="button"
                        role="radio"
                        aria-checked={value === name}
                        aria-label={name}
                        title={name}
                        onClick={() => onChange(name)}
                        className={`flex aspect-square items-center justify-center rounded-lg border transition-colors ${
                            value === name
                                ? "border-brand-darkred bg-brand-darkred text-white"
                                : "border-brand-ink/10 bg-white text-brand-ink/70 hover:border-brand-darkred/40 hover:text-brand-darkred"
                        }`}
                    >
                        <Icon name={name} className="w-5 h-5" />
                    </button>
                ))}
            </div>
            {error && <p className="mt-1.5 text-sm text-brand-signal">{error}</p>}
        </div>
    )
}
