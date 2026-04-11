export const TYPEWRITER_STRINGS = [
  "Full-Stack Engineer.",
  "React & Next.js.",
  "Three.JS Dev.",
  "Team Lead.",
  "AI Builder.",
  "Memphis, TN.",
];

export const PROJECTS = [
  {
    name: "ScoutHelper",
    placeholder: "AI + NFL",
    description:
      "AI-powered NFL scouting tool. Analyzes player data and generates scouting reports using generative AI. Built for coaches and analysts who need fast, structured insights.",
    tags: ["Next.js", "Gemini AI", "Prisma", "PostgreSQL", "Tailwind"],
    image: "/projects/scouthelper.png",
    live: "https://frolicking-sable-2e2893.netlify.app/",
    github: "https://github.com/JaydenB112",
  },
  {
    name: "SchemaGen",
    placeholder: "SEO SaaS",
    description:
      "SEO schema markup SaaS tool. Generates structured data for any page type, improving search visibility. Full auth, billing-ready architecture.",
    tags: ["Next.js", "TypeScript", "Auth.js", "Zod", "Supabase"],
    image: "/projects/schemagen.png",
    live: "https://seo-gen-app-cyan.vercel.app",
    github: "https://github.com/JaydenB112",
  },
  {
    name: "Interactive Roadmap",
    placeholder: "Three.JS",
    description:
      "A 3D mountain climbing roadmap built in Three.JS. Visualizes a learning journey as an interactive terrain you can explore. Custom shaders and scroll-driven camera.",
    tags: ["Three.JS", "React", "Framer Motion", "GLSL"],
    image: "/projects/roadmap.png",
    live: "https://interactive-roadmap-eta.vercel.app",
    github: "https://github.com/JaydenB112",
  },
  {
    name: "Booth Capture",
    placeholder: "Lead Tool",
    description:
      "Conference lead capture tool built for trade show booths. Enables fast contact collection, tagging, and export. Designed for real-world field use on mobile.",
    tags: ["React", "Supabase", "Tailwind", "Docker"],
    image: "/projects/boothcapture.png",
    live: "https://roaring-treacle-484e56.netlify.app",
    github: "https://github.com/JaydenB112",
  },
];

export const STACK: Record<string, string[]> = {
  Frontend: [
    "React",
    "Next.js 15",
    "TypeScript",
    "Three.JS",
    "Tailwind CSS",
    "Framer Motion",
  ],
  Backend: ["Node.js", "Prisma", "PostgreSQL", "Supabase", "Auth.js", "Zod"],
  Tooling: ["Docker", "Vitest", "ESLint", "Git", "Vercel", "Netlify"],
  "AI / Data": [
    "Gemini AI",
    "Anthropic API",
    "LangChain basics",
    "Prompt engineering",
  ],
};

export const EXPERIENCES = [
  {
    role: "Software Engineer & Engineering Team Lead",
    company: "RedRover Sales & Marketing",
    period: "June 2024 — Present",
    location: "Memphis, TN",
    bullets: [
      "$237K+ in verified project value delivered within 12 months.",
      "Rebuilt and scaled a dormant web development pipeline that had been inactive for nearly 2 years.",
      "Led a $139K B2B website build for a vinyl logistics company with a hard SXSW conference deadline — coordinating cross-functional teams, designing off PDF specs without a design system, and shipping on time.",
      "Architected and maintained 5+ production web applications using Node.js, React, PHP, SQL, and MongoDB.",
      "Designed automated deployment and scaling systems using Cloudflare, Git, and REST APIs — reducing server downtime by 15% and strengthening security posture.",
      "Established the agency's entire development process from scratch — including design systems, wireframing standards, QA workflows, and technical documentation.",
      "Led a cross-functional team of 5 engineers, designers, and stakeholders across time zones to ship features on schedule.",
      "Implemented analytics dashboards using Looker Studio and GA4, driving a 30% increase in client user engagement.",
      "Authored 20+ technical documents covering architecture, deployment, and configuration standards in Confluence.",
    ],
  },
  {
    role: "Teaching Assistant — Full-Stack Development",
    company: "CodeCrew",
    period: "Dec 2023 — June 2024",
    location: "Memphis, TN",
    bullets: [
      "Mentored a cohort of 20 students through full-stack curriculum, achieving an 85% course completion rate through hands-on technical support and pair programming.",
      "Reinforced fundamentals in JavaScript, HTML/CSS, and REST APIs through code reviews and live debugging sessions.",
    ],
  },
  {
    role: "Software Developer",
    company: "GiveCamp Memphis & Independent Projects",
    period: "2023 — Present",
    location: "Memphis, TN",
    bullets: [
      "Volunteer annually at GiveCamp Memphis building websites for nonprofits including Big Brothers Big Sisters and JUICE Orange Mound — reducing load times by 30% and increasing engagement by 30%.",
      "Developed custom WordPress solutions with third-party API integrations and automated reporting dashboards.",
    ],
  },
];

export const CONTACT_LINKS = [
  {
    label: "jayboyd@thejayvariable.com",
    href: "mailto:jayboyd@thejayvariable.com",
  },
  {
    label: "github.com/JaydenB112",
    href: "https://github.com/JaydenB112",
  },
  {
    label: "linkedin.com/in/jay-boyd",
    href: "https://www.linkedin.com/in/jay-boyd/",
  },
];
