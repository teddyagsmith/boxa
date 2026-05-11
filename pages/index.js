import { useState } from "react";

const SPORTS = { tennis: "🎾", padel: "🏓", squash: "🟡" };

const MOCK_LEAGUES = [
  { id: 1, name: "Clapham Common Tennis", sport: "tennis", location: "Clapham, London", totalPlayers: 24, maxPerBox: 8, boxes: 3, season: "Spring 2026", status: "active", creator: "James W.", description: "Friendly competitive tennis league. Games played at Clapham Common courts. 3 divisions with promotion/relegation." },
  { id: 2, name: "Stratford Padel Club", sport: "padel", location: "Stratford, London", totalPlayers: 16, maxPerBox: 8, boxes: 2, season: "Spring 2026", status: "active", creator: "Sofia R.", description: "Weekly padel box league. All levels welcome. 2 divisions." },
  { id: 3, name: "Bristol Squash League", sport: "squash", location: "Clifton, Bristol", totalPlayers: 21, maxPerBox: 7, boxes: 3, season: "Spring 2026", status: "active", creator: "Tom H.", description: "Competitive squash league at Clifton Squash Club." },
  { id: 4, name: "Hackney Padel Social", sport: "padel", location: "Hackney, London", totalPlayers: 4, maxPerBox: 8, boxes: 1, season: "Spring 2026", status: "open", creator: "Amir K.", description: "Casual padel league, great for beginners. Growing fast!" },
  { id: 5, name: "Edinburgh Tennis Box", sport: "tennis", location: "Morningside, Edinburgh", totalPlayers: 16, maxPerBox: 8, boxes: 2, season: "Spring 2026", status: "active", creator: "Claire M.", description: "Competitive box league for intermediate+ players." },
];

