"use client";

import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Projects from "@/components/Projects";
import Stack from "@/components/Stack";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

// Hero uses Three.js which requires browser APIs — loaded client-side only
const Hero = dynamic(() => import("@/components/Hero"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: "100dvh",
        background: "#080A0F",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          fontFamily: "monospace",
          fontSize: "13px",
          color: "#6B7280",
        }}
      >
        initializing...
      </div>
    </div>
  ),
});

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Stack />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
