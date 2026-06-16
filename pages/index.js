import { useState } from "react";

// ── Data ──────────────────────────────────────────────
const LEAGUES = [
  { id: 1, name: "Clapham Common Tennis", sport: "tennis", location: "Clapham, London", members: 24, boxes: 3, status: "active", img: "🎾", desc: "Friendly competitive league. 3 divisions with promotion every 6 weeks.", featured: true, starting: false, prize: false },
  { id: 2, name: "Stratford Padel Club", sport: "padel", location: "Stratford, London", members: 16, boxes: 2, status: "active", img: "🏓", desc: "Weekly padel box league. All levels welcome.", featured: true, starting: false, prize: false },
  { id: 3, name: "The Bullpadel London League", sport: "padel", location: "Shoreditch, London", members: 32, boxes: 4, status: "active", img: "🏓", desc: "Season winner gets a Bullpadel Vertex racket. Division winners get grip packs, overgrips, and balls.", featured: true, starting: false, prize: true, sponsor: "bullpadel", sponsorColor: "#E8461E", sponsorBg: "#1A1A1A" },
  { id: 10, name: "Head Pro Series", sport: "padel", location: "Cascais, Lisbon", members: 20, boxes: 3, status: "active", img: "🏓", desc: "Sponsored by Head. Prize pool includes rackets, bags, and apparel for top finishers.", featured: false, starting: false, prize: true, sponsor: "head", sponsorColor: "#FFFFFF", sponsorBg: "#0057A0" },
  { id: 11, name: "Celebrity Pro League", sport: "padel", location: "Miami, Florida", members: 40, boxes: 5, status: "active", img: "🏓", desc: "The most exclusive padel league. Celebrity players, premium venues, and VIP events. As seen with David Beckham.", featured: true, starting: false, prize: true, sponsor: "celebrity", sponsorColor: "#FFD700", sponsorBg: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)" },
  { id: 12, name: "Tinder Singles League", sport: "padel", location: "London, UK", members: 48, boxes: 6, status: "active", img: "🏓", desc: "Meet your match — on and off the court. Singles-only padel league powered by Tinder. Mix, play, connect.", featured: true, starting: false, prize: true, sponsor: "tinder", sponsorColor: "#FFFFFF", sponsorBg: "linear-gradient(135deg, #FD267A 0%, #FF6036 100%)" },
  { id: 4, name: "Bristol Squash League", sport: "squash", location: "Clifton, Bristol", members: 21, boxes: 3, status: "active", img: "🟡", desc: "Competitive squash at Clifton Squash Club.", featured: false, starting: false, prize: false },
  { id: 5, name: "Hackney Padel Social", sport: "padel", location: "Hackney, London", members: 4, boxes: 1, status: "open", img: "🏓", desc: "Casual padel league. Growing fast — join early!", featured: false, starting: true, prize: false },
  { id: 6, name: "Edinburgh Tennis Box", sport: "tennis", location: "Morningside, Edinburgh", members: 16, boxes: 2, status: "active", img: "🎾", desc: "Competitive box league for intermediate+ players.", featured: false, starting: false, prize: false },
  { id: 8, name: "NYC Padel League", sport: "padel", location: "Manhattan, New York", members: 28, boxes: 4, status: "active", img: "🏓", desc: "The biggest padel box league in New York.", featured: true, starting: false, prize: false },
  { id: 9, name: "Wimbledon Social Tennis", sport: "tennis", location: "Wimbledon, London", members: 8, boxes: 1, status: "open", img: "🎾", desc: "New league launching. All abilities. Play at Wimbledon Park courts.", featured: false, starting: true, prize: false },
];

