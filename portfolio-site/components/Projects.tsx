"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PROJECTS } from "@/lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" as const },
  }),
};

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) {
  return (
    <motion.article
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeUp}
      style={{
        background: "var(--card-bg)",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "12px",
        padding: "28px",
        display: "flex",
        flexDirection: "column",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(79,142,247,0.4)";
        e.currentTarget.style.boxShadow = "0 0 24px rgba(79,142,247,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Screenshot preview */}
      <div
        style={{
          height: "180px",
          borderRadius: "8px",
          overflow: "hidden",
          position: "relative",
          background: "var(--card-inner)",
        }}
      >
        <Image
          src={project.image}
          alt={`${project.name} screenshot`}
          fill
          style={{ objectFit: "cover", objectPosition: "top" }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Subtle dark overlay so the card border/name pops cleanly */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(13,17,23,0) 50%, rgba(13,17,23,0.55) 100%)",
          }}
        />
      </div>

      {/* Name */}
      <h3
        style={{
          fontFamily: "var(--font-space-grotesk)",
          fontWeight: 600,
          fontSize: "20px",
          color: "var(--text-primary)",
          margin: "20px 0 0",
        }}
      >
        {project.name}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "14px",
          color: "var(--text-muted)",
          lineHeight: 1.6,
          margin: "8px 0 0",
          flexGrow: 1,
        }}
      >
        {project.description}
      </p>

      {/* Tags */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "6px",
          marginTop: "20px",
        }}
      >
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "11px",
              background: "var(--border-subtle)",
              color: "var(--accent)",
              borderRadius: "4px",
              padding: "3px 8px",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "12px",
            color: "var(--accent)",
            textDecoration: "none",
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Live ↗
        </a>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "12px",
            color: "var(--accent)",
            textDecoration: "none",
            transition: "opacity 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          GitHub ↗
        </a>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      style={{
        padding: "120px 24px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
      aria-labelledby="projects-heading"
    >
      {/* Label */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          fontFamily: "var(--font-jetbrains-mono)",
          fontSize: "12px",
          color: "var(--text-muted)",
          marginBottom: "12px",
          letterSpacing: "0.05em",
        }}
      >
        {"// 01. work"}
      </motion.p>

      {/* Heading */}
      <motion.h2
        id="projects-heading"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          fontFamily: "var(--font-space-grotesk)",
          fontWeight: 600,
          fontSize: "42px",
          color: "var(--text-primary)",
          marginBottom: "56px",
          letterSpacing: "-0.02em",
        }}
      >
        Things I&apos;ve Built
      </motion.h2>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
          gap: "24px",
        }}
      >
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
