import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// BrowserRouter tidak mereset posisi scroll, jadi halaman baru bisa terbuka di tengah
export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