const STANDINGS = [
  { rank: 1, name: "You", p: 5, w: 4, l: 1, sets: 9, pts: 22, zone: null },
  { rank: 2, name: "James W.", p: 5, w: 4, l: 1, sets: 8, pts: 21, zone: null },
  { rank: 3, name: "Sofia R.", p: 4, w: 3, l: 1, sets: 7, pts: 17, zone: null },
  { rank: 4, name: "Amir K.", p: 5, w: 3, l: 2, sets: 7, pts: 18, zone: null },
  { rank: 5, name: "Tom H.", p: 4, w: 2, l: 2, sets: 5, pts: 13, zone: null },
  { rank: 6, name: "Claire M.", p: 4, w: 1, l: 3, sets: 4, pts: 10, zone: null },
  { rank: 7, name: "Dan P.", p: 3, w: 1, l: 2, sets: 3, pts: 8, zone: "releg" },
  { rank: 8, name: "Lena G.", p: 4, w: 0, l: 4, sets: 1, pts: 5, zone: "releg" },
];

const PLAYERS = [
  { name: "James W.", phone: "+44 7700 900123", active: "Today", initials: "JW" },
  { name: "Sofia R.", phone: "+44 7700 900456", active: "Yesterday", initials: "SR" },
  { name: "Amir K.", phone: "+44 7700 900789", active: "2d ago", initials: "AK" },
  { name: "Tom H.", phone: "+44 7700 900321", active: "Today", initials: "TH" },
  { name: "Claire M.", phone: "+44 7700 900654", active: "3d ago", initials: "CM" },
  { name: "Dan P.", phone: "+44 7700 900987", active: "1w ago", initials: "DP" },
  { name: "Lena G.", phone: "+44 7700 900147", active: "Yesterday", initials: "LG" },
];

const RESULTS = [
  { p1: "You", p2: "James W.", score: "6-4, 3-6, [10-7]", winner: "You", date: "18 Mar" },
  { p1: "Sofia R.", p2: "Amir K.", score: "6-2, 6-3", winner: "Sofia R.", date: "17 Mar" },
  { p1: "You", p2: "Tom H.", score: "6-1, 6-4", winner: "You", date: "15 Mar" },
  { p1: "Claire M.", p2: "Lena G.", score: "6-3, 2-6, [10-8]", winner: "Claire M.", date: "14 Mar" },
];

// ── Palette ───────────────────────────────────────────
const C = {
  bg: "#F5F1EB", card: "#FFFFFF", cardBorder: "#E8E2D9",
  primary: "#1A3C34", primaryLight: "#2D5A4E",
  accent: "#C8E64A", accentSoft: "#E8F5B0",
  text: "#1A1A1A", textSec: "#6B7280", textDim: "#9CA3AF",
  tennis: "#16A34A", padel: "#2563EB", squash: "#D97706",
  promo: "#059669", releg: "#DC2626",
  whatsapp: "#25D366",
};

const sportColor = (s) => C[s] || C.padel;
const sportLabel = { tennis: "Tennis", padel: "Padel", squash: "Squash" };

