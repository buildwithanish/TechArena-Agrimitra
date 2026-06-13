import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Cpu,
  IndianRupee,
  Radar,
  Settings2,
  ShieldCheck,
  Sparkles,
  Users
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { useNavigate } from "react-router-dom";
import AdminSettingsPanel from "../components/admin/AdminSettingsPanel";
import DashboardChartCard from "../components/dashboard/DashboardChartCard";
import DashboardEmptyState from "../components/dashboard/DashboardEmptyState";
import DashboardPanelCard from "../components/dashboard/DashboardPanelCard";
import DashboardShell from "../components/dashboard/DashboardShell";
import DashboardSkeleton from "../components/dashboard/DashboardSkeleton";
import DashboardStatCard from "../components/dashboard/DashboardStatCard";
import Sidebar from "../components/dashboard/Sidebar";
import TopBar from "../components/dashboard/TopBar";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/api";

const defaultAdmin = {
  metrics: {
    totalUsers: "1,284",
    monthlyRevenue: "INR 1.27L",
    activeSensors: "2,408",
    predictionAccuracy: "93.4%"
  },
  activeSessions: 12,
  featureUsage: {
    crop: 31,
    yield: 22,
    pest: 18,
    market: 17,
    insurance: 12
  },
  revenueTrend: [
    { month: "Jan", revenue: 68 },
    { month: "Feb", revenue: 74 },
    { month: "Mar", revenue: 86 },
    { month: "Apr", revenue: 94 },
    { month: "May", revenue: 108 }
  ],
  userGrowth: [
    { month: "Jan", users: 420 },
    { month: "Feb", users: 580 },
    { month: "Mar", users: 770 },
    { month: "Apr", users: 930 },
    { month: "May", users: 1284 }
  ],
  predictionMix: [
    { name: "Crop", value: 31 },
    { name: "Yield", value: 22 },
    { name: "Pest", value: 18 },
    { name: "Market", value: 17 },
    { name: "Insurance", value: 12 }
  ],
  users: [
    { _id: "1", name: "Aditi Sharma", email: "aditi@example.com", role: "farmer", plan: "starter", farms: 2 },
    { _id: "2", name: "Rahul Mehta", email: "rahul@example.com", role: "farmer", plan: "starter", farms: 1 },
    { _id: "3", name: "Meera Patel", email: "meera@example.com", role: "admin", plan: "enterprise", farms: 14 }
  ],
  aiPredictions: [
    { title: "Crop planning", score: "94%", volume: "12.4k runs" },
    { title: "Market pricing", score: "89%", volume: "8.7k runs" },
    { title: "Pest detection", score: "91%", volume: "5.6k runs" }
  ],
  sensors: [
    { _id: "1", sensorType: "Soil Moisture", value: 41, unit: "%", status: "active", farm: { name: "GreenRise Farm" } },
    { _id: "2", sensorType: "Soil pH", value: 6.7, unit: "pH", status: "active", farm: { name: "GreenRise Farm" } },
    { _id: "3", sensorType: "Temperature", value: 28, unit: "C", status: "active", farm: { name: "GreenRise Farm" } }
  ],
  sensorHealth: [
    { zone: "North cluster", active: 92 },
    { zone: "East cluster", active: 81 },
    { zone: "Canal belt", active: 88 },
    { zone: "Highland belt", active: 75 }
  ],
  contactLeads: [
    {
      _id: "lead-1",
      name: "Suresh Patil",
      email: "suresh@greenrise.in",
      phone: "+91 9509868673",
      role: "farmer",
      interest: "starter-plan",
      status: "new"
    }
  ]
};

const colors = ["#349e61", "#f3b300", "#5cc182", "#0f766e", "#86efac"];
const adminSectionIds = [
  "admin-overview",
  "admin-analytics",
  "admin-users",
  "admin-revenue",
  "admin-sensors",
  "admin-ai",
  "admin-leads",
  "admin-settings"
];

