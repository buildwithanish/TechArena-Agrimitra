import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Bot, Clock3, LoaderCircle, RefreshCw, Sparkles, Upload, Wand2 } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import VoiceInputButton from "../components/VoiceInputButton";
import DashboardEmptyState from "../components/dashboard/DashboardEmptyState";
import DashboardPanelCard from "../components/dashboard/DashboardPanelCard";
import DashboardSkeleton from "../components/dashboard/DashboardSkeleton";
import DashboardStatCard from "../components/dashboard/DashboardStatCard";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/api";
import { platformFeatures } from "../data/content";
import { getFarmerCopy, normalizeLanguage } from "../data/languages";
import { getFeatureProfile } from "../data/featureDetailConfig";

function toNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : value;
}

function formatLabel(value) {
  return String(value)
    .replace(/([A-Z])/g, " $1")
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^\w/, (char) => char.toUpperCase());
}

function unwrapResult(response) {
  const payload = response?.data ?? response;

  if (payload?.result !== undefined) {
    return payload.result;
  }

  if (payload?.data?.result !== undefined) {
    return payload.data.result;
  }

  if (payload?.data !== undefined) {
    return payload.data;
  }

  return payload;
}

function buildSummary(slug, result) {
  if (!result) {
    return "No result";
  }

  switch (slug) {
    case "ai-crop-planning":
      return result.summary || result.recommendations?.[0]?.rationale || "Crop plan ready.";
    case "fertilizer-optimization":
      return result.insight || result.plan?.bioStimulent || "Fertilizer plan ready.";
    case "pest-detection":
      return result.action || `${result.detectedPest || "Pest"} detected.`;
    case "yield-prediction":
      return result.projectedYield || "Yield forecast ready.";
    case "market-price-prediction":
      return `${result.predictedPrice || "Price"} • ${result.recommendedWindow || "Window ready"}`;
    case "insurance-predictor":
      return `${result.riskBand || "Risk"} · ${result.premiumGuidance || ""}`.trim();
    case "digital-twin":
      return `${result.yieldRetention || ""} yield retention`.trim();
    case "weather-data":
      return result.advisory || result.condition || "Weather snapshot ready.";
    case "whatsapp-ai":
      return result.preview || "WhatsApp update ready.";
    case "voice-ai":
      return result.transcript || "Voice response ready.";
    case "alerts-system":
      return result.message || result.title || "Alert queued.";
    case "subscription-billing":
      return `Plan ${result.plan || "starter"} is ready.`;
    default:
      if (Array.isArray(result.recommendations) && result.recommendations.length) {
        return result.recommendations[0]?.rationale || "Result ready.";
      }

      const primitive = Object.entries(result).find(([, value]) => typeof value === "string" || typeof value === "number");
      return primitive ? `${formatLabel(primitive[0])}: ${primitive[1]}` : "Result ready.";
  }
}

