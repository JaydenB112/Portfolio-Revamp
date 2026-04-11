"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { TYPEWRITER_STRINGS } from "@/lib/constants";

// ─── Typewriter Hook ──────────────────────────────────────────────────────────
function useTypewriter(strings: string[]) {
  const [displayed, setDisplayed] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const current = strings[currentIndex];

    if (isPaused) {
      const t = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 1800);
      return () => clearTimeout(t);
    }

    if (isDeleting) {
      if (displayed.length === 0) {
        setIsDeleting(false);
        setCurrentIndex((i) => (i + 1) % strings.length);
        return;
      }
      const delay = 28;
      const t = setTimeout(
        () => setDisplayed((d) => d.slice(0, -1)),
        delay
      );
      return () => clearTimeout(t);
    }

    if (displayed.length === current.length) {
      setIsPaused(true);
      return;
    }

    const jitter = Math.random() * 30 - 15;
    const delay = 65 + jitter;
    const t = setTimeout(
      () => setDisplayed((d) => current.slice(0, d.length + 1)),
      delay
    );
    return () => clearTimeout(t);
  }, [displayed, currentIndex, isDeleting, isPaused, strings]);

  return displayed;
}

// ─── Vertex & Fragment Shaders ────────────────────────────────────────────────
const vertexShader = `
  attribute float aSize;
  attribute float aDisplacement;

  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uPixelRatio;

  varying float vDisplacement;

  void main() {
    vDisplacement = aDisplacement;

    // Drift using sine/cosine noise
    vec3 pos = position;
    float t = uTime * 0.3;
    pos.x += sin(pos.y * 1.3 + t * 0.7) * 0.04;
    pos.y += cos(pos.x * 1.1 + t * 0.5) * 0.04;
    pos.z += sin(pos.z * 0.9 + t * 0.6) * 0.04;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * uPixelRatio * (200.0 / -mvPosition.z) * (1.0 + aDisplacement * 2.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying float vDisplacement;

  void main() {
    // Circular soft dot
    vec2 uv = gl_PointCoord - vec2(0.5);
    float d = length(uv);
    if (d > 0.5) discard;
    float alpha = 1.0 - smoothstep(0.3, 0.5, d);

    // Interpolate colors: rest (#A0C4FF) → displaced (#4F8EF7)
    vec3 restColor = vec3(0.627, 0.769, 1.0);
    vec3 activeColor = vec3(0.310, 0.557, 0.969);
    vec3 color = mix(restColor, activeColor, vDisplacement);

    float baseAlpha = mix(0.25, 0.95, vDisplacement);
    gl_FragColor = vec4(color, alpha * baseAlpha);
  }
`;

// ─── Particle Field Component ─────────────────────────────────────────────────
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
    });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    rendererRef.current = renderer;

    // Particle geometry
    const COUNT = 2800;
    const positions = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const displacements = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14; // x: [-7, 7]
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10; // y: [-5, 5]
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6; // z: [-3, 3]
      sizes[i] = 0.5 + Math.random() * 2.5; // size: [0.5, 3.0]
      displacements[i] = 0;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute(
      "aDisplacement",
      new THREE.BufferAttribute(displacements, 1)
    );

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uPixelRatio: { value: Math.min(devicePixelRatio, 2) },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    // Disable frustum culling to save CPU (all particles are generally visible)
    particles.frustumCulled = false;
    scene.add(particles);

    // Mouse repulsion
    const originalPositions = positions.slice();
    const velocities = new Float32Array(COUNT * 3);

    const REPULSION_RADIUS = 1.8;
    const SPRING = 0.08;
    const DAMPING = 0.85;

    function handleMouseMove(e: MouseEvent) {
      // Map screen coords to NDC
      const rect = canvas!.getBoundingClientRect();
      const ndcX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ndcY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouseRef.current = { x: ndcX, y: ndcY };
    }

    canvas.addEventListener("mousemove", handleMouseMove);

    // Resize
    function handleResize() {
      const w = canvas!.clientWidth;
      const h = canvas!.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener("resize", handleResize);

    // Animation loop
    const clock = new THREE.Clock();
    function animate() {
      animFrameRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      material.uniforms.uTime.value = elapsed;

      // Project mouse to approximate world space at z=0
      const mouseWorld = new THREE.Vector3(
        mouseRef.current.x * camera.aspect * Math.tan(
          (camera.fov / 2) * (Math.PI / 180)
        ) * camera.position.z,
        mouseRef.current.y * Math.tan(
          (camera.fov / 2) * (Math.PI / 180)
        ) * camera.position.z,
        0
      );

      const posArr = geometry.attributes.position.array as Float32Array;
      const dispArr = geometry.attributes.aDisplacement.array as Float32Array;

      // Optimization: pre-calculate squared radius to avoid expensive Math.sqrt calls
      const repRadiusSq = REPULSION_RADIUS * REPULSION_RADIUS;
      let needsBufferUpdate = false;

      for (let i = 0; i < COUNT; i++) {
        const i3 = i * 3;
        const ox = originalPositions[i3];
        const oy = originalPositions[i3 + 1];
        const oz = originalPositions[i3 + 2];

        const dx = posArr[i3] - mouseWorld.x;
        const dy = posArr[i3 + 1] - mouseWorld.y;
        
        // Fast distance check without square root
        const distSq = dx * dx + dy * dy;

        let isActive = false;

        if (distSq < repRadiusSq) {
          const dist = Math.sqrt(distSq);
          // Protect against Division by Zero NaN
          const safeDist = Math.max(dist, 0.0001);
          const force = (REPULSION_RADIUS - dist) / REPULSION_RADIUS;
          velocities[i3] += (dx / safeDist) * force * 0.12;
          velocities[i3 + 1] += (dy / safeDist) * force * 0.12;
          dispArr[i] = Math.min(1, force * 1.5);
          isActive = true;
        } else {
          if (dispArr[i] > 0.001) {
            dispArr[i] *= 0.9;
            isActive = true;
          } else if (dispArr[i] !== 0) {
            dispArr[i] = 0;
            isActive = true; // Flushes perfect 0 to GPU once
          }
        }

        // Optimization: Put resting particles to sleep instead of running math endlessly
        const isDisplaced =
          Math.abs(ox - posArr[i3]) > 0.001 ||
          Math.abs(oy - posArr[i3 + 1]) > 0.001 ||
          Math.abs(oz - posArr[i3 + 2]) > 0.001 ||
          Math.abs(velocities[i3]) > 0.0001 ||
          Math.abs(velocities[i3 + 1]) > 0.0001 ||
          Math.abs(velocities[i3 + 2]) > 0.0001;

        if (isActive || isDisplaced) {
          // Spring back to original position
          velocities[i3] += (ox - posArr[i3]) * SPRING;
          velocities[i3 + 1] += (oy - posArr[i3 + 1]) * SPRING;
          velocities[i3 + 2] += (oz - posArr[i3 + 2]) * SPRING;

          // Damping
          velocities[i3] *= DAMPING;
          velocities[i3 + 1] *= DAMPING;
          velocities[i3 + 2] *= DAMPING;

          posArr[i3] += velocities[i3];
          posArr[i3 + 1] += velocities[i3 + 1];
          posArr[i3 + 2] += velocities[i3 + 2];
          
          needsBufferUpdate = true;
        } else {
          // Lock to perfect zero if totally resting
          if (posArr[i3] !== ox || velocities[i3] !== 0) {
            posArr[i3] = ox;
            posArr[i3 + 1] = oy;
            posArr[i3 + 2] = oz;
            velocities[i3] = 0;
            velocities[i3 + 1] = 0;
            velocities[i3 + 2] = 0;
            needsBufferUpdate = true;
          }
        }
      }

      // Only push new data to the GPU if particles changed
      if (needsBufferUpdate) {
        geometry.attributes.position.needsUpdate = true;
        geometry.attributes.aDisplacement.needsUpdate = true;
      }

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      canvas.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
      }}
      aria-hidden="true"
    />
  );
}

