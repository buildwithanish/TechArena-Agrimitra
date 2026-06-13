import { startTransition, useEffect, useMemo, useState } from "react";
import {
  Activity,
  BellRing,
  CloudRainWind,
  Cpu,
  Droplets,
  Globe2,
  Leaf,
  Sparkles,
  Sprout,
  TrendingUp,
  Wheat
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FarmerAIConsole from "../components/dashboard/FarmerAIConsole";
import FarmerFeatureHub from "../components/dashboard/FarmerFeatureHub";
import DashboardChartCard from "../components/dashboard/DashboardChartCard";
import DashboardEmptyState from "../components/dashboard/DashboardEmptyState";
import DashboardPanelCard from "../components/dashboard/DashboardPanelCard";
import DashboardShell from "../components/dashboard/DashboardShell";
import DashboardSkeleton from "../components/dashboard/DashboardSkeleton";
import DashboardStatCard from "../components/dashboard/DashboardStatCard";
import Sidebar from "../components/dashboard/Sidebar";
import TopBar from "../components/dashboard/TopBar";
import { useAuth } from "../contexts/AuthContext";
import { getFarmerCopy, normalizeLanguage } from "../data/languages";
import { api } from "../services/api";
import { getSocket } from "../services/socket";

const defaultDashboard = {
  metrics: {
    cropScore: "91/100",
    incomePotential: "+18%",
    alertCount: "04",
    mandiWindow: "3 days"
  },
  weather: {
    location: "Nashik, Maharashtra",
    temperature: 28,
    condition: "Clouds with light wind",
    humidity: 64,
    rainfallChance: 32,
    advisory: "Light irrigation is sufficient. Keep scouting for fungal pressure in humid pockets."
  },
  soil: {
    ph: 6.7,
    moisture: 41,
    nitrogen: "Medium",
    conductivity: "0.44 mS/cm"
  },
  cropRecommendations: [
    {
      crop: "Wheat",
      rationale: "High suitability for current field profile, stable price trend, and manageable input load.",
      confidence: "92%"
    },
    {
      crop: "Chickpea",
      rationale: "Improves profit resilience and works well with current moisture and market conditions.",
      confidence: "88%"
    }
  ],
  marketTrends: [
    { name: "Mon", price: 23 },
    { name: "Tue", price: 24 },
    { name: "Wed", price: 25 },
    { name: "Thu", price: 27 },
    { name: "Fri", price: 29 }
  ],
  yieldForecast: [
    { name: "Week 1", yield: 32 },
    { name: "Week 2", yield: 36 },
    { name: "Week 3", yield: 40 },
    { name: "Week 4", yield: 44 }
  ],
  alerts: [
    { _id: "1", severity: "medium", title: "Leaf rust watch", message: "Monitor wheat block B in the next 48 hours." },
    { _id: "2", severity: "low", title: "Irrigation window", message: "Best irrigation window opens tomorrow morning." }
  ]
};

const farmerSectionIds = [
  "dashboard-overview",
  "farmer-farms",
  "farmer-crops",
  "farmer-weather",
  "farmer-iot",
  "farmer-satellite",
  "farmer-digital-twin",
  "farmer-soil",
  "feature-market-price-prediction",
  "farmer-ai",
  "feature-ai-crop-planning",
  "feature-fertilizer-optimization",
  "feature-pest-detection",
  "feature-yield-prediction",
  "feature-water-analytics",
  "feature-carbon-scoring",
  "feature-farm-ledger",
  "feature-supply-chain",
  "feature-insurance-predictor",
  "feature-credit-readiness",
  "farmer-alerts",
  "farmer-billing"
];

function toNumber(value, fallback = 0) {
  const match = String(value || "").match(/\d+/);
  return match ? Number.parseInt(match[0], 10) : fallback;
}

function getFarmStatus(copy, alerts, cropScore) {
  if ((alerts?.length || 0) >= 3) {
    return {
      label: copy.status.alert,
      tone: "border-red-200 bg-red-50 text-red-700 dark:border-red-400/20 dark:bg-red-500/10 dark:text-red-100"
    };
  }

  if (cropScore < 78) {
    return {
      label: copy.status.risk,
      tone: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-400/20 dark:bg-amber-400/12 dark:text-amber-100"
    };
  }

  return {
    label: copy.status.good,
    tone: "border-primary-200 bg-primary-50 text-primary-700 dark:border-primary-400/20 dark:bg-primary-500/12 dark:text-primary-50"
  };
}

function scrollToId(id) {
  if (!id) {
    return;
  }

  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function getMonitorCards(dashboard) {
  return [
    {
      id: "farmer-weather",
      title: "Weather",
      value: `${dashboard.weather.temperature} C`,
      helper: dashboard.weather.condition,
      icon: CloudRainWind
    },
    {
      id: "farmer-iot",
      title: "IoT Sensors",
      value: `${dashboard.soil.moisture}%`,
      helper: "Soil moisture live",
      icon: Activity
    },
    {
      id: "farmer-satellite",
      title: "Satellite",
      value: dashboard.metrics.cropScore,
      helper: "Crop health score",
      icon: Globe2
    },
    {
      id: "farmer-digital-twin",
      title: "Digital Twin",
      value: dashboard.metrics.mandiWindow,
      helper: "Best decision window",
      icon: Cpu
    },
    {
      id: "farmer-soil",
      title: "Soil Analysis",
      value: `${dashboard.soil.ph} pH`,
      helper: dashboard.soil.nitrogen,
      icon: Droplets
    }
  ];
}

export default function FarmerDashboardPage() {
  const { i18n } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const language = normalizeLanguage(user?.language || i18n.language);
  const copy = useMemo(() => getFarmerCopy(language), [language]);
  const [dashboard, setDashboard] = useState(defaultDashboard);
  const [loading, setLoading] = useState(true);
  const [dashboardError, setDashboardError] = useState("");
  const [voiceQuery, setVoiceQuery] = useState("");
  const [isOnline, setIsOnline] = useState(typeof window === "undefined" ? true : window.navigator.onLine);
  const [selectedFeatureSlug, setSelectedFeatureSlug] = useState("ai-crop-planning");
  const [featureRunToken, setFeatureRunToken] = useState(0);
  const [promptSeed, setPromptSeed] = useState({ id: 0, text: "", actionId: "crop" });

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [dashboardResponse, notificationResponse] = await Promise.all([
          api.get("/dashboard/farmer"),
          api.get("/notifications")
        ]);

        setDashboard((current) => ({
          ...current,
          ...(dashboardResponse.data || {}),
          alerts: notificationResponse.data?.alerts || dashboardResponse.data?.alerts || current.alerts
        }));
        setDashboardError("");
      } catch (error) {
        setDashboardError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  useEffect(() => {
    const socket = getSocket();

    socket.on("alert:new", (alert) => {
      startTransition(() => {
        setDashboard((current) => ({
          ...current,
          alerts: [alert, ...(current.alerts || [])].slice(0, 6)
        }));
      });
    });

    return () => {
      socket.off("alert:new");
    };
  }, []);

  useEffect(() => {
    function syncOnlineState() {
      setIsOnline(window.navigator.onLine);
    }

    window.addEventListener("online", syncOnlineState);
    window.addEventListener("offline", syncOnlineState);

    return () => {
      window.removeEventListener("online", syncOnlineState);
      window.removeEventListener("offline", syncOnlineState);
    };
  }, []);

  function handleLogout() {
    logout();
    navigate("/");
  }

  function openFeature(slug, promptText, actionId = "crop") {
    setSelectedFeatureSlug(slug);
    setFeatureRunToken((current) => current + 1);

    if (promptText) {
      setPromptSeed({ id: Date.now(), text: promptText, actionId });
    }

    scrollToId(`feature-${slug}`);
  }

  function openAi(promptText, actionId = "crop") {
    setPromptSeed({ id: Date.now(), text: promptText, actionId });
    scrollToId("farmer-ai");
  }

  function handleSidebarNavigate(item) {
    if (item.featureSlug) {
      openFeature(item.featureSlug);
    }
  }

  const cropScore = toNumber(dashboard.metrics.cropScore, 91);
  const farmStatus = getFarmStatus(copy, dashboard.alerts, cropScore);
  const totalFarms = dashboard.farms?.length || 2;
  const activeCrops = dashboard.cropRecommendations?.length || 0;
  const unreadAlerts = dashboard.alerts?.length || 0;
  const recentActivity = [
    ...(dashboard.alerts || []).map((item) => ({
      title: item.title,
      detail: item.message,
      tag: item.severity
    })),
    ...(dashboard.cropRecommendations || []).map((item) => ({
      title: `${item.crop} recommendation`,
      detail: item.rationale,
      tag: item.confidence
    }))
  ].slice(0, 4);

  const quickActions = [
    {
      icon: Leaf,
      slug: "ai-crop-planning",
      title: copy.quickActions["ai-crop-planning"].title,
      helper: copy.quickActions["ai-crop-planning"].helper,
      onClick: () => openFeature("ai-crop-planning", copy.quickSuggestions[0], "crop")
    },
    {
      icon: Droplets,
      slug: "water-analytics",
      title: copy.quickActions["water-analytics"].title,
      helper: copy.quickActions["water-analytics"].helper,
      onClick: () => openFeature("water-analytics", copy.quickSuggestions[2], "digital-twin")
    },
    {
      icon: Sparkles,
      slug: "pest-detection",
      title: copy.quickActions["pest-detection"].title,
      helper: copy.quickActions["pest-detection"].helper,
      onClick: () => openAi(copy.quickSuggestions[3], "pest")
    },
    {
      icon: TrendingUp,
      slug: "market-price-prediction",
      title: copy.quickActions["market-price-prediction"].title,
      helper: copy.quickActions["market-price-prediction"].helper,
      onClick: () => openFeature("market-price-prediction", copy.quickSuggestions[1], "market")
    },
    {
      icon: CloudRainWind,
      slug: "voice-ai",
      title: copy.quickActions["voice-ai"].title,
      helper: copy.quickActions["voice-ai"].helper,
      onClick: () => openAi(voiceQuery || copy.quickSuggestions[0], "crop")
    }
  ];

  const metricCards = [
    {
      icon: Sprout,
      label: "Total Farms",
      value: totalFarms,
      helper: dashboard.weather.location,
      tooltip: "Connected farms visible in your command center."
    },
    {
      icon: Wheat,
      label: "Active Crops",
      value: activeCrops,
      helper: "Season live",
      tooltip: "Crop plans and active field recommendations."
    },
    {
      icon: TrendingUp,
      label: "Net Profit",
      value: dashboard.metrics.incomePotential,
      helper: "Expected upside",
      tooltip: "Current profitability signal from advisory and market data."
    },
    {
      icon: BellRing,
      label: "Unread Alerts",
      value: unreadAlerts,
      helper: "Needs attention",
      tooltip: "Weather, pest, and field notices waiting for review."
    }
  ];

  const monitorCards = getMonitorCards(dashboard);

  return (
    <DashboardShell
      sectionIds={farmerSectionIds}
      renderSidebar={({ activeSection, closeSidebar }) => (
        <Sidebar
          role="farmer"
          user={user}
          onLogout={handleLogout}
          activeSection={activeSection}
          onNavigateItem={handleSidebarNavigate}
          closeSidebar={closeSidebar}
        />
      )}
      renderHeader={({ openSidebar }) => (
        <TopBar
          title="Dashboard"
          subtitle="Overview of your farming operations"
          onVoiceInput={setVoiceQuery}
          voiceQuery={voiceQuery}
          notificationCount={unreadAlerts}
          onMenuClick={openSidebar}
          badge={copy.liveMode}
          searchPlaceholder={copy.searchPlaceholder}
        />
      )}
    >
      {!isOnline && (
        <div className="rounded-[24px] border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-semibold text-amber-800 dark:border-amber-400/20 dark:bg-amber-500/10 dark:text-amber-100">
          {copy.offline}
        </div>
      )}

      {dashboardError && (
        <div className="rounded-[24px] border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-semibold text-amber-800 dark:border-amber-400/20 dark:bg-amber-500/10 dark:text-amber-100">
          {copy.networkFallback} {dashboardError}
        </div>
      )}

      <DashboardPanelCard
        id="dashboard-overview"
        className="bg-[linear-gradient(135deg,rgba(241,251,244,0.98),rgba(255,255,255,0.98))] dark:bg-[linear-gradient(135deg,rgba(30,80,52,0.52),rgba(7,23,15,0.85))]"
      >
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-700 dark:text-primary-200">
                <Sparkles className="h-3.5 w-3.5" />
                {copy.greeting}
              </span>
              <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${farmStatus.tone}`}>
                {copy.farmStatus}: {farmStatus.label}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-white/10 dark:text-slate-300">
                {isOnline ? copy.online : copy.offline}
              </span>
            </div>

            <h2 className="mt-5 font-display text-4xl font-bold text-slate-950 dark:text-white">
              {copy.greetingHelp}
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-8 text-slate-600 dark:text-slate-300">
              Use the quick buttons below to open crop advice, mandi trends, water help, and AI support without leaving the page.
            </p>

            <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
              {quickActions.map((action) => {
                const Icon = action.icon;

                return (
                  <button
                    key={action.slug}
                    type="button"
                    onClick={action.onClick}
                    className="rounded-[24px] border border-primary-100 bg-white p-4 text-left shadow-sm transition hover:-translate-y-1 hover:border-primary-300 dark:border-white/10 dark:bg-white/5"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="mt-4 text-base font-bold text-slate-900 dark:text-white">{action.title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{action.helper}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-[28px] bg-primary-950 p-5 text-white shadow-[0_24px_70px_rgba(7,23,15,0.24)]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-100/55">{copy.weatherTitle}</p>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/10">
                <CloudRainWind className="h-6 w-6" />
              </div>
              <div>
                <p className="text-4xl font-bold">{dashboard.weather.temperature} C</p>
                <p className="mt-1 text-sm text-primary-100/75">{dashboard.weather.condition}</p>
              </div>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/8 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-primary-100/55">{copy.detailCards.humidity}</p>
                <p className="mt-2 text-2xl font-bold">{dashboard.weather.humidity}%</p>
              </div>
              <div className="rounded-2xl bg-white/8 p-4">
                <p className="text-xs uppercase tracking-[0.18em] text-primary-100/55">{copy.detailCards.rainfallChance}</p>
                <p className="mt-2 text-2xl font-bold">{dashboard.weather.rainfallChance}%</p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-7 text-primary-100/75">{dashboard.weather.advisory}</p>
          </div>
        </div>
      </DashboardPanelCard>

      {loading ? (
        <DashboardSkeleton cards={4} panels={2} />
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {metricCards.map((item, index) => (
              <DashboardStatCard
                key={item.label}
                label={item.label}
                value={item.value}
                helper={item.helper}
                icon={item.icon}
                tooltip={item.tooltip}
                tone={index === 2 ? "accent" : index === 0 ? "success" : "default"}
              />
            ))}
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            <DashboardChartCard
              id="farmer-farms"
              title="Crop Health Overview"
              subtitle="Field score and crop momentum across this week"
              icon={Leaf}
              tooltip="A simple view of crop condition based on the existing dashboard and market data."
            >
              {dashboard.marketTrends?.length ? (
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={dashboard.marketTrends}>
                      <defs>
                        <linearGradient id="cropHealthFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#349e61" stopOpacity={0.55} />
                          <stop offset="100%" stopColor="#349e61" stopOpacity={0.05} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.18)" />
                      <XAxis dataKey="name" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip />
                      <Area type="monotone" dataKey="price" stroke="#349e61" fill="url(#cropHealthFill)" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <DashboardEmptyState description="No data available" />
              )}
            </DashboardChartCard>

            <DashboardPanelCard
              id="farmer-crops"
              title="Recent Activity"
              subtitle="Latest crop notes, alerts, and AI updates"
              icon={Activity}
            >
              {recentActivity.length ? (
                <div className="space-y-3">
                  {recentActivity.map((item) => (
                    <div
                      key={`${item.title}-${item.tag}`}
                      className="rounded-[24px] border border-slate-200/80 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{item.title}</p>
                          <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">{item.detail}</p>
                        </div>
                        <span className="rounded-full bg-primary-500/10 px-3 py-1 text-xs font-semibold text-primary-700 dark:text-primary-200">
                          {item.tag}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <DashboardEmptyState description="No data available" />
              )}
            </DashboardPanelCard>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {monitorCards.map((card) => {
              const Icon = card.icon;

              return (
                <DashboardPanelCard key={card.id} id={card.id} className="p-4" icon={Icon} title={card.title}>
                  <p className="text-3xl font-bold text-slate-950 dark:text-white">{card.value}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{card.helper}</p>
                </DashboardPanelCard>
              );
            })}
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            <DashboardChartCard
              id="feature-market-price-prediction"
              title="Market Trend"
              subtitle="Simple mandi movement for the next trading days"
              icon={TrendingUp}
            >
              {dashboard.marketTrends?.length ? (
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={dashboard.marketTrends}>
                      <defs>
                        <linearGradient id="marketFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#5bc476" stopOpacity={0.55} />
                          <stop offset="100%" stopColor="#5bc476" stopOpacity={0.04} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.18)" />
                      <XAxis dataKey="name" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip />
                      <Area type="monotone" dataKey="price" stroke="#349e61" fill="url(#marketFill)" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <DashboardEmptyState description="No data available" />
              )}
            </DashboardChartCard>

            <DashboardChartCard
              id="feature-yield-chart"
              title="Yield Forecast"
              subtitle="Expected harvest trend over coming weeks"
              icon={Wheat}
            >
              {dashboard.yieldForecast?.length ? (
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dashboard.yieldForecast}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.18)" />
                      <XAxis dataKey="name" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip />
                      <Bar dataKey="yield" fill="#f3b300" radius={[10, 10, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <DashboardEmptyState description="No data available" />
              )}
            </DashboardChartCard>
          </div>

          <div id="farmer-ai" className="scroll-mt-24">
            <FarmerAIConsole language={language} copy={copy} promptSeed={promptSeed} onVoiceQuery={setVoiceQuery} />
          </div>

          <FarmerFeatureHub
            language={language}
            copy={copy}
            subscriptionPlan={user?.subscriptionPlan || "starter"}
            selectedFeatureSlug={selectedFeatureSlug}
            runToken={featureRunToken}
          />

          <div id="farmer-alerts" className="grid gap-4 xl:grid-cols-[0.92fr_1.08fr]">
            <DashboardPanelCard
              title={copy.alertsTitle}
              subtitle={copy.alertsHint}
              icon={BellRing}
            >
              {(dashboard.alerts || []).length ? (
                <div className="space-y-3">
                  {dashboard.alerts.map((alert) => (
                    <div
                      key={alert._id}
                      className="rounded-[24px] border border-slate-200/80 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{alert.title}</p>
                          <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">{alert.message}</p>
                        </div>
                        <span className="rounded-full bg-primary-500/10 px-3 py-1 text-xs font-semibold uppercase text-primary-700 dark:text-primary-200">
                          {alert.severity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <DashboardEmptyState description={copy.noAlerts} />
              )}
            </DashboardPanelCard>

            <DashboardPanelCard
              title="Crop Suggestions"
              subtitle="Simple AI recommendations for your next step"
              icon={Sprout}
            >
              {dashboard.cropRecommendations?.length ? (
                <div className="grid gap-3">
                  {dashboard.cropRecommendations.map((item) => (
                    <div
                      key={item.crop}
                      className="rounded-[24px] border border-slate-200/80 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-700 dark:text-primary-200">
                            {item.confidence}
                          </p>
                          <h4 className="mt-2 text-xl font-bold text-slate-950 dark:text-white">{item.crop}</h4>
                          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{item.rationale}</p>
                        </div>
                        <span className="rounded-full bg-primary-500/10 px-3 py-1 text-xs font-semibold text-primary-700 dark:text-primary-200">
                          AI pick
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <DashboardEmptyState description="No data available" />
              )}
            </DashboardPanelCard>
          </div>

          <DashboardPanelCard
            id="farmer-billing"
            title={copy.billingTitle}
            subtitle={copy.billingHint}
            icon={TrendingUp}
            action={
              <div className="rounded-2xl bg-primary-500/10 px-4 py-3 text-sm font-semibold text-primary-700 dark:text-primary-200">
                Plan: {user?.subscriptionPlan || "starter"}
              </div>
            }
          >
            <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="text-4xl font-bold text-slate-950 dark:text-white">INR 99/month</p>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400">
                  All 22 farmer tools remain available in the same dashboard with alerts, AI help, weather, and finance views.
                </p>
              </div>
              <button
                type="button"
                onClick={() => scrollToId("feature-subscription-billing")}
                className="inline-flex items-center justify-center rounded-2xl bg-primary-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-500"
              >
                Manage plan
              </button>
            </div>
          </DashboardPanelCard>
        </>
      )}
    </DashboardShell>
  );
}
