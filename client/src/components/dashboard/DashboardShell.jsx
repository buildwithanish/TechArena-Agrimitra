import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || "");

  useEffect(() => {
    if (!sectionIds?.length) {
      return undefined;
    }

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!elements.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-15% 0px -60% 0px",
        threshold: [0.15, 0.35, 0.6]
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
}

export default function DashboardShell({
  sectionIds = [],
  renderSidebar,
  renderHeader,
  children
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    function closeSidebarOnDesktop() {
      if (window.innerWidth >= 1280) {
        setSidebarOpen(false);
      }
    }

    window.addEventListener("resize", closeSidebarOnDesktop);
    return () => window.removeEventListener("resize", closeSidebarOnDesktop);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(92,193,130,0.12),_transparent_24%),linear-gradient(180deg,_#f4fbf7_0%,_#edf5ef_100%)] p-3 dark:bg-[radial-gradient(circle_at_top_left,_rgba(92,193,130,0.1),_transparent_24%),linear-gradient(180deg,_#07170f_0%,_#0d2216_100%)] sm:p-4 lg:p-6"
    >
      <div className="mx-auto grid max-w-[1600px] gap-4 xl:grid-cols-[292px_minmax(0,1fr)]">
        <div className="hidden xl:block">
          {renderSidebar?.({
            activeSection,
            closeSidebar: () => setSidebarOpen(false)
          })}
        </div>

        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-slate-950/45 xl:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <motion.div
                initial={{ x: -32, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -32, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="h-full w-[88%] max-w-[320px] p-3"
                onClick={(event) => event.stopPropagation()}
              >
                {renderSidebar?.({
                  activeSection,
                  closeSidebar: () => setSidebarOpen(false),
                  mobile: true
                })}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="min-w-0 space-y-4">
          {renderHeader?.({
            activeSection,
            openSidebar: () => setSidebarOpen(true)
          })}
          {children}
        </div>
      </div>
    </motion.div>
  );
}