// ─── Scroll Indicator ─────────────────────────────────────────────────────────
function ScrollIndicator() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY < 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: "absolute",
            bottom: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div className="scroll-line" aria-hidden="true" />
          <span
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "11px",
              color: "var(--text-muted)",
              letterSpacing: "0.08em",
              textTransform: "lowercase",
            }}
          >
            scroll
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.7,
    delay,
    ease: "easeOut" as const,
  },
});

export default function Hero() {
  const typewritten = useTypewriter(TYPEWRITER_STRINGS);

  const scrollToProjects = useCallback(() => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section
      style={{
        position: "relative",
        height: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
      aria-label="Hero section"
    >
      <ParticleField />

      {/* Dark radial scrim — dims particles behind text for readability */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "760px",
          height: "560px",
          background:
            "radial-gradient(ellipse at center, rgba(8,10,15,0.82) 0%, rgba(8,10,15,0.55) 45%, transparent 72%)",
          pointerEvents: "none",
        }}
      />

      {/* Text content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "0 24px",
        }}
      >
        {/* Line 1 */}
        <motion.p
          {...fadeUp(0.3)}
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "13px",
            color: "var(--text-muted)",
            marginBottom: "16px",
          }}
        >
          const jay = () =&gt; {"{"}
        </motion.p>

        {/* Line 2 – Name */}
        <motion.h1
          {...fadeUp(0.5)}
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontWeight: 600,
            fontSize: "clamp(48px, 7vw, 88px)",
            color: "var(--text-primary)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            margin: "0 0 16px",
            textShadow:
              "0 2px 24px rgba(8,10,15,0.9), 0 0 48px rgba(8,10,15,0.7)",
          }}
        >
          Jay Boyd.
        </motion.h1>

        {/* Line 3 – Typewriter */}
        <motion.div
          {...fadeUp(0.7)}
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontWeight: 300,
            fontSize: "clamp(20px, 3vw, 36px)",
            color: "var(--accent)",
            minHeight: "1.4em",
            marginBottom: "16px",
          }}
          aria-live="polite"
          aria-label={`Currently showing: ${typewritten}`}
        >
          {typewritten}
          <span className="cursor-blink" aria-hidden="true">
            |
          </span>
        </motion.div>

        {/* Line 4 */}
        <motion.p
          {...fadeUp(0.8)}
          style={{
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: "13px",
            color: "var(--text-muted)",
            marginBottom: "48px",
          }}
        >
          {"}"}
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(1.2)}
          style={{
            display: "flex",
            gap: "24px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={scrollToProjects}
            id="hero-view-work"
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "14px",
              fontWeight: 400,
              background: "var(--accent)",
              color: "#080A0F",
              border: "none",
              borderRadius: "8px",
              padding: "14px 28px",
              cursor: "pointer",
              transition: "opacity 0.2s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.85";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            View My Work ↓
          </button>

          <a
            href="https://github.com/JaydenB112"
            target="_blank"
            rel="noopener noreferrer"
            id="hero-github"
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "14px",
              fontWeight: 400,
              background: "transparent",
              color: "var(--accent)",
              border: "1px solid var(--accent)",
              borderRadius: "8px",
              padding: "14px 28px",
              textDecoration: "none",
              transition:
                "background 0.2s ease, color 0.2s ease, transform 0.2s ease",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(79,142,247,0.1)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            GitHub ↗
          </a>
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
