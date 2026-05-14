<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Raeform — Build What Matters</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">

<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

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
    cursor: none;
  }

  /* CUSTOM CURSOR */
  #cursor {
    position: fixed; width: 10px; height: 10px;
    background: var(--gold); border-radius: 50%;
    pointer-events: none; z-index: 9999;
    transform: translate(-50%, -50%);
    transition: transform 0.1s, width 0.3s, height 0.3s, background 0.3s;
  }
  #cursor-ring {
    position: fixed; width: 36px; height: 36px;
    border: 1px solid var(--gold); border-radius: 50%;
    pointer-events: none; z-index: 9998;
    transform: translate(-50%, -50%);
    transition: transform 0.15s ease-out, width 0.3s, height 0.3s, opacity 0.3s;
    opacity: 0.6;
  }
  body.cursor-hover #cursor { width: 18px; height: 18px; background: var(--gold-light); }
  body.cursor-hover #cursor-ring { width: 50px; height: 50px; opacity: 0.3; }

  /* PAGES */
  .page { display: none; min-height: 100vh; animation: fadeIn 0.5s ease; }
  .page.active { display: block; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

  /* NAV */
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

  /* MOBILE NAV */
  .mobile-menu {
    display: none; position: fixed; inset: 0; z-index: 99;
    background: var(--black); flex-direction: column;
    justify-content: center; align-items: center; gap: 2.5rem;
    opacity: 0; pointer-events: none; transition: opacity 0.3s;
  }
  .mobile-menu.open { opacity: 1; pointer-events: all; display: flex; }
  .mobile-menu .nav-link { font-size: 1.5rem; letter-spacing: 0.12em; }
  .mobile-menu .nav-cta { font-size: 1rem; padding: 14px 36px; }

  /* HERO */
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
  .hero-line {
    position: absolute; top: 0; bottom: 0; left: 50%;
    width: 1px; background: linear-gradient(to bottom, transparent, rgba(201,168,76,0.12) 30%, rgba(201,168,76,0.12) 70%, transparent);
    pointer-events: none;
  }
  .hero-eyebrow {
    font-size: 0.75rem; letter-spacing: 0.25em; text-transform: uppercase;
    color: var(--gold); font-weight: 500; margin-bottom: 2rem;
    display: flex; align-items: center; gap: 1rem;
  }
  .hero-eyebrow::before {
    content: ''; display: inline-block;
    width: 40px; height: 1px; background: var(--gold);
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
  .hero-actions { display: flex; gap: 1.5rem; flex-wrap: wrap; align-items: center; }
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
  .hero-scroll {
    position: absolute; bottom: 3rem; left: 5vw;
    display: flex; align-items: center; gap: 1rem;
    font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--gray); cursor: pointer;
  }
  .hero-scroll-line {
    width: 1px; height: 48px; background: linear-gradient(to bottom, var(--gold), transparent);
    animation: scrollPulse 2s ease-in-out infinite;
  }
  @keyframes scrollPulse {
    0%, 100% { opacity: 0.4; transform: scaleY(1); }
    50% { opacity: 1; transform: scaleY(1.1); }
  }

  /* STATS BAR */
  .stats-bar {
    background: var(--dark2); border-top: 1px solid rgba(201,168,76,0.1);
    border-bottom: 1px solid rgba(201,168,76,0.1);
    padding: 3rem 5vw;
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem;
  }
  .stat-item { text-align: center; position: relative; }
  .stat-item::after {
    content: ''; position: absolute; right: 0; top: 20%; height: 60%;
    width: 1px; background: rgba(201,168,76,0.12);
  }
  .stat-item:last-child::after { display: none; }
  .stat-number {
    font-family: var(--font-display); font-size: clamp(2rem, 4vw, 3.5rem);
    color: var(--gold); font-weight: 700; display: block; line-height: 1;
  }
  .stat-label { font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gray); margin-top: 0.5rem; }

  /* SERVICES */
  .services { padding: 7rem 5vw; }
  .section-header { margin-bottom: 5rem; }
  .section-tag {
    font-size: 0.7rem; letter-spacing: 0.25em; text-transform: uppercase;
    color: var(--gold); font-weight: 600; margin-bottom: 1.2rem;
    display: flex; align-items: center; gap: 1rem;
  }
  .section-tag::before { content: ''; display: inline-block; width: 30px; height: 1px; background: var(--gold); }
  .section-title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 4.5vw, 3.5rem);
    line-height: 1.15; font-weight: 700; max-width: 600px;
  }
  .section-title em { font-style: italic; color: var(--gold); }
  .section-desc { font-size: 1rem; color: var(--gray-light); max-width: 500px; margin-top: 1.5rem; font-weight: 300; line-height: 1.9; }

  .services-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5px;
  }
  .service-card {
    background: var(--dark2); padding: 3rem 2.5rem;
    position: relative; overflow: hidden;
    cursor: pointer; transition: background var(--transition);
    border: 1px solid rgba(201,168,76,0.06);
  }
  .service-card::before {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0;
    height: 2px; background: var(--gold);
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .service-card:hover { background: var(--dark3); }
  .service-card:hover::before { transform: scaleX(1); }
  .service-num {
    font-family: var(--font-display); font-size: 4rem; font-weight: 700;
    color: rgba(201,168,76,0.08); line-height: 1; margin-bottom: 1.5rem;
    transition: color var(--transition);
  }
  .service-card:hover .service-num { color: rgba(201,168,76,0.15); }
  .service-icon { font-size: 2rem; margin-bottom: 1.5rem; }
  .service-name {
    font-size: 1.25rem; font-weight: 600; margin-bottom: 1rem;
    color: var(--off-white); transition: color var(--transition);
  }
  .service-card:hover .service-name { color: var(--gold); }
  .service-desc { font-size: 0.9rem; color: var(--gray); line-height: 1.8; font-weight: 300; }
  .service-arrow {
    display: inline-flex; align-items: center; gap: 6px; margin-top: 2rem;
    font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--gold); opacity: 0; transform: translateX(-8px);
    transition: opacity 0.3s, transform 0.3s;
  }
  .service-card:hover .service-arrow { opacity: 1; transform: translateX(0); }

  /* PROCESS */
  .process { padding: 7rem 5vw; background: var(--dark2); }
  .process-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 6rem;
    align-items: center; margin-top: 5rem;
  }
  .process-steps { display: flex; flex-direction: column; gap: 0; }
  .process-step {
    padding: 2rem 0; border-bottom: 1px solid rgba(201,168,76,0.08);
    display: flex; gap: 2rem; align-items: flex-start;
    cursor: pointer;
    transition: padding var(--transition);
  }
  .process-step:first-child { border-top: 1px solid rgba(201,168,76,0.08); }
  .process-step:hover { padding-left: 0.5rem; }
  .step-num {
    font-family: var(--font-display); font-size: 2rem; font-weight: 700;
    color: rgba(201,168,76,0.2); min-width: 2.5rem; line-height: 1;
    transition: color var(--transition);
  }
  .process-step:hover .step-num { color: var(--gold); }
  .step-content {}
  .step-name {
    font-size: 1.05rem; font-weight: 600; margin-bottom: 0.6rem;
    color: var(--off-white); transition: color var(--transition);
  }
  .process-step:hover .step-name { color: var(--gold); }
  .step-desc { font-size: 0.88rem; color: var(--gray); line-height: 1.8; font-weight: 300; }

  .process-visual {
    position: relative; height: 420px;
    display: flex; align-items: center; justify-content: center;
  }
  .process-orb {
    width: 320px; height: 320px; border-radius: 50%;
    border: 1px solid rgba(201,168,76,0.15);
    display: flex; align-items: center; justify-content: center;
    position: relative;
    animation: orbRotate 20s linear infinite;
  }
  @keyframes orbRotate { to { transform: rotate(360deg); } }
  .process-orb::before {
    content: ''; position: absolute; inset: 20px;
    border-radius: 50%; border: 1px solid rgba(201,168,76,0.08);
  }
  .process-orb::after {
    content: ''; position: absolute; inset: 60px;
    border-radius: 50%; border: 1px solid rgba(201,168,76,0.05);
  }
  .orb-center {
    width: 80px; height: 80px; border-radius: 50%;
    background: radial-gradient(circle, rgba(201,168,76,0.3), rgba(201,168,76,0.05));
    animation: orbRotate 20s linear infinite reverse;
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-display); font-size: 0.9rem; color: var(--gold);
    letter-spacing: 0.1em; text-align: center; line-height: 1.3;
    font-style: italic;
  }
  .orb-dot {
    position: absolute; width: 8px; height: 8px; background: var(--gold);
    border-radius: 50%;
    animation: orbRotate 20s linear infinite reverse;
  }

  /* TESTIMONIAL */
  .testimonial-section { padding: 7rem 5vw; position: relative; overflow: hidden; }
  .testimonial-bg {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
    font-family: var(--font-display); font-size: 20vw; color: rgba(201,168,76,0.03);
    font-weight: 700; white-space: nowrap; pointer-events: none; user-select: none;
  }
  .testimonials-wrap {
    max-width: 900px; margin: 0 auto; text-align: center;
    position: relative;
  }
  .testimonial-quote {
    font-family: var(--font-display); font-size: clamp(1.3rem, 3vw, 2rem);
    font-style: italic; line-height: 1.6; color: var(--off-white);
    margin-bottom: 2.5rem; transition: opacity 0.4s;
  }
  .testimonial-author {
    display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
  }
  .author-name { font-size: 0.85rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold); }
  .author-role { font-size: 0.8rem; color: var(--gray); }
  .testimonial-dots { display: flex; gap: 10px; justify-content: center; margin-top: 2.5rem; }
  .t-dot {
    width: 6px; height: 6px; border-radius: 50%; background: var(--dark4);
    cursor: pointer; transition: background var(--transition), width var(--transition);
    border: 1px solid var(--gray);
  }
  .t-dot.active { background: var(--gold); width: 20px; border-radius: 3px; border-color: var(--gold); }

  /* CTA BANNER */
  .cta-banner {
    margin: 0 5vw 7rem; padding: 5rem 5vw;
    background: var(--dark2); border: 1px solid rgba(201,168,76,0.12);
    position: relative; overflow: hidden; text-align: center;
  }
  .cta-banner::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(to right, transparent, var(--gold), transparent);
  }
  .cta-banner-title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 4vw, 3.5rem);
    font-weight: 700; margin-bottom: 1.5rem;
  }
  .cta-banner-desc { font-size: 1rem; color: var(--gray-light); margin-bottom: 2.5rem; max-width: 500px; margin-left: auto; margin-right: auto; font-weight: 300; }

  /* ======================== ABOUT PAGE ======================== */
  .about-hero {
    min-height: 60vh; display: flex; align-items: flex-end;
    padding: 8rem 5vw 5rem; position: relative; overflow: hidden;
    border-bottom: 1px solid rgba(201,168,76,0.08);
  }
  .about-hero-bg {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 60% 80% at 80% 50%, rgba(201,168,76,0.05) 0%, transparent 70%);
    pointer-events: none;
  }
  .about-hero-content { max-width: 700px; }
  .about-hero-title {
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 6vw, 5.5rem);
    line-height: 1.08; font-weight: 700; margin-bottom: 2rem;
  }
  .about-hero-title em { font-style: italic; color: var(--gold); }
  .about-hero-text { font-size: 1.05rem; color: var(--gray-light); line-height: 1.9; font-weight: 300; }

  .about-story { padding: 7rem 5vw; display: grid; grid-template-columns: 1fr 1fr; gap: 8rem; align-items: start; }
  .about-story-left { position: sticky; top: 100px; }
  .about-story-right { padding-top: 1rem; }
  .about-story-title { font-family: var(--font-display); font-size: 2.5rem; font-weight: 700; line-height: 1.2; margin-bottom: 2.5rem; }
  .about-story-title em { font-style: italic; color: var(--gold); }
  .about-story-text { font-size: 0.95rem; color: var(--gray-light); line-height: 2; font-weight: 300; margin-bottom: 1.5rem; }
  .about-story-highlight {
    border-left: 2px solid var(--gold); padding-left: 1.5rem;
    font-size: 1.1rem; color: var(--off-white); font-family: var(--font-display);
    font-style: italic; line-height: 1.7; margin: 2.5rem 0;
  }

  .values { padding: 0 5vw 7rem; }
  .values-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; margin-top: 4rem; }
  .value-card {
    padding: 3rem 2.5rem; border: 1px solid rgba(201,168,76,0.06);
    background: var(--dark2); transition: background var(--transition);
    cursor: default;
  }
  .value-card:hover { background: var(--dark3); }
  .value-icon {
    width: 48px; height: 48px; border: 1px solid rgba(201,168,76,0.2);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.2rem; margin-bottom: 1.5rem; color: var(--gold);
  }
  .value-name { font-size: 1.1rem; font-weight: 600; margin-bottom: 0.8rem; }
  .value-desc { font-size: 0.88rem; color: var(--gray); line-height: 1.8; font-weight: 300; }

  .team { padding: 7rem 5vw; background: var(--dark2); }
  .team-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-top: 4rem; }
  .team-card {
    cursor: pointer; transition: transform 0.3s;
  }
  .team-card:hover { transform: translateY(-6px); }
  .team-avatar {
    width: 100%; aspect-ratio: 3/4; background: var(--dark4);
    margin-bottom: 1.5rem; position: relative; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
  }
  .team-avatar-inner {
    font-family: var(--font-display); font-size: 3rem; color: rgba(201,168,76,0.3);
    font-weight: 700; font-style: italic;
  }
  .team-avatar::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
    background: var(--gold); transform: scaleX(0); transform-origin: left;
    transition: transform 0.4s;
  }
  .team-card:hover .team-avatar::after { transform: scaleX(1); }
  .team-name { font-size: 1.05rem; font-weight: 600; margin-bottom: 0.3rem; }
  .team-role { font-size: 0.8rem; color: var(--gold); letter-spacing: 0.1em; text-transform: uppercase; font-weight: 500; }

  /* ======================== CONTACT PAGE ======================== */
  .contact-hero {
    min-height: 50vh; display: flex; align-items: flex-end;
    padding: 8rem 5vw 5rem; border-bottom: 1px solid rgba(201,168,76,0.08);
    position: relative; overflow: hidden;
  }
  .contact-hero-bg {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 60% 80% at 20% 50%, rgba(201,168,76,0.05) 0%, transparent 70%);
    pointer-events: none;
  }
  .contact-hero-title {
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 6vw, 5.5rem);
    line-height: 1.08; font-weight: 700; max-width: 700px;
  }
  .contact-hero-title em { font-style: italic; color: var(--gold); }

  .contact-body { padding: 7rem 5vw; display: grid; grid-template-columns: 1fr 1.5fr; gap: 8rem; }
  .contact-info-block { }
  .contact-intro { font-size: 1rem; color: var(--gray-light); line-height: 1.9; font-weight: 300; margin-bottom: 3rem; }
  .contact-items { display: flex; flex-direction: column; gap: 0; }
  .contact-item {
    padding: 1.8rem 0; border-bottom: 1px solid rgba(201,168,76,0.08);
    display: flex; gap: 1.5rem; align-items: flex-start;
  }
  .contact-item:first-child { border-top: 1px solid rgba(201,168,76,0.08); }
  .contact-item-icon { font-size: 1.2rem; color: var(--gold); min-width: 24px; }
  .contact-item-label { font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--gray); font-weight: 600; margin-bottom: 0.4rem; }
  .contact-item-value { font-size: 0.95rem; color: var(--off-white); }

  /* FORM */
  .contact-form-wrap {}
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem; }
  .form-group { display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1.5rem; }
  .form-group:last-of-type { margin-bottom: 0; }
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
  .form-select option { background: var(--dark2); }

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
  .form-submit:active { transform: translateY(0); }

  /* MAP PLACEHOLDER */
  .contact-map {
    margin: 0 5vw 7rem; padding: 4rem;
    background: var(--dark2); border: 1px solid rgba(201,168,76,0.08);
    display: flex; align-items: center; justify-content: center;
    min-height: 280px; position: relative; overflow: hidden;
    font-family: var(--font-display); font-style: italic;
    font-size: 1rem; color: var(--gray);
  }
  .map-grid {
    position: absolute; inset: 0; opacity: 0.04;
    background-image: linear-gradient(var(--gold) 1px, transparent 1px), linear-gradient(90deg, var(--gold) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  .map-dot {
    position: absolute; width: 12px; height: 12px;
    background: var(--gold); border-radius: 50%;
    animation: mapPulse 2s ease-in-out infinite;
  }
  @keyframes mapPulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(201,168,76,0.5); }
    50% { box-shadow: 0 0 0 16px rgba(201,168,76,0); }
  }

  /* POPUPS */
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
  .popup::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(to right, transparent, var(--gold), transparent);
  }
  .popup-overlay.open .popup { transform: translateY(0) scale(1); }
  .popup-close {
    position: absolute; top: 1.5rem; right: 1.5rem;
    background: none; border: none; color: var(--gray);
    font-size: 1.5rem; cursor: pointer; line-height: 1;
    transition: color var(--transition);
  }
  .popup-close:hover { color: var(--gold); }
  .popup-tag { font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); font-weight: 600; margin-bottom: 1.2rem; }
  .popup-title { font-family: var(--font-display); font-size: 2rem; font-weight: 700; margin-bottom: 1.2rem; line-height: 1.2; }
  .popup-text { font-size: 0.9rem; color: var(--gray-light); line-height: 1.8; font-weight: 300; margin-bottom: 2rem; }

  /* SUCCESS TOAST */
  .toast {
    position: fixed; bottom: 2rem; right: 2rem; z-index: 300;
    background: var(--dark2); border: 1px solid var(--gold);
    padding: 1rem 1.5rem; max-width: 320px;
    transform: translateY(80px); opacity: 0;
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s;
    display: flex; align-items: center; gap: 1rem;
  }
  .toast.show { transform: translateY(0); opacity: 1; }
  .toast-icon { font-size: 1.2rem; color: var(--gold); }
  .toast-text { font-size: 0.85rem; font-weight: 500; }

  /* FOOTER */
  footer {
    background: var(--black); border-top: 1px solid rgba(201,168,76,0.08);
    padding: 4rem 5vw 2rem;
  }
  .footer-top { display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 4rem; margin-bottom: 4rem; }
  .footer-logo { font-family: var(--font-display); font-size: 1.8rem; color: var(--gold); margin-bottom: 1rem; }
  .footer-logo span { color: var(--off-white); }
  .footer-tagline { font-size: 0.88rem; color: var(--gray); line-height: 1.8; font-weight: 300; max-width: 260px; }
  .footer-col-title { font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); font-weight: 600; margin-bottom: 1.5rem; }
  .footer-links { display: flex; flex-direction: column; gap: 0.8rem; }
  .footer-link {
    font-size: 0.88rem; color: var(--gray); cursor: pointer;
    transition: color var(--transition); width: fit-content;
    background: none; border: none; text-align: left; font-family: var(--font-body);
  }
  .footer-link:hover { color: var(--gold); }
  .footer-bottom {
    padding-top: 2rem; border-top: 1px solid rgba(201,168,76,0.06);
    display: flex; justify-content: space-between; align-items: center;
  }
  .footer-copy { font-size: 0.78rem; color: var(--gray); }
  .footer-social { display: flex; gap: 1.2rem; }
  .social-btn {
    width: 36px; height: 36px; border: 1px solid rgba(201,168,76,0.15);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.85rem; color: var(--gray); cursor: pointer;
    transition: all var(--transition); background: none;
    font-family: var(--font-body); font-weight: 700;
  }
  .social-btn:hover { border-color: var(--gold); color: var(--gold); }

  /* ENTRANCE ANIMATIONS */
  .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .reveal.visible { opacity: 1; transform: translateY(0); }

  /* ======================== RESPONSIVE ======================== */
  @media (max-width: 900px) {
    .nav-links { display: none; }
    .hamburger { display: flex; }
    .services-grid { grid-template-columns: 1fr; }
    .process-grid { grid-template-columns: 1fr; gap: 3rem; }
    .process-visual { display: none; }
    .stats-bar { grid-template-columns: repeat(2, 1fr); }
    .stat-item:nth-child(2)::after { display: none; }
    .about-story { grid-template-columns: 1fr; gap: 3rem; }
    .about-story-left { position: static; }
    .values-grid { grid-template-columns: 1fr; }
    .team-grid { grid-template-columns: repeat(2, 1fr); }
    .contact-body { grid-template-columns: 1fr; gap: 4rem; }
    .footer-top { grid-template-columns: 1fr 1fr; }
    .footer-top > *:first-child { grid-column: 1 / -1; }
  }
  @media (max-width: 600px) {
    .stats-bar { grid-template-columns: 1fr 1fr; }
    .form-row { grid-template-columns: 1fr; }
    .team-grid { grid-template-columns: 1fr; }
    .footer-top { grid-template-columns: 1fr; }
    .footer-bottom { flex-direction: column; gap: 1rem; text-align: center; }
    .hero-actions { flex-direction: column; }
    .cta-banner { margin: 0 0 5rem; }
    .popup { padding: 2.5rem 1.8rem; }
    body { cursor: auto; }
    #cursor, #cursor-ring { display: none; }
  }
