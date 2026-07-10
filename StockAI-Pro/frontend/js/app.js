/* ============================================================
   StockAI Pro — app.js
   Comprehensive JavaScript for all interactions & AI features
   ============================================================ */

// ================================================================
// DATA LAYER — Simulated live market data
// ================================================================
const STOCK_DB = {
  TCS:    { name:'Tata Consultancy Services', price:3842.15, change:+1.34, sector:'IT', pe:28.4, mcap:'large',  volume:'12.3M', roe:45.2, debt:0.1,  dividend:1.8, signal:'buy'  },
  INFY:   { name:'Infosys Ltd',               price:1672.80, change:-0.82, sector:'IT', pe:24.1, mcap:'large',  volume:'18.7M', roe:32.1, debt:0.0,  dividend:2.3, signal:'hold' },
  RELIANCE:{ name:'Reliance Industries',      price:2918.40, change:+0.67, sector:'Energy', pe:23.5, mcap:'large', volume:'22.1M', roe:12.8, debt:0.4, dividend:0.6, signal:'buy' },
  HDFCBANK:{ name:'HDFC Bank Ltd',            price:1784.25, change:+2.14, sector:'Banking', pe:18.9, mcap:'large', volume:'15.4M', roe:17.5, debt:6.8, dividend:1.3, signal:'buy' },
  WIPRO:  { name:'Wipro Ltd',                 price:568.30,  change:-1.23, sector:'IT', pe:21.7, mcap:'large',  volume:'9.8M',  roe:18.9, debt:0.2,  dividend:1.1, signal:'hold' },
  AXISBANK:{ name:'Axis Bank Ltd',            price:1092.55, change:+3.21, sector:'Banking', pe:14.3, mcap:'large', volume:'11.2M', roe:15.4, debt:7.2, dividend:0.9, signal:'buy' },
  SUNPHARMA:{ name:'Sun Pharmaceutical',     price:1623.70, change:+1.88, sector:'Pharma', pe:31.5, mcap:'large', volume:'6.4M', roe:22.3, debt:0.1, dividend:0.5, signal:'watch' },
  MARUTI:  { name:'Maruti Suzuki India',      price:12480.00,change:+0.94, sector:'Auto', pe:26.8, mcap:'large',  volume:'4.2M',  roe:18.6, debt:0.0,  dividend:1.2, signal:'buy'  },
  ITC:     { name:'ITC Ltd',                  price:481.20,  change:-0.34, sector:'FMCG', pe:26.1, mcap:'large',  volume:'28.6M', roe:29.7, debt:0.0,  dividend:3.7, signal:'hold' },
  BAJFINANCE:{ name:'Bajaj Finance Ltd',      price:8124.50, change:+2.56, sector:'Banking', pe:32.4, mcap:'large', volume:'5.1M', roe:21.8, debt:4.1, dividend:0.5, signal:'watch' },
  TATASTEEL:{ name:'Tata Steel Ltd',          price:168.45,  change:-2.15, sector:'Metal', pe:9.7,  mcap:'large',  volume:'44.3M', roe:15.2, debt:1.8,  dividend:2.1, signal:'hold' },
  POWERGRID:{ name:'Power Grid Corp',         price:334.80,  change:+0.89, sector:'Energy', pe:17.2, mcap:'large', volume:'20.1M', roe:20.8, debt:1.9, dividend:4.1, signal:'buy'  },
  CDSL:    { name:'Central Depository Services', price:2180.60, change:+4.31, sector:'Finance', pe:62.4, mcap:'mid', volume:'2.8M', roe:38.4, debt:0.0, dividend:1.9, signal:'watch' },
  TRENT:   { name:'Trent Ltd',                price:6840.25, change:+5.12, sector:'Retail', pe:182.6, mcap:'mid', volume:'1.2M', roe:22.1, debt:0.3, dividend:0.3, signal:'watch' },
  NYKAA:   { name:'FSN E-Commerce (Nykaa)',   price:184.20,  change:-3.44, sector:'Retail', pe:310.5, mcap:'mid', volume:'8.7M', roe:5.8, debt:0.2, dividend:0.0, signal:'sell'  }
};

const INDICES = [
  { name:'NIFTY 50',      symbol:'NIFTY',    value:24832.15, change:+1.24,  pct:'+1.24%', trend: [24200,24310,24280,24450,24620,24580,24710,24780,24832] },
  { name:'SENSEX',        symbol:'SENSEX',   value:81674.40, change:+1.19,  pct:'+1.19%', trend: [80200,80450,80380,80720,81100,81050,81350,81520,81674] },
  { name:'NIFTY BANK',    symbol:'BANKNIFTY',value:52840.30, change:+1.87,  pct:'+1.87%', trend: [51800,52000,51950,52200,52480,52420,52630,52750,52840] },
  { name:'NIFTY IT',      symbol:'NIFTYIT',  value:38210.80, change:-0.43,  pct:'-0.43%', trend: [38600,38500,38450,38350,38280,38220,38190,38240,38211] },
  { name:'NIFTY MIDCAP',  symbol:'MIDCAP',   value:54120.65, change:+0.78,  pct:'+0.78%', trend: [53700,53750,53820,53880,53960,54010,54070,54100,54121] },
  { name:'NIFTY PHARMA',  symbol:'PHARMA',   value:21384.20, change:+1.12,  pct:'+1.12%', trend: [21100,21150,21200,21220,21280,21320,21350,21370,21384] }
];