const MOCK_BOXES = {
  1: [
    {
      name: "Box A", label: "Division 1",
      standings: [
        { rank: 1, name: "You", played: 5, won: 4, lost: 1, setsWon: 9, setsLost: 3, points: 22, zone: null },
        { rank: 2, name: "James W.", played: 5, won: 4, lost: 1, setsWon: 8, setsLost: 4, points: 21, zone: null },
        { rank: 3, name: "Sofia R.", played: 4, won: 3, lost: 1, setsWon: 7, setsLost: 3, points: 17, zone: null },
        { rank: 4, name: "Amir K.", played: 5, won: 3, lost: 2, setsWon: 7, setsLost: 5, points: 18, zone: null },
        { rank: 5, name: "Tom H.", played: 4, won: 2, lost: 2, setsWon: 5, setsLost: 5, points: 13, zone: null },
        { rank: 6, name: "Claire M.", played: 4, won: 1, lost: 3, setsWon: 4, setsLost: 7, points: 10, zone: null },
        { rank: 7, name: "Dan P.", played: 3, won: 1, lost: 2, setsWon: 3, setsLost: 5, points: 8, zone: "relegation" },
        { rank: 8, name: "Lena G.", played: 4, won: 0, lost: 4, setsWon: 1, setsLost: 9, points: 5, zone: "relegation" },
      ],
      players: [
        { name: "You", phone: "+44 7700 900000", lastActive: "Today", avatar: "TD" },
        { name: "James W.", phone: "+44 7700 900123", lastActive: "Today", avatar: "JW" },
        { name: "Sofia R.", phone: "+44 7700 900456", lastActive: "Yesterday", avatar: "SR" },
        { name: "Amir K.", phone: "+44 7700 900789", lastActive: "2 days ago", avatar: "AK" },
        { name: "Tom H.", phone: "+44 7700 900321", lastActive: "Today", avatar: "TH" },
        { name: "Claire M.", phone: "+44 7700 900654", lastActive: "3 days ago", avatar: "CM" },
        { name: "Dan P.", phone: "+44 7700 900987", lastActive: "1 week ago", avatar: "DP" },
        { name: "Lena G.", phone: "+44 7700 900147", lastActive: "Yesterday", avatar: "LG" },
      ],
      results: [
        { id: 1, p1: "You", p2: "James W.", score: "6-4, 3-6, [10-7]", winner: "You", date: "Mar 18" },
        { id: 2, p1: "Sofia R.", p2: "Amir K.", score: "6-2, 6-3", winner: "Sofia R.", date: "Mar 17" },
        { id: 3, p1: "You", p2: "Tom H.", score: "6-1, 6-4", winner: "You", date: "Mar 15" },
        { id: 4, p1: "Claire M.", p2: "Lena G.", score: "6-3, 2-6, [10-8]", winner: "Claire M.", date: "Mar 14" },
      ],
    },
    {
      name: "Box B", label: "Division 2",
      standings: [
        { rank: 1, name: "Marcus T.", played: 5, won: 5, lost: 0, setsWon: 10, setsLost: 2, points: 25, zone: "promotion" },
        { rank: 2, name: "Nina K.", played: 5, won: 4, lost: 1, setsWon: 9, setsLost: 4, points: 22, zone: "promotion" },
        { rank: 3, name: "Oli B.", played: 4, won: 3, lost: 1, setsWon: 7, setsLost: 3, points: 17, zone: null },
        { rank: 4, name: "Priya S.", played: 5, won: 2, lost: 3, setsWon: 6, setsLost: 7, points: 15, zone: null },
        { rank: 5, name: "Ryan F.", played: 4, won: 2, lost: 2, setsWon: 5, setsLost: 5, points: 13, zone: null },
        { rank: 6, name: "Sarah L.", played: 4, won: 1, lost: 3, setsWon: 4, setsLost: 7, points: 10, zone: null },
        { rank: 7, name: "Vikram J.", played: 3, won: 1, lost: 2, setsWon: 3, setsLost: 5, points: 8, zone: "relegation" },
        { rank: 8, name: "Zara M.", played: 4, won: 0, lost: 4, setsWon: 2, setsLost: 9, points: 6, zone: "relegation" },
      ],
      players: [
        { name: "Marcus T.", phone: "+44 7700 901001", lastActive: "Today", avatar: "MT" },
        { name: "Nina K.", phone: "+44 7700 901002", lastActive: "Today", avatar: "NK" },
        { name: "Oli B.", phone: "+44 7700 901003", lastActive: "Yesterday", avatar: "OB" },
        { name: "Priya S.", phone: "+44 7700 901004", lastActive: "3 days ago", avatar: "PS" },
        { name: "Ryan F.", phone: "+44 7700 901005", lastActive: "Today", avatar: "RF" },
        { name: "Sarah L.", phone: "+44 7700 901006", lastActive: "2 days ago", avatar: "SL" },
        { name: "Vikram J.", phone: "+44 7700 901007", lastActive: "5 days ago", avatar: "VJ" },
        { name: "Zara M.", phone: "+44 7700 901008", lastActive: "Yesterday", avatar: "ZM" },
      ],
      results: [
        { id: 10, p1: "Marcus T.", p2: "Nina K.", score: "7-5, 6-4", winner: "Marcus T.", date: "Mar 19" },
        { id: 11, p1: "Oli B.", p2: "Priya S.", score: "6-3, 4-6, [10-6]", winner: "Oli B.", date: "Mar 18" },
        { id: 12, p1: "Ryan F.", p2: "Sarah L.", score: "6-4, 3-6, [10-8]", winner: "Ryan F.", date: "Mar 16" },
      ],
    },
    {
      name: "Box C", label: "Division 3",
      standings: [
        { rank: 1, name: "Alex D.", played: 5, won: 4, lost: 1, setsWon: 9, setsLost: 3, points: 22, zone: "promotion" },
        { rank: 2, name: "Beth C.", played: 5, won: 4, lost: 1, setsWon: 8, setsLost: 4, points: 21, zone: "promotion" },
        { rank: 3, name: "Charlie W.", played: 4, won: 3, lost: 1, setsWon: 6, setsLost: 3, points: 16, zone: null },
        { rank: 4, name: "Diana R.", played: 4, won: 2, lost: 2, setsWon: 5, setsLost: 5, points: 13, zone: null },
        { rank: 5, name: "Ed S.", played: 3, won: 2, lost: 1, setsWon: 4, setsLost: 3, points: 11, zone: null },
        { rank: 6, name: "Fiona T.", played: 4, won: 1, lost: 3, setsWon: 3, setsLost: 7, points: 9, zone: null },
        { rank: 7, name: "George H.", played: 3, won: 0, lost: 3, setsWon: 1, setsLost: 6, points: 4, zone: null },
        { rank: 8, name: "Holly P.", played: 4, won: 0, lost: 4, setsWon: 0, setsLost: 8, points: 4, zone: null },
      ],
      players: [
        { name: "Alex D.", phone: "+44 7700 902001", lastActive: "Today", avatar: "AD" },
        { name: "Beth C.", phone: "+44 7700 902002", lastActive: "Yesterday", avatar: "BC" },
        { name: "Charlie W.", phone: "+44 7700 902003", lastActive: "Today", avatar: "CW" },
        { name: "Diana R.", phone: "+44 7700 902004", lastActive: "2 days ago", avatar: "DR" },
        { name: "Ed S.", phone: "+44 7700 902005", lastActive: "Today", avatar: "ES" },
        { name: "Fiona T.", phone: "+44 7700 902006", lastActive: "4 days ago", avatar: "FT" },
        { name: "George H.", phone: "+44 7700 902007", lastActive: "1 week ago", avatar: "GH" },
        { name: "Holly P.", phone: "+44 7700 902008", lastActive: "3 days ago", avatar: "HP" },
      ],
      results: [
        { id: 20, p1: "Alex D.", p2: "Beth C.", score: "7-6, 4-6, [10-5]", winner: "Alex D.", date: "Mar 19" },
        { id: 21, p1: "Charlie W.", p2: "Diana R.", score: "6-2, 6-4", winner: "Charlie W.", date: "Mar 17" },
      ],
    },
  ],
};

const colors = {
  bg: "#0B0E11", card: "#141920", cardHover: "#1A2230", border: "#1E2736",
  accent: "#E8FF47", accentDim: "rgba(232,255,71,0.15)", accentText: "#0B0E11",
  text: "#E8ECF1", textMuted: "#7A8BA0", textDim: "#4A5568",
  success: "#34D399", warning: "#FBBF24", danger: "#F87171",
  promotion: "#34D399", relegation: "#F87171",
  sport: { tennis: "#4ADE80", padel: "#60A5FA", squash: "#FBBF24" },
};

const font = "'DM Sans', 'Segoe UI', system-ui, sans-serif";
const fontMono = "'JetBrains Mono', 'SF Mono', monospace";

