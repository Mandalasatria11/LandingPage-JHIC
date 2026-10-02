import { createContext, useContext } from "react";

export type AdminUser = {
    id: number;
    name: string;
    email: string;
};

// checking = token tersimpan sedang diperiksa ke server saat panel admin pertama dibuka
export type AuthStatus = "checking" | "authenticated" | "guest";

export type AuthContextValue = {
    user: AdminUser | null;
    status: AuthStatus;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    setUser: (user: AdminUser) => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth harus dipakai di dalam AuthProvider");
    return context;
}