</style>
</head>
<body>

<!-- CUSTOM CURSOR -->
<div id="cursor"></div>
<div id="cursor-ring"></div>

<!-- NAVIGATION -->
<nav id="main-nav">
  <div class="nav-logo" onclick="showPage('home')">Rae<span>form</span></div>
  <div class="nav-links">
    <button class="nav-link active" id="nav-home" onclick="showPage('home')">Home</button>
    <button class="nav-link" id="nav-about" onclick="showPage('about')">About Us</button>
    <button class="nav-link" id="nav-contact" onclick="showPage('contact')">Contact</button>
    <button class="nav-cta" onclick="openConsultPopup()">Get a Quote</button>
  </div>
  <button class="hamburger" id="hamburger" onclick="toggleMobile()" aria-label="Menu">
    <span></span><span></span><span></span>
  </button>
</nav>

<!-- MOBILE MENU -->
<div class="mobile-menu" id="mobile-menu">
  <button class="nav-link" onclick="showPage('home'); toggleMobile()">Home</button>
  <button class="nav-link" onclick="showPage('about'); toggleMobile()">About Us</button>
  <button class="nav-link" onclick="showPage('contact'); toggleMobile()">Contact</button>
  <button class="nav-cta" onclick="openConsultPopup(); toggleMobile()">Get a Quote</button>
