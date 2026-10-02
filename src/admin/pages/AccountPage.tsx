import { useState, type FormEvent } from "react";
import { useAuth, type AdminUser } from "../auth/auth-context";
import Field from "../components/Field";
import PageHeader from "../components/PageHeader";
import Spinner from "../components/Spinner";
import { buttonPrimary, cardClass, inputClass } from "../components/ui";
import { useToast } from "../toast/toast-context";
import { useDocumentTitle } from "../lib/format";
import { scrollToFirstError } from "../lib/forms";
import { ApiError, apiRequest, type Resource } from "../../lib/api";

export default function AccountPage() {
    useDocumentTitle("Akun");
    const { user, setUser } = useAuth();
    const toast = useToast();

    const [name, setName] = useState(user?.name ?? "");
    const [email, setEmail] = useState(user?.email ?? "");
    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [saving, setSaving] = useState(false);

    const err = (key: string) => errors[key]?.[0];

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setErrors({});

        try {
            const response = await apiRequest<Resource<AdminUser>>("/admin/profile", {
                method: "PUT",
                body: {
                    name: name.trim(),
                    email: email.trim(),
                    current_password: currentPassword,
                    password,
                    password_confirmation: passwordConfirmation,
                },
            });
            setUser(response.data);
            toast.success(password ? "Akun disimpan. Perangkat lain yang masuk dengan akun ini telah dikeluarkan." : "Akun disimpan.");
            setCurrentPassword("");
            setPassword("");
            setPasswordConfirmation("");
        } catch (error) {
            if (error instanceof ApiError) {
                setErrors(error.errors);
                toast.error(error.status === 422 ? "Periksa kembali isian yang ditandai merah." : error.message);
                scrollToFirstError();
            }
        } finally {
            setSaving(false);
        }
    };

    return(
        <>
            <PageHeader title="Akun" description="Ubah nama, email masuk, dan kata sandi akun admin Anda." />

            <form onSubmit={submit} noValidate className="max-w-2xl space-y-6">
                <section className={`${cardClass} space-y-5 p-5 sm:p-6`} aria-labelledby="profile-heading">
                    <h2 id="profile-heading" className="font-semibold">Profil</h2>
                    <Field label="Nama" htmlFor="name" error={err("name")}>
                        <input id="name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" maxLength={255} aria-invalid={err("name") ? true : undefined} className={inputClass} />
                    </Field>
                    <Field label="Email" htmlFor="email" error={err("email")} hint="Dipakai untuk masuk ke panel admin.">
                        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" maxLength={255} aria-invalid={err("email") ? true : undefined} className={inputClass} />
                    </Field>
                </section>

                <section className={`${cardClass} space-y-5 p-5 sm:p-6`} aria-labelledby="password-heading">
                    <div>
                        <h2 id="password-heading" className="font-semibold">Ganti Kata Sandi</h2>
                        <p className="mt-1 text-xs text-brand-ink/55">Kosongkan bila tidak ingin mengganti kata sandi.</p>
                    </div>
                    <Field label="Kata Sandi Saat Ini" htmlFor="current_password" error={err("current_password")}>
                        <input id="current_password" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} autoComplete="current-password" aria-invalid={err("current_password") ? true : undefined} className={inputClass} />
                    </Field>
                    <div className="grid gap-5 sm:grid-cols-2">
                        <Field label="Kata Sandi Baru" htmlFor="password" error={err("password")} hint="Minimal 8 karakter.">
                            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" aria-invalid={err("password") ? true : undefined} className={inputClass} />
                        </Field>
                        <Field label="Ulangi Kata Sandi Baru" htmlFor="password_confirmation">
                            <input id="password_confirmation" type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} autoComplete="new-password" className={inputClass} />
                        </Field>
                    </div>
                </section>

                <button type="submit" disabled={saving} className={buttonPrimary}>
                    {saving && <Spinner className="w-4 h-4" label="Menyimpan" />}
                    Simpan Akun
                </button>
            </form>
        </>
    )
}