const SECTORS = [
  { name:'Banking',   change:+2.14, stocks: 38 },
  { name:'IT',        change:-0.43, stocks: 22 },
  { name:'Auto',      change:+0.94, stocks: 15 },
  { name:'Pharma',    change:+1.88, stocks: 31 },
  { name:'FMCG',      change:-0.21, stocks: 16 },
  { name:'Energy',    change:+1.24, stocks: 11 },
  { name:'Metals',    change:-1.54, stocks: 14 },
  { name:'Realty',    change:+3.12, stocks: 9  },
  { name:'Telecom',   change:+0.67, stocks: 6  },
  { name:'Infra',     change:+1.03, stocks: 19 },
  { name:'Consumer',  change:-0.82, stocks: 21 },
  { name:'Defence',   change:+2.54, stocks: 8  }
];

const NEWS = [
  { source:'Economic Times', time:'15 min ago', headline:'RBI holds repo rate steady at 6.5% amid easing inflation concerns', summary:'The Reserve Bank of India maintained its benchmark interest rate, signaling a cautious stance as inflation trends lower but global uncertainties persist.', sentiment:'bullish', tags:['RBI','Inflation','Banking'] },
  { source:'Moneycontrol',   time:'42 min ago', headline:'TCS bags ₹8,000 crore deal with UK-based financial services firm', summary:'Tata Consultancy Services announced a major multi-year digital transformation contract, boosting investor confidence in the IT giant.', sentiment:'bullish', tags:['TCS','IT Sector','Deal'] },
  { source:'Business Standard', time:'1h ago', headline:'FIIs pump ₹6,240 crore into Indian equities — second consecutive week of inflows', summary:'Foreign institutional investors continued to show confidence in Indian markets amid favorable macroeconomic conditions and strong corporate earnings.', sentiment:'bullish', tags:['FII','Capital Flows','Equity'] },
  { source:'LiveMint',       time:'2h ago', headline:'Crude oil slips below $78 — positive signal for India\'s current account', summary:'International crude oil prices fell sharply on demand concerns from China, potentially easing India\'s import bill and helping the rupee stabilize.', sentiment:'neutral', tags:['Crude Oil','Rupee','Macro'] },
  { source:'NDTV Profit',    time:'3h ago', headline:'Midcap, smallcap indices outperform Nifty 50 for fifth straight session', summary:'Broader market indices continued their strong run amid robust domestic retail participation and positive earnings outlook for mid-size companies.', sentiment:'bullish', tags:['Midcap','Smallcap','Rally'] },
  { source:'Reuters India',  time:'4h ago', headline:'US Fed minutes signal potential rate cut in September — global markets rally', summary:'Minutes from the latest Federal Reserve meeting suggest policymakers are increasingly open to cutting rates this year, lifting risk assets globally.', sentiment:'bullish', tags:['US Fed','Global Markets','Rate Cut'] },
  { source:'PTI',            time:'5h ago', headline:'India\'s manufacturing PMI hits 3-month high at 58.4 in June', summary:'The Purchasing Managers\' Index for Indian manufacturing rose to its highest level in three months, indicating strong industrial activity and demand.', sentiment:'bullish', tags:['PMI','Manufacturing','Growth'] },
  { source:'Bloomberg Quint',time:'6h ago', headline:'Nykaa Q1FY27 results disappoint — revenue misses estimates by 8%', summary:'FSN E-Commerce Ventures reported quarterly revenue below analyst estimates, leading to a sharp drop in the stock amid concerns over profitability timeline.', sentiment:'bearish', tags:['Nykaa','Results','Retail'] },
  { source:'Zee Business',   time:'8h ago', headline:'Gold prices surge to ₹76,500/10g — safe-haven demand spikes', summary:'Bullion rallied sharply as geopolitical tensions and currency volatility drove investors toward traditional safe-haven assets.', sentiment:'neutral', tags:['Gold','Commodities','Safe Haven'] }
];

