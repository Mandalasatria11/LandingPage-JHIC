import type { NewsBlock } from "../../data/news";

// Isi artikel (berita & program) di editor admin disimpan dalam bentuk yang mudah diedit,
// lalu diubah kembali ke format NewsBlock saat dikirim ke server.
export type BlockType = "paragraph" | "heading" | "quote" | "list";

export type EditorBlock = {
    key: string;    // kunci React, tetap sama saat blok dipindah
    type: BlockType;
    text: string;   // isi paragraf/subjudul/kutipan; untuk daftar poin: satu poin per baris
    by: string;     // nama yang dikutip (khusus kutipan)
};

export const blockLabels: Record<BlockType, string> = {
    paragraph: "Paragraf",
    heading: "Subjudul",
    quote: "Kutipan",
    list: "Daftar Poin",
};

let nextKey = 0;

// Dipanggil dari event handler (tombol tambah blok), bukan saat render
export function createBlock(type: BlockType): EditorBlock {
    nextKey++;
    return { key: `baru-${nextKey}`, type, text: "", by: "" };
}

export function toEditorBlocks(blocks: NewsBlock[]): EditorBlock[] {
    return blocks.map((block, i) => {
        const key = `awal-${i}`;
        if (typeof block === "string") return { key, type: "paragraph", text: block, by: "" };
        if ("heading" in block) return { key, type: "heading", text: block.heading, by: "" };
        if ("quote" in block) return { key, type: "quote", text: block.quote, by: block.by ?? "" };
        return { key, type: "list", text: block.list.join("\n"), by: "" };
    });
}

// Blok kosong tetap dikirim supaya pesan error dari server ("Blok isi ke-3 ...") cocok dengan urutan di editor
export function fromEditorBlocks(blocks: EditorBlock[]): NewsBlock[] {
    return blocks.map((block) => {
        const text = block.text.trim();
        switch (block.type) {
            case "paragraph":
                return text;
            case "heading":
                return { heading: text };
            case "quote":
                return block.by.trim() ? { quote: text, by: block.by.trim() } : { quote: text };
            case "list":
                return { list: block.text.split("\n").map((item) => item.trim()).filter(Boolean) };
        }
    });
}
