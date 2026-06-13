import { motion } from "framer-motion";
import GlassPanel from "./GlassPanel";

export default function FeatureCard({ feature, index = 0, onClick }) {
  const Icon = feature.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.04 }}
    >
      <button type="button" onClick={() => onClick?.(feature)} className="block h-full w-full text-left">
        <GlassPanel className="group h-full rounded-[30px] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-glow">
        <div className="flex items-start justify-between gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-primary-500/15 to-accent-400/20 text-primary-700 dark:text-primary-200">
            <Icon className="h-6 w-6" />
          </div>
          <span className="rounded-full border border-primary-500/15 bg-primary-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary-700 dark:text-primary-200">
            {feature.tag}
          </span>
        </div>
        <h3 className="mt-6 font-display text-xl font-bold text-slate-950 dark:text-white">{feature.title}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{feature.description}</p>
        <p className="mt-5 text-sm font-semibold text-primary-700 dark:text-primary-300">Open working module</p>
        </GlassPanel>
      </button>
    </motion.div>
  );
}
