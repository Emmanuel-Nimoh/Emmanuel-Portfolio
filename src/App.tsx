import React, { useEffect, useMemo, useRef, useState } from "react";

const PROFILE = {
  name: "Emmanuel Nimoh",
  title: "Cybersecurity • Cloud • Builder",
  blurb:
    "Threat-focused, automation-first. I ship practical security with clear docs, fast feedback loops, and simple UX.",
  location: "Ohio, USA",
  email: "emmanuelnimoh170@outlook.com",
  linkedin: "https://www.linkedin.com/in/emmanuel-nimoh",
  github: "https://github.com/Emmanuel-Nimoh/Emmanuel-Portfolio",
  resumeUrl: "/Emmanuel_Nimoh_Resume.pdf"
};

const HIGHLIGHTS = [
  "B.S. Cybersecurity (Spring 2025), University of Cincinnati",
  "Chick-fil-A Inc. • OT/IoT Security • Cloud Sec • Automation",
  "TA @ UC School of IT • NSBE"
];

const EXPERIENCE = [
  {
    company: "Chick-fil-A, Inc.",
    role: "Cybersecurity Co-op (OT/IoT & Cloud)",
    period: "2023 – 2025",
    bullets: [
      "Built OT/IoT visibility and alerting, reducing response time with real-time notifications.",
      "Triaged Wiz alerts; authored Claroty SOPs improving RBAC and asset inventory.",
      "Automated AWS workflows with Lambda, API Gateway, DynamoDB, S3.",
      "Evaluated Claroty, Armis, Dragos, Opscura to inform vendor selection."
    ]
  },
  {
    company: "University of Cincinnati – School of IT",
    role: "Teaching Assistant",
    period: "2024 – Present",
    bullets: [
      "Supported labs and assessments; created quick-start guides.",
      "Mentored students on security, scripting, and troubleshooting."
    ]
  }
];

const PROJECTS = [
  {
    name: "Social Cipher — Cyber Awareness Game",
    description:
      "Escape-room style app teaching everyday security through puzzles and scenarios.",
    tech: ["React", "TypeScript", "Node", "Auth"],
    links: [{ label: "Demo", href: "#" }, { label: "Code", href: "#" }]
  },
  {
    name: "Log Anomaly Detection (Autoencoder/LSTM)",
    description: "Unsupervised anomaly detection from batch/stream logs.",
    tech: ["Python", "Pandas", "PyTorch"],
    links: [{ label: "Notebook", href: "#" }]
  },
  {
    name: "MaintenanceSpace (Android)",
    description: "Predictive maintenance with reminders and history.",
    tech: ["Java", "Android", "SQLite"]
  }
];

const SKILLS = {
  security: ["Threat Monitoring", "OT/IoT", "Wiz", "Claroty"],
  cloud: ["AWS (Lambda, API GW, S3, DynamoDB)", "IAM"],
  data: ["SQL", "Python", "Pandas", "ETL"],
  dev: ["React", "TypeScript", "Node", "Git"]
};

const colors = {
  bg: "#F4F1E8",
  fg: "#111827",
  fgSoft: "#4B5563",
  card: "#ffffff",
  border: "#e5e7eb",
  white: "#ffffff"
};

