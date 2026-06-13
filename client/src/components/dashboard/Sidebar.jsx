import {
  BarChart3,
  BellRing,
  Bot,
  CloudRainWind,
  Cpu,
  CreditCard,
  Droplets,
  Factory,
  Globe2,
  Home,
  IndianRupee,
  Landmark,
  LayoutDashboard,
  Leaf,
  LogOut,
  Mail,
  MapPinned,
  Microscope,
  Radar,
  Settings2,
  ShieldCheck,
  Sprout,
  TrendingUp,
  Wallet,
  Waves
} from "lucide-react";
import { Link } from "react-router-dom";
import DashboardSidebarSection from "./DashboardSidebarSection";

const farmerSections = [
  {
    title: "Main",
    items: [
      { key: "overview", label: "Overview", icon: LayoutDashboard, href: "#dashboard-overview", matchIds: ["dashboard-overview"] },
      { key: "farms", label: "Farms", icon: MapPinned, href: "#farmer-farms", matchIds: ["farmer-farms"] },
      { key: "crops", label: "Crops", icon: Sprout, href: "#farmer-crops", matchIds: ["farmer-crops"] }
    ]
  },
  {
    title: "Monitor",
    items: [
      { key: "weather", label: "Weather", icon: CloudRainWind, href: "#farmer-weather", matchIds: ["farmer-weather"] },
      { key: "iot", label: "IoT Sensors", icon: Radar, href: "#farmer-iot", matchIds: ["farmer-iot"] },
      { key: "satellite", label: "Satellite", icon: Globe2, href: "#farmer-satellite", matchIds: ["farmer-satellite"] },
      { key: "digital-twin", label: "Digital Twin", icon: Cpu, href: "#farmer-digital-twin", matchIds: ["farmer-digital-twin"] }
    ]
  },
  {
    title: "AI Tools",
    items: [
      { key: "crop-planning", label: "Crop Planning", icon: Leaf, href: "#feature-ai-crop-planning", matchIds: ["feature-ai-crop-planning"], featureSlug: "ai-crop-planning" },
      { key: "fertilizer", label: "Fertilizer AI", icon: Droplets, href: "#feature-fertilizer-optimization", matchIds: ["feature-fertilizer-optimization"], featureSlug: "fertilizer-optimization" },
      { key: "pest", label: "Pest Detection", icon: Microscope, href: "#feature-pest-detection", matchIds: ["feature-pest-detection"], featureSlug: "pest-detection" },
      { key: "yield", label: "Yield Forecast", icon: TrendingUp, href: "#feature-yield-prediction", matchIds: ["feature-yield-prediction", "feature-yield-chart"], featureSlug: "yield-prediction" },
      { key: "soil", label: "Soil Analysis", icon: Sprout, href: "#farmer-soil", matchIds: ["farmer-soil"] },
      { key: "water", label: "Water Usage", icon: Waves, href: "#feature-water-analytics", matchIds: ["feature-water-analytics"], featureSlug: "water-analytics" },
      { key: "carbon", label: "Carbon Score", icon: Globe2, href: "#feature-carbon-scoring", matchIds: ["feature-carbon-scoring"], featureSlug: "carbon-scoring" }
    ]
  },
  {
    title: "Finance",
    items: [
      { key: "market", label: "Market Prices", icon: IndianRupee, href: "#feature-market-price-prediction", matchIds: ["feature-market-price-prediction"], featureSlug: "market-price-prediction" },
      { key: "ledger", label: "Farm Ledger", icon: Wallet, href: "#feature-farm-ledger", matchIds: ["feature-farm-ledger"], featureSlug: "farm-ledger" },
      { key: "supply", label: "Supply Chain", icon: Factory, href: "#feature-supply-chain", matchIds: ["feature-supply-chain"], featureSlug: "supply-chain" },
      { key: "insurance", label: "Insurance Risk", icon: ShieldCheck, href: "#feature-insurance-predictor", matchIds: ["feature-insurance-predictor"], featureSlug: "insurance-predictor" },
      { key: "credit", label: "Credit Score", icon: Landmark, href: "#feature-credit-readiness", matchIds: ["feature-credit-readiness"], featureSlug: "credit-readiness" }
    ]
  },
  {
    title: "Other",
    items: [
      { key: "alerts", label: "Alerts", icon: BellRing, href: "#farmer-alerts", matchIds: ["farmer-alerts"] },
      { key: "advisory", label: "AI Advisory", icon: Bot, href: "#farmer-ai", matchIds: ["farmer-ai"] },
      { key: "billing", label: "Subscription", icon: CreditCard, href: "#farmer-billing", matchIds: ["farmer-billing"] }
    ]
  }
];