</div>

<!-- ======================== HOME PAGE ======================== -->
<div class="page active" id="page-home">
  <!-- HERO -->
  <section class="hero">
    <div class="hero-bg"></div>
    <div class="hero-line"></div>
    <div class="hero-eyebrow">Design. Build. Deliver.</div>
    <h1 class="hero-title">We shape spaces<br>that <em>mean</em> something</h1>
    <p class="hero-subtitle">Raeform is a design and construction firm that takes your vision seriously — and turns it into something you'll want to come back to every single day.</p>
    <div class="hero-actions">
      <button class="btn-primary" onclick="showPage('contact')">Start a Project &rarr;</button>
      <button class="btn-ghost" onclick="showPage('about')">Our Story</button>
    </div>
    <div class="hero-scroll" onclick="document.getElementById('stats').scrollIntoView({behavior:'smooth'})">
      <div class="hero-scroll-line"></div>
      Scroll
    </div>
  </section>

  <!-- STATS -->
  <section class="stats-bar" id="stats">
    <div class="stat-item reveal">
      <span class="stat-number" data-count="200">0</span>
      <div class="stat-label">Projects completed</div>
    </div>
    <div class="stat-item reveal" style="transition-delay:0.1s">
      <span class="stat-number" data-count="15">0</span>
      <div class="stat-label">Years in the field</div>
    </div>
    <div class="stat-item reveal" style="transition-delay:0.2s">
      <span class="stat-number" data-count="98">0</span>
      <div class="stat-label">Client satisfaction</div>
    </div>
    <div class="stat-item reveal" style="transition-delay:0.3s">
      <span class="stat-number" data-count="12">0</span>
      <div class="stat-label">Industry awards</div>
    </div>
  </section>

  <!-- SERVICES -->
  <section class="services">
    <div class="section-header reveal">
      <div class="section-tag">What we do</div>
      <h2 class="section-title">Built around <em>your</em> goals — not ours</h2>
      <p class="section-desc">Every project we take on is different. We don't run the same playbook twice. We listen first, then we build.</p>
    </div>
    <div class="services-grid">
      <div class="service-card reveal" onclick="openServicePopup('Architecture & Design', 'From the first sketch to the last fitting, we design spaces with purpose. Our architects blend form and function — spaces that look extraordinary and work even better. Whether it\'s a home, office, or commercial development, we start with your needs and work outward.')">
        <div class="service-num">01</div>
        <div class="service-name">Architecture & Design</div>
        <div class="service-desc">Thoughtful design that starts with you. We draw spaces that earn their keep — every square meter designed to serve a real purpose.</div>
        <div class="service-arrow">Learn more &rarr;</div>
      </div>
      <div class="service-card reveal" style="transition-delay:0.1s" onclick="openServicePopup('Construction & Renovation', 'Our construction teams don\'t cut corners — not because we can\'t, but because we won\'t. We manage every site with transparency, clear timelines, and people you can actually get on the phone. Renovation or new build, we bring the same standard of care.')">
        <div class="service-num">02</div>
        <div class="service-name">Construction & Renovation</div>
        <div class="service-desc">Clean sites, honest timelines, and people who pick up the phone. That's not a promise — it's just how we work.</div>
        <div class="service-arrow">Learn more &rarr;</div>
      </div>
      <div class="service-card reveal" style="transition-delay:0.2s" onclick="openServicePopup('Interior Finishing', 'The details are where most firms cut corners. Not us. We obsess over material choices, lighting placement, and finishing quality — because the space you live or work in should feel right every day, not just at handover.')">
        <div class="service-num">03</div>
        <div class="service-name">Interior Finishing</div>
        <div class="service-desc">The details nobody talks about but everybody notices. We do them right — materials, finishes, light, and feel.</div>
        <div class="service-arrow">Learn more &rarr;</div>
      </div>
      <div class="service-card reveal" onclick="openServicePopup('Project Management', 'A great plan dies without great execution. Our project managers keep everything aligned — budget, schedule, teams, and quality — so you don\'t have to spend your weekends worried about what\'s happening on site.')">
        <div class="service-num">04</div>
        <div class="service-name">Project Management</div>
        <div class="service-desc">Someone to own the chaos so you don't have to. We keep budgets honest, teams moving, and clients informed.</div>
        <div class="service-arrow">Learn more &rarr;</div>
      </div>
      <div class="service-card reveal" style="transition-delay:0.1s" onclick="openServicePopup('Consulting & Planning', 'Not every project needs a full build. Sometimes you just need a clear set of eyes on a problem. We offer consulting for developers, landowners, and businesses navigating complex design or construction decisions.')">
        <div class="service-num">05</div>
        <div class="service-name">Consulting & Planning</div>
        <div class="service-desc">A clear set of expert eyes on a complex decision. Whether you\'re planning a development or solving a site problem, we help you see the full picture.</div>
        <div class="service-arrow">Learn more &rarr;</div>
      </div>
      <div class="service-card reveal" style="transition-delay:0.2s" onclick="openServicePopup('Sustainable Development', 'We build for the long term — for your long-term value and the planet\'s. Our sustainable development practice integrates energy efficiency, responsible materials, and green building standards without sacrificing quality or aesthetics.')">
        <div class="service-num">06</div>
        <div class="service-name">Sustainable Development</div>
        <div class="service-desc">Better buildings that last longer, cost less to run, and sit lighter on the planet. It\'s not a trend for us — it\'s the right way to build.</div>
        <div class="service-arrow">Learn more &rarr;</div>
      </div>
    </div>
  </section>

  <!-- PROCESS -->
  <section class="process">
    <div class="section-header reveal">
      <div class="section-tag">How we work</div>
      <h2 class="section-title">No surprises.<br><em>Just results.</em></h2>
    </div>
    <div class="process-grid">
      <div class="process-steps">
        <div class="process-step reveal">
          <div class="step-num">01</div>
          <div class="step-content">
            <div class="step-name">We listen — properly</div>
            <div class="step-desc">Before anything gets designed or built, we sit down and actually listen. What do you need? What keeps you up at night? What does success look like?</div>
          </div>
        </div>
        <div class="process-step reveal" style="transition-delay:0.1s">
          <div class="step-num">02</div>
          <div class="step-content">
            <div class="step-name">We plan with honesty</div>
            <div class="step-desc">We'll tell you what's realistic. We don't oversell timelines or budgets. If something's going to be tight, we say so before we start — not after.</div>
          </div>
        </div>
        <div class="process-step reveal" style="transition-delay:0.2s">
          <div class="step-num">03</div>
          <div class="step-content">
            <div class="step-name">We design with purpose</div>
            <div class="step-desc">Our designers don't just make things look good. They make things work well. Every decision connects back to your brief.</div>
          </div>
        </div>
        <div class="process-step reveal" style="transition-delay:0.3s">
          <div class="step-num">04</div>
          <div class="step-content">
            <div class="step-name">We build and deliver</div>
            <div class="step-desc">We execute. Clean sites, professional teams, quality materials. And when we hand over the keys, we mean it when we say the job is done.</div>
          </div>
        </div>
      </div>
      <div class="process-visual reveal" style="transition-delay:0.2s">
        <div class="process-orb">
          <div class="orb-center">Build<br>Better</div>
          <div class="orb-dot" style="top: 20px; left: 50%; transform: translateX(-50%);"></div>
        </div>
      </div>
    </div>
  </section>

  <!-- TESTIMONIALS -->
  <section class="testimonial-section">
    <div class="testimonial-bg">RF</div>
    <div class="section-tag reveal" style="justify-content:center; margin-bottom:3rem">
      What clients say
    </div>
    <div class="testimonials-wrap">
      <div class="testimonial-quote reveal" id="t-quote">
        "Raeform didn't just build our office — they understood the culture we were trying to create. The space they delivered actually changed how our team works."
      </div>
      <div class="testimonial-author reveal" id="t-author">
        <div class="author-name">Maria Santos</div>
        <div class="author-role">CEO, Lumina Group</div>
      </div>
      <div class="testimonial-dots">
        <div class="t-dot active" onclick="setTestimonial(0)"></div>
        <div class="t-dot" onclick="setTestimonial(1)"></div>
        <div class="t-dot" onclick="setTestimonial(2)"></div>
      </div>
    </div>
  </section>

  <!-- CTA BANNER -->
  <div class="cta-banner reveal">
    <div class="cta-banner-title">Ready to build something <em style="font-family: var(--font-display); font-style:italic; color:var(--gold)">real</em>?</div>
    <p class="cta-banner-desc">Reach out today. We'll have a real conversation — no sales scripts, no jargon. Just an honest look at what's possible.</p>
    <button class="btn-primary" onclick="showPage('contact')">Let's Talk &rarr;</button>
  </div>

  <!-- FOOTER -->
  <footer>
    <div class="footer-top">
      <div>
        <div class="footer-logo">Rae<span>form</span></div>
        <div class="footer-tagline">We design and build spaces that work hard, look great, and last. Based in the Philippines. Working everywhere.</div>
      </div>
      <div>
        <div class="footer-col-title">Navigate</div>
        <div class="footer-links">
          <button class="footer-link" onclick="showPage('home')">Home</button>
          <button class="footer-link" onclick="showPage('about')">About Us</button>
          <button class="footer-link" onclick="showPage('contact')">Contact</button>
        </div>
      </div>
      <div>
        <div class="footer-col-title">Contact</div>
        <div class="footer-links">
          <div class="footer-link" style="cursor:default">hello@raeform.com</div>
          <div class="footer-link" style="cursor:default">+63 917 000 0000</div>
          <div class="footer-link" style="cursor:default">Taguig City, Metro Manila</div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-copy">&copy; 2025 Raeform. All rights reserved.</div>
      <div class="footer-social">
        <button class="social-btn">in</button>
        <button class="social-btn">ig</button>
        <button class="social-btn">fb</button>
      </div>
    </div>
  </footer>
