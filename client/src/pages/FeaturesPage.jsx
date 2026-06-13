import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import FeatureCard from "../components/FeatureCard";
import { platformFeatures } from "../data/content";

export default function FeaturesPage() {
  const navigate = useNavigate();

  function openFeature(feature) {
    navigate(`/features/${feature.slug}`);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="section-shell pb-16 pt-8"
    >
      <div className="rounded-[36px] border border-white/40 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 p-8 text-white shadow-[0_40px_100px_rgba(7,23,15,0.3)]">
        <p className="text-sm uppercase tracking-[0.22em] text-primary-100/70">Feature matrix</p>
        <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
          A full agriculture intelligence platform across data, AI, and field operations.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-primary-50/80">
          Every feature below is implemented as part of the web experience and backed by modular API endpoints
          so the product can scale from pilot deployments to production operations.
        </p>
      </div>

      <section className="pt-16">
        <SectionHeading
          eyebrow="22 product modules"
          title="All platform capabilities"
          description="Built as a startup-style SaaS suite with reusable cards, analytics panels, and operator workflows."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {platformFeatures.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} onClick={openFeature} />
          ))}
        </div>
      </section>
    </motion.div>
  );
}