function loadHistory(slug) {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = localStorage.getItem(`aivillagebrain-feature-history:${slug}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveHistory(slug, entries) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(`aivillagebrain-feature-history:${slug}`, JSON.stringify(entries));
}

function FieldControl({ field, value, onChange, onFileChange }) {
  const baseClass =
    "mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-primary-500 dark:border-white/10 dark:bg-white/5 dark:text-white";

  if (field.type === "textarea") {
    return (
      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
        {field.label}
        <textarea
          value={value || ""}
          onChange={(event) => onChange(field.name, event.target.value)}
          placeholder={field.placeholder}
          className={`${baseClass} min-h-[120px] resize-none`}
        />
      </label>
    );
  }

  if (field.type === "select") {
    return (
      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
        {field.label}
        <select
          value={value ?? ""}
          onChange={(event) => onChange(field.name, event.target.value)}
          className={baseClass}
        >
          {(field.options || []).map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (field.type === "file") {
    return (
      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
        {field.label}
        <div className="mt-2 flex items-center gap-3 rounded-2xl border border-dashed border-primary-200 bg-primary-50/70 px-4 py-4 dark:border-white/10 dark:bg-white/5">
          <Upload className="h-4 w-4 text-primary-600 dark:text-primary-300" />
          <span className="text-sm text-slate-600 dark:text-slate-300">
            {value?.name || "Drop a photo or choose a file"}
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={(event) => onFileChange(field.name, event.target.files?.[0] || null)}
            className="ml-auto max-w-[150px] text-xs text-slate-500 file:mr-3 file:rounded-xl file:border-0 file:bg-primary-600 file:px-3 file:py-2 file:text-white"
          />
        </div>
      </label>
    );
  }

  return (
    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
      {field.label}
      <input
        type={field.type === "number" ? "number" : "text"}
        step={field.step}
        value={value ?? ""}
        onChange={(event) => onChange(field.name, field.type === "number" ? toNumber(event.target.value) : event.target.value)}
        placeholder={field.placeholder}
        className={baseClass}
      />
    </label>
  );
}

export default function FeatureDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { i18n } = useTranslation();
  const language = normalizeLanguage(user?.language || i18n.language);
  const copy = useMemo(() => getFarmerCopy(language), [language]);
  const selectedFeature = useMemo(
    () => platformFeatures.find((feature) => feature.slug === slug) || null,
    [slug]
  );
  const profile = useMemo(() => getFeatureProfile(slug), [slug]);
  const [form, setForm] = useState(profile?.defaultValues || {});
  const [fileMap, setFileMap] = useState({});
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState(loadHistory(slug));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!selectedFeature || !profile) {
      return;
    }

    setForm(profile.defaultValues || {});
    setFileMap({});
    setResult(null);
    setError("");
    setHistory(loadHistory(slug));
  }, [slug, profile, selectedFeature]);

  useEffect(() => {
    if (!slug) {
      return;
    }

    saveHistory(slug, history);
  }, [history, slug]);

  if (!selectedFeature || !profile) {
    return (
      <div className="section-shell pb-16 pt-8">
        <DashboardEmptyState
          title="Feature not found"
          description="Go back to the features page and pick another module."
        />
      </div>
    );
  }

  function updateField(name, nextValue) {
    setForm((current) => ({ ...current, [name]: nextValue }));
  }

  function updateFile(name, file) {
    setFileMap((current) => ({ ...current, [name]: file }));
  }

  function runSubmission() {
    if (!user) {
      navigate("/login", { state: { from: `/features/${slug}` } });
      return;
    }

    return submitFeature();
  }

  async function submitFeature(quickText = "") {
    setLoading(true);
    setError("");

    const nextForm = quickText ? { ...form, text: quickText, message: quickText, prompt: quickText } : form;

    try {
      let response;

      switch (slug) {
        case "pest-detection": {
          const payload = new FormData();
          payload.append("crop", String(nextForm.crop || "Wheat"));
          payload.append("symptoms", String(nextForm.symptoms || quickText || "Brown spots on lower leaves"));
          payload.append("language", language);

          if (fileMap.image) {
            payload.append("image", fileMap.image);
          }

          response = await api.post("/ai/pest-detection", payload);
          break;
        }
        case "weather-data":
          response = await api.get(`/integrations/weather?location=${encodeURIComponent(nextForm.location || "Nashik, Maharashtra")}`);
          break;
        case "whatsapp-ai":
          response = await api.post("/integrations/whatsapp", {
            phone: nextForm.phone || "+91 9509868673",
            message: nextForm.message || quickText || "Need crop advice",
            language
          });
          break;
        case "voice-ai":
        case "ivr-system":
          response = await api.post("/integrations/voice", {
            text: nextForm.text || nextForm.message || quickText || "Need crop advice",
            language
          });
          break;
        case "alerts-system":
          response = await api.post("/integrations/firebase", {
            topic: nextForm.topic || "farmer-alerts",
            title: nextForm.title || "AI Village Brain Alert",
            message: nextForm.message || quickText || "A new advisory is available.",
            language
          });
          break;
        default:
          response = await api.post(`/features/${slug}/run`, {
            ...nextForm,
            language
          });
          break;
      }

      const resolved = unwrapResult(response);
      setResult(resolved);

      const nextHistory = [
        {
          id: `${slug}-${Date.now()}`,
          createdAt: new Date().toISOString(),
          summary: buildSummary(slug, resolved),
          input: nextForm,
          result: resolved
        },
        ...history
      ].slice(0, 8);

      setHistory(nextHistory);
      saveHistory(slug, nextHistory);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  const stats = [
    { label: "Module", value: selectedFeature.title, helper: profile.kicker },
    { label: "Saved runs", value: history.length, helper: "Local history" },
    { label: "Language", value: language.toUpperCase(), helper: "Profile language" }
  ];

  const latestSummary = result ? buildSummary(slug, result) : "Run the module to see a response.";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      className="section-shell pb-16 pt-8"
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => navigate("/features")}
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-primary-300 dark:border-white/10 dark:bg-white/5 dark:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to modules
        </button>
        {location.state?.from && (
          <button
            type="button"
            onClick={() => navigate(location.state.from)}
            className="inline-flex items-center gap-2 rounded-2xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-500"
          >
            Continue where you left off
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>

      <DashboardPanelCard className="bg-[linear-gradient(135deg,rgba(241,251,244,0.96),rgba(255,255,255,0.98))] dark:bg-[linear-gradient(135deg,rgba(30,80,52,0.48),rgba(7,23,15,0.88))]">
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-700 dark:text-primary-200">
                <Sparkles className="h-3.5 w-3.5" />
                {profile.kicker}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-white/10 dark:text-slate-300">
                {selectedFeature.tag}
              </span>
              <span className="rounded-full bg-primary-500/10 px-3 py-1 text-xs font-semibold text-primary-700 dark:text-primary-200">
                {copy.liveMode}
              </span>
            </div>

            <h1 className="mt-5 font-display text-4xl font-bold text-slate-950 dark:text-white sm:text-5xl">
              {selectedFeature.title}
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-600 dark:text-slate-300">
              {profile.subtitle}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {(profile.highlights || []).map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-primary-200 bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary-700 dark:border-white/10 dark:bg-white/5 dark:text-primary-200"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {stats.map((stat, index) => (
              <DashboardStatCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
                helper={stat.helper}
                icon={index === 0 ? Wand2 : index === 1 ? Clock3 : Bot}
                tone={index === 0 ? "accent" : index === 1 ? "success" : "default"}
              />
            ))}
          </div>
        </div>
      </DashboardPanelCard>

      {!user && (
        <div className="mt-6 rounded-[28px] border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-semibold text-amber-800 dark:border-amber-400/20 dark:bg-amber-500/10 dark:text-amber-100">
          Sign in to run the live backend workflow. You can still review the page and feature details now.
        </div>
      )}

      {error && (
        <div className="mt-6 rounded-[28px] border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700 dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-100">
          {error}
        </div>
      )}

      <div className="mt-6 grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <DashboardPanelCard
          title={`${selectedFeature.title} input`}
          subtitle="Fill the form and run the existing backend API"
          icon={Wand2}
          action={
            <button
              type="button"
              onClick={runSubmission}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-2xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-500 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              Run module
            </button>
          }
        >
          {loading ? (
            <DashboardSkeleton panels={1} />
          ) : (
            <div className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                {(profile.fields || []).map((entry) => (
                  <FieldControl
                    key={entry.name}
                    field={entry}
                    value={entry.type === "file" ? fileMap[entry.name] : form[entry.name]}
                    onChange={updateField}
                    onFileChange={updateFile}
                  />
                ))}
              </div>

              <div className="rounded-[26px] border border-slate-200/80 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
                <div className="flex flex-wrap gap-2">
                  {(profile.quickPrompts || []).map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => submitFeature(prompt)}
                      className="rounded-full bg-primary-500/10 px-3 py-1.5 text-xs font-semibold text-primary-700 transition hover:bg-primary-500/20 dark:text-primary-200"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <VoiceInputButton
                      compact
                      label="Voice input"
                      onTranscript={(transcript) => {
                        updateField("text", transcript);
                        updateField("message", transcript);
                      }}
                    />
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                      Simple AI workflow
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={runSubmission}
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-2xl border border-primary-200 bg-white px-4 py-3 text-sm font-semibold text-primary-700 transition hover:border-primary-400/40 hover:text-primary-600 disabled:opacity-70 dark:border-white/10 dark:bg-white/5 dark:text-primary-200"
                  >
                    {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
                    {user ? "Generate result" : "Login to run"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </DashboardPanelCard>

        <div className="space-y-4">
          <DashboardPanelCard
            title="Latest result"
            subtitle={latestSummary}
            icon={Sparkles}
          >
            {result ? (
              <div className="space-y-3">
                {Object.entries(result).map(([key, value]) => (
                  <div
                    key={key}
                    className="rounded-[22px] border border-slate-200/80 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-700 dark:text-primary-200">
                      {formatLabel(key)}
                    </p>
                    <div className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {Array.isArray(value) ? (
                        <div className="grid gap-2">
                          {value.map((item, index) => (
                            <div
                              key={`${key}-${index}`}
                              className="rounded-2xl bg-white px-3 py-2 dark:bg-white/5"
                            >
                              {typeof item === "object" ? JSON.stringify(item) : String(item)}
                            </div>
                          ))}
                        </div>
                      ) : typeof value === "object" && value ? (
                        <div className="grid gap-2 sm:grid-cols-2">
                          {Object.entries(value).map(([nestedKey, nestedValue]) => (
                            <div key={nestedKey} className="rounded-2xl bg-white px-3 py-3 dark:bg-white/5">
                              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-600 dark:text-primary-200">
                                {formatLabel(nestedKey)}
                              </p>
                              <p className="mt-1">{String(nestedValue)}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        String(value)
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <DashboardEmptyState
                title="No data yet"
                description={copy.resultPlaceholder}
              />
            )}
          </DashboardPanelCard>

          <DashboardPanelCard
            title="Recent history"
            subtitle="Saved runs for this module"
            icon={Clock3}
          >
            {history.length ? (
              <div className="space-y-3">
                {history.map((entry) => (
                  <div
                    key={entry.id}
                    className="rounded-[22px] border border-slate-200/80 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">{entry.summary}</p>
                        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                          {new Date(entry.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setResult(entry.result)}
                        className="rounded-full bg-primary-500/10 px-3 py-1.5 text-xs font-semibold text-primary-700 transition hover:bg-primary-500/20 dark:text-primary-200"
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <DashboardEmptyState
                title="No history saved"
                description="Run this module once to save results here."
              />
            )}
          </DashboardPanelCard>
        </div>
      </div>
    </motion.div>
  );
}