</div>

<!-- ======================== ABOUT PAGE ======================== -->
<div class="page" id="page-about">
  <div class="about-hero">
    <div class="about-hero-bg"></div>
    <div class="about-hero-content">
      <div class="section-tag">Our story</div>
      <h1 class="about-hero-title">We're not the<br>biggest firm.<br>We're the <em>right</em> one.</h1>
      <p class="about-hero-text" style="margin-top:1.5rem">Raeform was started by people who got tired of watching good ideas get buried under bureaucracy, cut corners, and broken promises. We built something different — a firm that puts craft before speed and honesty before comfort.</p>
    </div>
  </div>

  <div class="about-story">
    <div class="about-story-left reveal">
      <div class="section-tag">Where we started</div>
      <div class="about-story-title">Built from<br><em>scratch</em> — intentionally</div>
    </div>
    <div class="about-story-right reveal" style="transition-delay:0.1s">
      <p class="about-story-text">Raeform began in a small studio in Taguig — two people, a drafting table, and a belief that construction shouldn't feel like a gamble. We took on small residential projects, showed up on time, kept our promises, and let the work speak.</p>
      <p class="about-story-text">Word spread. Projects got bigger. The team grew carefully — we hired people who cared about getting things right, not just getting things done. We never chased scale for its own sake.</p>
      <div class="about-story-highlight">"A building is only as good as the team that builds it — and the honesty behind every decision made along the way."</div>
      <p class="about-story-text">Today, Raeform handles everything from residential renovations to large commercial developments across Metro Manila and beyond. What hasn't changed is how we work: directly, transparently, and with genuine care for what we leave behind.</p>
    </div>
  </div>

  <section class="values">
    <div class="section-header reveal">
      <div class="section-tag">What drives us</div>
      <h2 class="section-title">Four things we<br>actually <em>believe</em></h2>
    </div>
    <div class="values-grid">
      <div class="value-card reveal">
        <div class="value-icon">◈</div>
        <div class="value-name">Honesty over comfort</div>
        <div class="value-desc">We'll tell you if something won't work. We'll tell you when the budget is tight. We'd rather have a hard conversation early than a disaster later.</div>
      </div>
      <div class="value-card reveal" style="transition-delay:0.1s">
        <div class="value-icon">⬡</div>
        <div class="value-name">Craft above speed</div>
        <div class="value-desc">We don't rush. Good work takes the time it takes. We'd rather deliver something right than hand over something fast that needs fixing in six months.</div>
      </div>
      <div class="value-card reveal" style="transition-delay:0.2s">
        <div class="value-icon">◇</div>
        <div class="value-name">People first, always</div>
        <div class="value-desc">The spaces we build are for people. That means they need to work for people — how they live, how they move, what they need. Design starts with empathy.</div>
      </div>
      <div class="value-card reveal" style="transition-delay:0.3s">
        <div class="value-icon">△</div>
        <div class="value-name">Long-term thinking</div>
        <div class="value-desc">We design and build with decades in mind. A building should appreciate in value, in durability, in livability. Short cuts compound into long regrets.</div>
      </div>
    </div>
  </section>

  <section class="team">
    <div class="section-header reveal">
      <div class="section-tag">The people</div>
      <h2 class="section-title">The team behind<br>every <em>project</em></h2>
      <p class="section-desc">A small, experienced group of architects, builders, and project leads who've seen what goes wrong — and know how to make sure it doesn't.</p>
    </div>
    <div class="team-grid">
      <div class="team-card reveal">
        <div class="team-avatar"><div class="team-avatar-inner">RA</div></div>
        <div class="team-name">Rafael Aquino</div>
        <div class="team-role">Founder & Lead Architect</div>
      </div>
      <div class="team-card reveal" style="transition-delay:0.1s">
        <div class="team-avatar"><div class="team-avatar-inner">EC</div></div>
        <div class="team-name">Elena Cruz</div>
        <div class="team-role">Head of Construction</div>
      </div>
      <div class="team-card reveal" style="transition-delay:0.2s">
        <div class="team-avatar"><div class="team-avatar-inner">JM</div></div>
        <div class="team-name">James Mendoza</div>
        <div class="team-role">Senior Project Manager</div>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer>
    <div class="footer-top">
      <div>
        <div class="footer-logo">Rae<span>form</span></div>
        <div class="footer-tagline">We design and build spaces that work hard, look great, and last. Based in the Philippines. Working everywhere.</div>
      </div>
      <div>
        <div class="footer-col-title">Navigate</div>
        <div class="footer-links">
          <button class="footer-link" onclick="showPage('home')">Home</button>
          <button class="footer-link" onclick="showPage('about')">About Us</button>
          <button class="footer-link" onclick="showPage('contact')">Contact</button>
        </div>
      </div>
      <div>
        <div class="footer-col-title">Contact</div>
        <div class="footer-links">
          <div class="footer-link" style="cursor:default">hello@raeform.com</div>
          <div class="footer-link" style="cursor:default">+63 917 000 0000</div>
          <div class="footer-link" style="cursor:default">Taguig City, Metro Manila</div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-copy">&copy; 2025 Raeform. All rights reserved.</div>
      <div class="footer-social">
        <button class="social-btn">in</button>
        <button class="social-btn">ig</button>
        <button class="social-btn">fb</button>
      </div>
    </div>
  </footer>
