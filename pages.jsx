// Pages — home rebuilt to match Figma, inner pages refreshed with new tokens
const { useState: useStateP, useEffect: useEffectP } = React;

// ─────────────── HOME ───────────────
function HomePage({ setPage }) {
  const [stamps, setStamps] = useStateP(0);
  // Auto-animate stamp progress when in view
  const [rewardsRef, rewardsInView] = useInView({ threshold: 0.3 });
  useEffectP(() => {
    if (!rewardsInView) return;
    let i = 0;
    const tick = () => {
      i++;
      setStamps(i);
      if (i < 8) setTimeout(tick, 110);
    };
    setTimeout(tick, 250);
  }, [rewardsInView]);

  const [statsRef, statsInView] = useInView({ threshold: 0.25 });
  const rating = useCountUp(4.6, { decimals: 1, trigger: statsInView, duration: 700 });
  const clients = useCountUp(1000, { decimals: 0, trigger: statsInView, duration: 800 });

  // Studio strip — toggle to the second photo once its center has crossed the viewport center.
  const studioRef = React.useRef(null);
  const [studioScrolledIn, setStudioScrolledIn] = useStateP(false);
  useEffectP(() => {
    const onScroll = () => {
      const el = studioRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const elCenter = r.top + r.height / 2;
      const viewportCenter = window.innerHeight / 2;
      setStudioScrolledIn(elCenter < viewportCenter);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-frame">
          <span className="hfb top" />
          <span className="hfb right" />
          <span className="hfb bottom" />
          <span className="hfb left" />
          <h1>
            <AnimatedWords text={"Your nails\nperfected\nevery time"} baseDelay={500} gap={120} />
          </h1>
        </div>
        <div className="hero-cta">
          <a className="btn btn-primary" href="https://kims-nail-studio.salonized.com/widget_bookings/new" target="_blank" rel="noopener noreferrer">Book appointment</a>
        </div>
        <div className="scroll-cue" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })} style={{ cursor: 'pointer' }}>
          <span className="label">Scroll</span>
          <span className="chev" />
        </div>
      </section>

      {/* WELCOME + NAILS GRID */}
      <section style={{ padding: "96px 0" }}>
        <div className="container">
          <Reveal>
            <div className="welcome-eyebrow">Welcome to</div>
          </Reveal>
          <Reveal delay={1}>
            <div className="welcome-title"><h2>Kim's Nail Studio</h2></div>
          </Reveal>
          <Reveal delay={2}>
            <p className="welcome-sub">
              Step into our space where every detail is taken care of. From manicures to pedicures, sit back and let us handle the rest.
            </p>
          </Reveal>
        </div>
        <div className="nails-grid">
          <Reveal img>
            <div className="tile down" style={{ backgroundImage: 'url(assets/nails1.png)', height: '100%' }} />
          </Reveal>
          <Reveal img delay={1}>
            <div className="tile up" style={{ backgroundImage: 'url(assets/nails-1.png)', height: '100%' }} />
          </Reveal>
          <Reveal img delay={2}>
            <div className="tile" style={{ backgroundImage: 'url(assets/nails-2.png)', height: '100%' }} />
          </Reveal>
        </div>
      </section>

      {/* REWARDS BAND */}
      <section ref={rewardsRef} className="rewards-band">
        <Reveal>
          <h2>Earn your rewards</h2>
        </Reveal>
        <Reveal delay={1}>
          <p>Collect a stamp with every visit. After 8 appointments, enjoy 20% off your next one. Our way of saying thank you.</p>
        </Reveal>
        <div className="stamp-progress">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) =>
          <div key={i} className={"stamp-dot" + (i < stamps ? " filled" : "")} />
          )}
        </div>
        <div className="stamp-count">{stamps}/8</div>
        <Reveal delay={3}>
          <a className="stamp-card">
            <div className="stamp-tile">
              <img src="assets/mystamp.png" alt="MyStamp" />
            </div>
            <div className="stamp-label">Download the MyStamp app here</div>
          </a>
        </Reveal>
      </section>

      {/* REVIEWS */}
      <section ref={statsRef} className="reviews">
        <div className="container">
          <Reveal>
            <h2 className="review-title">A word from<br />our clients</h2>
          </Reveal>
          <Reveal delay={1}>
            <StarRating count={4.6} />
          </Reveal>
          <Reveal delay={2}>
            <div className="review-rating">
              <span className="num">{rating}</span>/5 <span className="count">based on {Math.round(clients)}+ Clients</span>
            </div>
          </Reveal>

          <Reveal img>
            <div className="review-stage">
              <div className="review-photo left" style={{ backgroundImage: 'url(assets/review-2.png)' }} />
              <div className="review-photo right" style={{ backgroundImage: 'url(assets/review-1.jpg)' }} />
              <div className="review-quote">
                <div className="quote">“My nails are gorgeous every time I come by.”</div>
                <div className="who">- Mila ter Haar</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* STUDIO STRIP */}
      <section ref={studioRef} className="studio-strip">
        <div className="studio-strip-text">
          <Reveal>
            <h2>The Studio</h2>
          </Reveal>
          <Reveal delay={1}>
            <p>Sink into our massage chairs, surrounded by marble and warm light, and let us take it from there.</p>
          </Reveal>
          <Reveal delay={2}>
            <div className="cta-row">
              <button className="btn btn-outline" onClick={() => setPage("about")}>Our story</button>
            </div>
          </Reveal>
        </div>
        <div className="studio-strip-photo">
          <div
            className="studio-photo"
            style={{ backgroundImage: 'url(assets/studio-pedicure.png)' }} />
          
          <div
            className={"studio-photo studio-photo-alt" + (studioScrolledIn ? " visible" : "")}
            style={{ backgroundImage: 'url(assets/studio-manicure.png)' }} />
          
        </div>
      </section>

      {/* READY */}
      <CtaBand setPage={setPage} />
    </>);

}

