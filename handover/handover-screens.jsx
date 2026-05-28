// Handover mobile app screens — React components rendered inside IOSDevice.
// Each screen returns the inside of the device (the .hm-app shell).

const { Fragment } = React;

// ============================================================
// Reusable icons (lucide-style inline svg, 1.5 stroke)
// ============================================================
const Ico = ({ name, size = 18, color = 'currentColor' }) => {
  const s = { width: size, height: size, color, strokeWidth: 1.6 };
  const paths = {
    'search':     <><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></>,
    'bell':       <><path d="M6 8a6 6 0 0112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21a2 2 0 004 0"/></>,
    'sliders':    <><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3"/><path d="M1 14h6M9 8h6M17 16h6"/></>,
    'heart':      <><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></>,
    'bookmark':   <><path d="m19 21-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"/></>,
    'home':       <><path d="m3 9 9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/></>,
    'compass':    <><circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"/></>,
    'message':    <><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></>,
    'user':       <><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a7 7 0 0114 0v1"/></>,
    'plus':       <><path d="M12 5v14M5 12h14"/></>,
    'mappin':     <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z"/><circle cx="12" cy="10" r="3"/></>,
    'bed':        <><path d="M2 4v16M22 16v4M2 16h20M2 12v0a4 4 0 014-4h6v8"/></>,
    'bath':       <><path d="M9 6V4a2 2 0 012-2h2a2 2 0 012 2v2M2 12h20v3a4 4 0 01-4 4H6a4 4 0 01-4-4z"/></>,
    'sqft':       <><rect x="3" y="3" width="18" height="18" rx="2"/></>,
    'arrowright': <><path d="M5 12h14M13 5l7 7-7 7"/></>,
    'arrowleft':  <><path d="M19 12H5M12 5l-7 7 7 7"/></>,
    'chevdown':   <><path d="m6 9 6 6 6-6"/></>,
    'check':      <><path d="M20 6 9 17l-5-5"/></>,
    'x':          <><path d="M18 6 6 18M6 6l12 12"/></>,
    'share':      <><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98"/></>,
    'shield':     <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    'lock':       <><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></>,
    'unlock':     <><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 019.9-1"/></>,
    'key':        <><circle cx="8" cy="15" r="4"/><path d="m10.85 12.15 9.65-9.65M16.5 9.5l1.5-1.5"/></>,
    'phone':      <><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.72 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0122 16.92z"/></>,
    'msg2':       <><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></>,
    'zap':        <><path d="m13 2-9 12h8l-2 8 9-12h-8l2-8z"/></>,
    'droplet':    <><path d="M12 2.5s5.5 5.5 5.5 10.5a5.5 5.5 0 11-11 0c0-5 5.5-10.5 5.5-10.5z"/></>,
    'wifi':       <><path d="M5 12.55a11 11 0 0114 0M2 8.82a15 15 0 0120 0M8.5 16.43a6 6 0 017 0M12 20h.01"/></>,
    'car':        <><path d="M9 17h6M3 17v-5l2-5h14l2 5v5h-2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></>,
    'sun':        <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></>,
    'snow':       <><path d="M2 12h20M12 2v20M4.93 4.93l14.14 14.14M19.07 4.93 4.93 19.07"/></>,
    'camera':     <><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></>,
    'image':      <><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/></>,
    'calendar':   <><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></>,
    'edit':       <><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
    'eye':        <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></>,
    'sparkle':    <><path d="M12 3l1.9 5.8L20 11l-6.1 1.9L12 19l-1.9-6.1L4 11l6.1-2.2L12 3z"/></>,
    'check-circ': <><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></>,
    'naira':      <><path d="M6 4v16M18 4v16M6 6h12M6 12h12"/></>,
    'fileText':   <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></>,
    'flame':      <><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"/></>,
    'building':   <><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></>,
    'route':      <><circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/><path d="M6.7 17.3l11-12.6"/></>,
    'badge':      <><path d="M3.85 8.62a4 4 0 014.78-4.77 4 4 0 016.74 0 4 4 0 014.78 4.78 4 4 0 010 6.74 4 4 0 01-4.77 4.78 4 4 0 01-6.75 0 4 4 0 01-4.78-4.77 4 4 0 010-6.76z"/><path d="m9 12 2 2 4-4"/></>,
    'play':       <><polygon points="5 3 19 12 5 21 5 3"/></>,
    'ellipsis':   <><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></>,
    'mic':        <><rect x="9" y="2" width="6" height="13" rx="3"/><path d="M19 10a7 7 0 01-14 0M12 19v3"/></>,
    'star':       <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>,
    'help':       <><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01"/></>,
    'info':       <><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></>,
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={s}>
      {paths[name] || null}
    </svg>
  );
};

// ============================================================
// Reusable shell pieces
// ============================================================
const TopBar = ({ title, action }) => (
  <div className="hm-topbar">
    <div className="hm-brand">
      <span className="hm-brand-dot"></span>
      <span className="hm-brand-name">Handover</span>
    </div>
    <div style={{ display: 'flex', gap: 8 }}>
      <button className="hm-iconbtn hm-dot"><Ico name="bell" size={18}/></button>
      <button className="hm-iconbtn"><Ico name="user" size={18}/></button>
    </div>
  </div>
);

const TabBar = ({ active = 'browse' }) => (
  <div className="hm-tabbar">
    <button className={`hm-tab ${active === 'browse' ? 'hm-on' : ''}`}>
      <span className="hm-tab-ico"><Ico name="compass" size={20}/></span>
      Browse
    </button>
    <button className={`hm-tab ${active === 'saved' ? 'hm-on' : ''}`}>
      <span className="hm-tab-ico"><Ico name="bookmark" size={20}/></span>
      Saved
    </button>
    <button className={`hm-tab ${active === 'list' ? 'hm-on' : ''}`} style={{ position: 'relative' }}>
      <span className="hm-tab-ico"><Ico name="plus" size={20}/></span>
      List
    </button>
    <button className={`hm-tab ${active === 'inbox' ? 'hm-on' : ''}`}>
      <span className="hm-tab-ico"><Ico name="message" size={20}/></span>
      Inbox
    </button>
    <button className={`hm-tab ${active === 'me' ? 'hm-on' : ''}`}>
      <span className="hm-tab-ico"><Ico name="user" size={20}/></span>
      Me
    </button>
  </div>
);

// Status pip badge
const StatusPip = ({ label, kind = 'available' }) => {
  const styles = {
    available: { bg: '#EFE7D6', fg: '#6B5A2E', bd: '#D9C893' },
    pending:   { bg: '#F4E1C6', fg: '#8A5A18', bd: '#E1BE85' },
    handed:    { bg: '#F2D9C9', fg: '#8A3C20', bd: '#E5BFA8' },
  }[kind];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 10px', borderRadius: 9999,
      fontSize: 11.5, fontWeight: 500,
      background: styles.bg, color: styles.fg, border: `1px solid ${styles.bd}`,
    }}>
      <span style={{ width: 5, height: 5, background: styles.fg, borderRadius: 9999 }}></span>
      {label}
    </span>
  );
};

