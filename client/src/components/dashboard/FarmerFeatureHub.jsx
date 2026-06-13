import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Layers3, LoaderCircle } from "lucide-react";
import { platformFeatures } from "../../data/content";
import { api } from "../../services/api";
import DashboardEmptyState from "./DashboardEmptyState";
import DashboardPanelCard from "./DashboardPanelCard";

function buildFeaturePayload(feature, language) {
  return {
    feature: feature.title,
    crop: "Wheat",
    soilType: "loamy",
    season: "rabi",
    ph: 6.7,
    acreage: 2.5,
    waterAvailability: "medium",
    marketDemand: 78,
    rainfall: 76,
    soilMoisture: 41,
    demandIndex: 72,
    supplyIndex: 53,
    basePrice: 24,
    ndvi: 0.74,
    canopyTemperature: 29,
    moisture: 41,
    rainfallVariance: 18,
    pestRisk: 27,
    claimHistory: 1,
    irrigationDelayDays: 1,
    fertilizerDelayDays: 0,
    phone: "+91 9509868673",
    message: `${feature.title} request generated from farmer dashboard`,
    language,
    text: `${feature.title} advisory generated successfully.`,
    location: "Nashik, Maharashtra"
  };
}

function formatLabel(key) {
  return String(key)
    .replace(/([A-Z])/g, " $1")
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^\w/, (char) => char.toUpperCase());
}

function extractResult(response) {
  const payload = response?.data || response;
  return payload?.result || payload || null;
}

function renderValue(value) {
  if (Array.isArray(value)) {
    return (
      <div className="mt-3 grid gap-2">
        {value.map((item, index) => (
          <div
            key={`${index}-${typeof item}`}
            className="rounded-2xl bg-white px-3 py-2 text-sm leading-6 text-slate-700 dark:bg-white/6 dark:text-primary-50/90"
          >
            {typeof item === "string" ? item : JSON.stringify(item)}
          </div>
        ))}
      </div>
    );
  }

  if (value && typeof value === "object") {
    return (
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {Object.entries(value).map(([nestedKey, nestedValue]) => (
          <div
            key={nestedKey}
            className="rounded-2xl bg-white px-3 py-3 text-sm leading-6 text-slate-700 dark:bg-white/6 dark:text-primary-50/90"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-600 dark:text-primary-100/60">
              {formatLabel(nestedKey)}
            </p>
            <p className="mt-2">{String(nestedValue)}</p>
          </div>
        ))}
      </div>
    );
  }

  return <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-primary-50/90">{String(value)}</p>;
}

export default function FarmerFeatureHub({
  language = "en",
  copy,
  subscriptionPlan = "starter",
  selectedFeatureSlug,
  runToken = 0
}) {
  const [activeSlug, setActiveSlug] = useState(selectedFeatureSlug || platformFeatures[0].slug);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const selectedFeature = useMemo(
    () => platformFeatures.find((feature) => feature.slug === activeSlug) || platformFeatures[0],
    [activeSlug]
  );

  async function runFeature(feature) {
    setLoading(true);
    setError("");
    setActiveSlug(feature.slug);

    try {
      const response = await api.post(`/features/${feature.slug}/run`, buildFeaturePayload(feature, language));
      setResult(extractResult(response));
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!selectedFeatureSlug) {
      return;
    }

    const feature = platformFeatures.find((item) => item.slug === selectedFeatureSlug);

    if (feature) {
      runFeature(feature);
    }
  }, [selectedFeatureSlug, runToken]);

  return (
    <div className="grid gap-6 xl:grid-cols-[1.04fr_0.96fr]">
      <DashboardPanelCard
        id="farmer-features"
        title={copy.moduleHint}
        subtitle={copy.featureWorking}
        icon={Layers3}
        tooltip="Every feature keeps the same backend call and returns its existing live or fallback result."
        action={
          <div className="rounded-2xl bg-primary-500/10 px-4 py-3 text-sm font-semibold capitalize text-primary-700 dark:text-primary-200">
            Plan: {subscriptionPlan}
          </div>
        }
      >
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {platformFeatures.map((feature) => {
            const Icon = feature.icon;
            const friendly = copy.featureLabels[feature.slug] || {
              title: `${feature.emoji || ""} ${feature.title}`.trim(),
              helper: feature.description
            };
            const selected = activeSlug === feature.slug;

            return (
              <button
                id={`feature-${feature.slug}`}
                key={feature.slug}
                type="button"
                onClick={() => runFeature(feature)}
                className={`group rounded-[26px] border p-4 text-left transition ${
                  selected
                    ? "border-primary-500 bg-primary-50 shadow-[0_18px_40px_rgba(52,158,97,0.12)] dark:bg-primary-500/10"
                    : "border-slate-200/80 bg-slate-50 hover:-translate-y-1 hover:border-primary-400/35 dark:border-white/10 dark:bg-white/5"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-500/12 text-primary-700 dark:text-primary-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:bg-white/10 dark:text-slate-300">
                    {feature.tag}
                  </span>
                </div>
                <p className="mt-4 text-lg font-bold text-slate-900 dark:text-white">{friendly.title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{friendly.helper}</p>
              </button>
            );
          })}
        </div>
      </DashboardPanelCard>

      <DashboardPanelCard
        title={(copy.featureLabels[selectedFeature.slug]?.title || selectedFeature.title).replace(/^[^\p{L}\p{N}]+\s*/u, "")}
        subtitle={copy.latestResult}
        tooltip="The selected feature result is shown here with the same API response data, only in a cleaner layout."
        action={
          <button
            type="button"
            onClick={() => runFeature(selectedFeature)}
            className="inline-flex items-center gap-2 rounded-2xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-500"
          >
            {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
            {copy.runAgain}
          </button>
        }
      >
        {loading ? (
          <div className="grid gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-16 animate-pulse rounded-2xl bg-slate-100 dark:bg-white/8" />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-[20px] border border-red-200 bg-red-50 p-4 text-sm leading-7 text-red-700 dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-100">
            {error}
          </div>
        ) : result ? (
          <div className="grid gap-3">
            {Object.entries(result).map(([key, value]) => (
              <div
                key={key}
                className="rounded-[20px] border border-slate-200/80 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-700 dark:text-primary-200">
                  {formatLabel(key)}
                </p>
                <div className="text-slate-700 dark:text-slate-200">{renderValue(value)}</div>
              </div>
            ))}
          </div>
        ) : (
          <DashboardEmptyState
            title="No data available"
            description={copy.resultPlaceholder}
          />
        )}
      </DashboardPanelCard>
    </div>
  );
}