</div>

<!-- ======================== CONTACT PAGE ======================== -->
<div class="page" id="page-contact">
  <div class="contact-hero">
    <div class="contact-hero-bg"></div>
    <div>
      <div class="section-tag">Get in touch</div>
      <h1 class="contact-hero-title">Let's have a <em>real</em><br>conversation</h1>
    </div>
  </div>

  <div class="contact-body">
    <div class="contact-info-block reveal">
      <p class="contact-intro">No forms that go nowhere. No automated replies that mean nothing. When you reach out to Raeform, a real person responds — usually within one business day.</p>
      <div class="contact-items">
        <div class="contact-item">
          <div class="contact-item-icon">✉</div>
          <div>
            <div class="contact-item-label">Email</div>
            <div class="contact-item-value">hello@raeform.com</div>
          </div>
        </div>
        <div class="contact-item">
          <div class="contact-item-icon">☏</div>
          <div>
            <div class="contact-item-label">Phone</div>
            <div class="contact-item-value">+63 917 000 0000</div>
          </div>
        </div>
        <div class="contact-item">
          <div class="contact-item-icon">◎</div>
          <div>
            <div class="contact-item-label">Office</div>
            <div class="contact-item-value">Taguig City, Metro Manila<br>Philippines</div>
          </div>
        </div>
        <div class="contact-item">
          <div class="contact-item-icon">◷</div>
          <div>
            <div class="contact-item-label">Hours</div>
            <div class="contact-item-value">Mon – Fri, 8:00 AM – 6:00 PM</div>
          </div>
        </div>
      </div>
    </div>

    <div class="contact-form-wrap reveal" style="transition-delay:0.15s">
      <div class="section-tag" style="margin-bottom:2rem">Send us a message</div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">First name</label>
          <input class="form-input" type="text" placeholder="Juan" id="f-first">
        </div>
        <div class="form-group">
          <label class="form-label">Last name</label>
          <input class="form-input" type="text" placeholder="dela Cruz" id="f-last">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Email address</label>
        <input class="form-input" type="email" placeholder="juan@example.com" id="f-email">
      </div>
      <div class="form-group">
        <label class="form-label">Project type</label>
        <select class="form-select" id="f-type">
          <option value="" disabled selected>Select a service...</option>
          <option>Architecture & Design</option>
          <option>Construction & Renovation</option>
          <option>Interior Finishing</option>
          <option>Project Management</option>
          <option>Consulting & Planning</option>
          <option>Sustainable Development</option>
          <option>Not sure yet</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Tell us about your project</label>
        <textarea class="form-textarea" placeholder="Give us the basics — what you're building, where, rough timeframe, and anything else that feels important." id="f-msg"></textarea>
      </div>
      <button class="form-submit" onclick="submitForm()">Send Message &rarr;</button>
    </div>
  </div>

  <div class="contact-map reveal">
    <div class="map-grid"></div>
    <div class="map-dot"></div>
    <span>Taguig City, Metro Manila — Our Home Base</span>
  </div>

  <!-- FOOTER -->
  <footer>
    <div class="footer-top">
      <div>
        <div class="footer-logo">Rae<span>form</span></div>
        <div class="footer-tagline">We design and build spaces that work hard, look great, and last. Based in the Philippines. Working everywhere.</div>
      </div>
      <div>
        <div class="footer-col-title">Navigate</div>
        <div class="footer-links">
          <button class="footer-link" onclick="showPage('home')">Home</button>
          <button class="footer-link" onclick="showPage('about')">About Us</button>
          <button class="footer-link" onclick="showPage('contact')">Contact</button>
        </div>
      </div>
      <div>
        <div class="footer-col-title">Contact</div>
        <div class="footer-links">
          <div class="footer-link" style="cursor:default">hello@raeform.com</div>
          <div class="footer-link" style="cursor:default">+63 917 000 0000</div>
          <div class="footer-link" style="cursor:default">Taguig City, Metro Manila</div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-copy">&copy; 2025 Raeform. All rights reserved.</div>
      <div class="footer-social">
        <button class="social-btn">in</button>
        <button class="social-btn">ig</button>
        <button class="social-btn">fb</button>
      </div>
    </div>
  </footer>