// ============================================================
// 1. ONBOARDING
// ============================================================
function ScreenOnboarding() {
  return (
    <div className="hm-app">
      <div className="hm-onb">
        <div className="hm-onb-art">
          <div className="stamp">
            <div className="t1">Handover complete</div>
            <div className="t2">Kemi → Femi</div>
            <div className="div"></div>
            <div className="t3"><span>14 MAY 2026</span><span>SURULERE</span></div>
            <div className="t4"><Ico name="key" size={14} color="#B85431"/> Keys + landlord contact passed</div>
          </div>
          <div className="key"><Ico name="key" size={28}/></div>
        </div>

        <div style={{ paddingBottom: 16 }}>
          <h1>Pass on your apartment, <em>person to person.</em></h1>
          <p>The outgoing tenant lists. You pay a small retainment to lock interest. You go to the landlord directly. No agents, no inflated fees.</p>

          <div className="btn-row">
            <button className="btn-primary">
              Find an apartment <Ico name="arrowright" size={18}/>
            </button>
            <button className="btn-outline">
              I'm moving out — list mine
            </button>
          </div>
          <div style={{
            textAlign: 'center', fontSize: 12, color: '#877763',
            marginTop: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            <Ico name="shield" size={14} color="#B85431"/> Retainment is held until the keys are yours.
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 2. BROWSE (Home)
// ============================================================
function ScreenBrowse() {
  const listings = [
    { city: 'Lekki Phase 1', tone: '', title: '3-bed flat in a quiet close, fully serviced', beds: '3 beds · 3 baths · BQ', price: '4,500,000', retain: '35,000', status: 'Available Aug 1', kind: 'available' },
    { city: 'Wuse 2, Abuja', tone: 'alt', title: 'Modern 2-bed, walk to Ceddi Plaza', beds: '2 beds · 2 baths · Inverter', price: '3,200,000', retain: '30,000', status: 'Available Jul 30', kind: 'available' },
    { city: 'Yaba, Lagos', tone: 'dim', title: 'Self-con near Unilab gate, student-friendly', beds: '1 room · 1 bath · Prepaid', price: '950,000', retain: '15,000', status: '1 person interested', kind: 'pending' },
  ];
  return (
    <div className="hm-app">
      <TopBar/>
      <div className="hm-scroll">
        <div className="hm-page-title">Apartments <span className="hm-em">handed over</span></div>
        <div className="hm-page-sub">268 places · listed directly by the people leaving them.</div>

        <div className="hm-search">
          <Ico name="search" size={16} color="#877763"/>
          <input placeholder="Lekki, Wuse 2, Yaba…" />
          <Ico name="sliders" size={16} color="#B85431"/>
        </div>

        <div className="hm-pills">
          <button className="hm-pill hm-on">All cities</button>
          <button className="hm-pill">Lagos <span className="hm-pill-ct">142</span></button>
          <button className="hm-pill">Abuja <span className="hm-pill-ct">68</span></button>
          <button className="hm-pill">Port Harcourt</button>
          <button className="hm-pill">Ibadan</button>
        </div>

        <div className="hm-list">
          {listings.map((l, i) => (
            <div key={i} className="hm-card">
              <div className={`hm-card-photo ${l.tone}`}>
                <span className="hm-status"><span className="pip"></span>{l.status}</span>
                <button className="hm-fav"><Ico name="bookmark" size={15}/></button>
                <span className="hm-photo-label">{l.city.split(',')[0]}</span>
              </div>
              <div className="hm-card-body">
                <span className="hm-card-loc"><Ico name="mappin" size={12} color="#877763"/>{l.city}</span>
                <div className="hm-card-title">{l.title}</div>
                <div className="hm-card-meta">{l.beds.split(' · ').map((b, j) => (
                  <Fragment key={j}>
                    {j > 0 && <span className="d"></span>}<span>{b}</span>
                  </Fragment>
                ))}</div>
                <div className="hm-card-foot">
                  <div>
                    <div className="hm-card-price">₦{l.price}<span className="per">/yr</span></div>
                  </div>
                  <div className="hm-card-retain">Retainment<b>₦{l.retain}</b></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <TabBar active="browse"/>
    </div>
  );
}

// ============================================================
// 3. FILTER SHEET (overlay on browse)
// ============================================================
function ScreenFilters() {
  return (
    <div className="hm-app" style={{ position: 'relative' }}>
      <TopBar/>
      <div className="hm-scroll">
        {/* dimmed background list */}
        <div style={{ filter: 'blur(2px) brightness(.94)', opacity: .6, pointerEvents: 'none' }}>
          <div className="hm-page-title">Apartments <span className="hm-em">handed over</span></div>
          <div className="hm-page-sub">268 places · listed directly by the people leaving them.</div>
          <div className="hm-search"><Ico name="search" size={16} color="#877763"/><span style={{ flex: 1 }}>Lekki, Wuse 2…</span></div>
          <div className="hm-list">
            <div className="hm-card"><div className="hm-card-photo"></div></div>
          </div>
        </div>
      </div>

      <div className="hm-sheet-shade">
        <div className="hm-sheet" style={{ paddingBottom: 28, maxHeight: '88%' }}>
          <div className="hm-sheet-grip"></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <div className="hm-sheet-h">Filters</div>
            <button style={{ background: 'transparent', border: 0, color: '#B85431', fontWeight: 500, fontSize: 13 }}>Clear all</button>
          </div>

          <div className="hm-filter-section">
            <h4>Property type</h4>
            <div className="hm-toggle-grid">
              <div className="hm-toggle">Self-con</div>
              <div className="hm-toggle hm-on"><Ico name="check" size={14}/>Mini-flat</div>
              <div className="hm-toggle hm-on"><Ico name="check" size={14}/>2-bedroom</div>
              <div className="hm-toggle">3-bedroom</div>
              <div className="hm-toggle">Duplex</div>
              <div className="hm-toggle">Penthouse</div>
            </div>
          </div>

          <div className="hm-filter-section">
            <h4>Annual rent</h4>
            <div className="hm-range-track">
              <div className="fill"></div>
              <div className="knob" style={{ left: '18%' }}></div>
              <div className="knob" style={{ left: '72%' }}></div>
            </div>
            <div className="hm-range-labels">
              <span><b>₦900K</b></span>
              <span><b>₦3.6M</b></span>
            </div>
          </div>

          <div className="hm-filter-section">
            <h4>Must have</h4>
            <div className="hm-toggle-grid">
              <div className="hm-toggle hm-on"><Ico name="check" size={14}/>Borehole</div>
              <div className="hm-toggle hm-on"><Ico name="check" size={14}/>Inverter / gen</div>
              <div className="hm-toggle">Furnished</div>
              <div className="hm-toggle"><Ico name="car" size={14}/>Parking</div>
              <div className="hm-toggle">Prepaid meter</div>
              <div className="hm-toggle">BQ</div>
            </div>
          </div>

          <div className="hm-filter-section">
            <h4>Move-in window</h4>
            <div style={{ display: 'flex', gap: 8 }}>
              <div className="hm-toggle" style={{ flex: 1, justifyContent: 'center' }}>This month</div>
              <div className="hm-toggle hm-on" style={{ flex: 1, justifyContent: 'center' }}>Next 60 days</div>
              <div className="hm-toggle" style={{ flex: 1, justifyContent: 'center' }}>3+ months</div>
            </div>
          </div>

          <button style={{
            width: '100%', height: 54, marginTop: 8,
            background: '#221C16', color: '#F6F1E7',
            border: 0, borderRadius: 16,
            fontWeight: 600, fontSize: 15,
          }}>Show 78 apartments</button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 4. LISTING DETAIL
// ============================================================
function ScreenListing() {
  return (
    <div className="hm-app" style={{ position: 'relative' }}>
      <div className="hm-scroll" style={{ paddingTop: 0, paddingBottom: 110 }}>
        <div className="hm-hero">
          <div className="hm-hero-glass" style={{ paddingTop: 0 }}>
            <button className="hm-pill-glass"><Ico name="arrowleft" size={18}/></button>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="hm-pill-glass"><Ico name="share" size={16}/></button>
              <button className="hm-pill-glass"><Ico name="bookmark" size={16}/></button>
            </div>
          </div>
          <div className="hm-hero-photo-pager">1 / 18</div>
        </div>

        <div className="hm-detail-body">
          <div className="hm-detail-tagline">
            <StatusPip label="Available from Aug 1" kind="available"/>
            <span className="hm-tag-mini brand"><Ico name="badge" size={11}/>Verified</span>
          </div>
          <div className="hm-detail-title">3-bedroom flat in a <span className="hm-em">quiet close</span></div>
          <div className="hm-detail-loc">
            <Ico name="mappin" size={14} color="#B85431"/>
            Beachland Estate, Lekki Phase 1, Lagos
          </div>

          <div className="hm-stat-row">
            <div>
              <div className="k">Annual rent</div>
              <div className="v">₦4,500,000</div>
            </div>
            <div>
              <div className="k">Retainment</div>
              <div className="v" style={{ color: '#B85431' }}>₦35,000</div>
            </div>
            <div>
              <div className="k">Beds · Baths</div>
              <div className="v">3 · 3</div>
            </div>
            <div>
              <div className="k">Available</div>
              <div className="v">Aug 1<small style={{ marginLeft: 4 }}>'26</small></div>
            </div>
          </div>

          <div className="hm-section-h">Why I'm <span className="hm-em">handing it over</span></div>
          <div className="hm-quote">
            <p>Relocating with my husband to Manchester for his postdoc. The place has been very good to us — I'd love to leave it to someone who'll actually use the kitchen properly.</p>
            <div className="who">— Adaeze, posted 4 days ago</div>
          </div>

          <div className="hm-section-h" style={{ marginTop: 24 }}>Outgoing tenant</div>
          <div className="hm-person-card">
            <div className="hm-avatar">AO</div>
            <div className="meta">
              <b>Adaeze Okonkwo</b>
              <div className="l">2 yrs at this address · responds in ~4 hrs</div>
            </div>
            <button className="hm-iconbtn"><Ico name="msg2" size={16}/></button>
          </div>

          <div className="hm-section-h">What's in the flat</div>
          <div className="hm-feature-list">
            <div className="row"><Ico name="bed" size={14}/>3 bedrooms</div>
            <div className="row"><Ico name="bath" size={14}/>3 bathrooms</div>
            <div className="row"><Ico name="snow" size={14}/>ACs in all rooms</div>
            <div className="row"><Ico name="zap" size={14}/>Inverter (stays)</div>
            <div className="row"><Ico name="droplet" size={14}/>Borehole</div>
            <div className="row"><Ico name="car" size={14}/>2 parking slots</div>
            <div className="row"><Ico name="sun" size={14}/>South balcony</div>
            <div className="row"><Ico name="shield" size={14}/>24-hr security</div>
          </div>
        </div>
      </div>

      {/* Sticky pay bar */}
      <div className="hm-cta-bar">
        <div className="price-stack">
          <div className="lbl">Retainment</div>
          <div className="val">₦35,000</div>
          <div className="sub">Refunded if it falls through</div>
        </div>
        <button className="hm-btn-pay">
          <Ico name="lock" size={14}/>Pay to secure
        </button>
      </div>
    </div>
  );
}

// ============================================================
// 5. PAY RETAINMENT SHEET
// ============================================================
function ScreenPay() {
  return (
    <div className="hm-app" style={{ position: 'relative' }}>
      <div style={{ flex: 1, background: '#3E342A', filter: 'brightness(.65)' }}>
        {/* dim backdrop */}
      </div>

      <div className="hm-sheet-shade">
        <div className="hm-sheet">
          <div className="hm-sheet-grip"></div>
          <div style={{ textAlign: 'center', marginBottom: 8 }}>
            <div style={{
              width: 56, height: 56, margin: '4px auto 12px',
              background: '#F2D9C9', color: '#B85431',
              borderRadius: 9999,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}><Ico name="lock" size={26}/></div>
          </div>
          <div className="hm-sheet-h" style={{ textAlign: 'center' }}>Pay retainment to <span className="hm-em">secure this</span></div>
          <div className="hm-sheet-sub" style={{ textAlign: 'center' }}>
            You'll be first in line. Adaeze has 48 hrs to confirm — if she doesn't, full refund.
          </div>

          {/* Listing summary */}
          <div style={{
            background: '#FFFBF3', border: '1px solid #E2D6BD',
            borderRadius: 14, padding: 14, marginBottom: 16,
            display: 'flex', gap: 12, alignItems: 'center',
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: 10,
              background: 'repeating-linear-gradient(135deg,#F2D9C9 0 10px,#EBC4AC 10px 20px)',
              flexShrink: 0,
            }}></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.3 }}>3-bed in Lekki Phase 1</div>
              <div style={{ fontSize: 12, color: '#877763', marginTop: 2 }}>From Adaeze · Available Aug 1</div>
            </div>
          </div>

          {/* Method */}
          <div style={{ fontSize: 12, fontWeight: 600, color: '#221C16', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Pay with</div>
          <div className="hm-pay-method sel">
            <div className="ico bank">GTB</div>
            <div style={{ flex: 1 }}>
              <div className="name">GTBank · Adaeze's escrow</div>
              <div className="num">•••• 7821 · via Paystack</div>
            </div>
            <div className="radio"></div>
          </div>
          <div className="hm-pay-method">
            <div className="ico">VISA</div>
            <div style={{ flex: 1 }}>
              <div className="name">Card ending 4582</div>
              <div className="num">Femi A. · expires 12/27</div>
            </div>
            <div className="radio"></div>
          </div>

          <div className="hm-pay-receipt">
            <div className="hm-pay-row"><span>Retainment to Adaeze</span><span className="amt">₦35,000</span></div>
            <div className="hm-pay-row"><span>Handover platform fee</span><span className="amt">₦2,500</span></div>
            <div className="hm-pay-row total"><span>You'll be charged</span><span className="amt">₦37,500</span></div>
          </div>

          <button style={{
            width: '100%', height: 56, marginTop: 16,
            background: '#B85431', color: 'white',
            border: 0, borderRadius: 16,
            fontWeight: 600, fontSize: 16,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            boxShadow: '0 12px 28px -6px rgba(184, 84, 49, 0.4)',
          }}>
            <Ico name="lock" size={16}/> Pay ₦37,500 securely
          </button>
          <div style={{ textAlign: 'center', fontSize: 11, color: '#877763', marginTop: 10, lineHeight: 1.4 }}>
            Held in escrow until you sign with the landlord.<br/>Released to Adaeze on your move-in day.
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 6. HANDOVER STATUS (in-progress)
// ============================================================
function ScreenStatus() {
  return (
    <div className="hm-app">
      <TopBar/>
      <div className="hm-scroll">
        <div className="hm-page-title">Your <span className="hm-em">handover</span></div>
        <div className="hm-page-sub">With Adaeze Okonkwo · started 2 days ago</div>

        {/* Big status card */}
        <div style={{
          margin: '0 20px 20px',
          background: '#221C16', color: '#F6F1E7',
          borderRadius: 20, padding: 22,
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', right: -30, top: -30, width: 140, height: 140, background: 'rgba(184, 84, 49, 0.2)', borderRadius: 9999 }}></div>
          <div style={{ position: 'relative' }}>
            <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 11, color: '#D9B86E', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>Step 3 of 4 · in progress</div>
            <div className="hm-serif" style={{ fontSize: 26, lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 8 }}>Now meet the <span className="hm-em" style={{ color: '#D9B86E' }}>landlord.</span></div>
            <div style={{ fontSize: 13.5, color: '#C9BDAC', lineHeight: 1.5 }}>
              Mr. Olabode is expecting your call. Adaeze has briefed him. Sign the agreement, then come back here to confirm.
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <button style={{
                flex: 1, height: 44, background: '#B85431', color: 'white',
                border: 0, borderRadius: 12, fontWeight: 600, fontSize: 13.5,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}><Ico name="phone" size={14}/>Call landlord</button>
              <button style={{
                height: 44, padding: '0 16px', background: 'rgba(255,251,243,0.12)',
                color: '#F6F1E7', border: '1px solid rgba(255,251,243,0.16)',
                borderRadius: 12, fontWeight: 500, fontSize: 13.5,
              }}>I've signed</button>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div style={{ padding: '0 20px' }}>
          <div className="hm-timeline">
            <div className="hm-tl-step done">
              <div className="hm-tl-dot"><Ico name="check" size={14}/></div>
              <div className="hm-tl-body">
                <div className="t">Retainment paid</div>
                <div className="s">₦37,500 charged · held in escrow</div>
                <div className="ts">MAY 22 · 14:08</div>
              </div>
            </div>
            <div className="hm-tl-step done">
              <div className="hm-tl-dot"><Ico name="check" size={14}/></div>
              <div className="hm-tl-body">
                <div className="t">Adaeze confirmed you</div>
                <div className="s">House manual unlocked · landlord contact shared</div>
                <div className="ts">MAY 22 · 19:42</div>
              </div>
            </div>
            <div className="hm-tl-step now">
              <div className="hm-tl-dot"><Ico name="phone" size={13}/></div>
              <div className="hm-tl-body">
                <div className="t">Meet landlord &amp; sign</div>
                <div className="s">You handle this directly. Standard agreement: ₦80k.</div>
                <div className="ts">EXPECTED BY JUN 5</div>
              </div>
            </div>
            <div className="hm-tl-step">
              <div className="hm-tl-dot">4</div>
              <div className="hm-tl-body">
                <div className="t">Move in · keys exchanged</div>
                <div className="s">Confirm here. Retainment released to Adaeze.</div>
                <div className="ts">EXPECTED AUG 1</div>
              </div>
            </div>
          </div>
        </div>

        {/* Help row */}
        <div style={{
          margin: '12px 20px 0',
          background: '#F2D9C9', border: '1px solid #E5BFA8',
          borderRadius: 14, padding: 14,
          display: 'flex', gap: 12, alignItems: 'center',
        }}>
          <Ico name="help" size={18} color="#B85431"/>
          <div style={{ flex: 1, fontSize: 13, color: '#8A3C20', lineHeight: 1.4 }}>
            Hit a problem with the landlord? File a dispute in 72 hrs for a full refund.
          </div>
          <Ico name="arrowright" size={14} color="#B85431"/>
        </div>
      </div>
      <TabBar active="me"/>
    </div>
  );
}

// ============================================================
// 7. HOUSE MANUAL UNLOCKED
// ============================================================
function ScreenManual() {
  return (
    <div className="hm-app">
      <div className="hm-topbar">
        <button className="hm-iconbtn"><Ico name="arrowleft" size={16}/></button>
        <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 11, color: '#877763', letterSpacing: '0.08em' }}>HOUSE MANUAL</div>
        <button className="hm-iconbtn"><Ico name="ellipsis" size={16}/></button>
      </div>

      <div className="hm-scroll">
        <div style={{
          margin: '0 20px 20px',
          background: 'linear-gradient(135deg, #F2D9C9, #FAF4E6)',
          border: '1px solid #E5BFA8',
          borderRadius: 18, padding: 18,
          display: 'flex', gap: 12, alignItems: 'center',
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: '#B85431', color: 'white',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}><Ico name="unlock" size={20}/></div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>Unlocked by Adaeze</div>
            <div style={{ fontSize: 12, color: '#8A3C20', marginTop: 2 }}>The things only the person who lived there could know.</div>
          </div>
        </div>

        <div className="hm-page-title" style={{ paddingTop: 0, fontSize: 32 }}>3-bed at <span className="hm-em">Beachland.</span></div>
        <div className="hm-page-sub">Flat 3B · Beachland Estate · Off Admiralty Way, Lekki Phase 1.</div>

        <div style={{ padding: '0 20px' }}>
          {/* People */}
          <div className="hm-manual-card">
            <div className="h"><Ico name="user" size={11}/>People to know</div>
            <div className="row">
              <div className="lbl">Landlord (Mr. Olabode)</div>
              <div className="val" style={{ color: '#B85431' }}>+234 803 411 8829</div>
            </div>
            <div className="row">
              <div className="lbl">Estate manager</div>
              <div className="val">Mr. Akin · +234 803 442 1180</div>
            </div>
            <div className="row">
              <div className="lbl">Gateman (Musa)</div>
              <div className="val">+234 813 552 0019</div>
            </div>
            <div className="row">
              <div className="lbl">Trusted plumber</div>
              <div className="val">Engr. Sunday</div>
            </div>
            <div className="hm-manual-call">
              <button className="brand"><Ico name="phone" size={14}/>Call landlord</button>
              <button><Ico name="msg2" size={14}/>WhatsApp</button>
            </div>
          </div>

          {/* Utilities */}
          <div className="hm-manual-card">
            <div className="h"><Ico name="zap" size={11}/>Utilities &amp; bills</div>
            <div className="row">
              <div className="lbl">EKEDC meter no.</div>
              <div className="val">04-31-7762-4451</div>
            </div>
            <div className="row">
              <div className="lbl">Avg monthly electric</div>
              <div className="val">₦21,000</div>
            </div>
            <div className="row">
              <div className="lbl">Estate water + waste</div>
              <div className="val">Included in service</div>
            </div>
            <div className="row">
              <div className="lbl">Service charge</div>
              <div className="val">₦240,000/yr</div>
            </div>
          </div>

          {/* Quirks */}
          <div className="hm-manual-card">
            <div className="h"><Ico name="sparkle" size={11}/>Quirks &amp; fixes</div>
            <div style={{ fontSize: 14, lineHeight: 1.6, color: '#221C16' }}>
              The hot water tap in the master bath needs a <em style={{ color: '#B85431' }}>firm twist</em> — it sticks otherwise.
              <br/><br/>
              Generator switch is in the kitchen drawer, not the panel. Don't ask why.
              <br/><br/>
              Estate Wi-Fi password is on a sticker behind the gateman's hut.
            </div>
          </div>

          {/* Neighbourhood */}
          <div className="hm-manual-card">
            <div className="h"><Ico name="mappin" size={11}/>The neighbourhood</div>
            <div style={{ fontSize: 14, lineHeight: 1.6, color: '#221C16' }}>
              Best suya is on Admiralty after 7pm — opposite Ebeano.
              <br/><br/>
              Friday traffic on Lekki-Epe is fine until 5pm, brutal after.
              <br/><br/>
              Mama Felicia at flat 2C looks out for parcels.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 8. POST LISTING — step 2 of 8 (photos & description)
// ============================================================
function ScreenPost() {
  return (
    <div className="hm-app">
      <div className="hm-topbar">
        <button className="hm-iconbtn"><Ico name="arrowleft" size={16}/></button>
        <div style={{ fontSize: 13, color: '#877763' }}>Saved · just now</div>
        <button className="hm-iconbtn"><Ico name="x" size={16}/></button>
      </div>

      <div className="hm-step-tag">— STEP 02 OF 08</div>
      <div className="hm-step-progress"><div className="bar" style={{ width: '25%' }}></div></div>

      <div className="hm-scroll">
        <div className="hm-page-title">Photos that <span className="hm-em">don't lie.</span></div>
        <div className="hm-page-sub">At least 6 — places with 10+ photos get 4× more retainments paid.</div>

        <div style={{ padding: '0 20px' }}>
          {/* Photo grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {/* Cover */}
            <div style={{
              gridColumn: 'span 2', gridRow: 'span 2',
              aspectRatio: 1,
              background: 'repeating-linear-gradient(135deg,#F2D9C9 0 16px,#EBC4AC 16px 32px)',
              borderRadius: 12, position: 'relative', overflow: 'hidden',
            }}>
              <span style={{
                position: 'absolute', top: 8, left: 8,
                background: '#B85431', color: 'white',
                padding: '3px 8px', borderRadius: 9999,
                fontSize: 10, fontWeight: 600, letterSpacing: '0.04em',
              }}>COVER</span>
              <span style={{
                position: 'absolute', bottom: 10, left: 10,
                fontFamily: '"Geist Mono", monospace',
                background: 'rgba(255,251,243,0.92)', padding: '3px 7px',
                borderRadius: 6, fontSize: 10,
                color: '#4A3E33',
              }}>LIVING ROOM</span>
            </div>
            <div style={{
              aspectRatio: 1,
              background: 'repeating-linear-gradient(135deg,#E8DDC6 0 12px,#DDD0B2 12px 24px)',
              borderRadius: 12,
            }}></div>
            <div style={{
              aspectRatio: 1,
              background: 'repeating-linear-gradient(135deg,#C9B997 0 12px,#B8A684 12px 24px)',
              borderRadius: 12,
            }}></div>
            <div style={{
              aspectRatio: 1,
              background: 'repeating-linear-gradient(135deg,#F2D9C9 0 12px,#EBC4AC 12px 24px)',
              borderRadius: 12,
            }}></div>
            <div style={{
              aspectRatio: 1,
              background: 'repeating-linear-gradient(135deg,#E8DDC6 0 12px,#DDD0B2 12px 24px)',
              borderRadius: 12,
            }}></div>
            <div style={{
              aspectRatio: 1,
              background: '#EFE7D6',
              border: '1.5px dashed #C9B997',
              borderRadius: 12,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: 4, color: '#877763', fontSize: 10.5,
            }}>
              <Ico name="image" size={18}/>
              Add
            </div>
          </div>

          {/* Tip */}
          <div style={{
            marginTop: 14, padding: '12px 14px',
            background: '#F2D9C9', border: '1px solid #E5BFA8',
            borderRadius: 12, fontSize: 12.5, color: '#8A3C20',
            display: 'flex', gap: 8, lineHeight: 1.4,
          }}>
            <Ico name="sparkle" size={14} color="#B85431"/>
            <div>Take them today, with the lights on. Wide shots win.</div>
          </div>

          <div className="hm-field" style={{ marginTop: 24 }}>
            <label className="hm-label">Title — write it like a real person</label>
            <input className="hm-input" defaultValue="3-bedroom flat in a quiet close, fully serviced" />
          </div>

          <div className="hm-field">
            <label className="hm-label">Description</label>
            <textarea className="hm-textarea" rows="4" defaultValue="Third-floor flat in a small block of 6, on a closed street with a security gate. The living room opens to a south-facing balcony — the only direction in Beachland that doesn't get the harmattan dust head-on."/>
            <div style={{ fontSize: 11, color: '#877763', textAlign: 'right', marginTop: 4 }}>234 / 1200</div>
          </div>

          <div className="hm-field">
            <label className="hm-label">Why are you handing it over?</label>
            <textarea className="hm-textarea" rows="2" defaultValue="Relocating to Manchester for my husband's postdoc. Want to leave it to someone who'll use the kitchen properly."/>
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'rgba(246,241,231,0.94)',
        backdropFilter: 'blur(14px)',
        borderTop: '1px solid #E2D6BD',
        padding: '14px 16px 38px',
        display: 'flex', gap: 10, zIndex: 20,
      }}>
        <button style={{
          height: 50, padding: '0 18px',
          background: '#FFFBF3', color: '#221C16',
          border: '1px solid #C9B997',
          borderRadius: 14, fontWeight: 500, fontSize: 14,
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}><Ico name="eye" size={14}/>Preview</button>
        <button style={{
          flex: 1, height: 50, background: '#B85431', color: 'white',
          border: 0, borderRadius: 14, fontWeight: 600, fontSize: 15,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>Continue<Ico name="arrowright" size={16}/></button>
      </div>
    </div>
  );
}

// ============================================================
// 9. SPLASH
// ============================================================
function ScreenSplash() {
  return (
    <div className="hm-app" style={{
      background: 'linear-gradient(180deg, #B85431 0%, #8A3C20 100%)',
      color: '#F6F1E7',
      alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: -120, right: -100,
        width: 380, height: 380, borderRadius: 9999,
        background: 'rgba(246, 241, 231, 0.06)',
      }}/>
      <div style={{
        position: 'absolute', bottom: -160, left: -120,
        width: 420, height: 420, borderRadius: 9999,
        background: 'rgba(246, 241, 231, 0.04)',
      }}/>

      <div style={{
        position: 'absolute', top: '50%', left: 0, right: 0,
        transform: 'translateY(-60%)',
        textAlign: 'center', padding: '0 36px',
      }}>
        <div style={{
          width: 88, height: 88, borderRadius: 28,
          background: 'rgba(246, 241, 231, 0.14)',
          backdropFilter: 'blur(14px)',
          border: '1px solid rgba(246, 241, 231, 0.18)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 28,
          boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)',
        }}>
          <Ico name="key" size={42} color="#F6F1E7"/>
        </div>
        <div style={{
          fontFamily: '"Instrument Serif", serif',
          fontSize: 64, lineHeight: 1, letterSpacing: '-0.025em',
          fontWeight: 400, color: '#F6F1E7',
        }}>
          Hand<span style={{ fontStyle: 'italic' }}>over</span>
        </div>
        <div style={{
          fontFamily: '"Geist Mono", monospace',
          fontSize: 10.5, color: 'rgba(246, 241, 231, 0.6)',
          textTransform: 'uppercase', letterSpacing: '0.24em',
          marginTop: 14,
        }}>
          Person to person · Nigeria
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 56, left: 0, right: 0,
        textAlign: 'center',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 12, color: 'rgba(246, 241, 231, 0.5)',
          fontFamily: '"Geist Mono", monospace',
          letterSpacing: '0.08em',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: 9999, background: '#D9B86E' }}></span>
          v1.0 · MADE IN LAGOS
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 10. SIGN IN
// ============================================================
function ScreenSignIn() {
  return (
    <div className="hm-app">
      <div className="hm-topbar" style={{ background: 'transparent' }}>
        <button className="hm-iconbtn"><Ico name="arrowleft" size={16}/></button>
        <div></div>
        <button style={{ background: 'transparent', border: 0, color: '#B85431', fontSize: 14, fontWeight: 500 }}>Help</button>
      </div>
      <div className="hm-scroll" style={{ padding: '0 24px' }}>
        <div className="hm-serif" style={{
          fontSize: 42, lineHeight: 1, letterSpacing: '-0.025em',
          margin: '12px 0 12px',
        }}>
          Welcome <span className="hm-em">back.</span>
        </div>
        <div style={{ fontSize: 15, color: '#4A3E33', lineHeight: 1.5, marginBottom: 30 }}>
          We'll send a code to your number. No password to forget.
        </div>

        <div className="hm-label">Phone number</div>
        <div style={{
          display: 'flex', gap: 10, marginBottom: 24,
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '0 14px', height: 56,
            background: '#FFFBF3', border: '1px solid #E2D6BD',
            borderRadius: 14, fontSize: 16, fontWeight: 500,
          }}>
            <span style={{ fontSize: 20 }}>🇳🇬</span>
            <span>+234</span>
            <Ico name="chevdown" size={14} color="#877763"/>
          </div>
          <input className="hm-input" defaultValue="803 411 8829" style={{
            flex: 1, height: 56, fontSize: 17, letterSpacing: '0.02em',
            fontFamily: '"Geist Mono", monospace',
          }}/>
        </div>

        <button style={{
          width: '100%', height: 56,
          background: '#221C16', color: '#F6F1E7',
          border: 0, borderRadius: 16,
          fontSize: 15, fontWeight: 600,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          marginBottom: 14,
        }}>
          Continue <Ico name="arrowright" size={16}/>
        </button>

        <div style={{
          display: 'flex', alignItems: 'center', gap: 14,
          margin: '14px 0',
        }}>
          <div style={{ flex: 1, height: 1, background: '#E2D6BD' }}></div>
          <span style={{ fontSize: 12, color: '#877763', fontFamily: '"Geist Mono", monospace' }}>OR</span>
          <div style={{ flex: 1, height: 1, background: '#E2D6BD' }}></div>
        </div>

        <button style={{
          width: '100%', height: 52,
          background: '#FFFBF3', color: '#221C16',
          border: '1px solid #C9B997', borderRadius: 14,
          fontSize: 14, fontWeight: 500,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          marginBottom: 10,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.5 12.3c0-.78-.07-1.53-.2-2.25H12v4.26h5.9a5 5 0 0 1-2.2 3.3v2.7h3.55c2.08-1.92 3.28-4.74 3.28-8.01z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.55-2.75c-.98.66-2.23 1.05-3.73 1.05-2.87 0-5.3-1.94-6.16-4.54H2.18v2.84A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.07H2.18A11 11 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.7 7.32 9.13 5.38 12 5.38z"/></svg>
          Continue with Google
        </button>
        <button style={{
          width: '100%', height: 52,
          background: '#FFFBF3', color: '#221C16',
          border: '1px solid #C9B997', borderRadius: 14,
          fontSize: 14, fontWeight: 500,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.86-3.08.41-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.41C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
          Continue with Apple
        </button>

        <div style={{
          marginTop: 28, fontSize: 12.5, color: '#877763',
          textAlign: 'center', lineHeight: 1.5,
        }}>
          By continuing, you agree to Handover's<br/>
          <a style={{ color: '#B85431' }}>Terms</a> &amp; <a style={{ color: '#B85431' }}>Privacy</a>.
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 11. VERIFICATION
// ============================================================
function ScreenVerify() {
  return (
    <div className="hm-app">
      <div className="hm-topbar">
        <button className="hm-iconbtn"><Ico name="arrowleft" size={16}/></button>
        <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 11, color: '#877763', letterSpacing: '0.08em' }}>3 OF 4</div>
        <div style={{ width: 38 }}></div>
      </div>
      <div className="hm-step-progress"><div className="bar" style={{ width: '75%' }}></div></div>

      <div className="hm-scroll" style={{ padding: '0 24px' }}>
        <div className="hm-serif" style={{
          fontSize: 36, lineHeight: 1.04, letterSpacing: '-0.025em',
          margin: '8px 0 10px',
        }}>
          Let's confirm <span className="hm-em">you're you.</span>
        </div>
        <div style={{ fontSize: 14.5, color: '#4A3E33', lineHeight: 1.5, marginBottom: 24 }}>
          Outgoing tenants want to know who's about to live in their home. Three quick checks.
        </div>

        {/* NIN done */}
        <div style={{
          background: '#FFFBF3', border: '1px solid #E2D6BD',
          borderRadius: 16, padding: 18, marginBottom: 10,
          display: 'flex', gap: 14, alignItems: 'center',
        }}>
          <div style={{
            width: 42, height: 42, borderRadius: 12,
            background: '#F2D9C9', color: '#B85431',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}><Ico name="badge" size={20}/></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 15 }}>National ID (NIN)</div>
            <div style={{ fontSize: 12.5, color: '#877763', marginTop: 2 }}>Matched · Femi Adeyemi</div>
          </div>
          <Ico name="check-circ" size={22} color="#B85431"/>
        </div>

        {/* Selfie active */}
        <div style={{
          background: '#FFFBF3', border: '2px solid #B85431',
          borderRadius: 16, padding: 18, marginBottom: 10,
          boxShadow: '0 8px 20px -8px rgba(184, 84, 49, 0.3)',
        }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 14 }}>
            <div style={{
              width: 42, height: 42, borderRadius: 12,
              background: '#B85431', color: 'white',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}><Ico name="camera" size={20}/></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 15 }}>Selfie check</div>
              <div style={{ fontSize: 12.5, color: '#877763', marginTop: 2 }}>Match your face to your NIN photo</div>
            </div>
          </div>
          <div style={{
            aspectRatio: '4/3',
            background: 'radial-gradient(ellipse at center, #4A3E33 0%, #221C16 100%)',
            borderRadius: 12,
            position: 'relative',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
          }}>
            {/* face oval guide */}
            <div style={{
              width: 130, height: 170, borderRadius: '50%',
              border: '2px dashed rgba(246, 241, 231, 0.6)',
            }}></div>
            <div style={{
              position: 'absolute', bottom: 12, left: 0, right: 0, textAlign: 'center',
              fontSize: 12, color: '#F6F1E7',
              fontFamily: '"Geist Mono", monospace', letterSpacing: '0.04em',
            }}>FIT YOUR FACE IN THE OVAL</div>
          </div>
          <button style={{
            width: '100%', marginTop: 12, height: 46,
            background: '#B85431', color: 'white',
            border: 0, borderRadius: 12, fontWeight: 600, fontSize: 14,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            <Ico name="camera" size={14}/> Take selfie
          </button>
        </div>

        {/* Phone done */}
        <div style={{
          background: '#FFFBF3', border: '1px solid #E2D6BD',
          borderRadius: 16, padding: 18, marginBottom: 10,
          display: 'flex', gap: 14, alignItems: 'center',
        }}>
          <div style={{
            width: 42, height: 42, borderRadius: 12,
            background: '#F2D9C9', color: '#B85431',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}><Ico name="phone" size={20}/></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 15 }}>Phone number</div>
            <div style={{ fontSize: 12.5, color: '#877763', marginTop: 2 }}>+234 803 ••• 8829</div>
          </div>
          <Ico name="check-circ" size={22} color="#B85431"/>
        </div>

        <div style={{
          marginTop: 18, fontSize: 12, color: '#877763',
          textAlign: 'center', lineHeight: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
          <Ico name="lock" size={12} color="#B85431"/>
          Encrypted &amp; never shared without your permission.
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 12. MAP VIEW
// ============================================================
function ScreenMap() {
  return (
    <div className="hm-app" style={{ position: 'relative' }}>
      {/* "Map" — paper map illustration */}
      <div style={{
        flex: 1, position: 'relative', overflow: 'hidden',
        background:
          'linear-gradient(135deg, #EFE7D6 0%, #E2D6BD 50%, #D9C893 100%)',
      }}>
        {/* Roads */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <svg width="100%" height="100%" viewBox="0 0 390 700" preserveAspectRatio="xMidYMid slice">
            <path d="M0 250 Q 100 200 200 230 T 390 280" stroke="#C9B997" strokeWidth="3" fill="none" opacity="0.7"/>
            <path d="M50 0 Q 80 200 150 380 T 200 700" stroke="#C9B997" strokeWidth="2.5" fill="none" opacity="0.6"/>
            <path d="M390 100 Q 300 250 280 400 T 220 700" stroke="#C9B997" strokeWidth="3" fill="none" opacity="0.7"/>
            <path d="M0 500 L 390 480" stroke="#C9B997" strokeWidth="2" fill="none" opacity="0.5"/>
            <rect x="60" y="280" width="100" height="60" fill="#C9B997" opacity="0.3"/>
            <rect x="200" y="350" width="80" height="50" fill="#C9B997" opacity="0.3"/>
            <rect x="240" y="500" width="120" height="80" fill="#C9B997" opacity="0.3"/>
            <path d="M310 200 Q 320 250 350 280 L 390 280 L 390 380 L 290 380 Z" fill="#B5C4D6" opacity="0.4"/>
          </svg>
        </div>

        {/* Pins */}
        {[
          { l: '32%', t: '24%', p: '₦4.5M', big: true },
          { l: '52%', t: '38%', p: '₦3.2M' },
          { l: '22%', t: '48%', p: '₦950K' },
          { l: '68%', t: '46%', p: '₦2.8M' },
          { l: '44%', t: '60%', p: '₦1.4M' },
          { l: '76%', t: '64%', p: '₦4.2M' },
        ].map((pin, i) => (
          <div key={i} style={{
            position: 'absolute', left: pin.l, top: pin.t,
            transform: 'translate(-50%, -100%)',
            background: pin.big ? '#221C16' : '#FFFBF3',
            color: pin.big ? '#F6F1E7' : '#221C16',
            border: pin.big ? '2px solid #B85431' : '1px solid #C9B997',
            padding: '5px 12px',
            borderRadius: 9999,
            fontSize: pin.big ? 13 : 12,
            fontWeight: 600,
            fontVariantNumeric: 'tabular-nums',
            boxShadow: pin.big
              ? '0 6px 14px rgba(34, 28, 22, 0.3)'
              : '0 3px 8px rgba(34, 28, 22, 0.15)',
            whiteSpace: 'nowrap',
          }}>
            {pin.p}
          </div>
        ))}
      </div>

      {/* Top floating bar */}
      <div style={{
        position: 'absolute', top: 56, left: 16, right: 16,
        display: 'flex', gap: 8, zIndex: 5,
      }}>
        <div style={{
          flex: 1, height: 48,
          background: 'rgba(255, 251, 243, 0.92)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(226, 214, 189, 0.6)',
          borderRadius: 14,
          display: 'flex', alignItems: 'center',
          padding: '0 14px', gap: 10,
        }}>
          <Ico name="arrowleft" size={16} color="#221C16"/>
          <input style={{
            flex: 1, border: 0, outline: 0,
            background: 'transparent', fontSize: 14.5,
            color: '#221C16', fontFamily: 'inherit',
          }} defaultValue="Lekki Phase 1"/>
        </div>
        <button className="hm-iconbtn" style={{
          width: 48, height: 48, borderRadius: 14,
          background: 'rgba(255, 251, 243, 0.92)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(226, 214, 189, 0.6)',
        }}><Ico name="sliders" size={16}/></button>
      </div>

      {/* Mode toggle */}
      <div style={{
        position: 'absolute', top: 120, left: '50%', transform: 'translateX(-50%)',
        background: 'rgba(255, 251, 243, 0.92)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(226, 214, 189, 0.6)',
        borderRadius: 9999, padding: 4, display: 'flex', gap: 2, zIndex: 5,
      }}>
        <button style={{
          padding: '7px 18px', borderRadius: 9999, border: 0,
          background: 'transparent', fontSize: 12.5, fontWeight: 500, color: '#4A3E33',
        }}>List</button>
        <button style={{
          padding: '7px 18px', borderRadius: 9999, border: 0,
          background: '#221C16', color: '#F6F1E7',
          fontSize: 12.5, fontWeight: 500,
        }}>Map</button>
      </div>

      {/* Bottom listing peek */}
      <div style={{
        position: 'absolute', bottom: 110, left: 16, right: 16, zIndex: 5,
      }}>
        <div className="hm-card" style={{
          display: 'flex', overflow: 'hidden',
          boxShadow: '0 14px 30px -8px rgba(34, 28, 22, 0.18)',
        }}>
          <div style={{
            width: 110, flexShrink: 0,
            background: 'repeating-linear-gradient(135deg,#F2D9C9 0 12px,#EBC4AC 12px 24px)',
          }}></div>
          <div style={{ padding: '12px 14px', flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11.5, color: '#877763', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4 }}>
              <Ico name="mappin" size={11}/>Beachland · Lekki Phase 1
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.3, marginBottom: 6 }}>3-bed flat in quiet close</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div className="hm-serif" style={{ fontSize: 19, letterSpacing: '-0.02em', lineHeight: 1 }}>
                ₦4,500,000<span style={{ fontSize: 10, fontFamily: '"Geist", sans-serif', color: '#877763', marginLeft: 3 }}>/yr</span>
              </div>
              <div style={{ fontSize: 10, color: '#877763', textAlign: 'right' }}>Retainment<br/><b style={{ color: '#B85431', fontSize: 11 }}>₦35,000</b></div>
            </div>
          </div>
        </div>
      </div>

      <TabBar active="browse"/>
    </div>
  );
}

// ============================================================
// 13. PHOTO GALLERY VIEWER
// ============================================================
function ScreenGallery() {
  return (
    <div className="hm-app" style={{ background: '#0F0A06', color: '#F6F1E7' }}>
      {/* top bar */}
      <div style={{
        position: 'absolute', top: 56, left: 16, right: 16, zIndex: 5,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <button className="hm-pill-glass" style={{
          background: 'rgba(34, 28, 22, 0.6)', color: '#F6F1E7',
          border: '1px solid rgba(246, 241, 231, 0.18)',
        }}><Ico name="x" size={18}/></button>
        <div style={{
          fontFamily: '"Geist Mono", monospace', fontSize: 12,
          color: '#F6F1E7',
          background: 'rgba(34, 28, 22, 0.6)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(246, 241, 231, 0.18)',
          padding: '6px 14px', borderRadius: 9999,
          letterSpacing: '0.06em',
        }}>3 / 18</div>
        <button className="hm-pill-glass" style={{
          background: 'rgba(34, 28, 22, 0.6)', color: '#F6F1E7',
          border: '1px solid rgba(246, 241, 231, 0.18)',
        }}><Ico name="share" size={16}/></button>
      </div>

      {/* Main photo */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '110px 0 0' }}>
        <div style={{
          width: '92%', aspectRatio: '4/3',
          background: 'repeating-linear-gradient(135deg,#F2D9C9 0 24px,#EBC4AC 24px 48px)',
          borderRadius: 16,
          position: 'relative',
          boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
        }}>
          <div style={{
            position: 'absolute', bottom: 14, left: 14,
            background: 'rgba(15, 10, 6, 0.7)',
            color: '#F6F1E7',
            padding: '6px 12px',
            borderRadius: 8,
            fontSize: 12,
            fontFamily: '"Geist Mono", monospace',
            letterSpacing: '0.04em',
          }}>MASTER BEDROOM · SOUTH FACING</div>
        </div>
      </div>

      {/* Bottom caption */}
      <div style={{ padding: '24px 24px 14px', textAlign: 'center' }}>
        <div className="hm-serif" style={{
          fontSize: 20, lineHeight: 1.2,
          color: '#F6F1E7',
        }}>
          "Wakes up with the sun. I'll miss <span style={{ fontStyle: 'italic', color: '#D9B86E' }}>this room.</span>"
        </div>
        <div style={{
          fontSize: 11, color: 'rgba(246, 241, 231, 0.5)',
          marginTop: 8,
          fontFamily: '"Geist Mono", monospace',
          letterSpacing: '0.06em',
        }}>— ADAEZE</div>
      </div>

      {/* Thumbnail strip */}
      <div style={{
        display: 'flex', gap: 6, padding: '0 16px 36px',
        overflowX: 'auto',
      }}>
        {[
          'repeating-linear-gradient(135deg,#F2D9C9 0 8px,#EBC4AC 8px 16px)',
          'repeating-linear-gradient(135deg,#E8DDC6 0 8px,#DDD0B2 8px 16px)',
          'repeating-linear-gradient(135deg,#F2D9C9 0 8px,#EBC4AC 8px 16px)',
          'repeating-linear-gradient(135deg,#C9B997 0 8px,#B8A684 8px 16px)',
          'repeating-linear-gradient(135deg,#E8DDC6 0 8px,#DDD0B2 8px 16px)',
          'repeating-linear-gradient(135deg,#F2D9C9 0 8px,#EBC4AC 8px 16px)',
          'repeating-linear-gradient(135deg,#C9B997 0 8px,#B8A684 8px 16px)',
        ].map((bg, i) => (
          <div key={i} style={{
            width: 52, height: 52, flexShrink: 0, borderRadius: 8,
            background: bg,
            border: i === 2 ? '2px solid #D9B86E' : '1px solid rgba(246, 241, 231, 0.2)',
            opacity: i === 2 ? 1 : 0.7,
          }}/>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// 14. CHAT WITH OUTGOING TENANT
// ============================================================
function ScreenChat() {
  const msg = (text, from = 'them', time) => ({ text, from, time });
  return (
    <div className="hm-app">
      <div className="hm-topbar" style={{ padding: '56px 16px 12px' }}>
        <button className="hm-iconbtn"><Ico name="arrowleft" size={16}/></button>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flex: 1, marginLeft: 4 }}>
          <div className="hm-avatar" style={{ width: 36, height: 36, fontSize: 14 }}>AO</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Adaeze Okonkwo</div>
            <div style={{ fontSize: 11, color: '#5C7A4A', display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 6, height: 6, borderRadius: 9999, background: '#5C7A4A' }}></span>
              Online now
            </div>
          </div>
        </div>
        <button className="hm-iconbtn"><Ico name="phone" size={16}/></button>
      </div>

      <div className="hm-scroll" style={{ padding: '8px 16px 0', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{
          textAlign: 'center', fontSize: 11,
          color: '#877763', fontFamily: '"Geist Mono", monospace',
          letterSpacing: '0.06em', margin: '8px 0 16px',
        }}>YESTERDAY · 7:42 PM</div>

        {/* their context card */}
        <div style={{
          alignSelf: 'flex-start',
          background: '#FFFBF3', border: '1px solid #E2D6BD',
          borderRadius: 14, padding: 10,
          maxWidth: '78%', marginBottom: 8,
          display: 'flex', gap: 10,
        }}>
          <div style={{
            width: 44, height: 44, flexShrink: 0, borderRadius: 8,
            background: 'repeating-linear-gradient(135deg,#F2D9C9 0 8px,#EBC4AC 8px 16px)',
          }}></div>
          <div>
            <div style={{ fontSize: 12, color: '#877763' }}>Talking about</div>
            <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>3-bed in Lekki Phase 1</div>
          </div>
        </div>

        {/* them */}
        <div style={{
          alignSelf: 'flex-start', maxWidth: '78%',
          background: '#FFFBF3', border: '1px solid #E2D6BD',
          borderRadius: '16px 16px 16px 4px',
          padding: '10px 14px', fontSize: 14.5, lineHeight: 1.4,
        }}>
          Hi Femi, thanks for the interest. Happy to answer anything.
        </div>
        <div style={{ alignSelf: 'flex-start', fontSize: 10.5, color: '#877763', margin: '0 0 12px 6px' }}>7:42 PM</div>

        {/* you */}
        <div style={{
          alignSelf: 'flex-end', maxWidth: '78%',
          background: '#B85431', color: 'white',
          borderRadius: '16px 16px 4px 16px',
          padding: '10px 14px', fontSize: 14.5, lineHeight: 1.4,
        }}>
          Hey Adaeze — is the inverter actually included? And how strict is the landlord on rent reviews?
        </div>
        <div style={{ alignSelf: 'flex-end', fontSize: 10.5, color: '#877763', margin: '0 6px 12px 0' }}>7:51 PM · Read</div>

        {/* them */}
        <div style={{
          alignSelf: 'flex-start', maxWidth: '78%',
          background: '#FFFBF3', border: '1px solid #E2D6BD',
          borderRadius: '16px 16px 16px 4px',
          padding: '10px 14px', fontSize: 14.5, lineHeight: 1.4,
        }}>
          Yes — the 3kVA inverter + 2 batteries stay. I installed them in 2024.
          <br/><br/>
          Mr. Olabode hasn't raised rent in 2 years. He's the kind of landlord that responds to texts within an hour.
        </div>
        <div style={{ alignSelf: 'flex-start', fontSize: 10.5, color: '#877763', margin: '0 0 16px 6px' }}>8:04 PM</div>

        <div style={{
          textAlign: 'center', fontSize: 11,
          color: '#877763', fontFamily: '"Geist Mono", monospace',
          letterSpacing: '0.06em', margin: '8px 0 12px',
        }}>TODAY</div>

        {/* you */}
        <div style={{
          alignSelf: 'flex-end', maxWidth: '78%',
          background: '#B85431', color: 'white',
          borderRadius: '16px 16px 4px 16px',
          padding: '10px 14px', fontSize: 14.5, lineHeight: 1.4,
        }}>
          Beautiful. Can I come see this Saturday around 11?
        </div>
        <div style={{ alignSelf: 'flex-end', fontSize: 10.5, color: '#877763', margin: '0 6px 12px 0' }}>9:14 AM · Read</div>

        <div style={{ height: 100 }}></div>
      </div>

      {/* Composer */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: 'rgba(246, 241, 231, 0.96)',
        backdropFilter: 'blur(14px)',
        borderTop: '1px solid #E2D6BD',
        padding: '10px 12px 34px',
        display: 'flex', gap: 8, alignItems: 'center',
      }}>
        <button className="hm-iconbtn" style={{ width: 40, height: 40 }}><Ico name="plus" size={18}/></button>
        <div style={{
          flex: 1, height: 40,
          background: '#FFFBF3', border: '1px solid #E2D6BD',
          borderRadius: 9999, padding: '0 14px',
          display: 'flex', alignItems: 'center', fontSize: 14, color: '#877763',
        }}>Message…</div>
        <button className="hm-iconbtn" style={{ width: 40, height: 40, background: '#B85431', color: 'white', border: 0 }}>
          <Ico name="mic" size={16}/>
        </button>
      </div>
    </div>
  );
}

// ============================================================
// 15. PAYMENT SUCCESS
// ============================================================
function ScreenPaymentSuccess() {
  return (
    <div className="hm-app" style={{
      background: 'linear-gradient(180deg, #F6F1E7 0%, #F2D9C9 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* confetti dots */}
      {[
        { l: 12, t: 120, c: '#B85431' },
        { l: 78, t: 90, c: '#D9B86E' },
        { l: 32, t: 200, c: '#D9B86E' },
        { l: 88, t: 180, c: '#B85431' },
        { l: 18, t: 280, c: '#D9B86E' },
        { l: 82, t: 320, c: '#B85431' },
      ].map((d, i) => (
        <div key={i} style={{
          position: 'absolute', left: `${d.l}%`, top: d.t,
          width: 6, height: 6, background: d.c,
          borderRadius: i % 2 ? 0 : 9999,
          transform: `rotate(${i * 30}deg)`,
        }}/>
      ))}

      <div className="hm-scroll" style={{ padding: '120px 28px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{
            width: 96, height: 96, margin: '0 auto 22px',
            borderRadius: 9999,
            background: '#B85431', color: 'white',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 20px 40px -10px rgba(184, 84, 49, 0.5)',
          }}>
            <Ico name="check" size={48}/>
          </div>
          <div className="hm-serif" style={{
            fontSize: 42, lineHeight: 1, letterSpacing: '-0.025em',
            marginBottom: 12,
          }}>
            You're <span className="hm-em">first in line.</span>
          </div>
          <div style={{ fontSize: 15, color: '#4A3E33', lineHeight: 1.5, maxWidth: 280, margin: '0 auto' }}>
            ₦37,500 held safely in escrow. Adaeze has 48 hours to confirm you.
          </div>
        </div>

        {/* Receipt */}
        <div style={{
          background: '#FFFBF3', border: '1px solid #E2D6BD',
          borderRadius: 16, padding: 18, marginBottom: 16,
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            paddingBottom: 12, borderBottom: '1px dashed #E2D6BD',
          }}>
            <div>
              <div style={{ fontSize: 11, color: '#877763', textTransform: 'uppercase', letterSpacing: '0.06em' }}>RECEIPT</div>
              <div style={{ fontSize: 13, fontWeight: 600, marginTop: 3, fontFamily: '"Geist Mono", monospace' }}>HND-2026-08821</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: '#877763' }}>May 22, 2026</div>
              <div style={{ fontSize: 12, color: '#221C16', marginTop: 2, fontFamily: '"Geist Mono", monospace' }}>14:08 WAT</div>
            </div>
          </div>
          <div style={{ padding: '12px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
              <span style={{ color: '#4A3E33' }}>Retainment to Adaeze</span>
              <span style={{ fontFamily: '"Instrument Serif", serif', fontSize: 16 }}>₦35,000</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
              <span style={{ color: '#4A3E33' }}>Handover fee</span>
              <span style={{ fontFamily: '"Instrument Serif", serif', fontSize: 16 }}>₦2,500</span>
            </div>
          </div>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            paddingTop: 10, borderTop: '1px solid #E2D6BD',
            fontSize: 14, fontWeight: 600,
          }}>
            <span>Charged to GTB •••• 7821</span>
            <span style={{ fontFamily: '"Instrument Serif", serif', fontSize: 24, color: '#B85431' }}>₦37,500</span>
          </div>
        </div>

        {/* Next */}
        <div style={{
          background: '#221C16', color: '#F6F1E7',
          borderRadius: 16, padding: 18,
          display: 'flex', gap: 12, marginBottom: 16,
        }}>
          <Ico name="info" size={18} color="#D9B86E"/>
          <div style={{ fontSize: 13, lineHeight: 1.5 }}>
            We'll WhatsApp you the moment Adaeze confirms. Then the house manual unlocks &amp; you get the landlord's contact.
          </div>
        </div>

        <button style={{
          width: '100%', height: 54,
          background: '#B85431', color: 'white',
          border: 0, borderRadius: 16,
          fontSize: 15, fontWeight: 600,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          marginBottom: 10,
        }}>
          See handover status <Ico name="arrowright" size={16}/>
        </button>
        <button style={{
          width: '100%', height: 50,
          background: 'transparent', color: '#4A3E33',
          border: '1px solid #C9B997', borderRadius: 14,
          fontSize: 14, fontWeight: 500,
        }}>
          Download receipt
        </button>
      </div>
    </div>
  );
}

// ============================================================
// 16. MOVE-IN CONFIRMATION
// ============================================================
function ScreenMoveIn() {
  return (
    <div className="hm-app">
      <div className="hm-topbar">
        <button className="hm-iconbtn"><Ico name="arrowleft" size={16}/></button>
        <div></div>
        <button className="hm-iconbtn"><Ico name="help" size={16}/></button>
      </div>
      <div className="hm-scroll" style={{ padding: '0 24px' }}>
        <div className="hm-serif" style={{
          fontSize: 38, lineHeight: 1, letterSpacing: '-0.025em',
          margin: '8px 0 12px',
        }}>
          Did you get <span className="hm-em">the keys?</span>
        </div>
        <div style={{ fontSize: 14.5, color: '#4A3E33', lineHeight: 1.5, marginBottom: 24 }}>
          Once you confirm, ₦35,000 is released to Adaeze. The handover is complete.
        </div>

        {/* Big confirm card */}
        <div style={{
          background: '#FFFBF3', border: '1px solid #E2D6BD',
          borderRadius: 18, padding: 22, marginBottom: 16,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div className="hm-avatar">AO</div>
            <Ico name="arrowright" size={20} color="#B85431"/>
            <div className="hm-avatar" style={{ background: '#221C16', color: '#D9B86E' }}>FA</div>
          </div>
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: '#877763', fontFamily: '"Geist Mono", monospace', letterSpacing: '0.06em', marginBottom: 4 }}>HANDOVER ID</div>
            <div className="hm-serif" style={{ fontSize: 22, letterSpacing: '-0.018em' }}>HND-2026-08821</div>
          </div>
          <div style={{ borderTop: '1px dashed #E2D6BD', paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
              <span style={{ color: '#4A3E33' }}>Apartment</span>
              <span style={{ fontWeight: 500 }}>3-bed · Lekki Phase 1</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
              <span style={{ color: '#4A3E33' }}>Annual rent paid</span>
              <span style={{ fontWeight: 500 }}>₦4,500,000</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
              <span style={{ color: '#4A3E33' }}>Retainment to release</span>
              <span style={{ fontWeight: 600, color: '#B85431' }}>₦35,000</span>
            </div>
          </div>
        </div>

        {/* Two-way checks */}
        <div className="hm-label" style={{ marginBottom: 10 }}>Confirm before releasing</div>
        {[
          { t: 'I have signed the lease with Mr. Olabode', sub: 'Tenancy agreement dated &amp; signed', on: true },
          { t: 'I have the keys and access to the flat', sub: 'Front door, gate, BQ', on: true },
          { t: 'The flat matches the listing', sub: 'Photos, features, what stays', on: false },
        ].map((c, i) => (
          <div key={i} style={{
            display: 'flex', gap: 12, alignItems: 'flex-start',
            background: '#FFFBF3', border: `1px solid ${c.on ? '#B85431' : '#E2D6BD'}`,
            borderRadius: 14, padding: 14, marginBottom: 8,
          }}>
            <div style={{
              width: 22, height: 22, borderRadius: 9999, flexShrink: 0,
              background: c.on ? '#B85431' : 'transparent',
              border: `2px solid ${c.on ? '#B85431' : '#C9B997'}`,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', marginTop: 1,
            }}>{c.on && <Ico name="check" size={14} color="white"/>}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500 }} dangerouslySetInnerHTML={{ __html: c.t }}/>
              <div style={{ fontSize: 12, color: '#877763', marginTop: 2 }} dangerouslySetInnerHTML={{ __html: c.sub }}/>
            </div>
          </div>
        ))}

        <button style={{
          width: '100%', height: 56, marginTop: 16,
          background: '#B85431', color: 'white',
          border: 0, borderRadius: 16,
          fontSize: 15, fontWeight: 600,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          boxShadow: '0 12px 28px -6px rgba(184, 84, 49, 0.4)',
        }}>
          <Ico name="key" size={16}/> Confirm &amp; release ₦35,000
        </button>
        <button style={{
          width: '100%', height: 48, marginTop: 10,
          background: 'transparent', color: '#B85431',
          border: 0, fontSize: 13.5, fontWeight: 500,
        }}>
          Something's wrong — open a dispute
        </button>
      </div>
    </div>
  );
}

// ============================================================
// 17. MY LISTINGS (Outgoing tenant dashboard)
// ============================================================
function ScreenMyListings() {
  return (
    <div className="hm-app">
      <TopBar/>
      <div className="hm-scroll">
        <div className="hm-page-title">My <span className="hm-em">handovers</span></div>
        <div className="hm-page-sub">Track who's interested, who's confirmed, who's paid.</div>

        {/* Active listing - hero */}
        <div style={{ padding: '0 20px' }}>
          <div style={{
            background: '#FFFBF3', border: '1px solid #E2D6BD',
            borderRadius: 18, overflow: 'hidden', marginBottom: 14,
          }}>
            <div style={{ display: 'flex', gap: 12, padding: 14 }}>
              <div style={{
                width: 84, height: 84, flexShrink: 0, borderRadius: 12,
                background: 'repeating-linear-gradient(135deg,#F2D9C9 0 12px,#EBC4AC 12px 24px)',
              }}></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  padding: '3px 8px', borderRadius: 9999,
                  background: '#F4E1C6', color: '#8A5A18', border: '1px solid #E1BE85',
                  fontSize: 10.5, fontWeight: 500, marginBottom: 6,
                }}>
                  <span style={{ width: 5, height: 5, background: '#8A5A18', borderRadius: 9999 }}></span>
                  3 interested
                </span>
                <div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.3, marginBottom: 4 }}>3-bed in Lekki Phase 1</div>
                <div style={{ fontSize: 11.5, color: '#877763' }}>Published 4 days ago · 168 views</div>
              </div>
            </div>
            {/* Stats grid */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
              borderTop: '1px solid #E2D6BD',
            }}>
              <div style={{ padding: '14px 12px', borderRight: '1px solid #E2D6BD' }}>
                <div style={{ fontSize: 10.5, color: '#877763', textTransform: 'uppercase', letterSpacing: '0.06em' }}>VIEWS</div>
                <div className="hm-serif" style={{ fontSize: 22, letterSpacing: '-0.02em', lineHeight: 1, marginTop: 4 }}>168</div>
              </div>
              <div style={{ padding: '14px 12px', borderRight: '1px solid #E2D6BD' }}>
                <div style={{ fontSize: 10.5, color: '#877763', textTransform: 'uppercase', letterSpacing: '0.06em' }}>SAVED</div>
                <div className="hm-serif" style={{ fontSize: 22, letterSpacing: '-0.02em', lineHeight: 1, marginTop: 4 }}>24</div>
              </div>
              <div style={{ padding: '14px 12px' }}>
                <div style={{ fontSize: 10.5, color: '#877763', textTransform: 'uppercase', letterSpacing: '0.06em' }}>RETAINED</div>
                <div className="hm-serif" style={{ fontSize: 22, letterSpacing: '-0.02em', lineHeight: 1, marginTop: 4, color: '#B85431' }}>1</div>
              </div>
            </div>
            <div style={{
              padding: '12px 14px', borderTop: '1px solid #E2D6BD',
              background: '#F2D9C9',
              display: 'flex', alignItems: 'center', gap: 10,
              fontSize: 13, fontWeight: 500, color: '#8A3C20',
            }}>
              <Ico name="bell" size={14} color="#B85431"/>
              Femi A. paid retainment · awaiting your confirmation
              <Ico name="arrowright" size={14} color="#B85431"/>
            </div>
          </div>

          {/* Quick actions */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 22 }}>
            <button style={{
              flex: 1, height: 44,
              background: '#221C16', color: '#F6F1E7',
              border: 0, borderRadius: 12, fontSize: 13, fontWeight: 500,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}><Ico name="eye" size={14}/>View public</button>
            <button style={{
              flex: 1, height: 44,
              background: '#FFFBF3', color: '#221C16',
              border: '1px solid #C9B997', borderRadius: 12, fontSize: 13, fontWeight: 500,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}><Ico name="edit" size={14}/>Edit</button>
          </div>

          {/* Past listings */}
          <div style={{ fontSize: 12, fontWeight: 600, color: '#877763', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Past handovers</div>

          <div style={{
            background: '#FFFBF3', border: '1px solid #E2D6BD',
            borderRadius: 14, padding: 14,
            display: 'flex', gap: 12, alignItems: 'center', marginBottom: 8,
          }}>
            <div style={{
              width: 56, height: 56, flexShrink: 0, borderRadius: 10,
              background: 'repeating-linear-gradient(135deg,#E8DDC6 0 10px,#DDD0B2 10px 20px)',
              filter: 'grayscale(0.4)',
            }}></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13.5, fontWeight: 600 }}>2-bed in Wuse 2 → Chinaza</div>
              <div style={{ fontSize: 11.5, color: '#877763', marginTop: 2 }}>Handed over March 2026 · ₦28,000 received</div>
            </div>
            <span style={{
              padding: '3px 8px', borderRadius: 9999,
              background: '#F2D9C9', color: '#8A3C20',
              fontSize: 11, fontWeight: 500,
            }}>Complete</span>
          </div>

          <button style={{
            width: '100%', marginTop: 16, height: 48,
            background: 'transparent', color: '#B85431',
            border: '1px dashed #C9B997', borderRadius: 14,
            fontSize: 14, fontWeight: 500,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            <Ico name="plus" size={14}/>List another apartment
          </button>
        </div>
      </div>
      <TabBar active="me"/>
    </div>
  );
}

// ============================================================
// 18. INTERESTED INBOX (outgoing tenant - confirm a tenant)
// ============================================================
function ScreenInbox() {
  return (
    <div className="hm-app">
      <div className="hm-topbar">
        <button className="hm-iconbtn"><Ico name="arrowleft" size={16}/></button>
        <div style={{ fontSize: 13, fontWeight: 600 }}>3 interested</div>
        <button className="hm-iconbtn"><Ico name="sliders" size={16}/></button>
      </div>
      <div className="hm-scroll">
        <div className="hm-page-title" style={{ fontSize: 32 }}>Who gets the <span className="hm-em">keys?</span></div>
        <div className="hm-page-sub">Confirm one within 48 hrs. Others get a full refund automatically.</div>

        <div style={{ padding: '0 20px' }}>
          {/* Top candidate — Femi paid retainment */}
          <div style={{
            background: '#FFFBF3',
            border: '2px solid #B85431',
            borderRadius: 18, padding: 18, marginBottom: 14,
            boxShadow: '0 12px 28px -10px rgba(184, 84, 49, 0.25)',
            position: 'relative',
          }}>
            <span style={{
              position: 'absolute', top: -10, right: 18,
              background: '#B85431', color: 'white',
              padding: '4px 10px', borderRadius: 9999,
              fontSize: 10.5, fontWeight: 600, letterSpacing: '0.04em',
            }}>RETAINMENT PAID</span>
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 12 }}>
              <div className="hm-avatar" style={{ background: '#221C16', color: '#D9B86E' }}>FA</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>Femi Adeyemi</div>
                  <Ico name="badge" size={14} color="#B85431"/>
                </div>
                <div style={{ fontSize: 12, color: '#877763', marginTop: 2 }}>Senior eng. at a fintech · 30 · Yaba currently</div>
                <div style={{ fontSize: 11, color: '#B85431', marginTop: 4, fontFamily: '"Geist Mono", monospace' }}>PAID ₦37,500 · 2 HRS AGO</div>
              </div>
            </div>
            <div style={{
              background: '#EFE7D6', padding: 12, borderRadius: 10,
              fontSize: 13, lineHeight: 1.5, color: '#221C16',
              fontFamily: '"Instrument Serif", serif',
              fontStyle: 'italic',
              marginBottom: 12,
            }}>
              "Quiet, no parties. I work from home so I'd actually be there to receive packages. Can move in by Aug 5 or whenever works."
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{
                flex: 1, height: 46,
                background: '#B85431', color: 'white',
                border: 0, borderRadius: 12, fontWeight: 600, fontSize: 14,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              }}><Ico name="check" size={14}/>Confirm Femi</button>
              <button style={{
                height: 46, padding: '0 14px',
                background: '#FFFBF3', color: '#221C16',
                border: '1px solid #C9B997', borderRadius: 12, fontWeight: 500, fontSize: 13.5,
                display: 'inline-flex', alignItems: 'center', gap: 6,
              }}><Ico name="msg2" size={14}/>Chat</button>
            </div>
            <div style={{ fontSize: 11, color: '#877763', textAlign: 'center', marginTop: 10 }}>
              ⏱ You have 46h 12m to confirm or refund.
            </div>
          </div>

          {/* Other interested */}
          {[
            { i: 'KA', name: 'Kemi Adetola', meta: 'Doctor · 33 · Surulere', msg: 'Hi, I love the place. Available to view this weekend.' },
            { i: 'NO', name: 'Nnamdi Okeke', meta: 'Designer · 27 · Ikeja', msg: 'Hello — would the landlord consider rent in two tranches?' },
          ].map((p, i) => (
            <div key={i} style={{
              background: '#FFFBF3', border: '1px solid #E2D6BD',
              borderRadius: 16, padding: 16, marginBottom: 10,
            }}>
              <div style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
                <div className="hm-avatar" style={{ width: 44, height: 44, fontSize: 16 }}>{p.i}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{p.name}</div>
                  <div style={{ fontSize: 11.5, color: '#877763', marginTop: 2 }}>{p.meta}</div>
                </div>
                <span style={{
                  padding: '3px 8px', borderRadius: 9999,
                  background: '#EFE7D6', color: '#877763',
                  fontSize: 10.5, fontWeight: 500, height: 'fit-content',
                }}>Inquired</span>
              </div>
              <div style={{ fontSize: 13, color: '#4A3E33', lineHeight: 1.4, marginBottom: 8 }}>{p.msg}</div>
              <button style={{
                background: 'transparent', color: '#B85431',
                border: 0, padding: 0, fontSize: 13, fontWeight: 500,
                display: 'inline-flex', alignItems: 'center', gap: 6,
              }}>Reply <Ico name="arrowright" size={12}/></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// 19. PROFILE / ME
// ============================================================
function ScreenProfile() {
  return (
    <div className="hm-app">
      <div className="hm-topbar">
        <div className="hm-brand">
          <span className="hm-brand-dot"></span>
          <span className="hm-brand-name">Handover</span>
        </div>
        <button className="hm-iconbtn"><Ico name="ellipsis" size={16}/></button>
      </div>
      <div className="hm-scroll">

        {/* Profile header */}
        <div style={{
          margin: '0 20px 20px',
          background: 'linear-gradient(135deg, #221C16 0%, #4A3E33 100%)',
          color: '#F6F1E7',
          borderRadius: 20, padding: 22, position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: -40, right: -40,
            width: 160, height: 160, borderRadius: 9999,
            background: 'rgba(184, 84, 49, 0.18)',
          }}></div>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 14, position: 'relative' }}>
            <div style={{
              width: 64, height: 64, borderRadius: 9999,
              background: '#D9B86E', color: '#221C16',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: '"Instrument Serif", serif',
              fontSize: 26,
            }}>FA</div>
            <div>
              <div style={{ fontSize: 19, fontWeight: 600 }}>Femi Adeyemi</div>
              <div style={{ fontSize: 12, color: 'rgba(246, 241, 231, 0.7)', marginTop: 2, display: 'flex', alignItems: 'center', gap: 5 }}>
                <Ico name="badge" size={12} color="#D9B86E"/>
                Fully verified · joined Apr 2026
              </div>
            </div>
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12,
            paddingTop: 14, borderTop: '1px solid rgba(246, 241, 231, 0.12)',
            position: 'relative',
          }}>
            <div>
              <div className="hm-serif" style={{ fontSize: 22, letterSpacing: '-0.02em', lineHeight: 1 }}>1</div>
              <div style={{ fontSize: 11, color: 'rgba(246, 241, 231, 0.6)', marginTop: 3 }}>Handover</div>
            </div>
            <div>
              <div className="hm-serif" style={{ fontSize: 22, letterSpacing: '-0.02em', lineHeight: 1 }}>14</div>
              <div style={{ fontSize: 11, color: 'rgba(246, 241, 231, 0.6)', marginTop: 3 }}>Saved</div>
            </div>
            <div>
              <div className="hm-serif" style={{ fontSize: 22, letterSpacing: '-0.02em', lineHeight: 1, color: '#D9B86E' }}>4.9</div>
              <div style={{ fontSize: 11, color: 'rgba(246, 241, 231, 0.6)', marginTop: 3 }}>Tenant rating</div>
            </div>
          </div>
        </div>

        {/* Quick: active handover */}
        <div style={{
          margin: '0 20px 22px',
          background: '#F2D9C9', border: '1px solid #E5BFA8',
          borderRadius: 14, padding: 14,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{
            width: 38, height: 38, borderRadius: 9999, flexShrink: 0,
            background: '#B85431', color: 'white',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}><Ico name="key" size={16}/></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: '#8A3C20' }}>Active handover</div>
            <div style={{ fontSize: 12, color: '#8A3C20', marginTop: 2 }}>3-bed in Lekki · move in Aug 1</div>
          </div>
          <Ico name="arrowright" size={16} color="#B85431"/>
        </div>

        {/* Settings list */}
        <div style={{ padding: '0 20px' }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#877763', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Account</div>
          <div style={{
            background: '#FFFBF3', border: '1px solid #E2D6BD',
            borderRadius: 14, overflow: 'hidden', marginBottom: 18,
          }}>
            {[
              { i: 'badge', t: 'Verification', d: 'NIN, selfie, phone' },
              { i: 'phone', t: 'Phone & WhatsApp', d: '+234 803 ••• 8829' },
              { i: 'naira', t: 'Payment methods', d: 'GTB, Card' },
              { i: 'shield', t: 'Privacy & visibility' },
            ].map((row, i, arr) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '14px 16px',
                borderBottom: i < arr.length - 1 ? '1px solid #E2D6BD' : 0,
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                  background: '#F2D9C9', color: '#B85431',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                }}><Ico name={row.i} size={15}/></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{row.t}</div>
                  {row.d && <div style={{ fontSize: 12, color: '#877763', marginTop: 1 }}>{row.d}</div>}
                </div>
                <Ico name="chevdown" size={14} color="#C9B997"/>
              </div>
            ))}
          </div>

          <div style={{ fontSize: 12, fontWeight: 600, color: '#877763', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Support</div>
          <div style={{
            background: '#FFFBF3', border: '1px solid #E2D6BD',
            borderRadius: 14, overflow: 'hidden',
          }}>
            {[
              { i: 'help', t: 'How Handover works' },
              { i: 'fileText', t: 'Disputes & refunds' },
              { i: 'star', t: 'Rate the app' },
            ].map((row, i, arr) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '14px 16px',
                borderBottom: i < arr.length - 1 ? '1px solid #E2D6BD' : 0,
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                  background: '#EFE7D6', color: '#4A3E33',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                }}><Ico name={row.i} size={15}/></div>
                <div style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{row.t}</div>
                <Ico name="chevdown" size={14} color="#C9B997"/>
              </div>
            ))}
          </div>

          <button style={{
            width: '100%', marginTop: 18, height: 46,
            background: 'transparent', color: '#B23A2F',
            border: 0, fontSize: 14, fontWeight: 500,
          }}>Sign out</button>
        </div>
      </div>
      <TabBar active="me"/>
    </div>
  );
}

// Expose everything
Object.assign(window, {
  Ico, TopBar, TabBar, StatusPip,
  ScreenOnboarding, ScreenBrowse, ScreenFilters,
  ScreenListing, ScreenPay, ScreenStatus, ScreenManual, ScreenPost,
  ScreenSplash, ScreenSignIn, ScreenVerify, ScreenMap, ScreenGallery,
  ScreenChat, ScreenPaymentSuccess, ScreenMoveIn,
  ScreenMyListings, ScreenInbox, ScreenProfile,
});