// ── App ───────────────────────────────────────────────
export default function Boxa() {
  const [screen, setScreen] = useState("home");
  const [filter, setFilter] = useState("all");
  const [league, setLeague] = useState(null);
  const [tab, setTab] = useState("table");
  const [box, setBox] = useState(0);
  const [toast, setToast] = useState(null);
  const [query, setQuery] = useState("");

  const show = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2200); };
  const openLeague = (l) => { setLeague(l); setTab("table"); setBox(0); setScreen("league"); };
  const filtered = LEAGUES.filter(l => (filter === "all" || l.sport === filter) && (!query || l.name.toLowerCase().includes(query.toLowerCase()) || l.location.toLowerCase().includes(query.toLowerCase())));

  // ── Styles ────────────────────────────────────────
  const fonts = `'Instrument Serif', Georgia, serif`;
  const bodyFont = `'Inter', 'Segoe UI', system-ui, sans-serif`;
  const monoFont = `'Space Mono', 'Courier New', monospace`;

  const base = { background: C.bg, minHeight: "100vh", maxWidth: 1200, margin: "0 auto", fontFamily: bodyFont, color: C.text, position: "relative", paddingBottom: 72 };

  // ── Small Components ──────────────────────────────
  const Pill = ({ active, children, onClick, color }) => (
    <button onClick={onClick} style={{ padding: "8px 18px", borderRadius: 24, border: active ? "none" : `1.5px solid ${C.cardBorder}`, background: active ? (color || C.primary) : C.card, color: active ? "#fff" : C.textSec, fontFamily: bodyFont, fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.2s", boxShadow: active ? `0 2px 8px ${(color || C.primary)}30` : "none" }}>{children}</button>
  );

  const Badge = ({ children, color = C.primary }) => (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 700, fontFamily: bodyFont, color, background: color + "12", padding: "3px 10px", borderRadius: 20, letterSpacing: "0.02em" }}>{children}</span>
  );

  const Avatar = ({ initials, size = 36, color = C.primary }) => (
    <div style={{ width: size, height: size, borderRadius: "50%", background: color + "14", color: color, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: monoFont, fontSize: size * 0.35, fontWeight: 700, flexShrink: 0 }}>{initials}</div>
  );

  const Section = ({ title, children, action }) => (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 20px", marginBottom: 12 }}>
        <h2 style={{ margin: 0, fontSize: 20, fontFamily: fonts, fontWeight: 400, color: C.text, fontStyle: "italic" }}>{title}</h2>
        {action}
      </div>
      {children}
    </div>
  );

  // ── Sponsor Logo ───────────────────────────────
  const SponsorLogo = ({ sponsor }) => {
    if (sponsor === "bullpadel") return (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <svg width="28" height="28" viewBox="0 0 28 28"><circle cx="14" cy="14" r="13" fill="#E8461E" /><text x="14" y="18" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="900" fontFamily="Arial">B</text></svg>
        <span style={{ fontSize: 14, fontWeight: 900, color: "#E8461E", letterSpacing: "0.08em", fontFamily: "'Inter', sans-serif" }}>BULLPADEL</span>
      </div>
    );
    if (sponsor === "head") return (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <svg width="28" height="28" viewBox="0 0 28 28"><rect x="1" y="1" width="26" height="26" rx="4" fill="#0057A0" /><text x="14" y="19" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="900" fontFamily="Arial">HEAD</text></svg>
        <span style={{ fontSize: 14, fontWeight: 900, color: "#fff", letterSpacing: "0.1em", fontFamily: "'Inter', sans-serif" }}>HEAD PRO SERIES</span>
      </div>
    );
    if (sponsor === "celebrity") return (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 24 }}>⭐</span>
        <span style={{ fontSize: 15, fontWeight: 900, color: "#FFD700", letterSpacing: "0.06em", fontFamily: "'Inter', sans-serif" }}>CELEBRITY PRO LEAGUE</span>
      </div>
    );
    if (sponsor === "tinder") return (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <svg width="28" height="28" viewBox="0 0 28 28"><path d="M14 3c-1 4-4 6-5 10-1 4 1.5 8 5 10 3.5-2 6-6 5-10-1-4-4-6-5-10z" fill="#fff"/></svg>
        <span style={{ fontSize: 15, fontWeight: 900, color: "#fff", letterSpacing: "0.04em", fontFamily: "'Inter', sans-serif" }}>tinder</span>
        <span style={{ fontSize: 11, color: "#ffffff90", fontWeight: 600 }}>singles league</span>
      </div>
    );
    return null;
  };

  // ── League Card ───────────────────────────────────
  const LeagueCard = ({ l, wide }) => {
    const hasBrand = l.sponsor && l.sponsorBg;
    return (
      <div onClick={() => openLeague(l)} style={{ width: wide ? "100%" : 290, flexShrink: 0, background: C.card, borderRadius: 16, border: `1px solid ${C.cardBorder}`, overflow: "hidden", cursor: "pointer", transition: "all 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        {/* Branded header or color bar */}
        {hasBrand ? (
          <div style={{ padding: "14px 16px", background: l.sponsorBg, position: "relative", overflow: "hidden" }}>
            {l.sponsor === "celebrity" && (
              <div style={{ position: "absolute", right: -10, top: -10, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,215,0,0.1)", filter: "blur(20px)" }} />
            )}
            <SponsorLogo sponsor={l.sponsor} />
            {l.sponsor === "celebrity" && (
              <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900, color: "#1a1a2e", fontFamily: "'Inter', sans-serif", border: "2px solid #FFD70060" }}>DB</div>
                <div style={{ fontSize: 12, color: "#ffffff80", lineHeight: 1.4 }}>
                  <span style={{ color: "#FFD700", fontWeight: 700 }}>David Beckham</span> and friends.<br />Premium venues. VIP events.
                </div>
              </div>
            )}
            {l.sponsor === "tinder" && (
              <div style={{ marginTop: 6, fontSize: 11, color: "#ffffff90" }}>Meet your match — on and off the court 🔥</div>
            )}
            {l.sponsor === "bullpadel" && (
              <div style={{ marginTop: 6, fontSize: 11, color: "#ffffff80" }}>🏆 Season winner gets a Vertex racket</div>
            )}
            {l.sponsor === "head" && (
              <div style={{ marginTop: 6, fontSize: 11, color: "#ffffff80" }}>🏆 Rackets, bags & apparel prize pool</div>
            )}
          </div>
        ) : (
          <div style={{ height: 4, background: `linear-gradient(90deg, ${sportColor(l.sport)}, ${sportColor(l.sport)}80)` }} />
        )}
        <div style={{ padding: "14px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 24 }}>{l.img}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: C.text, lineHeight: 1.3 }}>{l.name}</div>
                <div style={{ fontSize: 12, color: C.textSec, marginTop: 2 }}>{l.location}</div>
              </div>
            </div>
          </div>
          {!hasBrand && <p style={{ margin: "6px 0 10px", fontSize: 13, color: C.textSec, lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{l.desc}</p>}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <Badge color={sportColor(l.sport)}>{sportLabel[l.sport]}</Badge>
            {l.prize && !hasBrand && <Badge color="#B45309">🏆 Prizes</Badge>}
            {l.status === "open" && <Badge color={C.promo}>Open to join</Badge>}
            <span style={{ fontSize: 12, color: C.textDim, fontFamily: monoFont, marginLeft: "auto" }}>{l.members} players · {l.boxes} div{l.boxes > 1 ? "s" : ""}</span>
          </div>
        </div>
      </div>
    );
  };

  // ── Horizontal Scroll ─────────────────────────────
  const HScroll = ({ children }) => (
    <div style={{ display: "flex", gap: 12, overflowX: "auto", padding: "0 20px", scrollbarWidth: "none", msOverflowStyle: "none" }}>{children}</div>
  );

  // ── Nav ────────────────────────────────────────────
  const Nav = () => (
    <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 1200, background: C.card, borderTop: `1px solid ${C.cardBorder}`, display: "flex", padding: "8px 0 env(safe-area-inset-bottom, 10px)", zIndex: 100 }}>
      {[["home", "◉", "Explore"], ["leagues", "⬡", "My Leagues"], ["profile", "◐", "Profile"]].map(([id, icon, label]) => (
        <button key={id} onClick={() => { setScreen(id); setLeague(null); }} style={{ flex: 1, background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "4px 0", cursor: "pointer", color: (screen === id || (screen === "league" && id === "leagues")) ? C.primary : C.textDim, fontFamily: bodyFont, fontSize: 10, fontWeight: 600, transition: "color 0.2s" }}>
          <span style={{ fontSize: 20, lineHeight: 1 }}>{icon}</span>{label}
        </button>
      ))}
    </div>
  );

  // ── HOME SCREEN ───────────────────────────────────
  const HomeScreen = () => (
    <div>
      {/* Hero */}
      <div style={{ padding: "48px 20px 20px", background: `linear-gradient(180deg, ${C.primary} 0%, ${C.primaryLight} 100%)`, borderRadius: "0 0 28px 28px", marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <span style={{ fontSize: 22, fontFamily: fonts, fontWeight: 400, color: C.accent, letterSpacing: "-0.02em" }}>boxa</span>
          <Badge color={C.accent}>Beta</Badge>
        </div>
        <h1 style={{ margin: "0 0 6px", fontSize: 34, fontFamily: fonts, fontWeight: 400, color: "#fff", lineHeight: 1.15 }}>Find your<br /><em>league</em></h1>
        <p style={{ margin: "0 0 18px", fontSize: 14, color: "#ffffff90", lineHeight: 1.5 }}>Join box leagues for tennis, padel and squash. One format. No debate.</p>
        <div style={{ position: "relative" }}>
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search leagues or locations..." style={{ width: "100%", boxSizing: "border-box", padding: "13px 16px 13px 40px", background: "#ffffff18", border: "1.5px solid #ffffff25", borderRadius: 14, color: "#fff", fontFamily: bodyFont, fontSize: 14, outline: "none", backdropFilter: "blur(8px)" }} />
          <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, opacity: 0.5 }}>🔍</span>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 8, padding: "0 20px", marginBottom: 24, overflowX: "auto", scrollbarWidth: "none" }}>
        {[["all", "All", C.primary], ["tennis", "🎾 Tennis", C.tennis], ["padel", "🏓 Padel", C.padel], ["squash", "🟡 Squash", C.squash]].map(([id, label, color]) => (
          <Pill key={id} active={filter === id} color={color} onClick={() => setFilter(id)}>{label}</Pill>
        ))}
      </div>

      {/* Prize Leagues */}
      {filtered.some(l => l.prize) && (
        <Section title="Prize leagues" action={<Badge color="#B45309">🏆 Sponsored</Badge>}>
          <HScroll>{filtered.filter(l => l.prize).map(l => <LeagueCard key={l.id} l={l} />)}</HScroll>
        </Section>
      )}

      {/* Starting Soon */}
      {filtered.some(l => l.starting) && (
        <Section title="Starting soon">
          <HScroll>{filtered.filter(l => l.starting).map(l => <LeagueCard key={l.id} l={l} />)}</HScroll>
        </Section>
      )}

      {/* Most Active */}
      <Section title="Most active">
        <HScroll>{filtered.filter(l => l.featured).map(l => <LeagueCard key={l.id} l={l} />)}</HScroll>
      </Section>

      {/* All Leagues */}
      <Section title="All leagues">
        <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "0 20px" }}>
          {filtered.map(l => <LeagueCard key={l.id} l={l} wide />)}
        </div>
      </Section>

      {/* Format Banner */}
      <div style={{ margin: "0 20px 24px", padding: "20px", background: C.primary, borderRadius: 16, color: "#fff" }}>
        <div style={{ fontSize: 18, fontFamily: fonts, fontStyle: "italic", marginBottom: 8 }}>The Boxa Format</div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {["2 full sets", "Super tiebreak to 10", "Golden advantage"].map((r, i) => (
            <span key={i} style={{ padding: "6px 14px", borderRadius: 20, background: "#ffffff15", fontSize: 13, fontWeight: 600, border: "1px solid #ffffff20" }}>{r}</span>
          ))}
        </div>
        <div style={{ marginTop: 12, display: "flex", gap: 16, fontSize: 12, color: "#ffffff80" }}>
          <span>Win <strong style={{ color: C.accent }}>3pts</strong></span>
          <span>Loss <strong style={{ color: "#fff" }}>1pt</strong></span>
          <span>No-show <strong style={{ color: "#ff9999" }}>0pts</strong></span>
          <span>Set won <strong style={{ color: C.accent }}>+1pt</strong></span>
        </div>
      </div>
    </div>
  );

  // ── MY LEAGUES ────────────────────────────────────
  const MyLeaguesScreen = () => (
    <div>
      <div style={{ padding: "48px 20px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ margin: 0, fontSize: 28, fontFamily: fonts, fontWeight: 400 }}>My leagues</h1>
          <button onClick={() => show("Create league — coming soon")} style={{ padding: "8px 18px", borderRadius: 24, background: C.primary, color: "#fff", border: "none", fontFamily: bodyFont, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>+ Create</button>
        </div>
      </div>
      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 12 }}>
        {LEAGUES.slice(0, 2).map(l => (
          <div key={l.id} onClick={() => openLeague(l)} style={{ background: C.card, borderRadius: 16, border: `1px solid ${C.cardBorder}`, padding: 16, cursor: "pointer" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
              <span style={{ fontSize: 28 }}>{l.img}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{l.name}</div>
                <div style={{ fontSize: 12, color: C.textSec, marginTop: 2 }}>Spring 2026 · {l.boxes} divisions</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 24, fontWeight: 800, fontFamily: monoFont, color: C.primary }}>1st</div>
                <div style={{ fontSize: 11, color: C.textSec }}>Box A</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ flex: 1, height: 5, borderRadius: 3, background: C.cardBorder }}>
                <div style={{ width: "62%", height: "100%", borderRadius: 3, background: `linear-gradient(90deg, ${sportColor(l.sport)}, ${C.accent})` }} />
              </div>
              <span style={{ fontSize: 11, color: C.textDim, fontFamily: monoFont }}>5/7 played</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ── LEAGUE DETAIL ─────────────────────────────────
  const LeagueScreen = () => {
    if (!league) return null;
    const boxes = Array.from({ length: league.boxes }, (_, i) => String.fromCharCode(65 + i));
    return (
      <div>
        {/* Header */}
        <div style={{ padding: "48px 20px 16px", display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={() => setScreen("leagues")} style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 10, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 18, color: C.textSec }}>←</button>
          <div style={{ flex: 1 }}>
            <h1 style={{ margin: 0, fontSize: 20, fontFamily: fonts, fontWeight: 400, lineHeight: 1.2 }}>{league.name}</h1>
            <p style={{ margin: "2px 0 0", fontSize: 12, color: C.textSec }}>{league.img} {sportLabel[league.sport]} · {league.location}</p>
          </div>
        </div>

        {/* Box switcher */}
        {league.boxes > 1 && (
          <div style={{ display: "flex", gap: 6, padding: "0 20px", marginBottom: 14 }}>
            {boxes.map((b, i) => (
              <button key={i} onClick={() => setBox(i)} style={{ flex: 1, padding: "10px 0", borderRadius: 12, border: box === i ? `2px solid ${C.primary}` : `1.5px solid ${C.cardBorder}`, background: box === i ? C.primary + "08" : C.card, color: box === i ? C.primary : C.textSec, fontFamily: bodyFont, fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}>
                Box {b}<br /><span style={{ fontSize: 10, fontWeight: 500, opacity: 0.6 }}>Division {i + 1}</span>
              </button>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: "flex", margin: "0 20px", background: C.card, borderRadius: 12, border: `1px solid ${C.cardBorder}`, overflow: "hidden", marginBottom: 16 }}>
          {["table", "results", "players"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: "11px 0", background: tab === t ? C.primary : "transparent", color: tab === t ? "#fff" : C.textSec, border: "none", fontFamily: bodyFont, fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all 0.2s", textTransform: "capitalize" }}>{t}</button>
          ))}
        </div>

        <div style={{ padding: "0 20px" }}>
          {tab === "table" && <TableTab />}
          {tab === "results" && <ResultsTab />}
          {tab === "players" && <PlayersTab />}
        </div>
      </div>
    );
  };

  const TableTab = () => (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 12, fontSize: 11, fontFamily: bodyFont }}>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: C.promo, display: "inline-block" }} /> Promotion</span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: C.releg, display: "inline-block" }} /> Relegation</span>
        </div>
        <button onClick={() => show("Score entry — coming soon")} style={{ padding: "7px 16px", borderRadius: 20, background: C.primary, color: "#fff", border: "none", fontSize: 12, fontWeight: 700, fontFamily: bodyFont, cursor: "pointer" }}>+ Add Score</button>
      </div>
      <div style={{ background: C.card, borderRadius: 14, border: `1px solid ${C.cardBorder}`, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "30px 1fr 32px 32px 32px 40px", gap: 2, padding: "10px 14px", fontSize: 10, fontWeight: 700, color: C.textDim, fontFamily: monoFont, textTransform: "uppercase", borderBottom: `1px solid ${C.cardBorder}` }}>
          <span>#</span><span>Player</span><span>P</span><span>W</span><span>L</span><span style={{ textAlign: "right" }}>Pts</span>
        </div>
        {STANDINGS.map((s, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "30px 1fr 32px 32px 32px 40px", gap: 2, padding: "11px 14px", alignItems: "center", fontSize: 13, background: s.name === "You" ? C.primary + "06" : "transparent", borderBottom: i < STANDINGS.length - 1 ? `1px solid ${C.cardBorder}50` : "none", position: "relative" }}>
            {s.zone && <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: s.zone === "releg" ? C.releg : C.promo, borderRadius: "0 2px 2px 0" }} />}
            <span style={{ fontFamily: monoFont, fontWeight: 700, fontSize: 14, color: i < 3 ? C.primary : C.textDim }}>{s.rank}</span>
            <span style={{ fontWeight: s.name === "You" ? 800 : 500, color: s.name === "You" ? C.primary : C.text }}>
              {s.name} {s.zone === "releg" && <span style={{ color: C.releg, fontSize: 10 }}>▼</span>}
            </span>
            <span style={{ fontFamily: monoFont, color: C.textDim, fontSize: 12 }}>{s.p}</span>
            <span style={{ fontFamily: monoFont, color: C.promo, fontSize: 12 }}>{s.w}</span>
            <span style={{ fontFamily: monoFont, color: C.releg, fontSize: 12 }}>{s.l}</span>
            <span style={{ textAlign: "right", fontWeight: 800, fontFamily: monoFont, fontSize: 15, color: s.name === "You" ? C.primary : C.text }}>{s.pts}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const ResultsTab = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {RESULTS.map((r, i) => (
        <div key={i} style={{ background: C.card, borderRadius: 12, border: `1px solid ${C.cardBorder}`, padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14 }}>
              <span style={{ fontWeight: r.winner === r.p1 ? 800 : 400, color: r.winner === r.p1 ? C.primary : C.text }}>{r.p1}</span>
              <span style={{ color: C.textDim, fontSize: 11 }}>vs</span>
              <span style={{ fontWeight: r.winner === r.p2 ? 800 : 400, color: r.winner === r.p2 ? C.primary : C.text }}>{r.p2}</span>
            </div>
            <div style={{ fontSize: 11, color: C.textDim, marginTop: 3 }}>{r.date}</div>
          </div>
          <span style={{ fontFamily: monoFont, fontSize: 13, fontWeight: 700, color: C.text }}>{r.score}</span>
        </div>
      ))}
    </div>
  );

  const PlayersTab = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <p style={{ fontSize: 13, color: C.textSec, margin: "0 0 4px" }}>Tap to message on WhatsApp and arrange a match.</p>
      {PLAYERS.map((p, i) => (
        <div key={i} style={{ background: C.card, borderRadius: 12, border: `1px solid ${C.cardBorder}`, padding: "12px 14px", display: "flex", alignItems: "center", gap: 12 }}>
          <Avatar initials={p.initials} color={C.primary} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 14 }}>{p.name}</div>
            <div style={{ fontSize: 11, color: C.textDim, marginTop: 1 }}>Active {p.active}</div>
          </div>
          <a href={`https://wa.me/${p.phone.replace(/\s/g, "")}`} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 5, padding: "8px 12px", borderRadius: 10, background: C.whatsapp + "12", color: C.whatsapp, fontFamily: monoFont, fontSize: 11, fontWeight: 600, textDecoration: "none", border: `1px solid ${C.whatsapp}25`, whiteSpace: "nowrap" }} onClick={e => e.stopPropagation()}>
            💬 {p.phone}
          </a>
        </div>
      ))}
    </div>
  );

  // ── PROFILE ───────────────────────────────────────
  const ProfileScreen = () => (
    <div>
      <div style={{ padding: "48px 20px 20px" }}>
        <h1 style={{ margin: 0, fontSize: 28, fontFamily: fonts, fontWeight: 400 }}>Profile</h1>
      </div>
      <div style={{ margin: "0 20px", background: C.card, borderRadius: 16, border: `1px solid ${C.cardBorder}`, padding: 24, textAlign: "center", marginBottom: 16 }}>
        <Avatar initials="TD" size={64} color={C.primary} />
        <div style={{ marginTop: 10, fontWeight: 800, fontSize: 20 }}>Teddy</div>
        <div style={{ fontSize: 13, color: C.textSec, marginTop: 2 }}>Member since March 2026</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 28, marginTop: 18 }}>
          {["2", "8", "14"].map((v, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: 800, fontFamily: monoFont, color: [C.primary, C.promo, C.text][i] }}>{v}</div>
              <div style={{ fontSize: 11, color: C.textSec }}>{["Leagues", "Wins", "Played"][i]}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Promo history */}
      <div style={{ margin: "0 20px", background: C.card, borderRadius: 16, border: `1px solid ${C.cardBorder}`, padding: 16, marginBottom: 16 }}>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10 }}>Promotion History</div>
        {[{ s: "Winter 2025", from: "Box B", to: "Box A", type: "promo" }, { s: "Autumn 2025", from: "Box C", to: "Box B", type: "promo" }].map((h, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", background: h.type === "promo" ? C.promo + "08" : C.releg + "08", borderRadius: 10, border: `1px solid ${h.type === "promo" ? C.promo : C.releg}18`, marginBottom: i < 1 ? 6 : 0 }}>
            <span style={{ color: h.type === "promo" ? C.promo : C.releg }}>▲</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{h.from} → {h.to}</div>
              <div style={{ fontSize: 11, color: C.textSec }}>{h.s}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Subscription */}
      <div style={{ margin: "0 20px", background: C.primary, borderRadius: 16, padding: 20, color: "#fff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Boxa Pro</div>
            <div style={{ fontSize: 13, color: "#ffffff80", marginTop: 2 }}>$4/mo annual · $5/mo rolling</div>
          </div>
          <span style={{ padding: "5px 14px", borderRadius: 20, background: C.accent, color: C.primary, fontSize: 12, fontWeight: 800 }}>Active</span>
        </div>
      </div>
    </div>
  );

  // ── Render ────────────────────────────────────────
  return (
    <div style={base}>
      <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
      {toast && (
        <div style={{ position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", zIndex: 300, background: C.primary, color: "#fff", padding: "10px 24px", borderRadius: 14, fontFamily: bodyFont, fontSize: 14, fontWeight: 700, boxShadow: "0 8px 30px rgba(0,0,0,0.15)", animation: "slideDown 0.2s" }}>{toast}</div>
      )}
      {screen === "home" && <HomeScreen />}
      {screen === "leagues" && <MyLeaguesScreen />}
      {screen === "league" && <LeagueScreen />}
      {screen === "profile" && <ProfileScreen />}
      <Nav />
      <style>{`
        * { -webkit-tap-highlight-color: transparent; }
        input::placeholder { color: #ffffff50; }
        ::-webkit-scrollbar { display: none; }
        @keyframes slideDown { from { opacity: 0; transform: translate(-50%, -10px); } to { opacity: 1; transform: translate(-50%, 0); } }
        
        /* Desktop responsive */
        @media (min-width: 768px) {
          .league-grid { display: grid !important; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px; overflow-x: visible !important; padding: 0 !important; }
          .league-grid > div { width: 100% !important; }
          .section-padding { padding: 0 40px !important; }
          .hero-padding { padding: 48px 40px 20px !important; }
        }
        @media (min-width: 1024px) {
          .section-padding { padding: 0 60px !important; }
          .hero-padding { padding: 48px 60px 20px !important; }
          .league-grid { grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); }
        }
      `}</style>
    </div>
  );
}
