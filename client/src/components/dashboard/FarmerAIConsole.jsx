import { useEffect, useMemo, useState } from "react";
import { Bot, ImagePlus, LoaderCircle, Send, Sparkles } from "lucide-react";
import VoiceInputButton from "../VoiceInputButton";
import { api } from "../../services/api";
import DashboardPanelCard from "./DashboardPanelCard";

const actions = [
  {
    id: "crop",
    endpoint: "/ai/crop-recommendation",
    buildPayload: (form, language) => ({
      crop: form.crop,
      soilType: form.soilType,
      season: form.season,
      ph: form.ph,
      waterAvailability: form.waterAvailability,
      marketDemand: 78,
      language
    })
  },
  {
    id: "fertilizer",
    endpoint: "/ai/fertilizer-optimization",
    buildPayload: (form, language) => ({
      crop: form.crop,
      acreage: form.acreage,
      nitrogen: 42,
      phosphorous: 27,
      potassium: 24,
      language
    })
  },
  { id: "pest", endpoint: "/ai/pest-detection", usesFormData: true },
  {
    id: "yield",
    endpoint: "/ai/yield-prediction",
    buildPayload: (form, language) => ({
      crop: form.crop,
      acreage: form.acreage,
      historicalYield: 30,
      rainfall: 76,
      soilMoisture: 41,
      language
    })
  },
  {
    id: "market",
    endpoint: "/ai/market-price-prediction",
    buildPayload: (form, language) => ({
      crop: form.crop,
      demandIndex: 72,
      supplyIndex: 53,
      basePrice: 24,
      language
    })
  },
  {
    id: "health",
    endpoint: "/ai/crop-health-score",
    buildPayload: (_, language) => ({
      ndvi: 0.74,
      canopyTemperature: 29,
      moisture: 41,
      language
    })
  },
  {
    id: "insurance",
    endpoint: "/ai/insurance-risk",
    buildPayload: (_, language) => ({
      rainfallVariance: 18,
      pestRisk: 27,
      claimHistory: 1,
      language
    })
  },
  {
    id: "digital-twin",
    endpoint: "/ai/digital-twin",
    buildPayload: (form, language) => ({
      crop: form.crop,
      acreage: form.acreage,
      irrigationDelayDays: 1,
      fertilizerDelayDays: 0,
      language
    })
  }
];

function inferAction(text) {
  const prompt = String(text || "").toLowerCase();

  if (prompt.includes("pest") || prompt.includes("disease") || prompt.includes("photo")) return "pest";
  if (prompt.includes("price") || prompt.includes("market") || prompt.includes("mandi")) return "market";
  if (prompt.includes("fertilizer") || prompt.includes("urea") || prompt.includes("npk")) return "fertilizer";
  if (prompt.includes("yield") || prompt.includes("harvest")) return "yield";
  if (prompt.includes("risk") || prompt.includes("insurance")) return "insurance";
  if (prompt.includes("health") || prompt.includes("satellite")) return "health";
  if (prompt.includes("simulate") || prompt.includes("twin")) return "digital-twin";

  return "crop";
}

function createSummary(actionId, data) {
  switch (actionId) {
    case "crop":
      return data.summary || data.recommendations?.[0]?.rationale || "Crop plan ready.";
    case "fertilizer":
      return data.insight || `Nitrogen ${data.plan?.nitrogenKg} kg suggested.`;
    case "pest":
      return data.action || `${data.detectedPest} detected with ${data.confidence} confidence.`;
    case "yield":
      return `${data.projectedYield} expected with ${data.confidence} confidence.`;
    case "market":
      return `${data.predictedPrice} expected. ${data.recommendedWindow}`;
    case "health":
      return `${data.score} health score. ${data.note}`;
    case "insurance":
      return `${data.riskBand} risk. ${data.premiumGuidance}`;
    case "digital-twin":
      return `${data.yieldRetention} yield retained. ${data.actions?.[0] || ""}`.trim();
    default:
      return "AI answer is ready.";
  }
}