const s = {
  app: {
    height: "100vh",
    overflow: "hidden",
    background: colors.bg,
    color: colors.fg,
    fontFamily:
      "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial"
  },
  scroll: {
    height: "100%",
    overflowY: "auto" as const,
    scrollBehavior: "smooth" as const,
    scrollSnapType: "y mandatory" as const
  },
  section: {
    minHeight: "100svh",
    scrollSnapAlign: "start" as const,
    display: "grid",
    alignItems: "center",
    padding: "72px 0"
  },
  container: { maxWidth: 1120, margin: "0 auto", padding: "0 16px" },
  navWrap: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    backdropFilter: "blur(6px)",
    background: "rgba(244,241,232,.75)",
    borderBottom: `1px solid ${colors.border}`
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    padding: "12px 0"
  },
  logo: { color: colors.fg, textDecoration: "none", fontWeight: 800, letterSpacing: 0.4 },
  pills: { display: "flex", gap: 8 },
  pill: (active: boolean) => ({
    padding: "8px 12px",
    borderRadius: 999,
    fontSize: 14,
    textDecoration: "none",
    border: `1px solid ${colors.border}`,
    color: active ? "#111" : colors.fgSoft,
    background: active ? colors.white : "transparent",
    transition: "all .2s"
  }),
  h1: { fontSize: 56, fontWeight: 900, color: "#111", lineHeight: 1.1, margin: 0 },
  h2: { fontSize: 28, fontWeight: 800, color: "#111", margin: 0 },
  h3: { fontSize: 18, fontWeight: 700, color: "#111", margin: 0 },
  muted: { color: colors.fgSoft },
  heroGrid: { display: "grid", gap: 24, gridTemplateColumns: "repeat(12, minmax(0,1fr))" },
  col7: { gridColumn: "span 7 / span 7" },
  col5: { gridColumn: "span 5 / span 5" },
  card: {
    background: colors.card,
    border: `1px solid ${colors.border}`,
    borderRadius: 16,
    boxShadow: "0 10px 25px rgba(0,0,0,.08)",
    padding: 24
  },
  badges: { display: "flex", gap: 8, flexWrap: "wrap" as const },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: 999,
    padding: "6px 10px",
    fontSize: 12,
    background: "#f3f4f6",
    color: "#111"
  },
  row: { display: "flex", gap: 12, flexWrap: "wrap" as const },
  btn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    borderRadius: 999,
    padding: "10px 18px",
    fontSize: 14,
    fontWeight: 700,
    textDecoration: "none",
    border: `1px solid ${colors.border}`
  },
  primary: { background: "#111", color: colors.white, borderColor: "#111" },
  secondary: { background: colors.white, color: "#111" },
  gridAuto: { display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))" },
  foot: { padding: "24px 0 40px", color: colors.fgSoft, fontSize: 14, borderTop: `1px solid ${colors.border}` },
  indicatorWrap: { position: "fixed" as const, left: 16, top: "50%", transform: "translateY(-50%)", display: "grid", gap: 8 },
  dot: (active: boolean) => ({ width: 8, height: 8, borderRadius: 999, background: active ? "#111" : colors.border, transition: "all .2s" })
};

function useActive(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  const map = useMemo(() => new Map(ids.map((id) => [id, 0])), [ids]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) map.set((e.target as HTMLElement).id, e.intersectionRatio);
        });
        let top = ids[0];
        let score = -1;
        for (const [k, v] of map) {
          if (v > score) {
            top = k as string;
            score = v as number;
          }
        }
        setActive(top);
      },
      { threshold: Array.from({ length: 11 }, (_, i) => i / 10) }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids, map]);
  return active;
}

