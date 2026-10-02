// Ikon antarmuka panel admin (tombol tambah, hapus, urutkan, dll.), gaya garis yang sama dengan Icon situs
const paths = {
    dashboard: <path d="M4 4h7v7H4zM13 4h7v4h-7zM13 10h7v10h-7zM4 13h7v7H4z" />,
    news: <path d="M5 4h11v16H6a2 2 0 0 1-2-2V5a1 1 0 0 1 1-1zM16 8h3a1 1 0 0 1 1 1v9a2 2 0 0 1-2 2h-2M8 8h4M8 12h4M8 16h4" />,
    star: <path d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8l-5.4 2.9 1.1-6.1-4.5-4.2 6.1-.8z" />,
    building: <path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16M15 9h4a1 1 0 0 1 1 1v11M3 21h18M8 8h3M8 12h3M8 16h3" />,
    user: <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4.5 20a7.5 7.5 0 0 1 15 0" />,
    plus: <path d="M12 5v14M5 12h14" />,
    pencil: <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z" />,
    trash: <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" />,
    arrowUp: <path d="M12 19V5M6 11l6-6 6 6" />,
    arrowDown: <path d="M12 5v14M6 13l6 6 6-6" />,
    arrowLeft: <path d="M19 12H5M11 6l-6 6 6 6" />,
    arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
    chevronLeft: <path d="m15 6-6 6 6 6" />,
    chevronRight: <path d="m9 6 6 6-6 6" />,
    logout: <path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 17l5-5-5-5M15 12H4" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="M6 6l12 12M18 6 6 18" />,
    eye: <path d="M2.5 12S6 5 12 5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />,
    eyeOff: <path d="M3 3l18 18M10.6 5.1A9.6 9.6 0 0 1 12 5c6 0 9.5 7 9.5 7a16 16 0 0 1-2.6 3.4M6.6 6.6C3.9 8.3 2.5 12 2.5 12S6 19 12 19a9.4 9.4 0 0 0 4.4-1.1M9.9 9.9a3 3 0 0 0 4.2 4.2" />,
    external: <path d="M14 4h6v6M20 4 10 14M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />,
    image: <path d="M4 5h16v14H4zM4 16l5-5 4 4 2-2 5 5M15 9.5h.01" />,
    search: <path d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4" />,
    check: <path d="m5 12 5 5L20 7" />,
    alert: <path d="M12 8v5M12 16.5h.01M10.3 3.9 2.6 17.5A2 2 0 0 0 4.3 20.5h15.4a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />,
    globe: <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />,
    paragraph: <path d="M4 6h16M4 10h16M4 14h16M4 18h10" />,
    heading: <path d="M6 4v16M18 4v16M6 12h12" />,
    quote: <path d="M9 7H5v6h4v-2a4 4 0 0 1-4 4M19 7h-4v6h4v-2a4 4 0 0 1-4 4" />,
    list: <path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01" />,
};

export type AdminIconName = keyof typeof paths;

export default function AdminIcon({ name, className }: { name: AdminIconName; className?: string }) {
    return(
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            {paths[name]}
        </svg>
    )
}