export default function BoxLeagueApp() {
  const [screen, setScreen] = useState("browse");
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [selectedBoxIdx, setSelectedBoxIdx] = useState(0);
  const [leagueTab, setLeagueTab] = useState("standings");
  const [sportFilter, setSportFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showScoreEntry, setShowScoreEntry] = useState(false);
  const [showCreateLeague, setShowCreateLeague] = useState(false);
  const [showSubscribe, setShowSubscribe] = useState(false);
  const [showSeasonInfo, setShowSeasonInfo] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [notification, setNotification] = useState(null);

  const notify = (msg) => { setNotification(msg); setTimeout(() => setNotification(null), 2500); };

  const filteredLeagues = MOCK_LEAGUES.filter((l) => {
    const matchSport = sportFilter === "all" || l.sport === sportFilter;
    const matchSearch = !searchQuery || l.name.toLowerCase().includes(searchQuery.toLowerCase()) || l.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSport && matchSearch;
  });

  const openLeague = (league) => { setSelectedLeague(league); setSelectedBoxIdx(0); setLeagueTab("standings"); setScreen("league"); };

  const currentBoxes = selectedLeague ? (MOCK_BOXES[selectedLeague.id] || MOCK_BOXES[1]) : [];
  const currentBox = currentBoxes[selectedBoxIdx] || currentBoxes[0];

  const Nav = () => (
    <div style={{ display: "flex", background: colors.card, borderTop: `1px solid ${colors.border}`, position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 100, padding: "6px 0 env(safe-area-inset-bottom, 8px)" }}>
      {[{ id: "browse", icon: "◉", label: "Explore" }, { id: "my-leagues", icon: "⬡", label: "My Leagues" }, { id: "profile", icon: "◐", label: "Profile" }].map((t) => (
        <button key={t.id} onClick={() => { setScreen(t.id); setSelectedLeague(null); }} style={{ flex: 1, background: "none", border: "none", color: screen === t.id || (screen === "league" && t.id === "my-leagues") ? colors.accent : colors.textMuted, fontFamily: font, fontSize: 11, fontWeight: 600, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "6px 0" }}>
          <span style={{ fontSize: 20, lineHeight: 1 }}>{t.icon}</span>{t.label}
        </button>
      ))}
    </div>
  );

  const Header = ({ title, subtitle, back, action }) => (
    <div style={{ padding: "16px 20px 12px", display: "flex", alignItems: "center", gap: 12 }}>
      {back && <button onClick={back} style={{ background: "none", border: "none", color: colors.textMuted, fontSize: 22, cursor: "pointer", padding: 0, lineHeight: 1 }}>←</button>}
      <div style={{ flex: 1 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: colors.text, fontFamily: font, letterSpacing: "-0.02em" }}>{title}</h1>
        {subtitle && <p style={{ margin: "2px 0 0", fontSize: 13, color: colors.textMuted, fontFamily: font }}>{subtitle}</p>}
      </div>
      {action}
    </div>
  );

  const Badge = ({ children, color: c = colors.accent }) => (
    <span style={{ display: "inline-flex", alignItems: "center", fontSize: 11, fontWeight: 700, fontFamily: font, color: c, background: `${c}18`, padding: "3px 8px", borderRadius: 6, letterSpacing: "0.04em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{children}</span>
  );

  const Card = ({ children, onClick, style: s = {} }) => (
    <div onClick={onClick} style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: 14, padding: 16, cursor: onClick ? "pointer" : "default", transition: "all 0.15s", ...s }}
      onMouseEnter={(e) => onClick && (e.currentTarget.style.background = colors.cardHover)}
      onMouseLeave={(e) => onClick && (e.currentTarget.style.background = colors.card)}>{children}</div>
  );

  const Button = ({ children, variant = "primary", onClick, style: s = {}, disabled }) => {
    const styles = {
      primary: { background: colors.accent, color: colors.accentText, border: "none" },
      secondary: { background: "transparent", color: colors.accent, border: `1.5px solid ${colors.accent}40` },
      ghost: { background: "transparent", color: colors.textMuted, border: `1px solid ${colors.border}` },
      danger: { background: colors.danger + "20", color: colors.danger, border: `1px solid ${colors.danger}30` },
    };
    return <button disabled={disabled} onClick={onClick} style={{ padding: "10px 20px", borderRadius: 10, fontFamily: font, fontSize: 14, fontWeight: 700, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.5 : 1, transition: "all 0.15s", ...styles[variant], ...s }}>{children}</button>;
  };

  const Avatar = ({ initials, sport, size = 38 }) => (
    <div style={{ width: size, height: size, borderRadius: "50%", background: sport ? colors.sport[sport] + "25" : colors.accentDim, color: sport ? colors.sport[sport] : colors.accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fontMono, fontSize: size * 0.33, fontWeight: 700, flexShrink: 0 }}>{initials}</div>
  );

  const ZoneIndicator = ({ zone }) => {
    if (!zone) return null;
    return <div style={{ width: 4, height: "100%", minHeight: 36, borderRadius: 2, background: zone === "promotion" ? colors.promotion : colors.relegation, position: "absolute", left: 0, top: 0, bottom: 0 }} />;
  };

  const Modal = ({ title, onClose, children }) => (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }} />
      <div style={{ position: "relative", width: "100%", maxWidth: 480, maxHeight: "85vh", background: colors.bg, borderRadius: "20px 20px 0 0", border: `1px solid ${colors.border}`, borderBottom: "none", overflow: "auto" }}>
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${colors.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, background: colors.bg, zIndex: 1 }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, fontFamily: font, color: colors.text }}>{title}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: colors.textMuted, fontSize: 22, cursor: "pointer", padding: 0 }}>✕</button>
        </div>
        <div style={{ padding: 20 }}>{children}</div>
      </div>
    </div>
  );

  const BrowseScreen = () => (
    <div>
      <Header title="Explore Leagues" subtitle="Find box leagues near you"
        action={!subscribed ? <Button variant="secondary" onClick={() => setShowSubscribe(true)} style={{ fontSize: 12, padding: "7px 14px" }}>Subscribe</Button> : <Badge color={colors.success}>PRO</Badge>} />
      <div style={{ padding: "0 20px 12px" }}>
        <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by name or location..."
          style={{ width: "100%", boxSizing: "border-box", padding: "12px 16px", background: colors.card, border: `1px solid ${colors.border}`, borderRadius: 10, color: colors.text, fontFamily: font, fontSize: 14, outline: "none" }} />
      </div>
      <div style={{ padding: "0 20px 16px", display: "flex", gap: 8, flexWrap: "wrap" }}>
        {[{ id: "all", label: "All" }, { id: "tennis", label: "🎾 Tennis" }, { id: "padel", label: "🏓 Padel" }, { id: "squash", label: "🟡 Squash" }].map((s) => (
          <button key={s.id} onClick={() => setSportFilter(s.id)} style={{ padding: "7px 14px", borderRadius: 20, border: sportFilter === s.id ? `1.5px solid ${colors.accent}` : `1px solid ${colors.border}`, background: sportFilter === s.id ? colors.accentDim : "transparent", color: sportFilter === s.id ? colors.accent : colors.textMuted, fontFamily: font, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>{s.label}</button>
        ))}
      </div>
      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 10, paddingBottom: 90 }}>
        {filteredLeagues.map((l) => (
          <Card key={l.id} onClick={() => openLeague(l)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Avatar initials={SPORTS[l.sport]} sport={l.sport} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: colors.text, fontFamily: font }}>{l.name}</div>
                  <div style={{ fontSize: 12, color: colors.textMuted, fontFamily: font, marginTop: 2 }}>{l.location}</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                <Badge color={l.status === "open" ? colors.success : colors.sport[l.sport]}>{l.status === "open" ? "Open" : `${l.totalPlayers} players`}</Badge>
                <span style={{ fontSize: 11, color: colors.textDim, fontFamily: fontMono }}>{l.boxes} {l.boxes === 1 ? "division" : "divisions"}</span>
              </div>
            </div>
            <p style={{ margin: "8px 0 0", fontSize: 13, color: colors.textMuted, fontFamily: font, lineHeight: 1.45 }}>{l.description}</p>
          </Card>
        ))}
        {filteredLeagues.length === 0 && <div style={{ textAlign: "center", padding: 40, color: colors.textMuted, fontFamily: font }}><div style={{ fontSize: 32, marginBottom: 8 }}>🔍</div>No leagues found.</div>}
      </div>
    </div>
  );

  const MyLeaguesScreen = () => (
    <div>
      <Header title="My Leagues" subtitle="Your active box leagues" action={<Button variant="primary" onClick={() => setShowCreateLeague(true)} style={{ fontSize: 12, padding: "7px 14px" }}>+ Create</Button>} />
      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 10, paddingBottom: 90 }}>
        {MOCK_LEAGUES.slice(0, 2).map((l) => (
          <Card key={l.id} onClick={() => openLeague(l)}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <Avatar initials={SPORTS[l.sport]} sport={l.sport} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: colors.text, fontFamily: font }}>{l.name}</div>
                <div style={{ fontSize: 12, color: colors.textMuted, fontFamily: font, marginTop: 2 }}>{l.season} · {l.boxes} divisions</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: colors.accent, fontFamily: fontMono }}>1st</div>
                <div style={{ fontSize: 11, color: colors.textMuted }}>Box A</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              <div style={{ flex: 1, height: 4, borderRadius: 2, background: colors.border }}><div style={{ width: "62%", height: "100%", borderRadius: 2, background: `linear-gradient(90deg, ${colors.sport[l.sport]}, ${colors.accent})` }} /></div>
              <span style={{ fontSize: 11, color: colors.textMuted, fontFamily: fontMono }}>5/7 played</span>
            </div>
          </Card>
        ))}
        <Card style={{ border: `1.5px dashed ${colors.border}`, background: "transparent", textAlign: "center", padding: 30 }} onClick={() => setShowCreateLeague(true)}>
          <div style={{ fontSize: 28, marginBottom: 6 }}>+</div>
          <div style={{ color: colors.textMuted, fontFamily: font, fontSize: 14, fontWeight: 600 }}>Create a new league</div>
        </Card>
      </div>
    </div>
  );

  const StandingsTab = () => {
    if (!currentBox) return null;
    const hasPromo = currentBox.standings.some(s => s.zone === "promotion");
    const hasReleg = currentBox.standings.some(s => s.zone === "relegation");
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <span style={{ fontSize: 13, color: colors.textMuted, fontFamily: font }}>{currentBox.label} · Spring 2026</span>
          <Button variant="primary" onClick={() => setShowScoreEntry(true)} style={{ fontSize: 12, padding: "7px 14px" }}>+ Add Score</Button>
        </div>
        {(hasPromo || hasReleg) && (
          <div style={{ display: "flex", gap: 16, marginBottom: 12, fontSize: 11, fontFamily: font }}>
            {hasPromo && <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 10, height: 10, borderRadius: 2, background: colors.promotion }} /><span style={{ color: colors.promotion, fontWeight: 600 }}>Promotion</span></div>}
            {hasReleg && <div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 10, height: 10, borderRadius: 2, background: colors.relegation }} /><span style={{ color: colors.relegation, fontWeight: 600 }}>Relegation</span></div>}
          </div>
        )}
        <div style={{ display: "grid", gridTemplateColumns: "32px 1fr 36px 36px 36px 44px", gap: 4, padding: "8px 12px 8px 16px", fontSize: 11, fontWeight: 700, color: colors.textDim, fontFamily: fontMono, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          <span>#</span><span>Player</span><span>P</span><span>W</span><span>L</span><span style={{ textAlign: "right" }}>Pts</span>
        </div>
        {currentBox.standings.map((p, i) => (
          <div key={i} style={{ position: "relative", display: "grid", gridTemplateColumns: "32px 1fr 36px 36px 36px 44px", gap: 4, padding: "10px 12px 10px 16px", borderRadius: 10, background: p.name === "You" ? colors.accentDim : i % 2 === 0 ? "transparent" : colors.card + "60", alignItems: "center", fontSize: 13, fontFamily: font, color: colors.text, border: p.name === "You" ? `1px solid ${colors.accent}30` : "1px solid transparent", overflow: "hidden" }}>
            <ZoneIndicator zone={p.zone} />
            <span style={{ fontFamily: fontMono, fontWeight: 700, color: i < 3 ? colors.accent : colors.textMuted, fontSize: 14 }}>{p.rank}</span>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontWeight: p.name === "You" ? 800 : 500, color: p.name === "You" ? colors.accent : colors.text }}>{p.name}</span>
              {p.zone === "promotion" && <span style={{ fontSize: 10 }}>▲</span>}
              {p.zone === "relegation" && <span style={{ fontSize: 10, color: colors.relegation }}>▼</span>}
            </div>
            <span style={{ color: colors.textMuted, fontFamily: fontMono }}>{p.played}</span>
            <span style={{ color: colors.success, fontFamily: fontMono }}>{p.won}</span>
            <span style={{ color: colors.danger, fontFamily: fontMono }}>{p.lost}</span>
            <span style={{ textAlign: "right", fontWeight: 800, fontFamily: fontMono, fontSize: 15, color: p.name === "You" ? colors.accent : colors.text }}>{p.points}</span>
          </div>
        ))}
        <div style={{ marginTop: 16, padding: 14, background: colors.card, borderRadius: 10, border: `1px solid ${colors.border}` }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: colors.textMuted, fontFamily: font, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>The Format</div>
          <div style={{ fontSize: 13, color: colors.textMuted, fontFamily: font, lineHeight: 1.7 }}>
            <div style={{ color: colors.text, fontWeight: 600, marginBottom: 6 }}>2 full sets · Super tiebreak to 10 · Golden advantage</div>
            {[["Match win", "3 pts", colors.accent], ["Match loss", "1 pt", colors.text], ["No-show", "0 pts", colors.danger], ["Each set won", "+1 pt", colors.success]].map(([label, pts, c], i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: i < 3 ? `1px solid ${colors.border}` : "none" }}>
                <span>{label}</span><span style={{ fontFamily: fontMono, color: c, fontWeight: 700 }}>{pts}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const ResultsTab = () => {
    if (!currentBox) return null;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {currentBox.results.map((r) => (
          <Card key={r.id}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontWeight: r.winner === r.p1 ? 800 : 400, color: r.winner === r.p1 ? colors.accent : colors.text, fontSize: 14, fontFamily: font }}>{r.p1}</span>
                  <span style={{ color: colors.textDim, fontSize: 12 }}>vs</span>
                  <span style={{ fontWeight: r.winner === r.p2 ? 800 : 400, color: r.winner === r.p2 ? colors.accent : colors.text, fontSize: 14, fontFamily: font }}>{r.p2}</span>
                </div>
                <div style={{ fontSize: 12, color: colors.textMuted, fontFamily: font, marginTop: 4 }}>{r.date}</div>
              </div>
              <div style={{ fontFamily: fontMono, fontSize: 14, fontWeight: 700, color: colors.text }}>{r.score}</div>
            </div>
          </Card>
        ))}
      </div>
    );
  };

  const PlayersTab = () => {
    if (!currentBox) return null;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ fontSize: 13, color: colors.textMuted, fontFamily: font, marginBottom: 4 }}>Tap a player's number to message them on WhatsApp.</div>
        {currentBox.players.map((p, i) => (
          <Card key={i}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Avatar initials={p.avatar} size={42} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: colors.text, fontFamily: font }}>{p.name}</div>
                <div style={{ fontSize: 12, color: colors.textMuted, fontFamily: font, marginTop: 2 }}>Active {p.lastActive}</div>
              </div>
              <a href={`https://wa.me/${p.phone.replace(/\s/g, "")}`} target="_blank" rel="noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 12px", borderRadius: 8, background: "#25D36620", color: "#25D366", fontFamily: fontMono, fontSize: 12, fontWeight: 600, textDecoration: "none", border: "1px solid #25D36630", whiteSpace: "nowrap" }}
                onClick={(e) => e.stopPropagation()}>
                <span style={{ fontSize: 14 }}>💬</span>{p.phone}
              </a>
            </div>
          </Card>
        ))}
      </div>
    );
  };

  const LeagueScreen = () => {
    if (!selectedLeague) return null;
    const l = selectedLeague;
    return (
      <div>
        <Header title={l.name} subtitle={`${SPORTS[l.sport]} ${l.sport.charAt(0).toUpperCase() + l.sport.slice(1)} · ${l.location}`}
          back={() => setScreen("my-leagues")}
          action={<button onClick={() => setShowSeasonInfo(true)} style={{ background: "none", border: `1px solid ${colors.border}`, borderRadius: 8, padding: "6px 10px", color: colors.textMuted, fontSize: 12, fontFamily: font, fontWeight: 600, cursor: "pointer" }}>ℹ️ Rules</button>} />
        {currentBoxes.length > 1 && (
          <div style={{ padding: "0 20px 12px" }}>
            <div style={{ display: "flex", background: colors.card, borderRadius: 12, border: `1px solid ${colors.border}`, overflow: "hidden" }}>
              {currentBoxes.map((box, idx) => (
                <button key={idx} onClick={() => setSelectedBoxIdx(idx)} style={{ flex: 1, padding: "10px 8px", background: selectedBoxIdx === idx ? colors.accentDim : "transparent", border: "none", borderRight: idx < currentBoxes.length - 1 ? `1px solid ${colors.border}` : "none", color: selectedBoxIdx === idx ? colors.accent : colors.textMuted, fontFamily: font, fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                  <span>{box.name}</span>
                  <span style={{ fontSize: 10, fontWeight: 500, opacity: 0.7 }}>{box.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
        {currentBox && currentBox.standings.some(s => s.name === "You") && (
          <div style={{ margin: "0 20px 12px", padding: "10px 14px", background: colors.accentDim, borderRadius: 10, border: `1px solid ${colors.accent}30`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontFamily: font, fontSize: 13, fontWeight: 600, color: colors.accent }}>Your position in {currentBox.name}</div>
            <div style={{ fontFamily: fontMono, fontSize: 18, fontWeight: 800, color: colors.accent }}>#{currentBox.standings.find(s => s.name === "You")?.rank}</div>
          </div>
        )}
        <div style={{ display: "flex", padding: "0 20px", borderBottom: `1px solid ${colors.border}`, marginBottom: 16 }}>
          {[{ id: "standings", label: "Table" }, { id: "results", label: "Results" }, { id: "players", label: "Players" }].map((t) => (
            <button key={t.id} onClick={() => setLeagueTab(t.id)} style={{ flex: 1, padding: "10px 0", background: "none", border: "none", borderBottom: leagueTab === t.id ? `2px solid ${colors.accent}` : "2px solid transparent", color: leagueTab === t.id ? colors.accent : colors.textMuted, fontFamily: font, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>{t.label}</button>
          ))}
        </div>
        <div style={{ padding: "0 20px", paddingBottom: 90 }}>
          {leagueTab === "standings" && <StandingsTab />}
          {leagueTab === "results" && <ResultsTab />}
          {leagueTab === "players" && <PlayersTab />}
        </div>
      </div>
    );
  };

  const ProfileScreen = () => (
    <div>
      <Header title="Profile" />
      <div style={{ padding: "0 20px", paddingBottom: 90 }}>
        <Card style={{ marginBottom: 16, textAlign: "center", padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "center" }}><Avatar initials="TD" size={64} /></div>
          <div style={{ marginTop: 12, fontWeight: 800, fontSize: 20, color: colors.text, fontFamily: font }}>Teddy</div>
          <div style={{ fontSize: 13, color: colors.textMuted, fontFamily: font, marginTop: 4 }}>Member since March 2026</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 16 }}>
            {[{ val: "2", label: "Leagues" }, { val: "8", label: "Wins", color: colors.success }, { val: "14", label: "Played" }].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 800, fontFamily: fontMono, color: s.color || colors.accent }}>{s.val}</div>
                <div style={{ fontSize: 11, color: colors.textMuted, fontFamily: font }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: colors.text, fontFamily: font }}>Subscription</div>
              <div style={{ fontSize: 13, color: colors.textMuted, fontFamily: font, marginTop: 2 }}>{subscribed ? "Pro Member · $2/month" : "Free tier"}</div>
            </div>
            {subscribed ? <Badge color={colors.success}>Active</Badge> : <Button variant="primary" onClick={() => setShowSubscribe(true)} style={{ fontSize: 12, padding: "7px 14px" }}>Upgrade</Button>}
          </div>
        </Card>
        {["Edit Profile", "Notification Preferences", "Help & Support"].map((item, i) => (
          <div key={i} onClick={() => notify(`${item} — coming soon`)} style={{ padding: "14px 0", borderBottom: `1px solid ${colors.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
            <span style={{ fontFamily: font, fontSize: 14, color: colors.text }}>{item}</span>
            <span style={{ color: colors.textDim }}>→</span>
          </div>
        ))}
        <div style={{ marginTop: 24, textAlign: "center" }}><Button variant="danger" onClick={() => notify("Logged out")}>Log Out</Button></div>
      </div>
    </div>
  );

  const ScoreEntryModal = () => {
    const [opponent, setOpponent] = useState("");
    const [set1, setSet1] = useState({ you: "", them: "" });
    const [set2, setSet2] = useState({ you: "", them: "" });
    const [tb, setTb] = useState({ you: "", them: "" });
    const opponents = currentBox ? currentBox.players.filter(p => p.name !== "You") : [];
    const s1Done = set1.you !== "" && set1.them !== "";
    const s2Done = set2.you !== "" && set2.them !== "";
    const set1Winner = s1Done ? (parseInt(set1.you) > parseInt(set1.them) ? "you" : "them") : null;
    const set2Winner = s2Done ? (parseInt(set2.you) > parseInt(set2.them) ? "you" : "them") : null;
    const needsTiebreak = s1Done && s2Done && set1Winner !== set2Winner;
    const straightSets = s1Done && s2Done && set1Winner === set2Winner;
    const formatScore = () => { let s = `${set1.you}-${set1.them}, ${set2.you}-${set2.them}`; if (needsTiebreak && tb.you && tb.them) s += `, [${tb.you}-${tb.them}]`; return s; };

    return (
      <Modal title="Submit Score" onClose={() => setShowScoreEntry(false)}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: colors.textMuted, fontFamily: font, display: "block", marginBottom: 6, textTransform: "uppercase" }}>Opponent</label>
          <select value={opponent} onChange={(e) => setOpponent(e.target.value)} style={{ width: "100%", padding: "10px 14px", background: colors.card, border: `1px solid ${colors.border}`, borderRadius: 10, color: colors.text, fontFamily: font, fontSize: 14 }}>
            <option value="">Select opponent</option>
            {opponents.map((p, i) => <option key={i} value={p.name}>{p.name}</option>)}
          </select>
        </div>
        {[["Set 1", set1, setSet1], ["Set 2", set2, setSet2]].map(([label, val, setter]) => (
          <div key={label} style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: colors.textMuted, fontFamily: font, display: "block", marginBottom: 8, textTransform: "uppercase" }}>{label}</label>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input value={val.you} onChange={(e) => setter({ ...val, you: e.target.value })} placeholder="0" maxLength={1} style={{ flex: 1, padding: "12px", background: colors.card, border: `1px solid ${colors.border}`, borderRadius: 10, color: colors.text, fontFamily: fontMono, fontSize: 22, textAlign: "center", fontWeight: 700 }} />
              <span style={{ color: colors.textDim, fontWeight: 700, fontSize: 18 }}>–</span>
              <input value={val.them} onChange={(e) => setter({ ...val, them: e.target.value })} placeholder="0" maxLength={1} style={{ flex: 1, padding: "12px", background: colors.card, border: `1px solid ${colors.border}`, borderRadius: 10, color: colors.text, fontFamily: fontMono, fontSize: 22, textAlign: "center", fontWeight: 700 }} />
            </div>
          </div>
        ))}
        {needsTiebreak && (
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: colors.warning, fontFamily: font, display: "block", marginBottom: 8, textTransform: "uppercase" }}>⚡ Super Tiebreak (to 10)</label>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input value={tb.you} onChange={(e) => setTb({ ...tb, you: e.target.value })} placeholder="0" maxLength={2} style={{ flex: 1, padding: "12px", background: colors.warning + "10", border: `1px solid ${colors.warning}30`, borderRadius: 10, color: colors.warning, fontFamily: fontMono, fontSize: 22, textAlign: "center", fontWeight: 700 }} />
              <span style={{ color: colors.textDim, fontWeight: 700, fontSize: 18 }}>–</span>
              <input value={tb.them} onChange={(e) => setTb({ ...tb, them: e.target.value })} placeholder="0" maxLength={2} style={{ flex: 1, padding: "12px", background: colors.warning + "10", border: `1px solid ${colors.warning}30`, borderRadius: 10, color: colors.warning, fontFamily: fontMono, fontSize: 22, textAlign: "center", fontWeight: 700 }} />
            </div>
          </div>
        )}
        {straightSets && <div style={{ padding: "10px 12px", background: colors.success + "10", borderRadius: 10, border: `1px solid ${colors.success}20`, marginBottom: 14, fontSize: 13, color: colors.success, fontFamily: font, fontWeight: 600 }}>✓ Straight sets — no tiebreak needed</div>}
        {s1Done && s2Done && <div style={{ padding: "10px 12px", background: colors.card, borderRadius: 10, border: `1px solid ${colors.border}`, marginBottom: 14, display: "flex", justifyContent: "space-between" }}><span style={{ fontSize: 12, color: colors.textMuted, fontFamily: font }}>Score</span><span style={{ fontFamily: fontMono, fontSize: 15, fontWeight: 700, color: colors.text }}>{formatScore()}</span></div>}
        <div style={{ display: "flex", gap: 10 }}>
          <Button variant="ghost" onClick={() => setShowScoreEntry(false)} style={{ flex: 1 }}>Cancel</Button>
          <Button variant="primary" disabled={!opponent || !s2Done || (needsTiebreak && (!tb.you || !tb.them))} onClick={() => { setShowScoreEntry(false); notify("Score submitted!"); }} style={{ flex: 2 }}>Submit</Button>
        </div>
      </Modal>
    );
  };

  const CreateLeagueModal = () => {
    const [form, setForm] = useState({ name: "", sport: "tennis", location: "", numBoxes: "2", playersPerBox: "8", description: "" });
    const update = (k, v) => setForm({ ...form, [k]: v });
    return (
      <Modal title="Create League" onClose={() => setShowCreateLeague(false)}>
        {[{ key: "name", label: "League Name", placeholder: "e.g. Clapham Tennis Box League" }, { key: "location", label: "Location", placeholder: "e.g. Clapham, London" }, { key: "description", label: "Description", placeholder: "Tell players what to expect...", multiline: true }].map((f) => (
          <div key={f.key} style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: colors.textMuted, fontFamily: font, display: "block", marginBottom: 6, textTransform: "uppercase" }}>{f.label}</label>
            {f.multiline ? <textarea value={form[f.key]} onChange={(e) => update(f.key, e.target.value)} placeholder={f.placeholder} rows={3} style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px", background: colors.card, border: `1px solid ${colors.border}`, borderRadius: 10, color: colors.text, fontFamily: font, fontSize: 14, resize: "vertical" }} /> : <input value={form[f.key]} onChange={(e) => update(f.key, e.target.value)} placeholder={f.placeholder} style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px", background: colors.card, border: `1px solid ${colors.border}`, borderRadius: 10, color: colors.text, fontFamily: font, fontSize: 14 }} />}
          </div>
        ))}
        <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
          {[{ key: "sport", label: "Sport", opts: [["tennis", "🎾 Tennis"], ["padel", "🏓 Padel"], ["squash", "🟡 Squash"]] }, { key: "numBoxes", label: "Divisions", opts: [1,2,3,4,5].map(n => [n, `${n} ${n===1?"division":"divisions"}`]) }].map(({ key, label, opts }) => (
            <div key={key} style={{ flex: 1 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: colors.textMuted, fontFamily: font, display: "block", marginBottom: 6, textTransform: "uppercase" }}>{label}</label>
              <select value={form[key]} onChange={(e) => update(key, e.target.value)} style={{ width: "100%", padding: "10px 14px", background: colors.card, border: `1px solid ${colors.border}`, borderRadius: 10, color: colors.text, fontFamily: font, fontSize: 14 }}>
                {opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
          ))}
        </div>
        <div style={{ padding: "10px 12px", background: colors.accentDim, borderRadius: 10, border: `1px solid ${colors.accent}20`, marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: colors.accent, fontFamily: font, marginBottom: 4 }}>Standard Format</div>
          <div style={{ fontSize: 11, color: colors.textMuted, fontFamily: font }}>2 sets · Super tiebreak · Golden advantage · Top 2 promoted · Bottom 2 relegated</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Button variant="ghost" onClick={() => setShowCreateLeague(false)} style={{ flex: 1 }}>Cancel</Button>
          <Button variant="primary" onClick={() => { setShowCreateLeague(false); notify("League created!"); }} style={{ flex: 2 }}>Create League</Button>
        </div>
      </Modal>
    );
  };

  const SeasonInfoModal = () => (
    <Modal title="The BoxLeague Format" onClose={() => setShowSeasonInfo(false)}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ padding: "14px 16px", background: colors.accentDim, borderRadius: 12, border: `1px solid ${colors.accent}30` }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: colors.accent, fontFamily: font, marginBottom: 6 }}>Every match. Same rules. No debate.</div>
          <div style={{ fontSize: 13, color: colors.text, fontFamily: font, lineHeight: 1.6 }}>2 full sets · Super tiebreak if split · Golden advantage at deuce</div>
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: colors.text, fontFamily: font, marginBottom: 8 }}>Points</div>
          {[["Match win", "3 pts", colors.accent], ["Match loss", "1 pt", colors.text], ["No-show", "0 pts", colors.danger], ["Each set won", "+1 pt", colors.success]].map(([label, pts, c], i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 3 ? `1px solid ${colors.border}` : "none", fontSize: 13, fontFamily: font, color: colors.textMuted }}>
              <span>{label}</span><span style={{ fontFamily: fontMono, color: c, fontWeight: 700 }}>{pts}</span>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );

  const SubscribeModal = () => (
    <Modal title="Go Pro" onClose={() => setShowSubscribe(false)}>
      <div style={{ textAlign: "center", padding: "10px 0 20px" }}>
        <div style={{ fontSize: 48, fontWeight: 900, fontFamily: fontMono, color: colors.accent }}>$2</div>
        <div style={{ fontSize: 14, color: colors.textMuted, fontFamily: font }}>per month</div>
      </div>
      {[{ icon: "✦", text: "Join unlimited leagues" }, { icon: "📊", text: "Full stats & history" }, { icon: "👥", text: "Player contact details" }, { icon: "🏆", text: "Create multi-division leagues" }, { icon: "🔔", text: "Match reminders" }].map((f, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: colors.card, borderRadius: 10, border: `1px solid ${colors.border}`, marginBottom: 8 }}>
          <span style={{ fontSize: 18 }}>{f.icon}</span><span style={{ fontFamily: font, fontSize: 14, color: colors.text }}>{f.text}</span>
        </div>
      ))}
      <Button variant="primary" onClick={() => { setSubscribed(true); setShowSubscribe(false); notify("Welcome to Pro! 🎉"); }} style={{ width: "100%", padding: "14px", fontSize: 16, marginTop: 16 }}>Subscribe — $2/month</Button>
    </Modal>
  );

  return (
    <div style={{ background: colors.bg, minHeight: "100vh", maxWidth: 480, margin: "0 auto", fontFamily: font, position: "relative" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      {notification && (
        <div style={{ position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", zIndex: 300, background: colors.accent, color: colors.accentText, padding: "10px 24px", borderRadius: 12, fontFamily: font, fontSize: 14, fontWeight: 700 }}>{notification}</div>
      )}
      {screen === "browse" && <BrowseScreen />}
      {screen === "my-leagues" && <MyLeaguesScreen />}
      {screen === "league" && <LeagueScreen />}
      {screen === "profile" && <ProfileScreen />}
      {showScoreEntry && <ScoreEntryModal />}
      {showCreateLeague && <CreateLeagueModal />}
      {showSubscribe && <SubscribeModal />}
      {showSeasonInfo && <SeasonInfoModal />}
      <Nav />
      <style>{`* { -webkit-tap-highlight-color: transparent; } input::placeholder, textarea::placeholder { color: ${colors.textDim}; } ::-webkit-scrollbar { width: 0; }`}</style>
    </div>
  );
}