// ─────────────── TREATMENTS ───────────────
function TreatmentsPage({ setPage }) {
  const SERVICES = [
    { label: "Acryl",       id: "acryl"      },
    { label: "Solar",       id: "solar"      },
    { label: "BIAB",        id: "biab"       },
    { label: "Manicure",    id: "luxe-mani"  },
    { label: "Pedicure",    id: "pedicure"   },
    { label: "Nail Polish", id: "gellak"     },
    { label: "Nail Art",    id: "nailart"    },
  ];

  const [activeLabel, setActiveLabel] = useStateP("Acryl");

  const findItem = (id) => {
    for (const cat of Object.values(TREATMENTS)) {
      const item = cat.items.find((i) => i.id === id);
      if (item) return item;
    }
    return null;
  };

  const activeSvc = SERVICES.find((s) => s.label === activeLabel);
  const item = activeSvc && activeSvc.id ? findItem(activeSvc.id) : null;

  const handleService = (svc) => {
    if (svc.id) {
      setActiveLabel(svc.label);
    } else {
      window.open("https://kims-nail-studio.salonized.com/widget_bookings/new", "_blank");
    }
  };

  return (
    <>
      <section className="page-hero services-hero">
        <div className="container-narrow">
          <h1>Services</h1>
          <p>From a classic manicure to full nail extensions — find your treatment below.</p>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="services-btn-grid">
            {SERVICES.map((svc) =>
              <button
                key={svc.label}
                className={activeLabel === svc.label ? "btn active-svc" : "btn"}
                onClick={() => handleService(svc)}
              >
                {svc.label}
              </button>
            )}
          </div>

          {item && (
            <Reveal key={item.id} as="article" className="treatment">
              <div>
                <h2>{item.name}</h2>
                {item.prices.length > 0 && (
                  <div className="treatment-meta">
                    <div className="meta-item">
                      <span className="meta-label">From</span>
                      <span className="meta-value">{item.prices[0].amt}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Duration</span>
                      <span className="meta-value">{item.prices[0].duration}</span>
                    </div>
                  </div>
                )}
                <p className="lede">{item.lede}</p>
                <div className="what">
                  <h4>What you get</h4>
                  <ul>
                    {item.what.filter(w => !w.toLowerCase().includes("additional service")).map((w, j) => <li key={j}>{w}</li>)}
                  </ul>
                </div>
                {item.styles && (
                  <div className="treatment-styles">
                    <h4>Available options</h4>
                    <div className="style-tags">
                      {item.styles.map((s, i) => <span key={i} className="style-tag">{s}</span>)}
                    </div>
                  </div>
                )}
              </div>
              <div>
                <div className="treatment-art">
                  {item.ribbon && <span className="ribbon">{item.ribbon}</span>}
                  {item.photo
                    ? <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(assets/${item.photo})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                    : <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #FFF7F8, var(--pink-pale))' }}>
                        <div className="placeholder-art"><span>photo · {item.name.toLowerCase()}</span></div>
                      </div>
                  }
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <CtaBand setPage={setPage} />
    </>);

}

// ─────────────── ABOUT ───────────────
function AboutPage({ setPage }) {
  return (
    <>
      <section className="page-hero" style={{ paddingBottom: 96 }}>
        <div className="container-narrow">
          <h1>Our story</h1>
          <p style={{ maxWidth: 480, margin: '24px auto 0' }}>Beautiful nails aren't just an aesthetic choice, they're a feeling. At Kim's Nail Studio, we treat every client to the kind of attention that makes you leave not just looking good, but feeling it. From the first consultation to the final coat, every detail is considered.</p>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <h2>Inside the studio</h2>
            </div>
          </Reveal>
          <div className="gallery">
            <div className="tile"><img src="assets/nails-hero.png" alt="" /></div>
            <div className="tile"><img src="assets/nails1.png" alt="" /></div>
            <div className="tile"><img src="assets/nails-2.png" alt="" /></div>
            <div className="tile"><img src="assets/BIAB.jpg" alt="" /></div>
            <div className="tile"><img src="assets/nailart.png" alt="" /></div>
            <div className="tile"><img src="assets/polish.png" alt="" /></div>
            <div className="tile"><img src="assets/manicure.png" alt="" /></div>
          </div>
        </div>
      </section>

      <CtaBand setPage={setPage} />
    </>);

}

// ─────────────── BOOKING ───────────────
function BookingPage({ setPage }) {
  const [service, setService] = useStateP("BIAB Overlay");
  const [date, setDate] = useStateP("Sat 16 May");
  const [time, setTime] = useStateP("11:00");
  const [submitted, setSubmitted] = useStateP(false);

  const services = ["Luxe Manicure", "Gel Polish", "BIAB Overlay", "Acrylic Set", "Acrylic Refill", "Nail Art", "Removal", "Advice"];
  const dates = ["Tue 13", "Wed 14", "Thu 15", "Fri 16", "Sat 17", "Mon 19", "Tue 20"];
  const times = ["09:30", "11:00", "12:30", "14:00", "15:30", "17:00"];

  if (submitted) {
    return (
      <section className="section" style={{ paddingTop: 180 }}>
        <div className="container-narrow" style={{ textAlign: 'center' }}>
          <span className="script" style={{ fontSize: 'clamp(72px, 9vw, 120px)' }}>see you soon!</span>
          <h2 style={{ marginTop: 0 }}>Your request is sent.</h2>
          <p style={{ color: 'var(--ink-mute)', maxWidth: 480, margin: '24px auto 32px' }}>
            We confirm your appointment within a few hours via email or WhatsApp. Grab a cup of tea, see you soon.
          </p>
          <div style={{ display: 'inline-flex', gap: 12 }}>
            <button className="btn btn-outline" onClick={() => {setSubmitted(false);setPage("home");}}>To home</button>
            <button className="btn btn-primary" onClick={() => setSubmitted(false)}>Another booking</button>
          </div>
        </div>
      </section>);

  }

  return (
    <>
      <section className="page-hero blush-bg">
        <div className="container-narrow">
          <h1>Book</h1>
          <p>Fill in the form and we confirm within a few hours via email or WhatsApp.</p>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="book-grid">
            <Reveal>
              <h3 style={{ marginBottom: 24 }}>Your details</h3>
              <div className="field-row">
                <div className="field"><label>First name</label><input placeholder="Lotte" /></div>
                <div className="field"><label>Last name</label><input placeholder="Vandenberghe" /></div>
              </div>
              <div className="field-row">
                <div className="field"><label>Email</label><input type="email" placeholder="lotte@email.com" /></div>
                <div className="field"><label>Phone</label><input placeholder="+32 470 12 34 56" /></div>
              </div>
              <div className="field">
                <label>Treatment</label>
                <div className="chip-row">
                  {services.map((s) => <button key={s} type="button" className={"chip" + (service === s ? " active" : "")} onClick={() => setService(s)}>{s}</button>)}
                </div>
              </div>
              <div className="field">
                <label>Date</label>
                <div className="chip-row">
                  {dates.map((d) => <button key={d} type="button" className={"chip" + (date === d ? " active" : "")} onClick={() => setDate(d)}>{d}</button>)}
                </div>
              </div>
              <div className="field">
                <label>Time</label>
                <div className="chip-row">
                  {times.map((t) => <button key={t} type="button" className={"chip" + (time === t ? " active" : "")} onClick={() => setTime(t)}>{t}</button>)}
                </div>
              </div>
              <div className="field">
                <label>Inspiration or notes</label>
                <textarea rows="4" placeholder="Pinterest link, color preference, first time…" />
              </div>
              <button type="button" className="btn btn-primary" onClick={() => setSubmitted(true)}>Send request <span className="arrow">→</span></button>
            </Reveal>

            <Reveal delay={2}>
              <div className="studio-card">
                <h3>Your appointment</h3>
                <div className="studio-row">
                  <span className="icn">✿</span>
                  <div><div className="lab">Treatment</div><div className="val">{service}</div></div>
                </div>
                <div className="studio-row">
                  <span className="icn">✦</span>
                  <div><div className="lab">When</div><div className="val">{date} · {time}</div></div>
                </div>
                <div className="studio-row">
                  <span className="icn">❀</span>
                  <div><div className="lab">Address</div><div className="val">Beethovenstraat 77<br />1077 JM Amsterdam</div></div>
                </div>
                <div className="studio-row">
                  <span className="icn">♡</span>
                  <div><div className="lab">Cancellation</div><div className="val">Free up to 24h before.</div></div>
                </div>
                <hr className="divider" style={{ margin: '20px 0' }} />
                <div style={{ fontSize: 13, color: 'var(--ink-mute)', lineHeight: 1.6 }}>
                  Rather WhatsApp? Message us at <strong style={{ color: 'var(--ink)' }}>+32 470 12 34 56</strong>.
                </div>
              </div>
              <div className="studio-card" style={{ marginTop: 16 }}>
                <h3>Opening hours</h3>
                <div className="studio-row"><span className="icn">·</span><div><div className="lab">Tue to Fri</div><div className="val">10:00 to 19:00</div></div></div>
                <div className="studio-row"><span className="icn">·</span><div><div className="lab">Saturday</div><div className="val">09:00 to 17:00</div></div></div>
                <div className="studio-row"><span className="icn">·</span><div><div className="lab">Sun & Mon</div><div className="val">Closed</div></div></div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>);

}

// ─────────────── CONTACT ───────────────
function ContactPage({ setPage }) {
  return (
    <>
      <section className="page-hero">
        <div className="container-narrow">
          <h1>Contact</h1>
        </div>
      </section>
      <section className="section-tight">
        <div className="container">
          <div className="book-grid" style={{ alignItems: 'stretch' }}>
            <Reveal style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="studio-card" style={{ flex: 1 }}>
                <div className="studio-row"><span className="icn"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg></span><div><div className="lab">Address</div><div className="val">Beethovenstraat 77<br />1077 JM Amsterdam</div></div></div>
                <div className="studio-row"><span className="icn">☎</span><div><div className="lab">Phone</div><div className="val">+31 6 41141830</div><a href="https://api.whatsapp.com/message/IAW3CWK4LBT6P1?autoload=1&app_absent=0" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: 'var(--pink)', textDecoration: 'none', marginTop: 4, display: 'inline-block' }}>Send us a message via WhatsApp →</a></div></div>
                <div className="studio-row"><span className="icn"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg></span><div><div className="lab">Email</div><div className="val">kimnailstudio2021@gmail.com</div></div></div>
                <div className="studio-row"><span className="icn"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></span><div><div className="lab">Instagram</div><a href="https://instagram.com/kimnailsamsterdam" target="_blank" rel="noopener noreferrer" className="val" style={{ color: 'var(--pink)', textDecoration: 'none' }}>@kimnailsamsterdam</a></div></div>
              </div>
            </Reveal>
            <Reveal style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ flex: 1, minHeight: 300, borderRadius: 4, overflow: 'hidden', border: '1px solid var(--line)' }}>
                <StudioMap />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      <CtaBand setPage={setPage} />
    </>);

}

Object.assign(window, { HomePage, TreatmentsPage, AboutPage, BookingPage, ContactPage });

// ─── APP ───
const { useState: useStateA, useEffect: useEffectA } = React;

const PAGES = {
  home: HomePage,
  treatments: TreatmentsPage,
  about: AboutPage,
  book: BookingPage,
  contact: ContactPage,
};

function getHashPage() {
  const hash = window.location.hash.replace('#', '').trim();
  return PAGES[hash] ? hash : 'home';
}

function App() {
  const [page, setPageRaw] = useStateA(getHashPage);

  const setPage = (p) => {
    setPageRaw(p);
    window.location.hash = p === 'home' ? '' : p;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffectA(() => {
    const onHashChange = () => setPageRaw(getHashPage());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const PageComponent = PAGES[page] || HomePage;

  return (
    <>
      <Header page={page} setPage={setPage} />
      <main>
        <PageComponent setPage={setPage} />
      </main>
      <Footer setPage={setPage} />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);