const AI_RESPONSES = {
  greetings: ['hello','hi','hey','namaste','good morning','good evening'],
  market: {
    keywords: ['market','nifty','sensex','today','outlook','trend'],
    response: `📊 **Market Snapshot (Today):**\n\n🟢 NIFTY 50: 24,832 (+1.24%)\n🟢 SENSEX: 81,674 (+1.19%)\n🟢 BANK NIFTY: 52,840 (+1.87%)\n🔴 NIFTY IT: 38,211 (-0.43%)\n\n**AI Outlook:** Markets are showing bullish momentum driven by:\n• Strong FII inflows (₹6,240 Cr this week)\n• RBI's steady policy stance\n• Positive global cues from US Fed\n• Robust domestic demand indicators\n\nKey support for NIFTY is at 24,400; resistance at 25,200.`
  },
  pe: {
    keywords: ['pe ratio','price to earnings','pe','what is pe'],
    response: `📘 **P/E Ratio Explained:**\n\nThe **Price-to-Earnings (P/E) ratio** measures how much investors pay for every ₹1 of a company's earnings.\n\n**Formula:** P/E = Stock Price ÷ Earnings Per Share (EPS)\n\n🔵 **Low P/E (<15):** Potentially undervalued, or slow growth expected\n🟡 **Moderate P/E (15–30):** Fairly valued for most sectors\n🔴 **High P/E (>30):** High growth expected or possibly overvalued\n\n**Example:** TCS at P/E 28.4 vs. sector average 25 → slightly premium but justified by consistent earnings growth.`
  },
  tcs: {
    keywords: ['tcs','tata consultancy','analyze tcs','tcs stock'],
    response: `🔍 **TCS (Tata Consultancy Services) — AI Analysis:**\n\n**Current Price:** ₹3,842 (+1.34%)\n**AI Signal:** 🟢 Strong Buy\n\n📊 **Key Metrics:**\n• P/E: 28.4 (vs IT avg 25.8)\n• ROE: 45.2% — Excellent\n• Dividend Yield: 1.8%\n• Debt-to-Equity: 0.1 (Near-debt-free)\n\n✅ **Strengths:** Massive deal wins (₹8,000 Cr new contract), margin improvement, strong cash generation, leader in AI/cloud services\n\n⚠️ **Risks:** INR appreciation, attrition pressure, global IT spend slowdown\n\n🎯 **AI Target:** ₹4,200 (12-month horizon, +9.3% upside)`
  },
  risk: {
    keywords: ['risk','portfolio risk','reduce risk','diversify','safe'],
    response: `🛡️ **How to Reduce Portfolio Risk:**\n\n**1. Diversify Across Sectors**\nDon't put more than 20% in any single sector. Mix IT, Banking, FMCG, Pharma.\n\n**2. The 5% Rule**\nLimit individual stock exposure to max 5–10% of portfolio.\n\n**3. Add Defensive Stocks**\nFMCG (ITC, HUL) and Pharma stocks tend to hold up in downturns.\n\n**4. Maintain Cash Buffer**\nKeep 10–15% cash for averaging down or new opportunities.\n\n**5. Use Stop-Losses**\nSet stop-loss at 8–12% below your buy price.\n\n**6. Balance Large & Mid Cap**\n70% large cap + 30% mid cap = Good risk-reward balance.`
  },
  buy: {
    keywords: ['best stocks','buy today','which stock','recommend','top picks','investment ideas'],
    response: `🎯 **AI Top Picks — July 2026:**\n\n**Strong Buy:**\n1. 🟢 **HDFC Bank** (₹1,784) — Banking leader, rate cut beneficiary\n2. 🟢 **TCS** (₹3,842) — Mega deal wins, margin expansion\n3. 🟢 **Reliance** (₹2,918) — Jio growth, retail momentum\n4. 🟢 **Maruti Suzuki** (₹12,480) — EV transition, record volumes\n5. 🟢 **Power Grid** (₹334) — Green energy capex play\n\n**Watchlist:**\n• Sun Pharma — FDA clearances upcoming\n• Bajaj Finance — Awaiting loan growth acceleration\n\n⚠️ *This is AI-generated educational content, not financial advice. Please consult a SEBI-registered advisor.*`
  },
  candle: {
    keywords: ['candlestick','candle','patterns','chart patterns','technical'],
    response: `📊 **Candlestick Patterns — Quick Guide:**\n\n**Bullish Patterns:**\n🟢 **Hammer** — Bullish reversal at bottom\n🟢 **Morning Star** — 3-day reversal signal\n🟢 **Bullish Engulfing** — Strong buy signal\n🟢 **Doji** — Indecision (watch for breakout)\n\n**Bearish Patterns:**\n🔴 **Shooting Star** — Bearish reversal at top\n🔴 **Evening Star** — 3-day bearish reversal\n🔴 **Bearish Engulfing** — Strong sell signal\n\n💡 **Key Rule:** Never trade a pattern in isolation. Always confirm with volume and atleast one other indicator (RSI, MACD).`
  },
  outlook2026: {
    keywords: ['2026','market outlook','year outlook','forecast','prediction'],
    response: `🔭 **Indian Market Outlook — 2026:**\n\n**Macro Tailwinds:**\n✅ GDP growth target: 7.2% (IMF)\n✅ FII flows remain positive — India premium story intact\n✅ Capex super-cycle: ₹11.1 lakh crore government spending\n✅ US Fed rate cuts → EM inflows expected\n\n**Opportunities:**\n• Defence & Infra — PSU stocks likely to outperform\n• Financial Services — Credit growth revival\n• Healthcare — Aging demographics + export pharma\n• Renewables — Green energy transition accelerating\n\n**Risks to Watch:**\n⚠️ Geopolitical tensions (Middle East, Taiwan Strait)\n⚠️ INR depreciation if oil spikes\n⚠️ Domestic election outcomes\n\n🎯 **AI NIFTY Target FY27:** 27,000–28,500`
  }
};

// ================================================================
// PORTFOLIO STATE
// ================================================================
let portfolio = JSON.parse(localStorage.getItem('sai_portfolio') || '[]');

