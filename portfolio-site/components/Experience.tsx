"use client";

import { motion } from "framer-motion";
import { EXPERIENCES } from "@/lib/constants";

function ExperienceCard({
  experience,
  index,
}: {
  experience: (typeof EXPERIENCES)[0];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
      style={{
        background: "var(--card-bg)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "12px",
        padding: "32px 36px",
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "12px",
          marginBottom: "24px",
        }}
      >
        <div>
          <h3
            style={{
              fontFamily: "var(--font-space-grotesk)",
              fontWeight: 600,
              fontSize: "18px",
              color: "var(--text-primary)",
              margin: "0 0 5px",
              lineHeight: 1.3,
            }}
          >
            {experience.role}
          </h3>
          <p
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "13px",
              color: "var(--accent)",
              margin: 0,
            }}
          >
            {experience.company}
          </p>
        </div>

        <div style={{ textAlign: "right" }}>
          <p
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "12px",
              color: "var(--text-muted)",
              margin: "0 0 4px",
              whiteSpace: "nowrap",
            }}
          >
            {experience.period}
          </p>
          <p
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "11px",
              color: "var(--text-muted)",
              margin: 0,
              opacity: 0.6,
            }}
          >
            {experience.location}
          </p>
        </div>
      </div>

      {/* Bullets */}
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {experience.bullets.map((bullet, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.35,
              delay: index * 0.12 + 0.2 + i * 0.055,
              ease: "easeOut",
            }}
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "flex-start",
            }}
          >
            <span
              style={{
                color: "var(--accent)",
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "13px",
                flexShrink: 0,
                paddingTop: "2px",
                lineHeight: 1.5,
              }}
              aria-hidden="true"
            >
              →
            </span>
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "14px",
                color: "var(--text-muted)",
                lineHeight: 1.65,
              }}
            >
              {bullet}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.article>
  );
}

export default function Experience() {
  return (
    <section
      id="about"
      style={{
        padding: "120px 24px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
      aria-labelledby="experience-heading"
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "12px",
            color: "var(--text-muted)",
            marginBottom: "12px",
            letterSpacing: "0.05em",
          }}
        >
          {"// 03. experience"}
        </motion.p>

        {/* Heading */}
        <motion.h2
          id="experience-heading"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontWeight: 600,
            fontSize: "42px",
            color: "var(--text-primary)",
            marginBottom: "48px",
            letterSpacing: "-0.02em",
          }}
        >
          Where I&apos;ve Been
        </motion.h2>

        {/* Cards — stacked vertically */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            maxWidth: "860px",
          }}
        >
          {EXPERIENCES.map((exp, i) => (
            <ExperienceCard key={exp.company} experience={exp} index={i} />
          ))}
        </div>

        {/* Closing note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            fontFamily: "var(--font-inter)",
            fontStyle: "italic",
            fontSize: "15px",
            color: "var(--text-muted)",
            maxWidth: "640px",
            lineHeight: 1.7,
            marginTop: "36px",
          }}
        >
        </motion.p>
      </div>
    </section>
  );
}