function Nav({ active }: { active: string }) {
  const items = [
    { id: "home", label: "Home" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" }
  ];
  return (
    <div style={s.navWrap}>
      <div style={{ ...s.container, ...s.nav }}>
        <a href="#home" style={s.logo}>EN</a>
        <div style={s.pills}>
          {items.map((it) => (
            <a key={it.id} href={`#${it.id}`} style={s.pill(active === it.id)}>
              {it.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" style={s.section}>
      <div style={s.container}>
        <div style={s.heroGrid}>
          <div style={s.col7}>
            <h1 style={s.h1}>{PROFILE.name}</h1>
            <p style={{ ...s.muted, marginTop: 8, fontSize: 18 }}>{PROFILE.title}</p>
            <p style={{ ...s.muted, marginTop: 12, lineHeight: 1.6 }}>{PROFILE.blurb}</p>
            <div style={{ ...s.badges, marginTop: 14 }}>
              {HIGHLIGHTS.map((h) => (
                <span key={h} style={s.badge}>{h}</span>
              ))}
            </div>
            <div style={{ ...s.row, marginTop: 16 }}>
              <a href="#projects" style={{ ...s.btn, ...s.primary }}>Explore projects</a>
              <a href={PROFILE.linkedin} style={{ ...s.btn, ...s.secondary }}>LinkedIn</a>
              <a href={PROFILE.github} style={{ ...s.btn, ...s.secondary }}>GitHub</a>
            </div>
            <div style={{ ...s.row, gap: 24, marginTop: 12, fontSize: 14 }}>
              <span style={s.muted}>{PROFILE.location}</span>
              <a href={`mailto:${PROFILE.email}`} style={{ ...s.muted, textDecoration: "none" }}>
                {PROFILE.email}
              </a>
            </div>
          </div>
          <div style={s.col5}>
            <div style={{ ...s.card, padding: 0, overflow: "hidden", display: "grid" }}>
              <img
                src="/headshot.jpg"
                alt="Emmanuel headshot"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceSec() {
  return (
    <section id="experience" style={s.section}>
      <div style={s.container}>
        <div style={s.h2}>Experience</div>
        <p style={s.muted}>Impact, not just activities.</p>
        <div style={{ ...s.gridAuto, marginTop: 16 }}>
          {EXPERIENCE.map((exp) => (
            <div key={exp.company} style={s.card}>
              <div style={s.h3}>{exp.role}</div>
              <div style={{ ...s.muted, fontSize: 14 }}>
                {exp.company} • {exp.period}
              </div>
              <ul style={{ marginTop: 10, paddingLeft: 18 }}>
                {exp.bullets.map((b, i) => (
                  <li key={i} style={{ color: colors.fg, fontSize: 14, marginBottom: 8 }}>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsSec() {
  return (
    <section id="projects" style={s.section}>
      <div style={s.container}>
        <div style={s.h2}>Projects</div>
        <p style={s.muted}>Select work I’ve built or shipped.</p>
        <div style={{ ...s.gridAuto, marginTop: 16 }}>
          {PROJECTS.map((p) => (
            <div key={p.name} style={s.card}>
              <div style={s.h3}>{p.name}</div>
              <p style={{ ...s.muted, marginTop: 8 }}>{p.description}</p>
              <div style={{ ...s.badges, marginTop: 12 }}>
                {p.tech.map((t) => (
                  <span key={t} style={s.badge}>{t}</span>
                ))}
              </div>
              {p.links && (
                <div style={{ ...s.row, marginTop: 12 }}>
                  {p.links.map((l) => (
                    <a key={l.label} href={l.href} style={{ ...s.btn, ...s.secondary }}>
                      {l.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillsSec() {
  const entries = useMemo(() => Object.entries(SKILLS), []);
  return (
    <section id="skills" style={s.section}>
      <div style={s.container}>
        <div style={s.h2}>Skills</div>
        <p style={s.muted}>Breadth across the stack; depth where it counts.</p>
        <div style={{ ...s.gridAuto, marginTop: 16 }}>
          {entries.map(([k, list]) => (
            <div key={k} style={s.card}>
              <div style={s.h3}>{k}</div>
              <div style={{ ...s.badges, marginTop: 12 }}>
                {list.map((it) => (
                  <span key={it} style={s.badge}>{it}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSec() {
  return (
    <section id="contact" style={s.section}>
      <div style={s.container}>
        <div style={s.h2}>Contact</div>
        <p style={s.muted}>Reach out for roles, projects, or collaborations.</p>
        <div style={{ ...s.gridAuto, marginTop: 16 }}>
          <div style={s.card}>
            <div style={s.muted}>Prefer email? Let’s connect.</div>
            <div style={{ ...s.row, marginTop: 12 }}>
              <a href={`mailto:${PROFILE.email}`} style={{ ...s.btn, ...s.secondary }}>
                {PROFILE.email}
              </a>
              <a href={PROFILE.linkedin} style={{ ...s.btn, ...s.secondary }}>LinkedIn</a>
              <a href={PROFILE.github} style={{ ...s.btn, ...s.secondary }}>GitHub</a>
              <a href={PROFILE.resumeUrl} style={{ ...s.btn, ...s.secondary }}>Resume</a>
            </div>
          </div>
          <div style={s.card}>
            <div style={s.h3}>Quick Message</div>
            <form onSubmit={(e) => e.preventDefault()} style={{ marginTop: 12, display: "grid", gap: 12 }}>
              <input placeholder="Your name" required style={{ width: "100%", borderRadius: 12, background: "#1f2937", color: colors.white, padding: 12, border: `1px solid ${colors.border}` }} />
              <input type="email" placeholder="Email" required style={{ width: "100%", borderRadius: 12, background: "#1f2937", color: colors.white, padding: 12, border: `1px solid ${colors.border}` }} />
              <textarea rows={4} placeholder="How can I help?" required style={{ width: "100%", borderRadius: 12, background: "#1f2937", color: colors.white, padding: 12, border: `1px solid ${colors.border}` }} />
              <button type="submit" style={{ ...s.btn, ...s.primary }}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const ids = ["home", "experience", "projects", "skills", "contact"];
  const active = useActive(ids);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (location.hash) return;
    const el = document.getElementById("home");
    if (el) el.scrollIntoView({ behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <div style={s.app}>
      <Nav active={active} />
      <div ref={scrollerRef} style={s.scroll}>
        <Hero />
        <ExperienceSec />
        <ProjectsSec />
        <SkillsSec />
        <ContactSec />
        <footer style={{ ...s.container, ...s.foot }}>
          © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
        </footer>
      </div>
      <div aria-hidden style={s.indicatorWrap}>
        {ids.map((id) => (
          <div key={id} style={s.dot(active === id)} />
        ))}
      </div>
    </div>
  );
}
