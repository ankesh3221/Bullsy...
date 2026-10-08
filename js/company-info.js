/* Company information panel: one profile per stock in the game. Loads after app.js. */
/* ===== Company information (educational only; not a buy or sell recommendation) =====
   One entry per stock already in the game, keyed by the stock id in ASSETS. */
const ABOUT = {
  icicibank: { full: 'ICICI Bank Ltd', icon: '🏦', industry: 'Banking & Financial Services',
    what: 'ICICI Bank is one of India\'s largest private-sector banks. It takes deposits from people and businesses and lends that money out.',
    main: 'Home, car and personal loans, credit cards, business loans, plus insurance and investment services through group companies.',
    drives: 'Interest rates, demand for loans and how reliably borrowers repay.',
    factors: ['RBI interest rates', 'Loan growth', 'Credit quality (bad loans)'] },
  sbin: { full: 'State Bank of India', icon: '🏦', industry: 'Banking & Financial Services (public sector)',
    what: 'SBI is India\'s largest bank by size and is majority-owned by the Government of India. It serves crores of customers across the country.',
    main: 'Savings accounts, home and farm loans, loans to big companies and infrastructure projects, plus SBI Card, SBI Life and SBI Mutual Fund.',
    drives: 'Interest rates, overall economic growth and government policy.',
    factors: ['RBI interest rates', 'Government policy and spending', 'Credit quality (bad loans)'] },
  hdfcbank: { full: 'HDFC Bank Ltd', icon: '🏦', industry: 'Banking & Financial Services',
    what: 'HDFC Bank is India\'s largest private-sector bank. In 2023 it merged with its parent HDFC Ltd, India\'s biggest home-loan company.',
    main: 'Retail loans (home, car, personal), credit cards, digital payments and business banking.',
    drives: 'Interest rates and how much consumers and businesses borrow and spend.',
    factors: ['Interest rates', 'Loan and deposit growth', 'Credit quality (bad loans)'] },
  wipro: { full: 'Wipro Ltd', icon: '💻', industry: 'Information Technology (IT Services)',
    what: 'Wipro is an Indian IT services company that builds and runs technology systems for businesses around the world.',
    main: 'IT consulting, software development, cloud and cybersecurity services, mostly for clients in the US and Europe.',
    drives: 'How much global companies spend on technology.',
    factors: ['Global IT spending', 'US and Europe economy', 'Rupee vs dollar'] },
  tcs: { full: 'Tata Consultancy Services Ltd', icon: '💻', industry: 'Information Technology (IT Services & Consulting)',
    what: 'TCS, part of the Tata Group, is India\'s largest IT services company. It helps big businesses worldwide run and upgrade their technology.',
    main: 'Software services, consulting, cloud and managing IT systems for banks, retailers, manufacturers and governments.',
    drives: 'Global technology spending and winning large multi-year contracts.',
    factors: ['Global IT spending', 'Large deal wins', 'Rupee vs dollar'] },
  infy: { full: 'Infosys Ltd', icon: '💻', industry: 'Information Technology (IT Services & Consulting)',
    what: 'Infosys is a Bengaluru-based IT services and consulting company that helps global businesses go digital.',
    main: 'Software development, digital and cloud services, AI and consulting, plus its Finacle banking software.',
    drives: 'Technology spending by clients in the US and Europe, who pay mostly in dollars.',
    factors: ['Global IT spending', 'US technology demand', 'Rupee movement'] },
  mm: { full: 'Mahindra & Mahindra Ltd', icon: '🚜', industry: 'Automobile (SUVs & Farm Equipment)',
    what: 'Mahindra & Mahindra makes SUVs and is one of the world\'s biggest tractor makers by number sold.',
    main: 'SUVs such as the Scorpio, Thar and XUV range, tractors and farm machinery, small commercial vehicles and electric vehicles.',
    drives: 'Rural incomes, the monsoon and demand for SUVs.',
    factors: ['Monsoon and farm income', 'SUV demand', 'Loan interest rates'] },
  maruti: { full: 'Maruti Suzuki India Ltd', icon: '🚗', industry: 'Automobile (Passenger Cars)',
    what: 'Maruti Suzuki is India\'s largest car maker. Its parent company is Suzuki Motor of Japan.',
    main: 'Affordable small and mid-size cars and SUVs such as the Swift, Baleno and Brezza, plus a huge service network.',
    drives: 'Car demand from Indian families, fuel prices and car-loan interest rates.',
    factors: ['Car demand', 'Fuel prices', 'Interest rates'] },
  tatamotors: { full: 'Tata Motors', icon: '🚗', industry: 'Automobile & Electric Vehicles',
    what: 'Tata Motors is an automobile company that makes cars, commercial vehicles and electric vehicles.',
    main: 'Passenger vehicles, commercial vehicles (trucks and buses) and EVs.',
    drives: 'Vehicle demand, fuel prices, interest rates and economic growth.',
    factors: ['Vehicle demand', 'Fuel prices', 'EV adoption'] },
  cipla: { full: 'Cipla Ltd', icon: '💊', industry: 'Pharmaceuticals (Healthcare)',
    what: 'Cipla is an Indian medicine maker, well known for treatments for breathing problems such as asthma.',
    main: 'Inhalers and respiratory medicines, generic drugs, and HIV and other treatments sold in India, the US and Africa.',
    drives: 'Demand for medicines, approvals from drug regulators and generic medicine prices.',
    factors: ['Drug approvals', 'US generic medicine prices', 'Factory quality inspections'] },
  sunpharma: { full: 'Sun Pharmaceutical Industries Ltd', icon: '💊', industry: 'Pharmaceuticals (Healthcare)',
    what: 'Sun Pharma is India\'s largest medicine maker, selling across India, the US and many other countries.',
    main: 'Generic medicines plus higher-value specialty medicines, including treatments for skin conditions.',
    drives: 'New drug approvals, sales in the US and specialty medicine growth.',
    factors: ['US drug approvals', 'Specialty medicine sales', 'Rupee vs dollar'] },
  drreddy: { full: 'Dr. Reddy\'s Laboratories Ltd', icon: '💊', industry: 'Pharmaceuticals (Healthcare)',
    what: 'Dr. Reddy\'s is a Hyderabad-based maker of affordable generic medicines, with a large share of its sales in the US.',
    main: 'Generic medicines, the active ingredients used to make drugs (APIs), and branded medicines in India and other countries.',
    drives: 'US drug approvals, competition on generic prices and the rupee.',
    factors: ['US drug approvals', 'Generic price competition', 'Rupee vs dollar'] },
  reliance: { full: 'Reliance Industries Ltd', icon: '🏭', industry: 'Energy, Petrochemicals, Retail & Digital Services',
    what: 'Reliance is one of India\'s biggest companies. It runs a giant oil refinery and also owns Jio and Reliance Retail.',
    main: 'Oil refining and petrochemicals, Reliance Retail stores, Jio mobile and broadband, and new green energy projects.',
    drives: 'Oil prices and refining profits, consumer spending, and mobile data growth.',
    factors: ['Crude oil and refining margins', 'Consumer spending (retail)', 'Jio users and tariffs'] },
  ongc: { full: 'Oil and Natural Gas Corporation Ltd', icon: '🛢️', industry: 'Energy (Oil & Gas Production)',
    what: 'ONGC is a government-owned company and India\'s largest producer of crude oil and natural gas.',
    main: 'Finding and producing oil and gas in India and abroad (through ONGC Videsh), plus stakes in refiners.',
    drives: 'Global crude oil and gas prices, and how much it produces.',
    factors: ['Crude oil prices', 'Government pricing rules', 'Production volumes'] },
  ioc: { full: 'Indian Oil Corporation Ltd', icon: '⛽', industry: 'Energy (Oil Refining & Fuel Retail)',
    what: 'Indian Oil is a government-owned company that refines crude oil and runs India\'s largest network of petrol pumps.',
    main: 'Oil refineries, IndianOil fuel stations, Indane LPG cooking gas, pipelines and petrochemicals.',
    drives: 'The gap between what it pays for crude oil and what it earns selling fuel.',
    factors: ['Crude oil prices', 'Government fuel pricing', 'Refining margins'] }
};
let ciOpen = null, ciLast = null;
function aboutStock(id) { return (typeof S !== 'undefined' && S && S.assets && S.assets.find(a => a.id === id)) || ASSETS.find(a => a.id === id); }
function openInfo(id) {
  const a = aboutStock(id), d = ABOUT[id], el = document.getElementById('cinfo');
  if (!a || !d || !el) return;
  const first = el.hidden;
  el.innerHTML = `<div class="cih"><span class="ttl"><span class="lab">About the company</span><h2 id="cititle">${d.full}</h2></span><button class="cix" data-act="ciclose" aria-label="Close company information">✕ Close</button></div>
  <div class="cib">
    <div class="cilogo">${logo(a, true)}<div class="chips"><span class="chip">${SECEMO[a.sector] || ''} ${a.sector}</span><span class="chip">NSE: ${a.sym}</span></div></div>
    <div class="cis what"><h4>${d.icon} What does it do?</h4><p>${d.what}</p></div>
    <div class="cigrid">
      <div class="cis"><h4>🏷️ Sector</h4><p>${d.industry}</p></div>
      <div class="cis"><h4>🧩 Main business</h4><p>${d.main}</p></div>
      <div class="cis"><h4>⚙️ What drives it?</h4><p>${d.drives}</p></div>
    </div>
    <div class="cis cif"><h4>📌 Things that may affect this stock</h4><ul>${d.factors.map(f => `<li>${f}</li>`).join('')}</ul></div>
    <p class="cinote">For learning only. This is not a suggestion to buy or sell.</p>
  </div>`;
  el.hidden = false;
  el.classList.remove('in', 'swap'); void el.offsetWidth; el.classList.add(first ? 'in' : 'swap');
  if (first) ciLast = document.activeElement;
  ciOpen = id;
  if (first) { const x = el.querySelector('.cix'); if (x) x.focus({ preventScroll: true }); }
}
function closeInfo() {
  const el = document.getElementById('cinfo'); if (!el || el.hidden) return;
  el.hidden = true; el.innerHTML = ''; ciOpen = null;
  if (ciLast && document.contains(ciLast)) try { ciLast.focus({ preventScroll: true }); } catch (e) {}
  ciLast = null;
}
/* company logo and name in the stock header open the panel too */
document.addEventListener('click', e => { const t = e.target.closest('[data-info]'); if (t && !t.closest('button')) openInfo(t.dataset.info); });
document.addEventListener('keydown', e => {
  const t = e.target.closest && e.target.closest('[data-info]');
  if (t && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openInfo(t.dataset.info); return; }
  if (e.key === 'Escape' && ciOpen && !M) closeInfo();
});
