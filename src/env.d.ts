interface ImportMetaEnv {
    // Alamat API Laravel, contoh "http://localhost:8000/api"
    readonly VITE_API_URL?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