export default function FarmerAIConsole({ language = "en", copy, promptSeed, onVoiceQuery }) {
  const [selectedAction, setSelectedAction] = useState("crop");
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [error, setError] = useState("");
  const [messages, setMessages] = useState([
    { id: "welcome", sender: "assistant", title: copy.aiPanelTitle, text: copy.aiPanelHint }
  ]);
  const [form, setForm] = useState({
    crop: "Wheat",
    soilType: "loamy",
    season: "rabi",
    ph: 6.7,
    waterAvailability: "medium",
    acreage: 2,
    symptoms: "brown spots on lower leaf",
    file: null
  });

  const action = useMemo(
    () => actions.find((item) => item.id === selectedAction) || actions[0],
    [selectedAction]
  );

  useEffect(() => {
    if (!promptSeed?.id) {
      return;
    }

    setQuestion(promptSeed.text || "");

    if (promptSeed.actionId) {
      setSelectedAction(promptSeed.actionId);
    }
  }, [promptSeed]);

  function updateField(event) {
    const { name, value, files } = event.target;
    setForm((current) => ({
      ...current,
      [name]: files ? files[0] : value
    }));
  }

  async function runAssistant(overrideQuestion, overrideActionId) {
    const promptText = String(overrideQuestion ?? question).trim();
    const actionId = overrideActionId || selectedAction || inferAction(promptText);
    const targetAction = actions.find((item) => item.id === actionId) || actions[0];

    if (!promptText && !targetAction.usesFormData) {
      return;
    }

    setSelectedAction(actionId);
    setLoading(true);
    setError("");
    setMessages((current) => [
      ...current,
      { id: `${Date.now()}-user`, sender: "user", text: promptText || copy.featureWorking }
    ]);

    try {
      let response;

      if (targetAction.usesFormData) {
        const payload = new FormData();
        payload.append("crop", form.crop);
        payload.append("symptoms", promptText || form.symptoms);
        payload.append("language", language);

        if (form.file) {
          payload.append("image", form.file);
        }

        response = await api.post(targetAction.endpoint, payload);
      } else {
        response = await api.post(targetAction.endpoint, targetAction.buildPayload(form, language));
      }

      const data = response.data || response;
      setMessages((current) => [
        ...current,
        {
          id: `${Date.now()}-assistant`,
          sender: "assistant",
          title: copy.aiActions[actionId],
          text: createSummary(actionId, data),
          details: data
        }
      ]);
      setQuestion("");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <DashboardPanelCard
        title={copy.aiPanelTitle}
        subtitle={copy.aiPanelHint}
        icon={Bot}
        tooltip="This assistant still uses the same feature APIs underneath. The redesign only changes the presentation."
      >
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {actions.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedAction(item.id)}
              className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                item.id === selectedAction
                  ? "border-primary-500 bg-primary-500/10 text-primary-700 dark:text-primary-200"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:border-primary-500/30 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
              }`}
            >
              {copy.aiActions[item.id]}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Crop
            <input
              name="crop"
              value={form.crop}
              onChange={updateField}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-primary-500 dark:border-white/10 dark:bg-white/5"
            />
          </label>
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Soil
            <input
              name="soilType"
              value={form.soilType}
              onChange={updateField}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-primary-500 dark:border-white/10 dark:bg-white/5"
            />
          </label>
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Season
            <select
              name="season"
              value={form.season}
              onChange={updateField}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-primary-500 dark:border-white/10 dark:bg-white/5"
            >
              <option value="rabi">Rabi</option>
              <option value="kharif">Kharif</option>
              <option value="zaid">Zaid</option>
            </select>
          </label>
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Acres
            <input
              name="acreage"
              type="number"
              value={form.acreage}
              onChange={updateField}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-primary-500 dark:border-white/10 dark:bg-white/5"
            />
          </label>
        </div>

        <div className="mt-5 space-y-3 rounded-[24px] border border-slate-200/80 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
          <div className="flex flex-wrap gap-2">
            {copy.quickSuggestions.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => runAssistant(prompt, inferAction(prompt))}
                className="rounded-full bg-primary-500/10 px-3 py-1.5 text-xs font-semibold text-primary-700 transition hover:bg-primary-500/20 dark:text-primary-200"
              >
                {prompt}
              </button>
            ))}
          </div>

          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
            {copy.tapToAsk}
            <textarea
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder={copy.searchPlaceholder}
              className="mt-2 min-h-[110px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-primary-500 dark:border-white/10 dark:bg-white/5"
            />
          </label>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary-500/35 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
              <ImagePlus className="h-4 w-4 text-primary-600" />
              {copy.uploadPhoto}
              <input type="file" name="file" className="hidden" onChange={updateField} />
            </label>
            <div className="flex flex-wrap items-center gap-3">
              <VoiceInputButton
                compact
                label={copy.voiceInput}
                onTranscript={(transcript) => {
                  setQuestion(transcript);
                  onVoiceQuery?.(transcript);
                }}
              />
              <button
                type="button"
                onClick={() => runAssistant()}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-2xl bg-primary-600 px-5 py-3 font-semibold text-white transition hover:bg-primary-500 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                {copy.askNow}
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            {form.file ? `${copy.imageReady}: ${form.file.name}` : copy.imageHelp}
          </p>
        </div>
      </DashboardPanelCard>

      <DashboardPanelCard
        title={copy.aiActions[action.id]}
        subtitle={copy.latestResult}
        action={
          <span className="rounded-full border border-primary-200 bg-primary-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary-700 dark:border-white/10 dark:bg-white/5 dark:text-primary-200">
            Chat + API
          </span>
        }
      >
        <div className="max-h-[520px] space-y-3 overflow-y-auto rounded-[26px] border border-slate-200/80 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`max-w-[92%] rounded-[24px] px-4 py-3 text-sm leading-7 ${
                message.sender === "assistant"
                  ? "border border-slate-200/80 bg-white text-slate-700 dark:border-white/10 dark:bg-white/8 dark:text-primary-50"
                  : "ml-auto bg-primary-600 text-white"
              }`}
            >
              {message.title && (
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary-500 dark:text-primary-100/70">
                  {message.title}
                </p>
              )}
              <p>{message.text}</p>
              {message.details && (
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {Object.entries(message.details)
                    .slice(0, 4)
                    .map(([key, value]) => (
                      <div
                        key={key}
                        className="rounded-2xl bg-slate-50 px-3 py-3 text-xs leading-6 text-slate-700 dark:bg-white/6 dark:text-primary-50/85"
                      >
                        <p className="font-semibold uppercase tracking-[0.16em] text-primary-600 dark:text-primary-100/60">{key}</p>
                        <p className="mt-1">{typeof value === "object" ? JSON.stringify(value) : String(value)}</p>
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="rounded-[24px] border border-slate-200/80 bg-white px-4 py-4 text-sm text-slate-600 dark:border-white/10 dark:bg-white/8 dark:text-primary-50/80">
              {copy.loadingFeature}
            </div>
          )}

          {error && (
            <div className="rounded-[24px] border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700 dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-100">
              {error}
            </div>
          )}
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            runAssistant();
          }}
          className="mt-4 flex items-center gap-2"
        >
          <input
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder={copy.searchPlaceholder}
            className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-primary-400 dark:border-white/10 dark:bg-white/6 dark:text-white dark:placeholder:text-primary-100/45"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-600 text-white transition hover:bg-primary-500 disabled:cursor-not-allowed disabled:opacity-70"
          >
              {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </button>
        </form>
      </DashboardPanelCard>
    </div>
  );
}
