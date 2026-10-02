import type { Resource } from "./api";
import { useApi } from "./useApi";
import type { Facility } from "../data/facilities";
import type { News, NewsCategory, NewsDetail } from "../data/news";
import type { Program, ProgramDetail } from "../data/programs";

// Hook untuk konten publik landing page. Semua memakai cache useApi, jadi aman dipanggil di banyak section.

export type NewsListResponse = { data: News[]; meta: { total: number } };
export type NewsDetailResponse = { data: NewsDetail; latest: News[]; related: News[] };
export type ProgramDetailResponse = { data: ProgramDetail; others: Program[] };

export function useFacilities() {
    const { data, ...state } = useApi<Resource<Facility[]>>("/facilities");
    return { facilities: data?.data, ...state };
}

export function usePrograms() {
    const { data, ...state } = useApi<Resource<Program[]>>("/programs");
    return { programs: data?.data, ...state };
}

// offset & limit: halaman pertama daftar berita memuat satu berita lebih banyak (berita terbaru tampil besar)
export function useNewsList(category: NewsCategory | null, offset: number, limit: number) {
    const params = new URLSearchParams({ offset: String(offset), limit: String(limit) });
    if (category) params.set("category", category);

    return useApi<NewsListResponse>(`/news?${params}`);
}

export function useNewsDetail(slug: string | undefined) {
    return useApi<NewsDetailResponse>(slug ? `/news/${encodeURIComponent(slug)}` : null);
}

export function useProgramDetail(slug: string | undefined) {
    return useApi<ProgramDetailResponse>(slug ? `/programs/${encodeURIComponent(slug)}` : null);
}
