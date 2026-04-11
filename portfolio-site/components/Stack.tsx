"use client";

import { motion } from "framer-motion";
import { STACK } from "@/lib/constants";

function StackPill({ label, delay }: { label: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      style={{
        display: "inline-block",
        fontFamily: "var(--font-jetbrains-mono)",
        fontSize: "12px",
        background: "var(--border-subtle)",
        color: "var(--accent)",
        borderRadius: "4px",
        padding: "4px 10px",
      }}
    >
      {label}
    </motion.span>
  );
}

export default function Stack() {
  return (
    <section
      id="stack"
      style={{
        padding: "120px 24px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
      aria-labelledby="stack-heading"
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
          gap: "64px",
          alignItems: "start",
        }}
      >
        {/* Left: copy */}
        <div>
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
            {"// 02. stack"}
          </motion.p>

          <motion.h2
            id="stack-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: "var(--font-space-grotesk)",
              fontWeight: 600,
              fontSize: "42px",
              color: "var(--text-primary)",
              marginBottom: "32px",
              letterSpacing: "-0.02em",
            }}
          >
            How I Build
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "16px",
              color: "var(--text-muted)",
              lineHeight: 1.7,
              maxWidth: "420px",
            }}
          >
            I work across the full stack — from Three.JS scenes and React UIs to
            PostgreSQL schemas and Docker containers. I reach for the right tool
            for the job, not the trendiest one.
          </motion.p>
        </div>

        {/* Right: stack groups */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "40px",
          }}
        >
          {Object.entries(STACK).map(([group, items], gi) => (
            <div key={group}>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: gi * 0.07 }}
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "11px",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "14px",
                }}
              >
                {group}
              </motion.p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "6px",
                }}
              >
                {items.map((item, ii) => (
                  <StackPill
                    key={item}
                    label={item}
                    delay={gi * 0.05 + ii * 0.04}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
