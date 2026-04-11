"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "work", href: "#projects" },
    { label: "stack", href: "#stack" },
    { label: "about", href: "#about" },
    { label: "contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        transition: "background 0.3s ease",
        background: scrolled ? "rgba(8,10,15,0.85)" : "transparent",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a
          href="#"
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "15px",
            color: "var(--accent)",
            textDecoration: "none",
            letterSpacing: "-0.02em",
            fontWeight: 400,
          }}
          aria-label="Jay Boyd — Back to top"
        >
          {"<JB />"}
        </a>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "13px",
                color: "var(--text-muted)",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--accent)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-muted)")
              }
              className="hidden sm:inline"
            >
              {link.label}
            </a>
          ))}

          <a
            href="/JayBoydv4_2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "13px",
              color: "var(--accent)",
              textDecoration: "none",
              border: "1px solid var(--accent)",
              borderRadius: "6px",
              padding: "6px 14px",
              transition: "background 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--accent)";
              e.currentTarget.style.color = "#080A0F";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--accent)";
            }}
          >
            Resume ↗
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
