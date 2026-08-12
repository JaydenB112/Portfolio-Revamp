export const TYPEWRITER_STRINGS = [
  "Full-Stack Engineer.",
  "React & Next.js.",
  "Three.JS Dev.",
  "Team Lead.",
  "AI Builder.",
  "Memphis, TN.",
];

export const OPEN_SOURCE = [
  {
    name: "Firecrawl MCP Server",
    placeholder: "Open Source",
    description:
      "Implemented a 'Response Mode' toggle for the official Firecrawl MCP server. This allows users to switch between full content and metadata-only responses, drastically reducing token consumption and context window overhead in AI-agent workflows.",
    tags: ["MCP", "TypeScript", "AI Infrastructure", "Open Source"],
    github: "https://github.com/firecrawl/firecrawl-mcp-server/pull/231",
    image: "/projects/firecrawl-mcp.png",
  },
];

export const PROJECTS = [
  {
    name: "Onyx Studio",
    placeholder: "Full-Stack Studio",
    description:
      "Full-stack engineering studio for founders who want senior engineers end to end. Spec-to-production web, API, cloud, and data builds — no account managers, no six-week discovery phase.",
    tags: ["Next.js", "TypeScript", "Sanity", "Three.JS"],
    image: "/projects/onyx-studio.png",
    live: "https://onyxstud.io",
  },
  {
    name: "ScoutHelper",
    placeholder: "AI + NFL",
    description:
      "AI-powered NFL scouting tool. Analyzes player data and generates scouting reports using generative AI. Built for coaches and analysts who need fast, structured insights.",
    tags: ["Next.js", "Gemini AI", "Prisma", "PostgreSQL", "Tailwind"],
    image: "/projects/scouthelper.png",
    live: "https://frolicking-sable-2e2893.netlify.app/",
    github: "https://github.com/JaydenB112/NFL-Dashboard-Revamp-",
  },
  {
    name: "SchemaGen",
    placeholder: "SEO SaaS",
    description:
      "The Schema Delivery Network (SDN) for modern SEO teams. Deploy, update, and monitor JSON-LD structured data instantly via a one-line SDK, bypassing developer bottlenecks and CMS limitations.",
    tags: ["Next.js", "TypeScript", "Auth.js", "Zod", "Supabase"],
    image: "/projects/schemagen.png",
    live: "https://schemagen.io",
    github: "https://github.com/JaydenB112/SEO-gen-app",
  },
  {
    name: "Interactive Roadmap",
    placeholder: "Three.JS",
    description:
      "A 3D mountain climbing roadmap built in Three.JS. Visualizes a learning journey as an interactive terrain you can explore. Custom shaders and scroll-driven camera.",
    tags: ["Three.JS", "React", "Framer Motion"],
    image: "/projects/roadmap.png",
    live: "https://interactive-roadmap-eta.vercel.app",
    github: "https://github.com/JaydenB112/Interactive-Roadmap ",
  },
  {
    name: "Booth Capture",
    placeholder: "Lead Tool",
    description:
      "Conference lead capture tool built for trade show booths. Enables fast contact collection, tagging, and export. Designed for real-world field use on mobile.",
    tags: ["React", "Supabase", "Tailwind", "Docker"],
    image: "/projects/boothcapture.png",
    live: "https://roaring-treacle-484e56.netlify.app",
    github: "https://github.com/JaydenB112/VES-Project",
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
      "Established the agency's entire development process from scratch — including design systems, wireframing standards, QA workflows, and technical documentation.",
      "Led a cross-functional team of engineers, designers, and stakeholders across time zones to ship features on schedule.",
      "Implemented analytics dashboards using Looker Studio and GA4, driving a 30% increase in client user engagement.",
      "Authored 20+ technical documents covering architecture, deployment, and configuration standards.",
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
