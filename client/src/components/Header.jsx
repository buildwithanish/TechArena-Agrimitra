import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Clock3,
  Mail,
  Menu,
  PhoneCall,
  ShoppingCart,
  Sprout,
  X
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useContactModal } from "../contexts/ContactModalContext";
import { useSettings } from "../contexts/SettingsContext";
import { headerNavigation, topBarInfo } from "../data/marketing";
import AnnouncementBar from "./AnnouncementBar";
import AppLink from "./AppLink";
import LanguageMenu from "./LanguageMenu";

function DesktopLink({ item, onContactClick }) {
  if (item.action === "contact-modal") {
    return (
      <button
        type="button"
        onClick={onContactClick}
        className="inline-flex items-center text-sm font-semibold text-slate-700 transition hover:text-primary-700 dark:text-slate-200 dark:hover:text-primary-300"
      >
        {item.label}
      </button>
    );
  }

  return (
    <AppLink
      href={item.href}
      className="inline-flex items-center text-sm font-semibold text-slate-700 transition hover:text-primary-700 dark:text-slate-200 dark:hover:text-primary-300"
    >
      {item.label}
    </AppLink>
  );
}

function MegaMenu({ item, onClose, onContactClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2 }}
      className="absolute left-1/2 top-full z-50 mt-5 w-[min(92vw,900px)] -translate-x-1/2 rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_35px_110px_rgba(2,6,23,0.24)] dark:border-slate-800 dark:bg-slate-950"
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          {item.sections.map((section) => (
            <div key={section.title} className="rounded-[24px] border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-700 dark:text-primary-300">
                {section.title}
              </p>
              <div className="mt-4 space-y-3">
                {section.items.map((entry) => (
                  entry.action === "contact-modal" ? (
                    <button
                      key={entry.label}
                      type="button"
                      onClick={() => {
                        onClose();
                        onContactClick();
                      }}
                      className="group block w-full rounded-2xl px-3 py-3 text-left transition hover:bg-primary-500/8"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-semibold text-slate-900 dark:text-white">{entry.label}</p>
                        <ArrowRight className="h-4 w-4 text-primary-600 opacity-0 transition group-hover:opacity-100" />
                      </div>
                      <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{entry.description}</p>
                    </button>
                  ) : (
                    <AppLink
                      key={entry.label}
                      href={entry.href}
                      onClick={onClose}
                      className="group block rounded-2xl px-3 py-3 transition hover:bg-primary-500/8"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-semibold text-slate-900 dark:text-white">{entry.label}</p>
                        <ArrowRight className="h-4 w-4 text-primary-600 opacity-0 transition group-hover:opacity-100" />
                      </div>
                      <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{entry.description}</p>
                    </AppLink>
                  )
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-primary-700 via-primary-800 to-primary-950 p-6 text-white">
          <div className="absolute -right-12 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-accent-400/15 blur-3xl" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-primary-100/70">Featured</p>
            <h3 className="mt-4 font-display text-3xl font-bold leading-tight">{item.spotlight.title}</h3>
            <p className="mt-4 text-sm leading-7 text-primary-50/78">{item.spotlight.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {item.spotlight.chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white"
                >
                  {chip}
                </span>
              ))}
            </div>
            <AppLink
              href="/#about"
              onClick={onClose}
              className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 font-semibold text-primary-900 transition hover:-translate-y-0.5"
            >
              Learn more
              <ArrowRight className="h-4 w-4" />
            </AppLink>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function DropdownMenu({ item, onClose, onContactClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2 }}
      className="absolute right-0 top-full z-50 mt-5 w-[min(92vw,760px)] rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_35px_110px_rgba(2,6,23,0.24)] dark:border-slate-800 dark:bg-slate-950"
    >
      <div className={`grid gap-4 ${item.spotlight ? "md:grid-cols-[0.9fr_1.1fr]" : "md:grid-cols-2"}`}>
        <div className={`grid gap-4 ${item.groups.length > 1 ? "md:grid-cols-2" : ""}`}>
          {item.groups.map((group) => (
          <div key={group.title} className="rounded-[22px] border border-slate-200 bg-slate-50 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-700 dark:text-primary-300">
              {group.title}
            </p>
            <div className="mt-4 space-y-3">
              {group.items.map((entry) =>
                entry.children ? (
                  <div key={entry.label} className="rounded-2xl bg-white p-3 shadow-sm dark:bg-slate-950">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-slate-900 dark:text-white">{entry.label}</p>
                      <ChevronRight className="h-4 w-4 text-primary-600 dark:text-primary-300" />
                    </div>
                    <div className="mt-3 space-y-2 pl-1">
                      {entry.children.map((child) => (
                        child.action === "contact-modal" ? (
                          <button
                            key={child.label}
                            type="button"
                            onClick={() => {
                              onClose();
                              onContactClick();
                            }}
                            className="group flex w-full items-center justify-between rounded-xl px-2 py-2 text-sm text-slate-700 transition hover:bg-primary-500/8 hover:text-primary-700 dark:text-slate-300 dark:hover:text-primary-200"
                          >
                            <span>{child.label}</span>
                            <ArrowRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                          </button>
                        ) : (
                          <AppLink
                            key={child.label}
                            href={child.href}
                            onClick={onClose}
                            className="group flex items-center justify-between rounded-xl px-2 py-2 text-sm text-slate-700 transition hover:bg-primary-500/8 hover:text-primary-700 dark:text-slate-300 dark:hover:text-primary-200"
                          >
                            <span>{child.label}</span>
                            <ArrowRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                          </AppLink>
                        )
                      ))}
                    </div>
                  </div>
                ) : (
                  entry.action === "contact-modal" ? (
                    <button
                      key={entry.label}
                      type="button"
                      onClick={() => {
                        onClose();
                        onContactClick();
                      }}
                      className="group flex w-full items-center justify-between rounded-2xl px-3 py-3 text-sm font-semibold text-slate-800 transition hover:bg-primary-500/8 hover:text-primary-700 dark:text-slate-200 dark:hover:text-primary-200"
                    >
                      <span>{entry.label}</span>
                      <ArrowRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
                    </button>
                  ) : (
                    <AppLink
                      key={entry.label}
                      href={entry.href}
                      onClick={onClose}
                      className="group flex items-center justify-between rounded-2xl px-3 py-3 text-sm font-semibold text-slate-800 transition hover:bg-primary-500/8 hover:text-primary-700 dark:text-slate-200 dark:hover:text-primary-200"
                    >
                      <span>{entry.label}</span>
                      <ArrowRight className="h-4 w-4 opacity-0 transition group-hover:opacity-100" />
                    </AppLink>
                  )
                )
              )}
            </div>
          </div>
          ))}
        </div>

        {item.spotlight && (
          <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-primary-700 via-primary-800 to-primary-950 p-5 text-white">
            <div className="absolute -right-12 top-0 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -left-8 bottom-0 h-32 w-32 rounded-full bg-accent-400/15 blur-3xl" />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-100/70">Featured</p>
              <h3 className="mt-3 font-display text-3xl font-bold leading-tight">{item.spotlight.title}</h3>
              <p className="mt-4 text-sm leading-7 text-primary-50/80">{item.spotlight.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {item.spotlight.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white"
                  >
                    {chip}
                  </span>
                ))}
              </div>
              <AppLink
                href={item.spotlight.href}
                onClick={onClose}
                className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 font-semibold text-primary-900 transition hover:-translate-y-0.5"
              >
                Explore
                <ArrowRight className="h-4 w-4" />
              </AppLink>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function MobileMenuItem({ item, openItem, setOpenItem, onNavigate, onContactClick }) {
  const expanded = openItem === item.label;

  if (item.type === "link") {
    if (item.action === "contact-modal") {
      return (
        <button
          type="button"
          onClick={() => {
            onNavigate();
            onContactClick();
          }}
          className="flex w-full items-center justify-between rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-4 text-sm font-semibold text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-white"
        >
          <span>{item.label}</span>
          <ArrowRight className="h-4 w-4 text-primary-600" />
        </button>
      );
    }

    return (
      <AppLink
        href={item.href}
        onClick={onNavigate}
        className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white/80 px-4 py-4 text-sm font-semibold text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-white"
      >
        <span>{item.label}</span>
        <ArrowRight className="h-4 w-4 text-primary-600" />
      </AppLink>
    );
  }

  const items =
    item.type === "mega"
      ? item.sections.flatMap((section) => section.items)
      : item.groups.flatMap((group) => group.items);

  return (
    <div className="rounded-[24px] border border-slate-200/80 bg-white/80 p-2 dark:border-white/10 dark:bg-white/5">
      <button
        type="button"
        onClick={() => setOpenItem(expanded ? "" : item.label)}
        className="flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left text-sm font-semibold text-slate-800 dark:text-white"
      >
        <span>{item.label}</span>
        <ChevronDown className={`h-4 w-4 transition ${expanded ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-2 px-2 pb-2">
              {items.map((entry) =>
                entry.children ? (
                  <div key={entry.label} className="rounded-2xl bg-slate-50/80 p-3 dark:bg-white/4">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{entry.label}</p>
                    <div className="mt-2 space-y-2 pl-2">
                      {entry.children.map((child) => (
                        child.action === "contact-modal" ? (
                          <button
                            key={child.label}
                            type="button"
                            onClick={() => {
                              onNavigate();
                              onContactClick();
                            }}
                            className="block w-full rounded-xl px-2 py-2 text-left text-sm text-slate-600 transition hover:bg-primary-500/8 hover:text-primary-700 dark:text-slate-300 dark:hover:text-primary-200"
                          >
                            {child.label}
                          </button>
                        ) : (
                          <AppLink
                            key={child.label}
                            href={child.href}
                            onClick={onNavigate}
                            className="block rounded-xl px-2 py-2 text-sm text-slate-600 transition hover:bg-primary-500/8 hover:text-primary-700 dark:text-slate-300 dark:hover:text-primary-200"
                          >
                            {child.label}
                          </AppLink>
                        )
                      ))}
                    </div>
                  </div>
                ) : (
                  entry.action === "contact-modal" ? (
                    <button
                      key={entry.label}
                      type="button"
                      onClick={() => {
                        onNavigate();
                        onContactClick();
                      }}
                      className="block w-full rounded-2xl px-3 py-3 text-left text-sm font-medium text-slate-600 transition hover:bg-primary-500/8 hover:text-primary-700 dark:text-slate-300 dark:hover:text-primary-200"
                    >
                      {entry.label}
                    </button>
                  ) : (
                    <AppLink
                      key={entry.label}
                      href={entry.href}
                      onClick={onNavigate}
                      className="block rounded-2xl px-3 py-3 text-sm font-medium text-slate-600 transition hover:bg-primary-500/8 hover:text-primary-700 dark:text-slate-300 dark:hover:text-primary-200"
                    >
                      {entry.label}
                    </AppLink>
                  )
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Header() {
  const location = useLocation();
  const { user } = useAuth();
  const { openContactModal } = useContactModal();
  const { settings } = useSettings();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState("");
  const [openItem, setOpenItem] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpenMenu("");
    setMobileOpen(false);
    setOpenItem("");
  }, [location.pathname, location.hash]);

  const workspaceHref = user ? (user.role === "admin" ? "/admin" : "/dashboard") : "/login";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <AnnouncementBar />
      <div className="hidden border-b border-slate-200 bg-white/95 md:block dark:border-slate-800 dark:bg-slate-950/95">
        <div className="section-shell flex items-center justify-between gap-4 py-3 text-sm">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <span className="font-medium">{topBarInfo.message}</span>
            <button
              type="button"
              onClick={openContactModal}
              className="font-semibold text-primary-700 transition hover:text-primary-600 dark:text-primary-300"
            >
              Contact Us
            </button>
          </div>
          <div className="flex items-center gap-5 text-slate-500 dark:text-slate-400">
            <a href={`mailto:${settings.contact.email}`} className="inline-flex items-center gap-2 transition hover:text-primary-700 dark:hover:text-primary-300">
              <Mail className="h-4 w-4 text-primary-600 dark:text-primary-300" />
              {settings.contact.email}
            </a>
            <a href={`tel:${settings.contact.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 transition hover:text-primary-700 dark:hover:text-primary-300">
              <PhoneCall className="h-4 w-4 text-primary-600 dark:text-primary-300" />
              {settings.contact.phone}
            </a>
            <span className="inline-flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-primary-600 dark:text-primary-300" />
              {settings.contact.workingHours || topBarInfo.hours}
            </span>
          </div>
        </div>
      </div>

      <div className="section-shell pt-3 md:pt-4">
        <div
          className={`relative rounded-[30px] border transition duration-300 ${
            scrolled
              ? "border-slate-200 bg-white/98 shadow-[0_24px_70px_rgba(2,6,23,0.16)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/96"
              : "border-slate-200 bg-white/96 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/94"
          }`}
        >
          <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-5 lg:px-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-glow">
                <Sprout className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display text-lg font-bold text-slate-950 dark:text-white">AI Village Brain</p>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                  Smart Farming Intelligence
                </p>
              </div>
            </Link>

            <nav className="hidden items-center gap-2 xl:flex">
              {headerNavigation.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.type !== "link" && setOpenMenu(item.label)}
                  onMouseLeave={() => item.type !== "link" && setOpenMenu("")}
                >
                  {item.type === "link" ? (
                    <DesktopLink item={item} onContactClick={openContactModal} />
                  ) : (
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 rounded-2xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-primary-500/8 hover:text-primary-700 dark:text-slate-200 dark:hover:bg-white/5 dark:hover:text-primary-300"
                    >
                      {item.label}
                      <ChevronDown className={`h-4 w-4 transition ${openMenu === item.label ? "rotate-180" : ""}`} />
                    </button>
                  )}

                  <AnimatePresence>
                    {openMenu === item.label &&
                      (item.type === "mega" ? (
                        <MegaMenu item={item} onClose={() => setOpenMenu("")} onContactClick={openContactModal} />
                      ) : (
                        <DropdownMenu item={item} onClose={() => setOpenMenu("")} onContactClick={openContactModal} />
                      ))}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            <div className="hidden items-center gap-3 xl:flex">
              <LanguageMenu />
              <button
                type="button"
                className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/80 text-slate-700 transition hover:-translate-y-0.5 hover:border-primary-400/35 hover:text-primary-700 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:text-primary-300"
                aria-label="Cart"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-primary-600 px-1 text-[10px] font-bold text-white">
                  2
                </span>
              </button>
              <Link
                to={workspaceHref}
                className="inline-flex items-center gap-2 rounded-2xl bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-primary-500"
              >
                Start Growing Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen((current) => !current)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/80 text-slate-700 transition hover:text-primary-700 xl:hidden dark:border-white/10 dark:bg-white/5 dark:text-white"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="border-t border-slate-200/80 px-4 pb-4 pt-4 dark:border-white/10 xl:hidden"
              >
                <div className="space-y-3">
                  {headerNavigation.map((item) => (
                    <MobileMenuItem
                      key={item.label}
                      item={item}
                      openItem={openItem}
                      setOpenItem={setOpenItem}
                      onContactClick={openContactModal}
                      onNavigate={() => {
                        setMobileOpen(false);
                        setOpenItem("");
                      }}
                    />
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 rounded-[24px] bg-primary-500/10 p-3">
                  <div className="flex items-center gap-3">
                    <div className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-800">
                      <ShoppingCart className="h-5 w-5" />
                      <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-primary-600 px-1 text-[10px] font-bold text-white">
                        2
                      </span>
                    </div>
                    <div className="text-sm">
                      <p className="font-semibold text-slate-900 dark:text-white">Need a custom rollout?</p>
                      <p className="text-slate-500 dark:text-slate-400">Talk to our agriculture product team.</p>
                    </div>
                  </div>
                  <LanguageMenu />
                </div>

                <Link
                  to={workspaceHref}
                  onClick={() => setMobileOpen(false)}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:bg-primary-500"
                >
                  Start Growing Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