// ================================================================
// UTILITIES
// ================================================================
function rand(min, max) { return +(Math.random() * (max - min) + min).toFixed(2); }
function formatINR(n) { return '₹' + n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function formatVol(v) { return v; }

// ================================================================
// CHART DRAWING — Lightweight Canvas Charts
// ================================================================
function drawLineChart(canvas, data, positive = true) {
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * w,
    y: h - ((v - min) / range) * (h - 20) - 10
  }));

  // Gradient fill
  const grd = ctx.createLinearGradient(0, 0, 0, h);
  if (positive) {
    grd.addColorStop(0, 'rgba(0,245,160,0.25)');
    grd.addColorStop(1, 'rgba(0,245,160,0)');
  } else {
    grd.addColorStop(0, 'rgba(239,68,68,0.25)');
    grd.addColorStop(1, 'rgba(239,68,68,0)');
  }

  ctx.beginPath();
  ctx.moveTo(pts[0].x, h);
  ctx.lineTo(pts[0].x, pts[0].y);
  pts.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.lineTo(pts[pts.length-1].x, h);
  ctx.closePath();
  ctx.fillStyle = grd;
  ctx.fill();

  // Line
  ctx.beginPath();
  ctx.moveTo(pts[0].x, pts[0].y);
  pts.forEach(p => ctx.lineTo(p.x, p.y));
  ctx.strokeStyle = positive ? '#00f5a0' : '#ef4444';
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.stroke();

  // Dot at last point
  const last = pts[pts.length - 1];
  ctx.beginPath();
  ctx.arc(last.x, last.y, 4, 0, Math.PI * 2);
  ctx.fillStyle = positive ? '#00f5a0' : '#ef4444';
  ctx.fill();
}

function generateSeries(base, points = 20, volatility = 0.015) {
  const series = [base];
  for (let i = 1; i < points; i++) {
    const prev = series[i-1];
    series.push(+(prev * (1 + (Math.random()-0.48) * volatility)).toFixed(2));
  }
  return series;
}

// ================================================================
// HERO CHART
// ================================================================
function initHeroChart() {
  const canvas = document.getElementById('heroChart');
  if (!canvas) return;
  const data = INDICES[0].trend;
  drawLineChart(canvas, data, true);
}

// ================================================================
// TICKER
// ================================================================
function buildTicker() {
  const track = document.getElementById('tickerTrack');
  if (!track) return;

  const items = Object.entries(STOCK_DB).map(([sym, d]) => ({
    sym,
    price: d.price + rand(-15, 15),
    change: d.change + rand(-0.3, 0.3)
  }));

  const html = [...items, ...items].map(it => `
    <div class="ticker-item">
      <span class="ticker-name">${it.sym}</span>
      <span class="ticker-price">${formatINR(it.price)}</span>
      <span class="ticker-change ${it.change >= 0 ? 'up' : 'down'}">${it.change >= 0 ? '+' : ''}${it.change.toFixed(2)}%</span>
    </div>
  `).join('');
  track.innerHTML = html;
}

// ================================================================
// INDICES GRID
// ================================================================
function buildIndices() {
  const container = document.getElementById('indicesGrid');
  if (!container) return;
  container.innerHTML = INDICES.map((idx, i) => {
    const pos = idx.change >= 0;
    return `
      <div class="index-card ${pos ? '' : 'negative'}" onclick="showIndexDetail('${idx.symbol}')">
        <div class="index-name">${idx.name}</div>
        <div class="index-value">${idx.value.toLocaleString('en-IN')}</div>
        <div class="index-change ${pos ? 'up' : 'down'}">${pos ? '▲' : '▼'} ${Math.abs(idx.change)}% today</div>
        <canvas class="index-mini-chart" id="miniChart${i}" width="200" height="40"></canvas>
      </div>`;
  }).join('');

  INDICES.forEach((idx, i) => {
    const c = document.getElementById(`miniChart${i}`);
    if (c) drawLineChart(c, idx.trend, idx.change >= 0);
  });
}

// ================================================================
// GAINERS / LOSERS
// ================================================================
function buildGainersLosers() {
  const stocks = Object.entries(STOCK_DB);
  const sorted = stocks.sort((a,b) => b[1].change - a[1].change);

  const gainers = sorted.filter(([,d]) => d.change > 0).slice(0, 6);
  const losers  = sorted.filter(([,d]) => d.change < 0).sort((a,b) => a[1].change - b[1].change).slice(0, 6);

  function rows(list, color) {
    return list.map(([sym, d]) => `
      <tr onclick="openStockModal('${sym}')">
        <td><span class="stock-name">${sym}</span></td>
        <td>${formatINR(d.price)}</td>
        <td class="${color}">${d.change >= 0 ? '+' : ''}${d.change.toFixed(2)}%</td>
        <td>${d.volume}</td>
      </tr>
    `).join('');
  }

  document.querySelector('#gainersTable tbody').innerHTML = rows(gainers, 'up-text');
  document.querySelector('#losersTable tbody').innerHTML  = rows(losers,  'down-text');
}

// ================================================================
// AI PICKS
// ================================================================
const AI_PICKS = Object.entries(STOCK_DB).slice(0, 9).map(([sym, d]) => ({
  sym, ...d,
  target: +(d.price * (1 + rand(0.08, 0.22))).toFixed(0),
  upside: rand(8, 22),
  aiScore: rand(65, 97),
  reason: getPickReason(sym, d)
}));

function getPickReason(sym, d) {
  const reasons = {
    TCS:      'Mega-deal wins driving revenue visibility. AI & cloud transformation leadership positions TCS ahead of peers.',
    INFY:     'Margin recovery in progress. New CEO-led cost optimization likely to boost profitability in H2FY27.',
    RELIANCE: 'Jio 5G subscriber momentum accelerating. Retail segment showing strong SSSG growth.',
    HDFCBANK: 'Post-merger integration complete. Loan growth re-accelerating, NIM stabilizing near 3.5%.',
    WIPRO:    'Valuation discount to peers. Turnaround initiative gaining traction under new management.',
    AXISBANK: 'Strong Q4 results beat estimates. Credit costs declining, ROE approaching 18%.',
    SUNPHARMA:'Multiple FDA approvals expected for specialty pipeline. Branded generic growth strong.',
    MARUTI:   'Record CNG vehicle volumes. SUV portfolio expansion capturing market share.',
    ITC:      'Cigarette volume growth resuming. Hotels demerger to unlock value.'
  };
  return reasons[sym] || 'Strong technical setup with improving fundamentals. AI model shows high confidence.';
}

