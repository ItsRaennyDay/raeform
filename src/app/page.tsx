"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"

type ServicePopup = { title: string; text: string } | null
type FormState = { first: string; last: string; email: string; type: string; msg: string }
type ConsultForm = { name: string; email: string }

export default function Page() {
  const [activePage, setActivePage] = useState("home")
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicePopup, setServicePopup] = useState<ServicePopup>(null)
  const [consultOpen, setConsultOpen] = useState(false)
  const [toastMsg, setToastMsg] = useState("")
  const [scrolled, setScrolled] = useState(false)
  const [testimonialIdx, setTestimonialIdx] = useState(0)
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [formData, setFormData] = useState<FormState>({
    first: "",
    last: "",
    email: "",
    type: "",
    msg: "",
  })
  const [consultData, setConsultData] = useState<ConsultForm>({ name: "", email: "" })

  const testimonials = [
    {
      quote: '"Raeform didn\'t just build our office — they understood the culture we were trying to create. The space they delivered actually changed how our team works."',
      name: "Maria Santos",
      role: "CEO, Lumina Group",
    },
    {
      quote: '"Other firms promised. Raeform delivered. On time, on budget, and without a single surprise we hadn\'t already talked through."',
      name: "David Reyes",
      role: "Property Developer",
    },
    {
      quote: '"I\'ve worked with three firms before Raeform. The difference isn\'t skill — it\'s honesty. These people actually care about the outcome."',
      name: "Anne Villanueva",
      role: "Restaurant Owner",
    },
  ]

  // Custom cursor effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY
      setMousePos({ x, y })

      if (cursorRef.current) {
        cursorRef.current.style.left = x + "px"
        cursorRef.current.style.top = y + "px"
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    let rx = 0,
      ry = 0
    const anim = () => {
      rx += (mousePos.x - rx) * 0.12
      ry += (mousePos.y - ry) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = rx + "px"
        ringRef.current.style.top = ry + "px"
      }
      requestAnimationFrame(anim)
    }
    anim()
  }, [mousePos])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(""), 4000)
  }

  const submitForm = () => {
    if (!formData.first || !formData.email || !formData.msg) {
      showToast("Please fill in the required fields.")
      return
    }
    setFormData({ first: "", last: "", email: "", type: "", msg: "" })
    showToast("Your message is on its way. We'll be in touch soon.")
  }

  const submitConsult = () => {
    if (!consultData.name || !consultData.email) {
      showToast("Please fill in both fields.")
      return
    }
    setConsultOpen(false)
    setConsultData({ name: "", email: "" })
    showToast("Request received. Expect a call within one business day.")
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleConsultChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setConsultData((prev) => ({ ...prev, [id.replace("cq-", "")]: value }))
  }

  // Testimonial auto-rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIdx((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="raeform-site" style={{ cursor: "none" }}>
      {/* CUSTOM CURSOR */}
      <div ref={cursorRef} className="fixed w-2.5 h-2.5 bg-[#C9A84C] rounded-full pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2" />
      <div ref={ringRef} className="fixed w-9 h-9 border border-[#C9A84C] rounded-full pointer-events-none z-[9998] transform -translate-x-1/2 -translate-y-1/2 opacity-60" />

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --gold: #C9A84C;
          --gold-light: #E8C97A;
          --gold-dark: #9B7A2E;
          --black: #0D0D0D;
          --dark: #141414;
          --dark2: #1C1C1C;
          --dark3: #242424;
          --dark4: #2E2E2E;
          --gray: #6B6B6B;
          --gray-light: #9A9A9A;
          --off-white: #F5F0E8;
          --white: #FFFFFF;
          --font-display: 'Playfair Display', Georgia, serif;
          --font-body: 'DM Sans', system-ui, sans-serif;
          --transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        html { scroll-behavior: smooth; }
        body {
          font-family: var(--font-body);
          background: var(--black);
          color: var(--off-white);
          line-height: 1.7;
          overflow-x: hidden;
        }
        .page { display: none; min-height: 100vh; animation: fadeIn 0.5s ease; }
        .page.active { display: block; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 5vw;
          height: 72px;
          background: rgba(13, 13, 13, 0.85);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(201, 168, 76, 0.08);
          transition: background 0.3s;
        }
        nav.scrolled { background: rgba(13, 13, 13, 0.97); }
        .nav-logo {
          font-family: var(--font-display);
          font-size: 1.5rem;
          letter-spacing: 0.06em;
          color: var(--gold);
          cursor: pointer;
        }
        .nav-logo span { color: var(--off-white); }
        .nav-links { display: flex; gap: 2.5rem; align-items: center; }
        .nav-link {
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--gray-light);
          cursor: pointer;
          position: relative;
          transition: color var(--transition);
          padding: 4px 0;
          background: none; border: none;
        }
        .nav-link::after {
          content: ''; position: absolute; bottom: 0; left: 0;
          width: 0; height: 1px; background: var(--gold);
          transition: width var(--transition);
        }
        .nav-link:hover, .nav-link.active { color: var(--gold); }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }
        .nav-cta {
          font-size: 0.8rem; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--black); background: var(--gold);
          border: none; padding: 10px 22px; border-radius: 2px;
          cursor: pointer; transition: background var(--transition), transform 0.15s;
        }
        .nav-cta:hover { background: var(--gold-light); transform: translateY(-1px); }
        .hamburger {
          display: none; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 8px;
        }
        .hamburger span {
          display: block; width: 24px; height: 1.5px;
          background: var(--gold); transition: var(--transition);
        }
        .mobile-menu {
          display: none; position: fixed; inset: 0; z-index: 99;
          background: var(--black); flex-direction: column;
          justify-content: center; align-items: center; gap: 2.5rem;
          opacity: 0; pointer-events: none; transition: opacity 0.3s;
        }
        .mobile-menu.open { opacity: 1; pointer-events: all; display: flex; }
        .mobile-menu .nav-link { font-size: 1.5rem; letter-spacing: 0.12em; }
        .mobile-menu .nav-cta { font-size: 1rem; padding: 14px 36px; }
        .hero {
          min-height: 100vh; display: flex; flex-direction: column;
          justify-content: center; padding: 0 5vw;
          position: relative; overflow: hidden;
        }
        .hero-bg {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 80% 60% at 70% 50%, rgba(201,168,76,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(3rem, 8vw, 7.5rem);
          line-height: 1.05;
          max-width: 800px;
          margin-bottom: 2.5rem;
          font-weight: 700;
        }
        .hero-title em { font-style: italic; color: var(--gold); }
        .hero-subtitle {
          font-size: clamp(1rem, 2vw, 1.2rem);
          color: var(--gray-light); max-width: 520px;
          line-height: 1.8; margin-bottom: 3.5rem; font-weight: 300;
        }
        .btn-primary {
          display: inline-flex; align-items: center; gap: 10px;
          background: var(--gold); color: var(--black);
          font-family: var(--font-body); font-size: 0.8rem;
          font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
          padding: 16px 36px; border-radius: 2px; border: none;
          cursor: pointer; transition: all var(--transition);
        }
        .btn-primary:hover { background: var(--gold-light); transform: translateY(-2px); box-shadow: 0 8px 32px rgba(201,168,76,0.2); }
        .btn-ghost {
          display: inline-flex; align-items: center; gap: 10px;
          background: transparent; color: var(--off-white);
          font-family: var(--font-body); font-size: 0.8rem;
          font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase;
          padding: 16px 36px; border-radius: 2px;
          border: 1px solid rgba(245,240,232,0.2); cursor: pointer;
          transition: all var(--transition);
        }
        .btn-ghost:hover { border-color: var(--gold); color: var(--gold); transform: translateY(-2px); }
        .stats-bar {
          background: var(--dark2); border-top: 1px solid rgba(201,168,76,0.1);
          border-bottom: 1px solid rgba(201,168,76,0.1);
          padding: 3rem 5vw;
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem;
        }
        .stat-item { text-align: center; position: relative; }
        .stat-number {
          font-family: var(--font-display); font-size: clamp(2rem, 4vw, 3.5rem);
          color: var(--gold); font-weight: 700; display: block; line-height: 1;
        }
        .stat-label { font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gray); margin-top: 0.5rem; }
        .services { padding: 7rem 5vw; }
        .section-header { margin-bottom: 5rem; }
        .section-tag {
          font-size: 0.7rem; letter-spacing: 0.25em; text-transform: uppercase;
          color: var(--gold); font-weight: 600; margin-bottom: 1.2rem;
        }
        .section-title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4.5vw, 3.5rem);
          line-height: 1.15; font-weight: 700; max-width: 600px;
        }
        .section-title em { font-style: italic; color: var(--gold); }
        .services-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5px;
        }
        .service-card {
          background: var(--dark2); padding: 3rem 2.5rem;
          position: relative; overflow: hidden;
          cursor: pointer; transition: background var(--transition);
          border: 1px solid rgba(201,168,76,0.06);
        }
        .service-card:hover { background: var(--dark3); }
        .service-name {
          font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem;
          color: var(--off-white); transition: color var(--transition);
        }
        .service-card:hover .service-name { color: var(--gold); }
        .service-desc { font-size: 0.9rem; color: var(--gray); line-height: 1.8; font-weight: 300; }
        .popup-overlay {
          position: fixed; inset: 0; z-index: 200;
          background: rgba(0,0,0,0.8); backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          opacity: 0; pointer-events: none; transition: opacity 0.3s;
          padding: 2rem;
        }
        .popup-overlay.open { opacity: 1; pointer-events: all; }
        .popup {
          background: var(--dark2); border: 1px solid rgba(201,168,76,0.15);
          max-width: 580px; width: 100%; padding: 3.5rem;
          position: relative; transform: translateY(20px) scale(0.97);
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .popup-overlay.open .popup { transform: translateY(0) scale(1); }
        .popup-close {
          position: absolute; top: 1.5rem; right: 1.5rem;
          background: none; border: none; color: var(--gray);
          font-size: 1.5rem; cursor: pointer; line-height: 1;
          transition: color var(--transition);
        }
        .popup-close:hover { color: var(--gold); }
        .form-label {
          font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase;
          color: var(--gray-light); font-weight: 600;
        }
        .form-input, .form-textarea, .form-select {
          background: var(--dark2); border: 1px solid rgba(201,168,76,0.12);
          color: var(--off-white); font-family: var(--font-body); font-size: 0.95rem;
          padding: 14px 18px; border-radius: 2px; outline: none;
          transition: border-color var(--transition), background var(--transition);
          width: 100%;
        }
        .form-input::placeholder, .form-textarea::placeholder { color: var(--gray); }
        .form-input:focus, .form-textarea:focus, .form-select:focus {
          border-color: var(--gold); background: var(--dark3);
        }
        .form-textarea { resize: vertical; min-height: 140px; }
        .form-submit {
          display: inline-flex; align-items: center; gap: 12px;
          background: var(--gold); color: var(--black);
          font-family: var(--font-body); font-size: 0.8rem;
          font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
          padding: 16px 40px; border-radius: 2px; border: none;
          cursor: pointer; transition: all var(--transition); margin-top: 2rem;
          width: 100%;  justify-content: center;
        }
        .form-submit:hover { background: var(--gold-light); transform: translateY(-2px); }
        .toast {
          position: fixed; bottom: 2rem; right: 2rem; z-index: 300;
          background: var(--dark2); border: 1px solid var(--gold);
          padding: 1rem 1.5rem; max-width: 320px;
          transform: translateY(80px); opacity: 0;
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s;
          display: flex; align-items: center; gap: 1rem;
        }
        .toast.show { transform: translateY(0); opacity: 1; }
        footer {
          background: var(--black); border-top: 1px solid rgba(201,168,76,0.08);
          padding: 4rem 5vw 2rem;
        }
        .footer-logo { font-family: var(--font-display); font-size: 1.8rem; color: var(--gold); margin-bottom: 1rem; }
        .footer-logo span { color: var(--off-white); }
        .footer-tagline { font-size: 0.88rem; color: var(--gray); line-height: 1.8; font-weight: 300; max-width: 260px; }
        @media (max-width: 900px) {
          .nav-links { display: none; }
          .hamburger { display: flex; }
          .services-grid { grid-template-columns: 1fr; }
          .stats-bar { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .form-row { grid-template-columns: 1fr; }
          #cursor, #cursor-ring { display: none; }
          body { cursor: auto; }
        }
      `}</style>

      {/* NAVIGATION */}
      <nav id="main-nav" className={scrolled ? "scrolled" : ""}>
        <div className="nav-logo" onClick={() => setActivePage("home")}>Rae<span>form</span></div>
        <div className="nav-links">
          <button className={`nav-link ${activePage === "home" ? "active" : ""}`} onClick={() => setActivePage("home")}>Home</button>
          <button className={`nav-link ${activePage === "about" ? "active" : ""}`} onClick={() => setActivePage("about")}>About Us</button>
          <button className={`nav-link ${activePage === "contact" ? "active" : ""}`} onClick={() => setActivePage("contact")}>Contact</button>
          <button className="nav-cta" onClick={() => setConsultOpen(true)}>Get a Quote</button>
        </div>
        <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
          <span></span><span></span><span></span>
        </button>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${mobileOpen ? "open" : ""}`}>
        <button className="nav-link" onClick={() => { setActivePage("home"); setMobileOpen(false); }}>Home</button>
        <button className="nav-link" onClick={() => { setActivePage("about"); setMobileOpen(false); }}>About Us</button>
        <button className="nav-link" onClick={() => { setActivePage("contact"); setMobileOpen(false); }}>Contact</button>
        <button className="nav-cta" onClick={() => { setConsultOpen(true); setMobileOpen(false); }}>Get a Quote</button>
      </div>

      {/* HOME PAGE */}
      <div className={`page ${activePage === "home" ? "active" : ""}`}>
        <section className="hero">
          <div className="hero-bg"></div>
          <div className="hero-eyebrow">Design. Build. Deliver.</div>
          <h1 className="hero-title">We shape spaces<br/>that <em>mean</em> something</h1>
          <p className="hero-subtitle">Raeform is a design and construction firm that takes your vision seriously — and turns it into something you'll want to come back to every single day.</p>
          <div className="flex gap-6 flex-wrap">
            <button className="btn-primary" onClick={() => setActivePage("contact")}>Start a Project →</button>
            <button className="btn-ghost" onClick={() => setActivePage("about")}>Our Story</button>
          </div>
        </section>

        <section className="stats-bar">
          <div className="stat-item">
            <span className="stat-number">200</span>
            <div className="stat-label">Projects completed</div>
          </div>
          <div className="stat-item">
            <span className="stat-number">15</span>
            <div className="stat-label">Years in the field</div>
          </div>
          <div className="stat-item">
            <span className="stat-number">98%</span>
            <div className="stat-label">Client satisfaction</div>
          </div>
          <div className="stat-item">
            <span className="stat-number">12</span>
            <div className="stat-label">Industry awards</div>
          </div>
        </section>

        <section className="services">
          <div className="section-header">
            <div className="section-tag">What we do</div>
            <h2 className="section-title">Built around <em>your</em> goals — not ours</h2>
          </div>
          <div className="services-grid">
            {[
              { num: "01", name: "Architecture & Design", desc: "Thoughtful design that starts with you. We draw spaces that earn their keep — every square meter designed to serve a real purpose.", text: "From the first sketch to the last fitting, we design spaces with purpose. Our architects blend form and function — spaces that look extraordinary and work even better. Whether it's a home, office, or commercial development, we start with your needs and work outward." },
              { num: "02", name: "Construction & Renovation", desc: "Clean sites, honest timelines, and people who pick up the phone. That's not a promise — it's just how we work.", text: "Our construction teams don't cut corners — not because we can't, but because we won't. We manage every site with transparency, clear timelines, and people you can actually get on the phone. Renovation or new build, we bring the same standard of care." },
              { num: "03", name: "Interior Finishing", desc: "The details nobody talks about but everybody notices. We do them right — materials, finishes, light, and feel.", text: "The details are where most firms cut corners. Not us. We obsess over material choices, lighting placement, and finishing quality — because the space you live or work in should feel right every day, not just at handover." },
              { num: "04", name: "Project Management", desc: "Someone to own the chaos so you don't have to. We keep budgets honest, teams moving, and clients informed.", text: "A great plan dies without great execution. Our project managers keep everything aligned — budget, schedule, teams, and quality — so you don't have to spend your weekends worried about what's happening on site." },
              { num: "05", name: "Consulting & Planning", desc: "A clear set of expert eyes on a complex decision. Whether you're planning a development or solving a site problem, we help you see the full picture.", text: "Not every project needs a full build. Sometimes you just need a clear set of eyes on a problem. We offer consulting for developers, landowners, and businesses navigating complex design or construction decisions." },
              { num: "06", name: "Sustainable Development", desc: "Better buildings that last longer, cost less to run, and sit lighter on the planet. It's not a trend for us — it's the right way to build.", text: "We build for the long term — for your long-term value and the planet's. Our sustainable development practice integrates energy efficiency, responsible materials, and green building standards without sacrificing quality or aesthetics." }
            ].map((service, idx) => (
              <div key={idx} className="service-card" onClick={() => setServicePopup({ title: service.name, text: service.text })}>
                <div style={{ fontSize: "4rem", fontWeight: 700, color: "rgba(201,168,76,0.08)", marginBottom: "1.5rem" }}>{service.num}</div>
                <div className="service-name">{service.name}</div>
                <div className="service-desc">{service.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <footer>
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: "4rem", marginBottom: "4rem" }}>
            <div>
              <div className="footer-logo">Rae<span>form</span></div>
              <div className="footer-tagline">We design and build spaces that work hard, look great, and last. Based in the Philippines. Working everywhere.</div>
            </div>
            <div>
              <div style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 600, marginBottom: "1.5rem" }}>Navigate</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                <button style={{ fontSize: "0.88rem", color: "var(--gray)", cursor: "pointer", background: "none", border: "none", textAlign: "left", fontFamily: "var(--font-body)" }} onClick={() => setActivePage("home")}>Home</button>
                <button style={{ fontSize: "0.88rem", color: "var(--gray)", cursor: "pointer", background: "none", border: "none", textAlign: "left", fontFamily: "var(--font-body)" }} onClick={() => setActivePage("about")}>About Us</button>
                <button style={{ fontSize: "0.88rem", color: "var(--gray)", cursor: "pointer", background: "none", border: "none", textAlign: "left", fontFamily: "var(--font-body)" }} onClick={() => setActivePage("contact")}>Contact</button>
              </div>
            </div>
            <div>
              <div style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 600, marginBottom: "1.5rem" }}>Contact</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                <div style={{ fontSize: "0.95rem", color: "var(--off-white)" }}>hello@raeform.com</div>
                <div style={{ fontSize: "0.95rem", color: "var(--off-white)" }}>+63 917 000 0000</div>
                <div style={{ fontSize: "0.95rem", color: "var(--off-white)" }}>Taguig City, Metro Manila</div>
              </div>
            </div>
          </div>
          <div style={{ paddingTop: "2rem", borderTop: "1px solid rgba(201,168,76,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: "0.78rem", color: "var(--gray)" }}>&copy; 2025 Raeform. All rights reserved.</div>
          </div>
        </footer>
      </div>

      {/* ABOUT PAGE */}
      <div className={`page ${activePage === "about" ? "active" : ""}`}>
        <h2 style={{ paddingTop: "100px", textAlign: "center", fontSize: "2rem", marginBottom: "2rem" }}>About Us</h2>
        <p style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto", color: "var(--gray-light)", marginBottom: "3rem" }}>We're not the biggest firm. We're the right one.</p>
        <footer>
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: "4rem", marginBottom: "4rem" }}>
            <div>
              <div className="footer-logo">Rae<span>form</span></div>
              <div className="footer-tagline">We design and build spaces that work hard, look great, and last. Based in the Philippines. Working everywhere.</div>
            </div>
            <div>
              <div style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 600, marginBottom: "1.5rem" }}>Navigate</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                <button style={{ fontSize: "0.88rem", color: "var(--gray)", cursor: "pointer", background: "none", border: "none", textAlign: "left", fontFamily: "var(--font-body)" }} onClick={() => setActivePage("home")}>Home</button>
                <button style={{ fontSize: "0.88rem", color: "var(--gray)", cursor: "pointer", background: "none", border: "none", textAlign: "left", fontFamily: "var(--font-body)" }} onClick={() => setActivePage("about")}>About Us</button>
                <button style={{ fontSize: "0.88rem", color: "var(--gray)", cursor: "pointer", background: "none", border: "none", textAlign: "left", fontFamily: "var(--font-body)" }} onClick={() => setActivePage("contact")}>Contact</button>
              </div>
            </div>
            <div>
              <div style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 600, marginBottom: "1.5rem" }}>Contact</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                <div style={{ fontSize: "0.95rem", color: "var(--off-white)" }}>hello@raeform.com</div>
                <div style={{ fontSize: "0.95rem", color: "var(--off-white)" }}>+63 917 000 0000</div>
                <div style={{ fontSize: "0.95rem", color: "var(--off-white)" }}>Taguig City, Metro Manila</div>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* CONTACT PAGE */}
      <div className={`page ${activePage === "contact" ? "active" : ""}`}>
        <div style={{ paddingTop: "100px", padding: "8rem 5vw 5rem" }}>
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)", fontFamily: "var(--font-display)", fontWeight: 700, marginBottom: "2rem", maxWidth: "700px" }}>Let's have a <em style={{ fontStyle: "italic", color: "var(--gold)" }}>real</em> conversation</h1>
        </div>

        <div style={{ padding: "7rem 5vw", display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "8rem" }}>
          <div>
            <p style={{ fontSize: "1rem", color: "var(--gray-light)", lineHeight: 1.9, fontWeight: 300, marginBottom: "3rem" }}>No forms that go nowhere. No automated replies that mean nothing. When you reach out to Raeform, a real person responds — usually within one business day.</p>
            <div>
              {[
                { icon: "✉", label: "Email", value: "hello@raeform.com" },
                { icon: "☏", label: "Phone", value: "+63 917 000 0000" },
                { icon: "◎", label: "Office", value: "Taguig City, Metro Manila" },
                { icon: "◷", label: "Hours", value: "Mon – Fri, 8:00 AM – 6:00 PM" }
              ].map((item, idx) => (
                <div key={idx} style={{ padding: "1.8rem 0", borderBottom: "1px solid rgba(201,168,76,0.08)", display: "flex", gap: "1.5rem" }}>
                  <div style={{ fontSize: "1.2rem", color: "var(--gold)" }}>{item.icon}</div>
                  <div>
                    <div style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gray)", fontWeight: 600, marginBottom: "0.4rem" }}>{item.label}</div>
                    <div style={{ fontSize: "0.95rem", color: "var(--off-white)" }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="section-tag" style={{ marginBottom: "2rem" }}>Send us a message</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                <label className="form-label">First name</label>
                <input className="form-input" type="text" placeholder="Juan" name="first" value={formData.first} onChange={handleFormChange} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                <label className="form-label">Last name</label>
                <input className="form-input" type="text" placeholder="dela Cruz" name="last" value={formData.last} onChange={handleFormChange} />
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.5rem" }}>
              <label className="form-label">Email address</label>
              <input className="form-input" type="email" placeholder="juan@example.com" name="email" value={formData.email} onChange={handleFormChange} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.5rem" }}>
              <label className="form-label">Project type</label>
              <select className="form-select" name="type" value={formData.type} onChange={handleFormChange}>
                <option value="" disabled>Select a service...</option>
                <option>Architecture & Design</option>
                <option>Construction & Renovation</option>
                <option>Interior Finishing</option>
                <option>Project Management</option>
                <option>Consulting & Planning</option>
                <option>Sustainable Development</option>
                <option>Not sure yet</option>
              </select>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.5rem" }}>
              <label className="form-label">Tell us about your project</label>
              <textarea className="form-textarea" placeholder="Give us the basics..." name="msg" value={formData.msg} onChange={handleFormChange}></textarea>
            </div>
            <button className="form-submit" onClick={submitForm}>Send Message →</button>
          </div>
        </div>

        <footer>
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: "4rem", marginBottom: "4rem" }}>
            <div>
              <div className="footer-logo">Rae<span>form</span></div>
              <div className="footer-tagline">We design and build spaces that work hard, look great, and last. Based in the Philippines. Working everywhere.</div>
            </div>
            <div>
              <div style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 600, marginBottom: "1.5rem" }}>Navigate</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                <button style={{ fontSize: "0.88rem", color: "var(--gray)", cursor: "pointer", background: "none", border: "none", textAlign: "left", fontFamily: "var(--font-body)" }} onClick={() => setActivePage("home")}>Home</button>
                <button style={{ fontSize: "0.88rem", color: "var(--gray)", cursor: "pointer", background: "none", border: "none", textAlign: "left", fontFamily: "var(--font-body)" }} onClick={() => setActivePage("about")}>About Us</button>
                <button style={{ fontSize: "0.88rem", color: "var(--gray)", cursor: "pointer", background: "none", border: "none", textAlign: "left", fontFamily: "var(--font-body)" }} onClick={() => setActivePage("contact")}>Contact</button>
              </div>
            </div>
            <div>
              <div style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 600, marginBottom: "1.5rem" }}>Contact</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                <div style={{ fontSize: "0.95rem", color: "var(--off-white)" }}>hello@raeform.com</div>
                <div style={{ fontSize: "0.95rem", color: "var(--off-white)" }}>+63 917 000 0000</div>
                <div style={{ fontSize: "0.95rem", color: "var(--off-white)" }}>Taguig City, Metro Manila</div>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* SERVICE POPUP */}
      <div className={`popup-overlay ${servicePopup ? "open" : ""}`} onClick={() => setServicePopup(null)}>
        <div className="popup" onClick={(e) => e.stopPropagation()}>
          <button className="popup-close" onClick={() => setServicePopup(null)}>&times;</button>
          <div className="section-tag">Our Services</div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, marginBottom: "1.2rem", lineHeight: 1.2 }}>{servicePopup?.title}</h3>
          <p style={{ fontSize: "0.9rem", color: "var(--gray-light)", lineHeight: 1.8, fontWeight: 300, marginBottom: "2rem" }}>{servicePopup?.text}</p>
          <button className="btn-primary" onClick={() => { setServicePopup(null); setActivePage("contact"); }}>Start a Conversation →</button>
        </div>
      </div>

      {/* CONSULT POPUP */}
      <div className={`popup-overlay ${consultOpen ? "open" : ""}`} onClick={() => setConsultOpen(false)}>
        <div className="popup" onClick={(e) => e.stopPropagation()}>
          <button className="popup-close" onClick={() => setConsultOpen(false)}>&times;</button>
          <div className="section-tag">Free Consultation</div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, marginBottom: "1.2rem" }}>Let's talk through your project</h3>
          <p style={{ fontSize: "0.9rem", color: "var(--gray-light)", lineHeight: 1.8, fontWeight: 300, marginBottom: "2rem" }}>No commitment. No hard sell. Just 30 minutes with one of our senior team members to understand your goals and give you an honest picture of what's possible.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.5rem" }}>
            <label className="form-label">Your name</label>
            <input className="form-input" type="text" placeholder="Maria Santos" id="cq-name" value={consultData.name} onChange={handleConsultChange} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.5rem" }}>
            <label className="form-label">Best email</label>
            <input className="form-input" type="email" placeholder="maria@company.com" id="cq-email" value={consultData.email} onChange={handleConsultChange} />
          </div>
          <button className="form-submit" onClick={submitConsult}>Request a Call →</button>
        </div>
      </div>

      {/* TOAST */}
      {toastMsg && (
        <div className={`toast show`}>
          <div style={{ fontSize: "1.2rem", color: "var(--gold)" }}>✓</div>
          <div style={{ fontSize: "0.85rem", fontWeight: 500 }}>{toastMsg}</div>
        </div>
      )}
    </div>
  )
}
