// Shared UI components + animation primitives
const { useState, useEffect, useRef } = React;

// IntersectionObserver-based reveal hook
function useInView(opts = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (opts.once !== false) obs.unobserve(el);
        } else if (opts.once === false) {
          setInView(false);
        }
      },
      { threshold: opts.threshold ?? 0.15, rootMargin: opts.rootMargin ?? "0px 0px -60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

// Count-up hook
function useCountUp(target, { duration = 1200, decimals = 1, trigger = true } = {}) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let raf;
    const start = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [trigger, target, duration]);
  return val.toFixed(decimals);
}

// Reveal wrapper
function Reveal({ children, delay = 0, as: As = "div", className = "", img = false, ...rest }) {
  const [ref, inView] = useInView();
  const base = img ? "reveal-img" : "reveal";
  const cls = `${base}${delay ? " delay-" + delay : ""} ${inView ? "in-view" : ""} ${className}`.trim();
  return <As ref={ref} className={cls} {...rest}>{children}</As>;
}

// Word-by-word animated heading (for hero) — supports \n for line breaks
function AnimatedWords({ text, baseDelay = 400, gap = 90 }) {
  const lines = text.split("\n");
  let idx = 0;
  return lines.map((line, li) => {
    const words = line.split(" ");
    return (
      <React.Fragment key={li}>
        {words.map((w, wi) => {
          const i = idx++;
          return (
            <React.Fragment key={wi}>
              <span className="word" style={{ animationDelay: `${baseDelay + i * gap}ms` }}>{w}</span>
              {wi < words.length - 1 && " "}
            </React.Fragment>);

        })}
        {li < lines.length - 1 && <br />}
      </React.Fragment>);

  });
}

function StarRating({ count = 4.6 }) {
  const stars = [0, 1, 2, 3, 4].map((i) => {
    const fill = Math.max(0, Math.min(1, count - i));
    return (
      <svg key={i} className="star" viewBox="0 0 33 33" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={`star-grad-${i}`}>
            <stop offset={`${fill * 100}%`} stopColor="#ED1E6A" />
            <stop offset={`${fill * 100}%`} stopColor="rgba(237,30,106,0.18)" />
          </linearGradient>
        </defs>
        <path d="M16.5 1.6 L20.2 11.9 L31.2 12.6 L22.7 19.8 L25.6 30.4 L16.5 24.5 L7.4 30.4 L10.3 19.8 L1.8 12.6 L12.8 11.9 Z" fill={`url(#star-grad-${i})`} stroke="#ED1E6A" strokeWidth="0.6" />
      </svg>);

  });
  return <div className="review-stars">{stars}</div>;
}

function Logo({ size = 64, onClick }) {
  return (
    <div className="header-logo" onClick={onClick}>
      <img src="assets/logo-header.png" alt="Kim's Nail Studio" style={{ height: size, margin: "0px" }} />
    </div>);

}

function Header({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {setOpen(false);}, [page]);
  const goHome = () => {
    setPage("home");
    setOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const navItems = [
  { id: "home", label: "Home" },
  { id: "treatments", label: "Services" },
  { id: "about", label: "Our story" },
  { id: "contact", label: "Contact" }];

  return (
    <>
      <header className={"header" + (scrolled ? " scrolled" : "") + (open ? " menu-open" : "")}>
        <Logo size={48} onClick={goHome} />
        <nav className="header-nav">
          {navItems.map((it) =>
          <a key={it.id} className={page === it.id ? "active" : ""} onClick={() => setPage(it.id)}>{it.label}</a>
          )}
        </nav>
        <button
          className={"hamburger" + (open ? " open" : "")}
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}>
          <span /><span /><span />
        </button>
      </header>
      <div className={"mobile-menu" + (open ? " open" : "")} role="dialog" aria-hidden={!open}>
        <nav>
          {navItems.map((it, i) =>
          <a
            key={it.id}
            className={page === it.id ? "active" : ""}
            style={{ transitionDelay: open ? `${0.15 + i * 0.08}s` : "0s" }}
            onClick={() => setPage(it.id)}>{it.label}</a>
          )}
          <a
            className="btn btn-primary mobile-menu-cta"
            style={{ transitionDelay: open ? `${0.15 + navItems.length * 0.08}s` : "0s" }}
            href="https://kims-nail-studio.salonized.com/widget_bookings/new" target="_blank" rel="noopener noreferrer">Book appointment</a>
        </nav>
      </div>
    </>);

}