</div>

<!-- ======================== POPUPS ======================== -->
<!-- Service Popup -->
<div class="popup-overlay" id="service-popup">
  <div class="popup">
    <button class="popup-close" onclick="closePopup('service-popup')">&times;</button>
    <div class="popup-tag" id="sp-tag">Our Services</div>
    <h3 class="popup-title" id="sp-title">Service Name</h3>
    <p class="popup-text" id="sp-text">Service description goes here.</p>
    <button class="btn-primary" onclick="closePopup('service-popup'); showPage('contact')">Start a Conversation &rarr;</button>
  </div>
</div>

<!-- Consult Popup -->
<div class="popup-overlay" id="consult-popup">
  <div class="popup">
    <button class="popup-close" onclick="closePopup('consult-popup')">&times;</button>
    <div class="popup-tag">Free Consultation</div>
    <h3 class="popup-title">Let's talk through your project</h3>
    <p class="popup-text">No commitment. No hard sell. Just 30 minutes with one of our senior team members to understand your goals and give you an honest picture of what's possible.</p>
    <div class="form-group">
      <label class="form-label">Your name</label>
      <input class="form-input" type="text" placeholder="Maria Santos" id="cq-name">
    </div>
    <div class="form-group">
      <label class="form-label">Best email</label>
      <input class="form-input" type="email" placeholder="maria@company.com" id="cq-email">
    </div>
    <button class="form-submit" style="margin-top:1.5rem" onclick="submitConsult()">Request a Call &rarr;</button>
  </div>
