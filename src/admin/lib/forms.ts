// Bentuk data isian form admin dan cara mengirimnya ke server

// Foto tunggal (berita & program). file = foto baru yang dipilih, remove = foto lama dihapus.
// preview = URL sementara untuk pratinjau foto baru
export type ImageValue = { file: File | null; preview: string | null; remove: boolean };

export const emptyImageValue: ImageValue = { file: null, preview: null, remove: false };

// Baris daftar teks yang bisa diurutkan; key tetap sama saat baris dipindah
export type ListItem = { key: string; value: string };

export function toListItems(values: string[]): ListItem[] {
    return values.map((value, i) => ({ key: `awal-${i}`, value }));
}

export function appendImage(form: FormData, image: ImageValue) {
    if (image.file) form.append("image", image.file);
    else if (image.remove) form.append("remove_image", "1");
}

// Setelah server menolak isian, gulir ke isian pertama yang salah supaya admin langsung melihatnya
export function scrollToFirstError() {
    requestAnimationFrame(() => {
        const invalid = document.querySelector<HTMLElement>("[aria-invalid='true']");
        invalid?.scrollIntoView({ behavior: "smooth", block: "center" });
        if (invalid instanceof HTMLInputElement || invalid instanceof HTMLTextAreaElement || invalid instanceof HTMLSelectElement) {
            invalid.focus({ preventScroll: true });
        }
    });
}
