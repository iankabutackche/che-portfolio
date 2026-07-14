import { useEffect, useState, useCallback } from "react";
import {
  HiOutlineMail,
  HiOutlineExternalLink,
  HiOutlineMenu,
  HiOutlineX,
  HiArrowRight,
} from "react-icons/hi";
import Logo from "./components/Logo";
import { content } from "./content";
import "./index.css";

const SECTIONS = ["home", "about", "skills", "projects", "experience", "contact"];

function useScrollEffects(lang) {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      const offset = 120;
      let current = "home";
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) current = id;
      }
      setActive(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [lang]);

  return { active, scrolled };
}

export default function App() {
  const [lang, setLang] = useState("zh");
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroHover, setHeroHover] = useState(false);
  const [heroGlow, setHeroGlow] = useState({ x: 50, y: 50 });
  const t = content[lang];
  const { active, scrolled } = useScrollEffects(lang);

  const handleHeroMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHeroGlow({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }, []);

  const sectionIndex = {
    about: "01",
    skills: "02",
    projects: "03",
    experience: "04",
    contact: "05",
  };

  return (
    <>
      <div className="ambient" aria-hidden="true">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>
      <div className="grid-bg" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />

      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="container nav-inner">
          <a
            href="#home"
            className="logo"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("home");
            }}
          >
            <Logo lang={lang} />
          </a>

          <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
            {Object.entries(t.nav)
              .filter(([key]) => key !== "home")
              .map(([key, label]) => (
                <li key={key}>
                  <a
                    href={`#${key}`}
                    className={active === key ? "active" : ""}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(key);
                    }}
                  >
                    <span className="nav-dot" />
                    {label}
                  </a>
                </li>
              ))}
          </ul>

          <div className="nav-actions">
            <div className="lang-switch">
              <button
                className={`lang-btn ${lang === "zh" ? "active" : ""}`}
                onClick={() => setLang("zh")}
              >
                中
              </button>
              <button
                className={`lang-btn ${lang === "en" ? "active" : ""}`}
                onClick={() => setLang("en")}
              >
                EN
              </button>
            </div>
            <button
              className="menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="menu"
            >
              {menuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
            </button>
          </div>
        </div>
        <div className="nav-glow" aria-hidden="true" />
      </nav>

      <main>
        <section
          id="home"
          className={`hero ${heroHover ? "hero--active" : ""}`}
          style={{
            "--hero-x": `${heroGlow.x}%`,
            "--hero-y": `${heroGlow.y}%`,
          }}
          onMouseMove={handleHeroMove}
          onMouseEnter={() => setHeroHover(true)}
          onMouseLeave={() => setHeroHover(false)}
        >
          <div className="hero-spotlight" aria-hidden="true" />
          <div className="container hero-inner reveal visible">
            <div className="hero-intro">
              <p className="hero-greeting">
                <span className="greeting-line" />
                {t.hero.greeting}
              </p>
              <h1 className="hero-name">{t.hero.name}</h1>
              <p className="hero-role">{t.hero.role}</p>
              {t.hero.credentials && (
                <p className="hero-credentials">{t.hero.credentials}</p>
              )}
              <p className="hero-tagline">{t.hero.tagline}</p>
            </div>
            <div className="hero-cta">
              <button className="btn btn-primary" onClick={() => scrollTo("projects")}>
                <span>{t.hero.ctaProjects}</span>
                <HiArrowRight className="btn-icon" />
              </button>
              <button className="btn btn-ghost" onClick={() => scrollTo("contact")}>
                {t.hero.ctaContact}
              </button>
            </div>
          </div>
          <div className="scroll-hint" aria-hidden="true">
            <span />
          </div>
        </section>

        <section id="about" className="section-block">
          <div className="container reveal">
            <div className="section-header">
              <span className="section-num">{sectionIndex.about}</span>
              <h2 className="section-title">{t.about.title}</h2>
            </div>
            <div className="about-grid">
              <div className="glass-panel about-text">
                <p>{t.about.p1}</p>
                <p>{t.about.p2}</p>
              </div>
              <div>
                <h3 className="panel-label">{t.about.eduTitle}</h3>
                {t.about.edu.map((e) => (
                  <div className="edu-card glass-panel" key={e.school}>
                    <div className="card-shine" aria-hidden="true" />
                    <h4>{e.school}</h4>
                    <div className="degree">{e.degree}</div>
                    <div className="edu-meta">
                      <span>{e.period}</span>
                    </div>
                    <div className="edu-note">{e.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="section-block">
          <div className="container reveal">
            <div className="section-header">
              <span className="section-num">{sectionIndex.skills}</span>
              <h2 className="section-title">{t.skills.title}</h2>
            </div>
            <div className="skills-wrap">
              <div className="skill-group glass-panel">
                <h4>{t.skills.familiar}</h4>
                <div className="tags">
                  {t.skills.familiarList.map((s) => (
                    <span className="tag" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="skill-group glass-panel">
                <h4>{t.skills.exposure}</h4>
                <div className="tags">
                  {t.skills.exposureList.map((s) => (
                    <span className="tag muted" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="section-block">
          <div className="container reveal">
            <div className="section-header">
              <span className="section-num">{sectionIndex.projects}</span>
              <h2 className="section-title">{t.projects.title}</h2>
            </div>
            <div className="projects-grid">
              {t.projects.items.map((p, i) => (
                <article
                  className="project-card glass-panel"
                  key={p.name}
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  <div className="card-shine" aria-hidden="true" />
                  <div className="project-header">
                    <div>
                      <div className="project-name">{p.name}</div>
                      <div className="project-sub">{p.subtitle}</div>
                    </div>
                    <span className="project-badge">{t.projects.featured}</span>
                  </div>
                  <p className="project-desc">{p.desc}</p>
                  <ul className="project-highlights">
                    {p.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                  <div className="project-tags">
                    {p.tags.map((tag) => (
                      <span className="project-tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  {p.demo && (
                    <div className="project-links">
                      <a href={p.demo} target="_blank" rel="noreferrer" className="link-arrow">
                        Live Demo <HiOutlineExternalLink />
                      </a>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="section-block">
          <div className="container reveal">
            <div className="section-header">
              <span className="section-num">{sectionIndex.experience}</span>
              <h2 className="section-title">{t.experience.title}</h2>
            </div>
            <div className="exp-list">
              {t.experience.items.map((e, i) => (
                <div
                  className="exp-item glass-panel"
                  key={e.role + e.period}
                  style={{ transitionDelay: `${i * 0.06}s` }}
                >
                  <div className="exp-marker" aria-hidden="true" />
                  <div>
                    <div className="exp-role">{e.role}</div>
                    <div className="exp-org">{e.org}</div>
                  </div>
                  <div className="exp-date">{e.period}</div>
                  <div className="exp-desc">{e.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section-block">
          <div className="container reveal">
            <div className="contact-box glass-panel">
              <div className="card-shine" aria-hidden="true" />
              <div className="section-header section-header--center">
                <span className="section-num">{sectionIndex.contact}</span>
                <h2 className="section-title">{t.contact.title}</h2>
              </div>
              <p>{t.contact.subtitle}</p>
              <a className="contact-email" href={`mailto:${t.contact.email}`}>
                {t.contact.email}
              </a>
              <a className="btn btn-primary" href={`mailto:${t.contact.email}`}>
                <HiOutlineMail />
                <span>{t.contact.sayHello}</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="container">
        <span className="footer-line" />
        {t.footer}
      </footer>
    </>
  );
}