</div>

<!-- Toast -->
<div class="toast" id="toast">
  <div class="toast-icon">✓</div>
  <div class="toast-text" id="toast-text">Message sent. We'll be in touch soon.</div>
</div>

<script>
  // === CURSOR ===
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
  });

  function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();

  document.querySelectorAll('button, a, .service-card, .process-step, .team-card, .t-dot, .social-btn').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  // === NAVIGATION ===
  function showPage(name) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + name).classList.add('active');
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    const nl = document.getElementById('nav-' + name);
    if (nl) nl.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(initReveal, 100);
    setTimeout(initStats, 200);
  }

  let mobileOpen = false;
  function toggleMobile() {
    mobileOpen = !mobileOpen;
    document.getElementById('mobile-menu').classList.toggle('open', mobileOpen);
    const spans = document.querySelectorAll('.hamburger span');
    if (mobileOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(4px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(4px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  }

  window.addEventListener('scroll', () => {
    document.getElementById('main-nav').classList.toggle('scrolled', window.scrollY > 40);
    initReveal();
  });

  // === REVEAL ON SCROLL ===
  function initReveal() {
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) el.classList.add('visible');
    });
  }
  setTimeout(initReveal, 300);

  // === COUNTER ANIMATION ===
  function initStats() {
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach(el => {
      const target = parseInt(el.dataset.count);
      const suffix = el.dataset.count > 90 ? '%' : '+';
      let current = 0;
      const step = target / 50;
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = Math.floor(current) + suffix;
        if (current >= target) clearInterval(timer);
      }, 30);
    });
  }
  setTimeout(initStats, 400);

  // === TESTIMONIALS ===
  const testimonials = [
    { quote: '"Raeform didn\'t just build our office — they understood the culture we were trying to create. The space they delivered actually changed how our team works."', name: 'Maria Santos', role: 'CEO, Lumina Group' },
    { quote: '"Other firms promised. Raeform delivered. On time, on budget, and without a single surprise we hadn\'t already talked through."', name: 'David Reyes', role: 'Property Developer' },
    { quote: '"I\'ve worked with three firms before Raeform. The difference isn\'t skill — it\'s honesty. These people actually care about the outcome."', name: 'Anne Villanueva', role: 'Restaurant Owner' }
  ];
  let tActive = 0;

  function setTestimonial(i) {
    tActive = i;
    const t = testimonials[i];
    const q = document.getElementById('t-quote');
    const a = document.getElementById('t-author');
    q.style.opacity = 0;
    setTimeout(() => {
      q.textContent = t.quote;
      document.querySelector('.author-name').textContent = t.name;
      document.querySelector('.author-role').textContent = t.role;
      q.style.opacity = 1;
    }, 200);
    document.querySelectorAll('.t-dot').forEach((d, j) => d.classList.toggle('active', j === i));
  }

  setInterval(() => setTestimonial((tActive + 1) % testimonials.length), 5000);

  // === POPUPS ===
  function openServicePopup(title, text) {
    document.getElementById('sp-title').textContent = title;
    document.getElementById('sp-text').textContent = text;
    document.getElementById('service-popup').classList.add('open');
  }
  function openConsultPopup() {
    document.getElementById('consult-popup').classList.add('open');
  }
  function closePopup(id) {
    document.getElementById(id).classList.remove('open');
  }
  document.querySelectorAll('.popup-overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) overlay.classList.remove('open');
    });
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') document.querySelectorAll('.popup-overlay').forEach(o => o.classList.remove('open'));
  });

  // === TOAST ===
  function showToast(msg) {
    const t = document.getElementById('toast');
    document.getElementById('toast-text').textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 4000);
  }

  // === FORM SUBMIT ===
  function submitForm() {
    const first = document.getElementById('f-first').value.trim();
    const email = document.getElementById('f-email').value.trim();
    const msg = document.getElementById('f-msg').value.trim();
    if (!first || !email || !msg) {
      showToast('Please fill in the required fields.');
      return;
    }
    document.getElementById('f-first').value = '';
    document.getElementById('f-last').value = '';
    document.getElementById('f-email').value = '';
    document.getElementById('f-msg').value = '';
    document.getElementById('f-type').selectedIndex = 0;
    showToast('Your message is on its way. We\'ll be in touch soon.');
  }

  function submitConsult() {
    const name = document.getElementById('cq-name').value.trim();
    const email = document.getElementById('cq-email').value.trim();
    if (!name || !email) {
      showToast('Please fill in both fields.');
      return;
    }
    closePopup('consult-popup');
    document.getElementById('cq-name').value = '';
    document.getElementById('cq-email').value = '';
    showToast('Request received. Expect a call within one business day.');
  }
</script>
</body>
</html>
