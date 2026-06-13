import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck, Sprout } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import GlassPanel from "../components/GlassPanel";
import LanguageMenu from "../components/LanguageMenu";

const quickAccessAccounts = [
  { role: "Farmer", email: "farmer@aivillagebrain.com", password: "Farmer@123" },
  { role: "Admin", email: "admin@aivillagebrain.com", password: "Admin@123" }
];

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { login, signup } = useAuth();
  const [mode, setMode] = useState("login");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: quickAccessAccounts[0].email,
    password: quickAccessAccounts[0].password,
    role: "farmer"
  });

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setPending(true);
    setError("");

    try {
      const user =
        mode === "login"
          ? await login({ email: form.email, password: form.password })
          : await signup(form);

      const returnTo = location.state?.from;
      navigate(returnTo || (user.role === "admin" ? "/admin" : "/dashboard"), { replace: true });
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setPending(false);
    }
  }

  function fillQuickAccess(account) {
    setMode("login");
    setForm((current) => ({
      ...current,
      email: account.email,
      password: account.password,
      role: account.role.toLowerCase()
    }));
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      className="section-shell pb-16 pt-8"
    >
      <div className="mb-4 flex justify-end">
        <LanguageMenu />
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[34px] bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 p-8 text-white shadow-[0_35px_90px_rgba(7,23,15,0.32)]">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-white/10">
            <Sprout className="h-7 w-7" />
          </div>
          <h1 className="mt-8 font-display text-4xl font-bold">{t("auth.title")}</h1>
          <p className="mt-4 max-w-xl text-base leading-8 text-primary-100/80">{t("auth.subtitle")}</p>

          <div className="mt-10 space-y-4">
            {[
              "JWT authentication with Admin / Farmer role access",
              "Live dashboards, charts, AI modules, and real-time alert workflows",
              "Premium startup-style UI for pilots and production extension"
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-[24px] border border-white/10 bg-white/5 px-4 py-4">
                <CheckCircle2 className="mt-1 h-5 w-5 text-primary-200" />
                <p className="text-sm leading-7 text-primary-50/90">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-[28px] border border-white/10 bg-white/6 p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-primary-100/60">Quick access credentials</p>
            <div className="mt-4 space-y-3">
              {quickAccessAccounts.map((account) => (
                <button
                  key={account.role}
                  type="button"
                  onClick={() => fillQuickAccess(account)}
                  className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left transition hover:bg-white/10"
                >
                  <div>
                    <p className="font-semibold">{account.role}</p>
                    <p className="text-sm text-primary-100/70">{account.email}</p>
                  </div>
                  <ShieldCheck className="h-5 w-5 text-accent-300" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <GlassPanel className="rounded-[34px] p-8">
          <div className="flex gap-3 rounded-[22px] bg-slate-100/80 p-2 dark:bg-white/5">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`flex-1 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                mode === "login"
                  ? "bg-primary-600 text-white"
                  : "text-slate-600 dark:text-slate-300"
              }`}
            >
              {t("auth.login")}
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`flex-1 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                mode === "signup"
                  ? "bg-primary-600 text-white"
                  : "text-slate-600 dark:text-slate-300"
              }`}
            >
              {t("auth.signup")}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {mode === "signup" && (
              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Full name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={updateField}
                  placeholder="Aditi Sharma"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-primary-500 dark:border-white/10 dark:bg-white/5"
                  required
                />
              </div>
            )}

            <div>
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={updateField}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-primary-500 dark:border-white/10 dark:bg-white/5"
                required
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={updateField}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-primary-500 dark:border-white/10 dark:bg-white/5"
                required
              />
            </div>

            {mode === "signup" && (
              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Role</label>
                <select
                  name="role"
                  value={form.role}
                  onChange={updateField}
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-primary-500 dark:border-white/10 dark:bg-white/5"
                >
                  <option value="farmer">Farmer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            )}

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-300">
                {error}
              </div>
            )}

            <p className="text-xs leading-6 text-slate-500 dark:text-slate-400">
              Local mode uses `http://localhost:5000`. Live mode uses the Vercel proxy or the Render backend
              automatically.
            </p>

            <button
              type="submit"
              disabled={pending}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary-600 px-4 py-3 font-semibold text-white transition hover:bg-primary-500 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {pending ? "Please wait..." : mode === "login" ? "Access workspace" : "Create workspace"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </GlassPanel>
      </div>
    </motion.div>
  );
}