let currentFilter = 'all';

function buildPicks(filter = 'all') {
  const container = document.getElementById('picksGrid');
  if (!container) return;

  const filtered = filter === 'all' ? AI_PICKS : AI_PICKS.filter(p => p.signal === filter);

  container.innerHTML = filtered.map(pick => `
    <div class="pick-card" data-signal="${pick.signal}" onclick="openStockModal('${pick.sym}')">
      <div class="pick-card-top">
        <div class="pick-stock-info">
          <h3>${pick.sym}</h3>
          <span>${pick.name.substring(0, 28)}${pick.name.length > 28 ? '...' : ''}</span>
        </div>
        <span class="signal-badge signal-${pick.signal}">${signalLabel(pick.signal)}</span>
      </div>
      <div class="pick-price-row">
        <span class="pick-price">${formatINR(pick.price)}</span>
        <span class="pick-change ${pick.change >= 0 ? 'up-text' : 'down-text'}">${pick.change >= 0 ? '+' : ''}${pick.change.toFixed(2)}%</span>
      </div>
      <div class="pick-metrics">
        <div class="pick-metric">
          <div class="pick-metric-label">Target</div>
          <div class="pick-metric-value">₹${pick.target}</div>
        </div>
        <div class="pick-metric">
          <div class="pick-metric-label">Upside</div>
          <div class="pick-metric-value" style="color: var(--positive)">+${pick.upside.toFixed(1)}%</div>
        </div>
        <div class="pick-metric">
          <div class="pick-metric-label">P/E Ratio</div>
          <div class="pick-metric-value">${pick.pe}x</div>
        </div>
        <div class="pick-metric">
          <div class="pick-metric-label">Sector</div>
          <div class="pick-metric-value">${pick.sector}</div>
        </div>
      </div>
      <div class="ai-score-bar">
        <div class="ai-score-label">
          <span>AI Confidence Score</span>
          <span>${pick.aiScore.toFixed(0)}%</span>
        </div>
        <div class="score-track">
          <div class="score-fill" style="width: ${pick.aiScore}%"></div>
        </div>
      </div>
    </div>
  `).join('');

  if (filtered.length === 0) {
    container.innerHTML = '<p style="text-align:center; color: var(--text-muted); grid-column: 1/-1; padding: 40px 0;">No stocks match this filter.</p>';
  }
}

function signalLabel(signal) {
  const labels = { buy: 'Strong Buy', hold: 'Hold', watch: 'Watchlist', sell: 'Sell' };
  return labels[signal] || signal;
}

function filterPicks(filter, btn) {
  document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentFilter = filter;
  buildPicks(filter);
}

// ================================================================
// AI CONFIDENCE BARS
// ================================================================
function buildConfidenceBars() {
  const container = document.getElementById('confidenceBars');
  if (!container) return;
  const models = [
    { name: 'Fundamental Analysis', pct: 92.4 },
    { name: 'Technical Signals',    pct: 89.1 },
    { name: 'Sentiment Engine',     pct: 78.6 },
    { name: 'Macro Factor Model',   pct: 83.2 },
    { name: 'Earnings Predictor',   pct: 86.7 },
    { name: 'Price Pattern AI',     pct: 91.0 }
  ];
  container.innerHTML = models.map(m => `
    <div class="confidence-item">
      <div class="confidence-name">${m.name}</div>
      <div class="confidence-bar-track">
        <div class="confidence-bar-fill" style="width: 0%" data-target="${m.pct}"></div>
      </div>
      <div class="confidence-pct">${m.pct}%</div>
    </div>
  `).join('');

  setTimeout(() => {
    document.querySelectorAll('.confidence-bar-fill').forEach(bar => {
      bar.style.width = bar.dataset.target + '%';
    });
  }, 300);
}

// ================================================================
// SCREENER
// ================================================================
function runScreener() {
  const mcap    = document.getElementById('filterMarketCap').value;
  const sector  = document.getElementById('filterSector').value;
  const pe      = document.getElementById('filterPE').value;
  const signal  = document.getElementById('filterSignal').value;

  const sectorMap = { it: 'IT', banking: 'Banking', pharma: 'Pharma', auto: 'Auto', fmcg: 'FMCG', energy: 'Energy', finance:'Finance', retail:'Retail', metal:'Metal' };
  const targetSector = sectorMap[sector] || '';

  let results = Object.entries(STOCK_DB).filter(([sym, d]) => {
    if (mcap && d.mcap !== mcap) return false;
    if (targetSector && !d.sector.toLowerCase().includes(targetSector.toLowerCase())) return false;
    if (pe === 'low'  && d.pe >= 15) return false;
    if (pe === 'mid'  && (d.pe < 15 || d.pe > 30)) return false;
    if (pe === 'high' && d.pe <= 30) return false;
    if (signal && d.signal !== signal) return false;
    return true;
  });

  const container = document.getElementById('screenerResults');

  if (results.length === 0) {
    container.innerHTML = `<div class="screener-placeholder"><p>No stocks matched your filters. Try relaxing your criteria.</p></div>`;
    return;
  }

  container.innerHTML = `
    <p style="font-size:0.82rem; color: var(--text-muted); margin-bottom: 16px;">${results.length} stocks found</p>
    <table class="screener-table">
      <thead><tr>
        <th>Symbol</th><th>Name</th><th>Price</th><th>Change</th><th>Sector</th>
        <th>P/E</th><th>Market Cap</th><th>AI Signal</th>
      </tr></thead>
      <tbody>
        ${results.map(([sym, d]) => `
          <tr onclick="openStockModal('${sym}')">
            <td><strong>${sym}</strong></td>
            <td>${d.name.substring(0,24)}${d.name.length>24?'...':''}</td>
            <td>${formatINR(d.price)}</td>
            <td class="${d.change >= 0 ? 'up-text' : 'down-text'}">${d.change >= 0 ? '+' : ''}${d.change.toFixed(2)}%</td>
            <td>${d.sector}</td>
            <td>${d.pe}x</td>
            <td style="text-transform:capitalize">${d.mcap}</td>
            <td><span class="signal-badge signal-${d.signal}">${signalLabel(d.signal)}</span></td>
          </tr>
        `).join('')}
      </tbody>
    </table>`;
}