export default function AdminPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(defaultAdmin);
  const [voiceQuery, setVoiceQuery] = useState("");
  const [adminError, setAdminError] = useState("");
  const [loading, setLoading] = useState(true);
  const [creatingUser, setCreatingUser] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "farmer",
    subscriptionPlan: "starter",
    farmCount: 1
  });

  const planMix = useMemo(() => {
    return dashboard.users.reduce((accumulator, item) => {
      const key = item.plan || item.subscriptionPlan || "starter";
      accumulator[key] = (accumulator[key] || 0) + 1;
      return accumulator;
    }, {});
  }, [dashboard.users]);

  useEffect(() => {
    async function loadAdminData() {
      try {
        const [dashboardResponse, userResponse, analyticsResponse, sensorResponse, contactResponse] = await Promise.all([
          api.get("/dashboard/admin"),
          api.get("/admin/users"),
          api.get("/admin/analytics"),
          api.get("/sensors"),
          api.get("/contact")
        ]);

        setDashboard((current) => ({
          ...current,
          ...dashboardResponse.data,
          users: userResponse.data?.users || current.users,
          sensors: sensorResponse.data?.sensors || current.sensors,
          contactLeads: contactResponse.data?.leads || current.contactLeads,
          activeSessions: analyticsResponse.data?.activeSessions || current.activeSessions,
          featureUsage: analyticsResponse.data?.featureUsage || current.featureUsage,
          predictionMix: analyticsResponse.data?.predictionMix || current.predictionMix,
          revenueTrend: analyticsResponse.data?.revenueTrend || current.revenueTrend,
          userGrowth: analyticsResponse.data?.userGrowth || current.userGrowth,
          sensorHealth: analyticsResponse.data?.sensorHealth || current.sensorHealth
        }));
        setAdminError("");
      } catch (error) {
        setAdminError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadAdminData();
  }, []);

  function handleLogout() {
    logout();
    navigate("/");
  }

  async function updateUserRecord(userId, patch) {
    try {
      const response = await api.put(`/admin/users/${userId}`, patch);
      const updatedUser = response.data?.user;

      if (!updatedUser) {
        return;
      }

      setDashboard((current) => ({
        ...current,
        users: current.users.map((item) => (item._id === userId ? { ...item, ...updatedUser } : item))
      }));
      setAdminError("");
    } catch (error) {
      setAdminError(error.message);
    }
  }

  async function createUserRecord(event) {
    event.preventDefault();
    setCreatingUser(true);

    try {
      const response = await api.post("/admin/users", newUser);
      const createdUser = response.data?.user;

      if (createdUser) {
        setDashboard((current) => ({
          ...current,
          users: [createdUser, ...current.users],
          metrics: {
            ...current.metrics,
            totalUsers: String((current.users?.length || 0) + 1)
          }
        }));
      }

      setNewUser({
        name: "",
        email: "",
        password: "",
        role: "farmer",
        subscriptionPlan: "starter",
        farmCount: 1
      });
      setAdminError("");
    } catch (error) {
      setAdminError(error.message);
    } finally {
      setCreatingUser(false);
    }
  }

  return (
    <DashboardShell
      sectionIds={adminSectionIds}
      renderSidebar={({ activeSection, closeSidebar }) => (
        <Sidebar
          role="admin"
          user={user}
          onLogout={handleLogout}
          activeSection={activeSection}
          closeSidebar={closeSidebar}
        />
      )}
      renderHeader={({ openSidebar }) => (
        <TopBar
          title="Admin Dashboard"
          subtitle="Control users, analytics, revenue, sensors, and platform settings"
          onVoiceInput={setVoiceQuery}
          voiceQuery={voiceQuery}
          notificationCount={6}
          onMenuClick={openSidebar}
          badge="System control"
          searchPlaceholder="Try: show revenue trend this month"
        />
      )}
    >
      {adminError && (
        <div className="rounded-[24px] border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-semibold text-amber-800 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-100">
          Admin data is showing safe fallback values while the API reconnects: {adminError}
        </div>
      )}

      <DashboardPanelCard id="admin-overview" className="bg-[linear-gradient(135deg,rgba(241,251,244,0.98),rgba(255,255,255,0.98))] dark:bg-[linear-gradient(135deg,rgba(30,80,52,0.52),rgba(7,23,15,0.85))]">
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-700 dark:text-primary-200">
                <Sparkles className="h-3.5 w-3.5" />
                Live operations
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-white/10 dark:text-slate-300">
                {dashboard.activeSessions} active sessions
              </span>
            </div>
            <h2 className="mt-5 font-display text-4xl font-bold text-slate-950 dark:text-white">
              One control center for users, revenue, sensors, and AI quality.
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-8 text-slate-600 dark:text-slate-300">
              The backend APIs stay unchanged. This view only upgrades the workspace presentation so operators can scan activity faster and act without UI clutter.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-[24px] bg-primary-950 p-5 text-white shadow-[0_24px_70px_rgba(7,23,15,0.24)]">
              <p className="text-xs uppercase tracking-[0.18em] text-primary-100/55">Users</p>
              <p className="mt-3 text-3xl font-bold">{dashboard.metrics.totalUsers}</p>
              <p className="mt-2 text-sm text-primary-100/75">Across farmer and admin roles</p>
            </div>
            <div className="rounded-[24px] bg-white p-5 shadow-sm dark:bg-white/5">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Revenue</p>
              <p className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">{dashboard.metrics.monthlyRevenue}</p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Monthly recurring revenue</p>
            </div>
            <div className="rounded-[24px] bg-white p-5 shadow-sm dark:bg-white/5">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">AI Quality</p>
              <p className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">{dashboard.metrics.predictionAccuracy}</p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Prediction confidence score</p>
            </div>
          </div>
        </div>
      </DashboardPanelCard>

      {loading ? (
        <DashboardSkeleton cards={4} panels={3} />
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <DashboardStatCard label="Total Users" value={dashboard.metrics.totalUsers} helper="All roles" icon={Users} tone="success" />
            <DashboardStatCard label="Monthly Revenue" value={dashboard.metrics.monthlyRevenue} helper="MRR" icon={IndianRupee} tone="accent" />
            <DashboardStatCard label="Active Sensors" value={dashboard.metrics.activeSensors} helper="97% uptime" icon={Radar} />
            <DashboardStatCard label="Prediction Accuracy" value={dashboard.metrics.predictionAccuracy} helper={`${dashboard.activeSessions} live sessions`} icon={ShieldCheck} />
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            <DashboardChartCard id="admin-analytics" title="User Growth" subtitle="Farmers and admins onboarded over time" icon={Users}>
              {dashboard.userGrowth?.length ? (
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dashboard.userGrowth}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.18)" />
                      <XAxis dataKey="month" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip />
                      <Bar dataKey="users" fill="#349e61" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <DashboardEmptyState description="No data available" />
              )}
            </DashboardChartCard>

            <DashboardChartCard id="admin-ai" title="AI Prediction Mix" subtitle="Distribution across core intelligence modules" icon={Cpu}>
              {dashboard.predictionMix?.length ? (
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={dashboard.predictionMix} dataKey="value" nameKey="name" innerRadius={70} outerRadius={100} paddingAngle={3}>
                        {dashboard.predictionMix.map((entry, index) => (
                          <Cell key={entry.name} fill={colors[index % colors.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <DashboardEmptyState description="No data available" />
              )}
            </DashboardChartCard>
          </div>

          <div className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
            <DashboardChartCard id="admin-revenue" title="Revenue Trend" subtitle="Subscription growth and monetization trend" icon={IndianRupee}>
              {dashboard.revenueTrend?.length ? (
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dashboard.revenueTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.18)" />
                      <XAxis dataKey="month" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip />
                      <Line type="monotone" dataKey="revenue" stroke="#349e61" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <DashboardEmptyState description="No data available" />
              )}
            </DashboardChartCard>

            <DashboardPanelCard id="admin-sensors" title="Sensor Fleet Health" subtitle="Zone-wise active sensor percentage" icon={Radar}>
              {dashboard.sensorHealth?.length ? (
                <div className="space-y-4">
                  {dashboard.sensorHealth.map((item) => (
                    <div key={item.zone}>
                      <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-700 dark:text-slate-200">
                        <span>{item.zone}</span>
                        <span>{item.active}%</span>
                      </div>
                      <div className="h-3 rounded-full bg-slate-200 dark:bg-white/10">
                        <div className="h-3 rounded-full bg-gradient-to-r from-primary-500 to-accent-400" style={{ width: `${item.active}%` }} />
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
            id="admin-users"
            title="User Management"
            subtitle="Create farmers or admins, assign plans, and block or unblock access"
            icon={Users}
            action={
              <div className="rounded-2xl bg-primary-500/10 px-4 py-3 text-sm font-semibold text-primary-700 dark:text-primary-200">
                {dashboard.users.length} users visible
              </div>
            }
          >
            <div className="overflow-x-auto">
              <form onSubmit={createUserRecord} className="mb-6 grid gap-4 rounded-[24px] border border-slate-200/80 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/5 md:grid-cols-2 xl:grid-cols-6">
                <input
                  value={newUser.name}
                  onChange={(event) => setNewUser((current) => ({ ...current, name: event.target.value }))}
                  placeholder="Full name"
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none dark:border-white/10 dark:bg-white/5"
                  required
                />
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(event) => setNewUser((current) => ({ ...current, email: event.target.value }))}
                  placeholder="Email"
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none dark:border-white/10 dark:bg-white/5"
                  required
                />
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(event) => setNewUser((current) => ({ ...current, password: event.target.value }))}
                  placeholder="Password"
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none dark:border-white/10 dark:bg-white/5"
                  required
                />
                <select
                  value={newUser.role}
                  onChange={(event) => setNewUser((current) => ({ ...current, role: event.target.value }))}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none dark:border-white/10 dark:bg-white/5"
                >
                  <option value="farmer">Farmer</option>
                  <option value="admin">Admin</option>
                </select>
                <select
                  value={newUser.subscriptionPlan}
                  onChange={(event) => setNewUser((current) => ({ ...current, subscriptionPlan: event.target.value }))}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none dark:border-white/10 dark:bg-white/5"
                >
                  <option value="starter">Starter</option>
                  <option value="growth">Growth</option>
                  <option value="enterprise">Enterprise</option>
                </select>
                <button
                  type="submit"
                  disabled={creatingUser}
                  className="rounded-2xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-500 disabled:opacity-70"
                >
                  {creatingUser ? "Creating..." : "Create user"}
                </button>
              </form>

              {dashboard.users.length ? (
                <table className="min-w-full text-left">
                  <thead>
                    <tr className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                      <th className="pb-4 pr-4">User</th>
                      <th className="pb-4 pr-4">Role</th>
                      <th className="pb-4 pr-4">Plan</th>
                      <th className="pb-4 pr-4">Farms</th>
                      <th className="pb-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboard.users.map((item) => (
                      <tr key={item._id} className="border-t border-slate-200/70 text-sm dark:border-white/10">
                        <td className="py-4 pr-4">
                          <p className="font-semibold text-slate-900 dark:text-white">{item.name}</p>
                          <p className="text-slate-500 dark:text-slate-400">{item.email}</p>
                        </td>
                        <td className="py-4 pr-4 capitalize text-slate-700 dark:text-slate-200">
                          <select
                            value={item.role}
                            onChange={(event) => updateUserRecord(item._id, { role: event.target.value })}
                            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none dark:border-white/10 dark:bg-white/5"
                          >
                            <option value="farmer">Farmer</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                        <td className="py-4 pr-4 capitalize text-slate-700 dark:text-slate-200">
                          <select
                            value={item.plan || item.subscriptionPlan || "starter"}
                            onChange={(event) => updateUserRecord(item._id, { subscriptionPlan: event.target.value })}
                            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none dark:border-white/10 dark:bg-white/5"
                          >
                            <option value="starter">Starter</option>
                            <option value="growth">Growth</option>
                            <option value="enterprise">Enterprise</option>
                          </select>
                        </td>
                        <td className="py-4 pr-4 text-slate-700 dark:text-slate-200">{item.farms}</td>
                        <td className="py-4">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 font-semibold ${
                              item.isBlocked || item.status === "blocked"
                                ? "bg-red-500/10 text-red-600 dark:text-red-300"
                                : "bg-primary-500/10 text-primary-700 dark:text-primary-300"
                            }`}>
                              <Radar className="h-3.5 w-3.5" />
                              {item.isBlocked || item.status === "blocked" ? "Blocked" : "Active"}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateUserRecord(item._id, { isBlocked: !(item.isBlocked || item.status === "blocked") })}
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                item.isBlocked || item.status === "blocked"
                                  ? "bg-primary-500/10 text-primary-700 dark:text-primary-300"
                                  : "bg-red-500/10 text-red-600 dark:text-red-300"
                              }`}
                            >
                              {item.isBlocked || item.status === "blocked" ? "Unblock" : "Block"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <DashboardEmptyState description="No data available" />
              )}
            </div>
          </DashboardPanelCard>

          <div id="admin-leads" className="grid gap-4 xl:grid-cols-[0.88fr_1.12fr]">
            <DashboardPanelCard title="Subscription Mix" subtitle="Users segmented by active plan" icon={IndianRupee}>
              {Object.entries(planMix).length ? (
                <div className="grid gap-4 md:grid-cols-3">
                  {Object.entries(planMix).map(([plan, count]) => (
                    <div key={plan} className="rounded-[24px] border border-slate-200/80 bg-slate-50 p-5 dark:border-white/10 dark:bg-white/5">
                      <p className="text-xs uppercase tracking-[0.18em] text-primary-700 dark:text-primary-300">{plan}</p>
                      <p className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">{count}</p>
                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">accounts on this plan</p>
                    </div>
                  ))}
                </div>
              ) : (
                <DashboardEmptyState description="No data available" />
              )}
            </DashboardPanelCard>

            <DashboardPanelCard title="Contact Registrations" subtitle="Leads captured from website contact and registration flows" icon={Activity}>
              {dashboard.contactLeads?.length ? (
                <div className="space-y-3">
                  {dashboard.contactLeads.map((lead) => (
                    <div key={lead._id} className="rounded-[24px] border border-slate-200/80 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">{lead.name}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{lead.email}</p>
                          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{lead.phone || "Phone not shared"}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs uppercase tracking-[0.18em] text-primary-700 dark:text-primary-300">{lead.interest}</p>
                          <p className="mt-2 text-sm font-medium capitalize text-slate-600 dark:text-slate-300">{lead.role}</p>
                          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent-700 dark:text-accent-300">
                            {lead.status || "new"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <DashboardEmptyState description="No data available" />
              )}
            </DashboardPanelCard>
          </div>

          <AdminSettingsPanel />
        </>
      )}
    </DashboardShell>
  );
}