function StudioMap() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof L === "undefined") return;
    if (el._leaflet_map) return;
    const lat = 52.347183;
    const lng = 4.877213;
    const map = L.map(el, {
      center: [lat, lng],
      zoom: 14,
      scrollWheelZoom: false,
      zoomControl: true,
    });
    el._leaflet_map = map;
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 20,
      }
    ).addTo(map);
    const pin = L.divIcon({
      className: "studio-pin",
      html: '<svg width="44" height="56" viewBox="0 0 44 56" xmlns="http://www.w3.org/2000/svg"><path d="M22 2 C32 2 40 10 40 20 C40 32 22 52 22 52 C22 52 4 32 4 20 C4 10 12 2 22 2 Z" fill="#EE2971" stroke="white" stroke-width="2"/><circle cx="22" cy="20" r="6" fill="white"/></svg>',
      iconSize: [44, 56],
      iconAnchor: [22, 54],
      popupAnchor: [0, -50],
    });
    L.marker([lat, lng], { icon: pin })
      .addTo(map)
      .bindPopup("<div style=\"font-family:'Plus Jakarta Sans','Inter',-apple-system,BlinkMacSystemFont,sans-serif;font-size:13px;line-height:1.5\"><strong style=\"font-family:'Plus Jakarta Sans','Inter',-apple-system,BlinkMacSystemFont,sans-serif\">Kim's Nail Studio</strong><br/>Beethovenstraat 77<br/>1077 JM Amsterdam</div>");
    const ro = new ResizeObserver(() => map.invalidateSize());
    ro.observe(el);
    return () => { ro.disconnect(); map.remove(); el._leaflet_map = null; };
  }, []);
  return <div ref={ref} className="studio-map" style={{ width: '100%', height: '100%' }} />;
}

function Footer({ setPage }) {
  return (
    <footer className="footer">
      <div className="footer-brand">Kim's Nail Studio</div>
      <div className="footer-nav">
        <a onClick={() => setPage("treatments")}>Services</a>
        <a onClick={() => setPage("about")}>Our story</a>
        <a onClick={() => setPage("contact")}>Contact</a>
      </div>
      <div className="footer-socials">
        <a className="social-btn" aria-label="Instagram">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
          </svg>
        </a>
        <a className="social-btn" aria-label="TikTok">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.6 6.6a4.5 4.5 0 0 1-3.6-1.4 4.5 4.5 0 0 1-1.2-2.7h-3.1v12.4a2.6 2.6 0 1 1-1.8-2.5V9.1a5.7 5.7 0 1 0 4.9 5.6V8.4a7.6 7.6 0 0 0 4.8 1.7V7a4.5 4.5 0 0 1-0 -.4Z" />
          </svg>
        </a>
      </div>
    </footer>);

}

function CtaBand({ setPage, title = "Ready when you are", subtitle = "Book your moment of calm, we'll handle the rest." }) {
  return (
    <section className="ready-band">
      <Reveal>
        <h2>{title}</h2>
        {subtitle && <p className="ready-sub">{subtitle}</p>}
        <a className="btn btn-primary" href="https://kims-nail-studio.salonized.com/widget_bookings/new" target="_blank" rel="noopener noreferrer">Book appointment</a>
      </Reveal>
    </section>);

}

Object.assign(window, { useInView, useCountUp, Reveal, AnimatedWords, StarRating, Logo, Header, Footer, CtaBand, StudioMap });