// ================================================================
// SECTOR HEATMAP
// ================================================================
function buildHeatmap() {
  const container = document.getElementById('heatmapGrid');
  if (!container) return;
  container.innerHTML = SECTORS.map(s => {
    const cls = s.change > 0.5 ? 'positive' : s.change < -0.5 ? 'negative' : 'neutral';
    return `
      <div class="heatmap-cell ${cls}" title="${s.name}: ${s.change > 0 ? '+' : ''}${s.change}%">
        <div class="heatmap-sector">${s.name}</div>
        <div class="heatmap-change">${s.change >= 0 ? '+' : ''}${s.change}%</div>
        <div class="heatmap-stocks">${s.stocks} stocks</div>
      </div>`;
  }).join('');
}

// ================================================================
// NEWS
// ================================================================
function buildNews() {
  const container = document.getElementById('newsGrid');
  if (!container) return;
  container.innerHTML = NEWS.map(n => `
    <div class="news-card">
      <div class="news-meta">
        <span class="news-source">${n.source}</span>
        <span class="news-time">${n.time}</span>
        <span class="news-sentiment sentiment-${n.sentiment}">${n.sentiment.toUpperCase()}</span>
      </div>
      <div class="news-headline">${n.headline}</div>
      <div class="news-summary">${n.summary}</div>
      <div class="news-tags">${n.tags.map(t => `<span class="news-tag">#${t}</span>`).join('')}</div>
    </div>
  `).join('');
}

// ================================================================
// PORTFOLIO
// ================================================================
function addToPortfolio() {
  const sym   = document.getElementById('portStock').value.trim().toUpperCase();
  const qty   = parseInt(document.getElementById('portQty').value);
  const price = parseFloat(document.getElementById('portPrice').value);

  if (!sym || !qty || !price || qty <= 0 || price <= 0) {
    alert('Please fill all fields with valid values.');
    return;
  }

  const existing = portfolio.findIndex(p => p.sym === sym);
  const ltp = STOCK_DB[sym]?.price || price * (1 + rand(-0.05, 0.1));

  if (existing >= 0) {
    const old = portfolio[existing];
    const totalQty = old.qty + qty;
    const avgPrice = ((old.avgPrice * old.qty) + (price * qty)) / totalQty;
    portfolio[existing] = { sym, qty: totalQty, avgPrice: +avgPrice.toFixed(2), ltp };
  } else {
    portfolio.push({ sym, qty, avgPrice: price, ltp });
  }

  localStorage.setItem('sai_portfolio', JSON.stringify(portfolio));
  renderPortfolio();

  document.getElementById('portStock').value = '';
  document.getElementById('portQty').value = '';
  document.getElementById('portPrice').value = '';
}

function removeFromPortfolio(sym) {
  portfolio = portfolio.filter(p => p.sym !== sym);
  localStorage.setItem('sai_portfolio', JSON.stringify(portfolio));
  renderPortfolio();
}

function renderPortfolio() {
  const body = document.getElementById('portfolioBody');
  const summaryEl = document.getElementById('portfolioSummary');
  if (!body) return;

  if (portfolio.length === 0) {
    body.innerHTML = '<tr><td colspan="7" class="empty-row">No stocks added yet. Add your first stock!</td></tr>';
    summaryEl.innerHTML = '';
    return;
  }

  let totalInvested = 0, totalCurrent = 0;

  body.innerHTML = portfolio.map(p => {
    const ltp = p.ltp || p.avgPrice;
    const invest = p.avgPrice * p.qty;
    const current = ltp * p.qty;
    const pnl = current - invest;
    const pnlPct = ((pnl / invest) * 100).toFixed(2);
    totalInvested += invest;
    totalCurrent  += current;

    return `<tr>
      <td><strong>${p.sym}</strong></td>
      <td>${p.qty}</td>
      <td>${formatINR(p.avgPrice)}</td>
      <td>${formatINR(ltp)}</td>
      <td class="${pnl >= 0 ? 'up-text' : 'down-text'}">${pnl >= 0 ? '+' : ''}${formatINR(Math.abs(pnl))}</td>
      <td class="${pnlPct >= 0 ? 'up-text' : 'down-text'}">${pnlPct >= 0 ? '+' : ''}${pnlPct}%</td>
      <td><button class="delete-btn" onclick="removeFromPortfolio('${p.sym}')">Remove</button></td>
    </tr>`;
  }).join('');

  const totalPnL = totalCurrent - totalInvested;
  const totalPct = ((totalPnL / totalInvested) * 100).toFixed(2);

  summaryEl.innerHTML = `
    <div class="summary-item"><div class="summary-label">Total Invested</div><div class="summary-value">${formatINR(totalInvested)}</div></div>
    <div class="summary-item"><div class="summary-label">Current Value</div><div class="summary-value">${formatINR(totalCurrent)}</div></div>
    <div class="summary-item"><div class="summary-label">Total P&amp;L</div><div class="summary-value ${totalPnL >= 0 ? 'up-text' : 'down-text'}">${totalPnL >= 0 ? '+' : ''}${formatINR(Math.abs(totalPnL))}</div></div>
    <div class="summary-item"><div class="summary-label">Return %</div><div class="summary-value ${totalPct >= 0 ? 'up-text' : 'down-text'}">${totalPct >= 0 ? '+' : ''}${totalPct}%</div></div>`;
}

// ================================================================
// STOCK MODAL
// ================================================================
function openStockModal(sym) {
  const d = STOCK_DB[sym];
  if (!d) return;

  document.getElementById('modalStockName').textContent = sym + ' — ' + d.name;
  document.getElementById('modalSector').textContent    = d.sector;
  document.getElementById('modalPrice').textContent     = formatINR(d.price);

  const chEl = document.getElementById('modalChange');
  chEl.textContent = (d.change >= 0 ? '+' : '') + d.change.toFixed(2) + '%';
  chEl.className   = 'modal-change ' + (d.change >= 0 ? 'up' : 'down');

  document.getElementById('modalMetrics').innerHTML = [
    { label:'P/E Ratio',      value: d.pe + 'x'         },
    { label:'ROE',            value: d.roe + '%'         },
    { label:'Dividend Yield', value: d.dividend + '%'    },
    { label:'Debt/Equity',    value: d.debt              },
    { label:'Market Cap',     value: d.mcap.charAt(0).toUpperCase() + d.mcap.slice(1) },
    { label:'Volume',         value: d.volume            },
    { label:'Sector',         value: d.sector            },
    { label:'AI Signal',      value: signalLabel(d.signal) }
  ].map(m => `
    <div class="modal-metric">
      <div class="modal-metric-label">${m.label}</div>
      <div class="modal-metric-value">${m.value}</div>
    </div>`).join('');

  const pick = AI_PICKS.find(p => p.sym === sym);
  document.getElementById('modalAIText').textContent = pick?.reason || 'AI analysis in progress. Based on current technicals, this stock is being monitored for a potential entry signal.';

  const canvas = document.getElementById('modalChart');
  const series = generateSeries(d.price * 0.85, 40, 0.018);
  series[series.length - 1] = d.price;
  setTimeout(() => drawLineChart(canvas, series, d.change >= 0), 50);

  document.getElementById('stockModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeStockModal() {
  document.getElementById('stockModal').classList.remove('active');
  document.body.style.overflow = '';
}

// ================================================================
// CHAT BOT
// ================================================================
let chatOpen = false;

function openChat() {
  chatOpen = true;
  document.getElementById('chatPanel').classList.add('open');
  document.getElementById('chatOverlay').classList.add('active');
  document.getElementById('chatFab').style.display = 'none';
  setTimeout(() => document.getElementById('chatInput').focus(), 300);
}

function closeChat() {
  chatOpen = false;
  document.getElementById('chatPanel').classList.remove('open');
  document.getElementById('chatOverlay').classList.remove('active');
  document.getElementById('chatFab').style.display = 'flex';
}

function sendSuggestion(btn) {
  const text = btn.textContent.replace(/^[^\w\s]+\s/, '').trim();
  document.getElementById('chatSuggestions').style.display = 'none';
  appendUserMessage(text);
  generateAIResponse(text);
}

function handleChatKey(e) {
  if (e.key === 'Enter') sendChatMessage();
}

function sendChatMessage() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  document.getElementById('chatSuggestions').style.display = 'none';
  appendUserMessage(text);
  generateAIResponse(text);
}

function appendUserMessage(text) {
  const container = document.getElementById('chatMessages');
  const msg = document.createElement('div');
  msg.className = 'message user-message';
  msg.innerHTML = `<div class="message-bubble">${escapeHtml(text)}</div>`;
  container.appendChild(msg);
  container.scrollTop = container.scrollHeight;
}

function appendBotMessage(html) {
  const container = document.getElementById('chatMessages');
  const msg = document.createElement('div');
  msg.className = 'message bot-message';
  msg.innerHTML = `<div class="message-avatar">🤖</div><div class="message-bubble">${html}</div>`;
  container.appendChild(msg);
  container.scrollTop = container.scrollHeight;
}

function showTyping() {
  const container = document.getElementById('chatMessages');
  const typing = document.createElement('div');
  typing.className = 'message bot-message';
  typing.id = 'typingIndicator';
  typing.innerHTML = `<div class="message-avatar">🤖</div><div class="message-bubble"><div class="typing-dots"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div></div>`;
  container.appendChild(typing);
  container.scrollTop = container.scrollHeight;
}

function removeTyping() {
  const el = document.getElementById('typingIndicator');
  if (el) el.remove();
}

function generateAIResponse(query) {
  showTyping();
  const q = query.toLowerCase();

  setTimeout(() => {
    removeTyping();
    let response = getAIResponse(q);
    appendBotMessage(formatResponse(response));
  }, rand(800, 1800));
}

function getAIResponse(q) {
  // Greetings
  if (AI_RESPONSES.greetings.some(g => q.includes(g))) {
    return `Hello! Great to see you here! 👋 I'm StockAI, ready to help you navigate the markets. Ask me about any stock, market trends, investment strategies, or financial concepts!`;
  }

  // Check all response categories
  for (const [key, data] of Object.entries(AI_RESPONSES)) {
    if (key === 'greetings') continue;
    if (data.keywords && data.keywords.some(kw => q.includes(kw))) {
      return data.response;
    }
  }

  // Stock lookup
  const stockMatch = Object.keys(STOCK_DB).find(sym => q.includes(sym.toLowerCase()));
  if (stockMatch) {
    const d = STOCK_DB[stockMatch];
    return `📊 **${stockMatch} Analysis:**\n\n**Current Price:** ${formatINR(d.price)} (${d.change >= 0 ? '+' : ''}${d.change}%)\n**Sector:** ${d.sector}\n**AI Signal:** ${signalLabel(d.signal)}\n\n**Key Metrics:**\n• P/E Ratio: ${d.pe}x\n• ROE: ${d.roe}%\n• Dividend Yield: ${d.dividend}%\n• Debt-to-Equity: ${d.debt}\n\n*Tap the stock card on the AI Picks section for a detailed chart and full analysis.*`;
  }

  // Generic intelligent fallback
  const fallbacks = [
    `I understand you're asking about "${query}". This is a great topic! For the most accurate and personalized advice, I recommend:\n\n1. 📊 Check our **AI Picks** section for curated recommendations\n2. 🔍 Use the **Stock Screener** to filter stocks by your criteria\n3. 📰 Read the **Market News** for the latest developments\n\nFeel free to ask me something more specific like "analyze HDFC Bank" or "what are the best IT stocks"!`,
    `Great question! The Indian markets are dynamic and full of opportunities. Based on current AI analysis:\n\n• **NIFTY 50** is in a bullish trend with support at 24,400\n• **Banking stocks** are showing strong momentum post-RBI policy\n• **IT sector** is under slight pressure due to global slowdowns\n\nWhat specific aspect would you like to explore further?`,
    `I'm still learning about that specific topic, but I can help you with:\n\n📈 **Stock Analysis** — Just name any NSE/BSE stock\n📊 **Market Overview** — "How are markets today?"\n💡 **Concepts** — "What is P/E ratio?" or "Explain RSI"\n🎯 **Picks** — "Best stocks to buy today"\n\nWhat would you like to know?`
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

function formatResponse(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n\n/g, '<br><br>')
    .replace(/\n/g, '<br>')
    .replace(/• /g, '• ');
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(text));
  return div.innerHTML;
}

