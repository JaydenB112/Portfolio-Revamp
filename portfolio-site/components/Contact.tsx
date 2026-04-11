"use client";

import { motion } from "framer-motion";
import { CONTACT_LINKS } from "@/lib/constants";

function ContactRow({
  label,
  href,
  index,
}: {
  label: string;
  href: string;
  index: number;
}) {
  return (
    <motion.a
      href={href}
      target={href.startsWith("mailto") ? "_self" : "_blank"}
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "16px 0",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        textDecoration: "none",
        color: "var(--text-muted)",
        fontFamily: "var(--font-jetbrains-mono)",
        fontSize: "15px",
        transition: "color 0.2s ease, border-color 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "var(--accent)";
        e.currentTarget.style.borderBottomColor = "rgba(79,142,247,0.35)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "var(--text-muted)";
        e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.07)";
      }}
      aria-label={label}
    >
      <span style={{ color: "var(--accent)" }} aria-hidden="true">
        →
      </span>
      {label}
    </motion.a>
  );
}

export default function Contact() {
  return (
    <>
      <section
        id="contact"
        style={{
          padding: "120px 24px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
        aria-labelledby="contact-heading"
      >
        <div
          style={{
            maxWidth: "640px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
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
            {"// 04. contact"}
          </motion.p>

          {/* Heading */}
          <motion.h2
            id="contact-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: "var(--font-space-grotesk)",
              fontWeight: 600,
              fontSize: "42px",
              color: "var(--text-primary)",
              marginBottom: "20px",
              letterSpacing: "-0.02em",
            }}
          >
            Let&apos;s Work Together
          </motion.h2>

          {/* Copy */}
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
              marginBottom: "48px",
            }}
          >
            I&apos;m actively looking for full-time software engineering roles.
            If you&apos;re building something interesting and need a full-stack
            engineer who ships, reach out.
          </motion.p>

          {/* Contact links */}
          <div style={{ textAlign: "left" }}>
            {CONTACT_LINKS.map((link, i) => (
              <ContactRow
                key={link.href}
                label={link.label}
                href={link.href}
                index={i}
              />
            ))}
          </div>

          {/* Open to work badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "36px",
              background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(34,197,94,0.2)",
              borderRadius: "100px",
              padding: "6px 14px",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#22C55E",
                display: "inline-block",
                flexShrink: 0,
              }}
              aria-hidden="true"
            />
            <span
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "12px",
                color: "#22C55E",
              }}
            >
              Open to Work
            </span>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "24px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "12px",
            color: "var(--text-muted)",
            margin: 0,
          }}
        >
          Built by Jay Boyd · thejayvariable.com · 2025
        </p>
      </footer>
    </>
  );
}
