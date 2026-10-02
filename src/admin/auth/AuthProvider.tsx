import { useEffect, useState, type ReactNode } from "react";
import { AuthContext, type AdminUser, type AuthStatus } from "./auth-context";
import { apiRequest, getToken, onUnauthorized, setToken, type Resource } from "../../lib/api";
import { invalidateApiCache } from "../../lib/useApi";

type LoginResponse = { token: string; user: AdminUser };

// Login admin memakai token API Sanctum: token disimpan di localStorage dan dikirim di header Authorization.
// Token berlaku 7 hari; kalau ditolak server (kedaluwarsa/dicabut), admin otomatis diarahkan ke halaman masuk.
export default function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AdminUser | null>(null);
    const [status, setStatus] = useState<AuthStatus>(() => (getToken() ? "checking" : "guest"));

    // Periksa token tersimpan saat panel dibuka
    useEffect(() => {
        if (!getToken()) return;

        let cancelled = false;
        apiRequest<Resource<AdminUser>>("/admin/me").then(
            (response) => {
                if (cancelled) return;
                setUser(response.data);
                setStatus("authenticated");
            },
            () => {
                if (cancelled) return;
                setToken(null);
                setStatus("guest");
            },
        );

        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => onUnauthorized(() => {
        setToken(null);
        setUser(null);
        setStatus("guest");
        invalidateApiCache("/admin");
    }), []);

    const login = async (email: string, password: string) => {
        const response = await apiRequest<LoginResponse>("/admin/login", { method: "POST", body: { email, password } });
        setToken(response.token);
        setUser(response.user);
        setStatus("authenticated");
    };

    const logout = async () => {
        try {
            await apiRequest("/admin/logout", { method: "POST" });
        } catch {
            // Token sudah tidak berlaku di server, cukup dihapus di browser
        } finally {
            setToken(null);
            setUser(null);
            setStatus("guest");
            invalidateApiCache("/admin");
        }
    };

    return(
        <AuthContext.Provider value={{ user, status, login, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}