const adminSections = [
  {
    title: "Main",
    items: [
      { key: "overview", label: "Overview", icon: LayoutDashboard, href: "#admin-overview", matchIds: ["admin-overview"] },
      { key: "analytics", label: "Analytics", icon: BarChart3, href: "#admin-analytics", matchIds: ["admin-analytics"] },
      { key: "users", label: "Users", icon: Sprout, href: "#admin-users", matchIds: ["admin-users"] }
    ]
  },
  {
    title: "Monitor",
    items: [
      { key: "revenue", label: "Revenue", icon: IndianRupee, href: "#admin-revenue", matchIds: ["admin-revenue"] },
      { key: "sensors", label: "Sensors", icon: Radar, href: "#admin-sensors", matchIds: ["admin-sensors"] },
      { key: "ai-runs", label: "AI Runs", icon: Cpu, href: "#admin-ai", matchIds: ["admin-ai"] }
    ]
  },
  {
    title: "Control",
    items: [
      { key: "leads", label: "Leads", icon: Mail, href: "#admin-leads", matchIds: ["admin-leads"] },
      { key: "settings", label: "System Controls", icon: Settings2, href: "#admin-settings", matchIds: ["admin-settings"] }
    ]
  }
];

export default function Sidebar({
  role = "farmer",
  user,
  onLogout,
  activeSection,
  onNavigateItem,
  closeSidebar
}) {
  const sections = role === "admin" ? adminSections : farmerSections;

  function handleClick(item) {
    onNavigateItem?.(item);
    closeSidebar?.();
  }

  return (
    <aside className="flex h-full min-h-[calc(100vh-1.5rem)] flex-col overflow-hidden rounded-[32px] bg-primary-950 text-white shadow-[0_32px_90px_rgba(7,23,15,0.28)] xl:sticky xl:top-6 xl:min-h-[calc(100vh-3rem)]">
      <div className="border-b border-white/10 p-5">
        <Link
          to="/"
          onClick={() => closeSidebar?.()}
          className="flex items-center gap-3 rounded-[24px] bg-white/6 p-4 transition hover:bg-white/10"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-600">
            <Sprout className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate font-display text-2xl font-bold">AgriMitra</p>
            <p className="truncate text-xs uppercase tracking-[0.24em] text-primary-100/60">
              {role === "admin" ? "System control" : "Farmer panel"}
            </p>
          </div>
        </Link>

        <div className="mt-4 rounded-[24px] border border-white/10 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-primary-100/45">Signed in</p>
          <p className="mt-3 text-lg font-bold text-white">{user?.name || "Agri operator"}</p>
          <p className="mt-1 break-all text-sm text-primary-100/70">{user?.email}</p>
        </div>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto px-4 py-5">
        {sections.map((section) => (
          <DashboardSidebarSection
            key={section.title}
            title={section.title}
            items={section.items}
            activeSection={activeSection}
            onItemClick={handleClick}
          />
        ))}
      </div>

      <div className="space-y-3 border-t border-white/10 p-4">
        <Link
          to="/"
          onClick={() => closeSidebar?.()}
          className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
        >
          <Home className="h-4 w-4" />
          Website
        </Link>
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-primary-950 transition hover:bg-primary-100"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