// ================================================================
// THEME TOGGLE
// ================================================================
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  const newTheme = isDark ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('sai_theme', newTheme);
  const knob = document.getElementById('themeKnob');
  if (knob) knob.textContent = newTheme === 'dark' ? '\uD83C\uDF19' : '\u2600\uFE0F';
  // Redraw charts so they pick up the new theme colors
  initHeroChart();
  buildIndices();
}

function initTheme() {
  const saved = localStorage.getItem('sai_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  const knob = document.getElementById('themeKnob');
  if (knob) knob.textContent = saved === 'dark' ? '\uD83C\uDF19' : '\u2600\uFE0F';
}

// ================================================================
// NAVBAR
// ================================================================
function toggleMenu() {
  const nav = document.getElementById('navLinks');
  const btn = document.getElementById('hamburger');
  nav.classList.toggle('open');
  btn.classList.toggle('open');
}

window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 20) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

// ================================================================
// HERO PARTICLES
// ================================================================
function initParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  for (let i = 0; i < 15; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = rand(3, 8);
    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${rand(0, 100)}%;
      bottom: ${rand(0, 30)}%;
      animation-duration: ${rand(8, 20)}s;
      animation-delay: ${rand(0, 10)}s;
      opacity: ${rand(0.3, 0.8)};
    `;
    container.appendChild(p);
  }
}

// ================================================================
// LIVE DATA SIMULATION
// ================================================================
function simulateLiveUpdates() {
  setInterval(() => {
    // Update ticker prices
    Object.values(STOCK_DB).forEach(d => {
      d.price = +(d.price * (1 + (Math.random() - 0.5) * 0.002)).toFixed(2);
    });

    // Rebuild ticker
    buildTicker();

    // Update NIFTY display
    const nifty = INDICES[0];
    nifty.value = +(nifty.value * (1 + (Math.random() - 0.48) * 0.001)).toFixed(2);
    const niftyEl = document.getElementById('niftyPrice');
    if (niftyEl) niftyEl.textContent = nifty.value.toLocaleString('en-IN');
  }, 4000);
}

// ================================================================
// INTERSECTION OBSERVER for animations
// ================================================================
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.pick-card, .feature-card, .news-card, .index-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ================================================================
// INIT
// ================================================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initParticles();
  buildTicker();
  initHeroChart();
  buildIndices();
  buildGainersLosers();
  buildPicks();
  buildConfidenceBars();
  buildHeatmap();
  buildNews();
  renderPortfolio();
  simulateLiveUpdates();

  setTimeout(initScrollAnimations, 500);
});

// Close modal on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeStockModal();
    closeChat();
  }
});