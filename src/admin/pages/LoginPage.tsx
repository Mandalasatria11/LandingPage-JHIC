import { useState, type FormEvent } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/auth-context";
import AdminIcon from "../components/AdminIcon";
import Field from "../components/Field";
import Spinner from "../components/Spinner";
import { buttonPrimary, inputClass } from "../components/ui";
import { useDocumentTitle } from "../lib/format";
import { ApiError } from "../../lib/api";
import logoSekolah from "../../assets/images/logosmkpenus.png";

export default function LoginPage() {
    useDocumentTitle("Masuk");
    const { status, login } = useAuth();
    const location = useLocation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [message, setMessage] = useState<string | null>(null);

    // Kembali ke halaman yang tadi ingin dibuka sebelum diarahkan ke sini
    const from = (location.state as { from?: string } | null)?.from ?? "/admin";

    if (status === "authenticated") return <Navigate to={from} replace />;

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setErrors({});
        setMessage(null);

        try {
            await login(email, password);
        } catch (error) {
            if (error instanceof ApiError && error.status === 422) setErrors(error.errors);
            else setMessage(error instanceof ApiError ? error.message : "Gagal masuk. Coba lagi.");
        } finally {
            setSubmitting(false);
        }
    };

    return(
        <main className="relative flex min-h-svh items-center justify-center overflow-hidden bg-brand-ink bg-[radial-gradient(ellipse_at_top_right,var(--color-brand-deepred),transparent_65%)] px-4 py-12 text-left">
            {/* Dekorasi titik-titik, sama seperti halaman situs */}
            <div aria-hidden="true" className="pointer-events-none absolute left-6 bottom-16 hidden md:block w-40 h-28 bg-[radial-gradient(circle,rgb(255_255_255/0.1)_2px,transparent_2.5px)] bg-size-[22px_22px]" />

            <div className="relative w-full max-w-md animate-fade-up">
                <div className="mb-8 flex flex-col items-center text-center text-white">
                    <img src={logoSekolah} alt="" className="h-16 w-16 object-contain" />
                    <h1 className="mt-4 font-display text-3xl font-bold uppercase tracking-wide">Panel Admin</h1>
                    <p className="mt-1 text-sm text-brand-mist/70">SMK Plus Pelita Nusantara</p>
                </div>

                <form onSubmit={submit} noValidate className="rounded-card bg-white p-6 text-brand-ink shadow-2xl sm:p-8">
                    <p className="text-sm leading-relaxed text-brand-ink/65">Masuk untuk mengelola berita, program unggulan, dan fasilitas di situs sekolah.</p>

                    {message && (
                        <p role="alert" className="mt-5 flex items-start gap-2 rounded-xl bg-brand-signal/10 px-4 py-3 text-sm text-brand-signal">
                            <AdminIcon name="alert" className="mt-0.5 w-4 h-4 shrink-0" />
                            {message}
                        </p>
                    )}

                    <div className="mt-6 space-y-5">
                        <Field label="Email" htmlFor="email" error={errors.email?.[0]}>
                            <input
                                id="email"
                                type="email"
                                autoComplete="username"
                                required
                                autoFocus
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                aria-invalid={errors.email ? true : undefined}
                                className={inputClass}
                            />
                        </Field>

                        <Field label="Kata Sandi" htmlFor="password" error={errors.password?.[0]}>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    aria-invalid={errors.password ? true : undefined}
                                    className={`${inputClass} pr-12`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                                    aria-pressed={showPassword}
                                    className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-brand-ink/50 hover:text-brand-ink"
                                >
                                    <AdminIcon name={showPassword ? "eyeOff" : "eye"} className="w-5 h-5" />
                                </button>
                            </div>
                        </Field>
                    </div>

                    <button type="submit" disabled={submitting} className={`${buttonPrimary} mt-8 w-full py-3`}>
                        {submitting && <Spinner className="w-4 h-4" label="Sedang masuk" />}
                        Masuk
                    </button>
                </form>

                <p className="mt-6 text-center">
                    <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-mist/70 transition-colors hover:text-white">
                        <AdminIcon name="chevronLeft" className="w-4 h-4" />
                        Kembali ke situs
                    </Link>
                </p>
            </div>
        </main>
    )
}
