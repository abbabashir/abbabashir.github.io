import fs from 'fs';
import path from 'path';

const projectImages = {
  'paychipa.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0a0c" />
      <stop offset="100%" stop-color="#12131a" />
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#60a5fa" />
    </linearGradient>
    <linearGradient id="cardGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#0f172a" stop-opacity="0.9" />
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#bg)" />
  <circle cx="680" cy="120" r="180" fill="#2563eb" opacity="0.08" filter="blur(40px)" />
  <circle cx="120" cy="380" r="140" fill="#38bdf8" opacity="0.06" filter="blur(40px)" />
  
  <!-- Subtle Grid -->
  <g stroke="#ffffff" stroke-opacity="0.04" stroke-width="1">
    <line x1="0" y1="100" x2="800" y2="100" />
    <line x1="0" y1="200" x2="800" y2="200" />
    <line x1="0" y1="300" x2="800" y2="300" />
    <line x1="0" y1="400" x2="800" y2="400" />
    <line x1="200" y1="0" x2="200" y2="500" />
    <line x1="400" y1="0" x2="400" y2="500" />
    <line x1="600" y1="0" x2="600" y2="500" />
  </g>

  <!-- Credit Card / Wallet Mockup -->
  <g transform="translate(140, 100)">
    <rect width="360" height="210" rx="16" fill="url(#cardGlow)" stroke="#3b82f6" stroke-opacity="0.3" stroke-width="1.5" />
    <circle cx="50" cy="50" r="16" fill="#3b82f6" fill-opacity="0.8" />
    <circle cx="72" cy="50" r="16" fill="#60a5fa" fill-opacity="0.6" />
    <text x="50" y="115" fill="#94a3b8" font-family="system-ui" font-size="12" letter-spacing="2">PAYCHIPA SECURE VAULT</text>
    <text x="50" y="150" fill="#ffffff" font-family="monospace" font-size="20" letter-spacing="3">•••• 8492 3109</text>
    <text x="50" y="185" fill="#38bdf8" font-family="system-ui" font-size="14" font-weight="600">$ 48,250.00</text>
    <rect x="270" y="165" width="55" height="24" rx="6" fill="#3b82f6" fill-opacity="0.2" stroke="#3b82f6" stroke-width="1" />
    <text x="282" y="181" fill="#60a5fa" font-family="system-ui" font-size="11">ACTIVE</text>
  </g>

  <!-- Transaction List Float -->
  <g transform="translate(420, 160)">
    <rect width="250" height="220" rx="14" fill="#0b0f19" stroke="#ffffff" stroke-opacity="0.08" stroke-width="1" />
    <text x="20" y="32" fill="#ffffff" font-family="system-ui" font-size="13" font-weight="600">Recent Transactions</text>
    
    <g transform="translate(20, 52)">
      <circle cx="12" cy="12" r="12" fill="#22c55e" fill-opacity="0.15" />
      <path d="M12 7 L12 17 M7 12 L17 12" stroke="#22c55e" stroke-width="1.5" stroke-linecap="round" />
      <text x="34" y="12" fill="#ffffff" font-family="system-ui" font-size="12">Instant P2P Transfer</text>
      <text x="34" y="24" fill="#64748b" font-family="system-ui" font-size="10">Settled in 84ms</text>
      <text x="195" y="16" fill="#22c55e" font-family="system-ui" font-size="12" text-anchor="end">+ $1,250</text>
    </g>

    <g transform="translate(20, 102)">
      <circle cx="12" cy="12" r="12" fill="#3b82f6" fill-opacity="0.15" />
      <path d="M7 12 L17 12" stroke="#3b82f6" stroke-width="1.5" stroke-linecap="round" />
      <text x="34" y="12" fill="#ffffff" font-family="system-ui" font-size="12">Merchant Settlement</text>
      <text x="34" y="24" fill="#64748b" font-family="system-ui" font-size="10">Spring Boot Batch</text>
      <text x="195" y="16" fill="#f8fafc" font-family="system-ui" font-size="12" text-anchor="end">- $340</text>
    </g>

    <g transform="translate(20, 152)">
      <circle cx="12" cy="12" r="12" fill="#eab308" fill-opacity="0.15" />
      <path d="M12 7 L12 17" stroke="#eab308" stroke-width="1.5" stroke-linecap="round" />
      <text x="34" y="12" fill="#ffffff" font-family="system-ui" font-size="12">Multi-Currency Swap</text>
      <text x="34" y="24" fill="#64748b" font-family="system-ui" font-size="10">USD / NGN Escrow</text>
      <text x="195" y="16" fill="#eab308" font-family="system-ui" font-size="12" text-anchor="end">480 NGN</text>
    </g>
  </g>
</svg>
`,

  'veta-origin.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="vetaBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#07090e" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#vetaBg)" />
  <circle cx="400" cy="250" r="200" fill="#6366f1" opacity="0.1" filter="blur(60px)" />
  
  <!-- Neural Waveform Visualizer -->
  <g transform="translate(100, 180)">
    <path d="M 0 70 Q 50 10, 100 70 T 200 70 T 300 10 T 400 90 T 500 40 T 600 70" fill="none" stroke="#818cf8" stroke-width="3" opacity="0.8" />
    <path d="M 0 70 Q 50 120, 100 70 T 200 70 T 300 110 T 400 40 T 500 85 T 600 70" fill="none" stroke="#38bdf8" stroke-width="2" opacity="0.5" />
    
    <!-- Audio Wave Bars -->
    <rect x="220" y="30" width="6" height="80" rx="3" fill="#818cf8" />
    <rect x="235" y="10" width="6" height="120" rx="3" fill="#6366f1" />
    <rect x="250" y="45" width="6" height="50" rx="3" fill="#38bdf8" />
    <rect x="265" y="20" width="6" height="100" rx="3" fill="#a5b4fc" />
    <rect x="280" y="5" width="6" height="130" rx="3" fill="#60a5fa" />
    <rect x="295" y="25" width="6" height="90" rx="3" fill="#818cf8" />
    <rect x="310" y="40" width="6" height="60" rx="3" fill="#38bdf8" />
    <rect x="325" y="55" width="6" height="30" rx="3" fill="#6366f1" />
  </g>

  <!-- Prompt & Dialect badge -->
  <g transform="translate(200, 340)">
    <rect width="400" height="60" rx="30" fill="#1e1b4b" stroke="#6366f1" stroke-opacity="0.4" stroke-width="1.5" />
    <circle cx="35" cy="30" r="14" fill="#6366f1" />
    <text x="35" y="34" fill="#ffffff" font-family="system-ui" font-size="12" text-anchor="middle" font-weight="bold">AI</text>
    <text x="65" y="34" fill="#e0e7ff" font-family="system-ui" font-size="13">"Listening across Hausa, Yoruba, Igbo &amp; English..."</text>
  </g>

  <g transform="translate(300, 90)">
    <rect width="200" height="36" rx="18" fill="#1e293b" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1" />
    <text x="100" y="22" fill="#38bdf8" font-family="system-ui" font-size="12" text-anchor="middle" font-weight="600">Low-Latency Whisper Core</text>
  </g>
</svg>
`,

  'plant-disease.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="plantBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#060c07" />
      <stop offset="100%" stop-color="#0d1b11" />
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#plantBg)" />
  <circle cx="400" cy="250" r="180" fill="#22c55e" opacity="0.08" filter="blur(50px)" />
  
  <!-- Stylized Leaf Specimen with Bounding Box -->
  <g transform="translate(260, 100)">
    <!-- Bounding Detection Box -->
    <rect width="280" height="280" rx="8" fill="none" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="6 4" opacity="0.8" />
    <!-- Corner brackets -->
    <path d="M -5 20 L -5 -5 L 20 -5" fill="none" stroke="#4ade80" stroke-width="3" />
    <path d="M 285 20 L 285 -5 L 260 -5" fill="none" stroke="#4ade80" stroke-width="3" />
    <path d="M -5 260 L -5 285 L 20 285" fill="none" stroke="#4ade80" stroke-width="3" />
    <path d="M 285 260 L 285 285 L 260 285" fill="none" stroke="#4ade80" stroke-width="3" />

    <!-- Leaf Shape -->
    <path d="M 140 30 C 230 60, 240 180, 140 250 C 40 180, 50 60, 140 30 Z" fill="#14532d" stroke="#22c55e" stroke-width="2" />
    <path d="M 140 30 L 140 250" stroke="#4ade80" stroke-width="1.5" stroke-linecap="round" />
    <path d="M 140 80 Q 180 110, 210 120" stroke="#4ade80" stroke-width="1" fill="none" />
    <path d="M 140 120 Q 90 150, 70 170" stroke="#4ade80" stroke-width="1" fill="none" />
    <path d="M 140 160 Q 190 190, 210 200" stroke="#4ade80" stroke-width="1" fill="none" />

    <!-- Tag -->
    <rect x="15" y="-14" width="160" height="26" rx="4" fill="#15803d" />
    <text x="25" y="4" fill="#ffffff" font-family="system-ui" font-size="11" font-weight="bold">EARLY BLIGHT (96.4%)</text>
  </g>

  <!-- Metrics HUD Floating -->
  <g transform="translate(100, 360)">
    <rect width="200" height="70" rx="10" fill="#052e16" stroke="#22c55e" stroke-opacity="0.3" stroke-width="1" />
    <text x="20" y="28" fill="#86efac" font-family="system-ui" font-size="11">MODEL INFERENCE</text>
    <text x="20" y="52" fill="#ffffff" font-family="monospace" font-size="18" font-weight="bold">18.4ms / Frame</text>
  </g>

  <g transform="translate(500, 360)">
    <rect width="200" height="70" rx="10" fill="#052e16" stroke="#22c55e" stroke-opacity="0.3" stroke-width="1" />
    <text x="20" y="28" fill="#86efac" font-family="system-ui" font-size="11">CATEGORIES CLASSIFIED</text>
    <text x="20" y="52" fill="#ffffff" font-family="monospace" font-size="18" font-weight="bold">38+ Pathologies</text>
  </g>
</svg>
`,

  'em-essence.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <defs>
    <linearGradient id="posBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a0a0d" />
      <stop offset="100%" stop-color="#18151f" />
    </linearGradient>
  </defs>
  <rect width="800" height="500" fill="url(#posBg)" />
  <circle cx="650" cy="200" r="160" fill="#a855f7" opacity="0.08" filter="blur(50px)" />
  
  <!-- POS Tablet Interface Mockup -->
  <g transform="translate(120, 90)">
    <rect width="560" height="320" rx="14" fill="#0f0f15" stroke="#ffffff" stroke-opacity="0.1" stroke-width="1.5" />
    <!-- Header -->
    <rect width="560" height="48" rx="14" fill="#181822" />
    <circle cx="28" cy="24" r="6" fill="#ef4444" />
    <circle cx="46" cy="24" r="6" fill="#eab308" />
    <circle cx="64" cy="24" r="6" fill="#22c55e" />
    <text x="100" y="28" fill="#e2e8f0" font-family="system-ui" font-size="13" font-weight="600">Em &amp; Essence POS — Store #01 [OFFLINE SYNC ACTIVE]</text>
    <rect x="440" y="14" width="90" height="22" rx="11" fill="#22c55e" fill-opacity="0.2" />
    <text x="485" y="29" fill="#4ade80" font-family="system-ui" font-size="10" text-anchor="middle" font-weight="bold">INDEXEDDB OK</text>
    
    <!-- Left Column: Products -->
    <g transform="translate(24, 68)">
      <rect width="320" height="56" rx="8" fill="#1a1a26" stroke="#ffffff" stroke-opacity="0.05" />
      <text x="16" y="26" fill="#ffffff" font-family="system-ui" font-size="13" font-weight="500">Hydro-Moisture Serum 50ml</text>
      <text x="16" y="44" fill="#94a3b8" font-family="system-ui" font-size="11">SKU: 92834-EM • In Stock (142)</text>
      <text x="300" y="34" fill="#a855f7" font-family="system-ui" font-size="13" font-weight="bold" text-anchor="end">₦14,500</text>

      <rect y="68" width="320" height="56" rx="8" fill="#1a1a26" stroke="#ffffff" stroke-opacity="0.05" />
      <text x="16" y="94" fill="#ffffff" font-family="system-ui" font-size="13" font-weight="500">Velvet Matte Lip Tint #04</text>
      <text x="16" y="112" fill="#94a3b8" font-family="system-ui" font-size="11">SKU: 77201-EM • In Stock (89)</text>
      <text x="300" y="102" fill="#a855f7" font-family="system-ui" font-size="13" font-weight="bold" text-anchor="end">₦6,200</text>
      
      <rect y="136" width="320" height="56" rx="8" fill="#1a1a26" stroke="#ffffff" stroke-opacity="0.05" />
      <text x="16" y="162" fill="#ffffff" font-family="system-ui" font-size="13" font-weight="500">Rosewater Hydrating Mist</text>
      <text x="16" y="180" fill="#94a3b8" font-family="system-ui" font-size="11">SKU: 41098-EM • In Stock (210)</text>
      <text x="300" y="170" fill="#a855f7" font-family="system-ui" font-size="13" font-weight="bold" text-anchor="end">₦8,900</text>
    </g>

    <!-- Right Column: Cart summary -->
    <g transform="translate(365, 68)">
      <rect width="170" height="225" rx="8" fill="#14141e" stroke="#a855f7" stroke-opacity="0.3" stroke-width="1" />
      <text x="16" y="28" fill="#94a3b8" font-family="system-ui" font-size="11">TOTAL PAYABLE</text>
      <text x="16" y="58" fill="#ffffff" font-family="system-ui" font-size="20" font-weight="bold">₦29,600</text>
      <line x1="16" y1="78" x2="154" y2="78" stroke="#ffffff" stroke-opacity="0.1" />
      <text x="16" y="100" fill="#94a3b8" font-family="system-ui" font-size="11">Items: 3</text>
      <text x="16" y="122" fill="#94a3b8" font-family="system-ui" font-size="11">Tax: ₦0 (Exempt)</text>
      <rect x="16" y="160" width="138" height="40" rx="6" fill="#9333ea" />
      <text x="85" y="184" fill="#ffffff" font-family="system-ui" font-size="12" font-weight="bold" text-anchor="middle">COMPLETE ORDER</text>
    </g>
  </g>
</svg>
`,

  'ai-price.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <rect width="800" height="500" fill="#090a0f" />
  <circle cx="400" cy="250" r="170" fill="#06b6d4" opacity="0.08" filter="blur(50px)" />
  <g transform="translate(150, 100)">
    <rect width="500" height="300" rx="12" fill="#11131c" stroke="#ffffff" stroke-opacity="0.08" />
    <text x="30" y="45" fill="#f8fafc" font-family="system-ui" font-size="16" font-weight="bold">Fuzzy Logic Price Arbitrage Matrix</text>
    <path d="M 30 240 L 120 200 L 210 220 L 300 140 L 390 160 L 460 90" fill="none" stroke="#06b6d4" stroke-width="3" />
    <circle cx="460" cy="90" r="5" fill="#22d3ee" />
    <text x="30" y="270" fill="#64748b" font-family="system-ui" font-size="11">Scraped 120k records • 98.2% string matching accuracy</text>
  </g>
</svg>
`,

  'backtrack.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <rect width="800" height="500" fill="#08080a" />
  <circle cx="400" cy="250" r="160" fill="#f97316" opacity="0.08" filter="blur(50px)" />
  <g transform="translate(200, 110)">
    <circle cx="200" cy="140" r="120" fill="none" stroke="#f97316" stroke-opacity="0.3" stroke-width="1.5" />
    <circle cx="200" cy="140" r="80" fill="none" stroke="#f97316" stroke-opacity="0.4" stroke-width="1.5" />
    <circle cx="200" cy="140" r="40" fill="none" stroke="#f97316" stroke-opacity="0.6" stroke-width="1.5" />
    <circle cx="200" cy="140" r="6" fill="#f97316" />
    <circle cx="240" cy="110" r="5" fill="#38bdf8" />
    <text x="250" y="115" fill="#e2e8f0" font-family="system-ui" font-size="11">Item Matched (94%)</text>
  </g>
</svg>
`,

  'bicon.svg': `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <rect width="800" height="500" fill="#09090b" />
  <circle cx="400" cy="250" r="160" fill="#ec4899" opacity="0.08" filter="blur(50px)" />
  <g transform="translate(180, 120)">
    <rect width="440" height="260" rx="12" fill="#141419" stroke="#ffffff" stroke-opacity="0.08" />
    <!-- Screen curve -->
    <path d="M 50 50 Q 220 30, 390 50" fill="none" stroke="#ec4899" stroke-width="4" stroke-linecap="round" />
    <text x="220" y="75" fill="#a1a1aa" font-family="system-ui" font-size="11" text-anchor="middle">CINEMA SCREEN PROJECTION</text>
    <!-- Seats -->
    <g transform="translate(80, 100)" fill="#3f3f46">
      <circle cx="20" cy="20" r="8" /><circle cx="50" cy="20" r="8" /><circle cx="80" cy="20" r="8" />
      <circle cx="110" cy="20" r="8" fill="#ec4899" /><circle cx="140" cy="20" r="8" fill="#ec4899" />
      <circle cx="170" cy="20" r="8" /><circle cx="200" cy="20" r="8" />
      <circle cx="230" cy="20" r="8" /><circle cx="260" cy="20" r="8" />

      <circle cx="20" cy="50" r="8" /><circle cx="50" cy="50" r="8" /><circle cx="80" cy="50" r="8" />
      <circle cx="110" cy="50" r="8" /><circle cx="140" cy="50" r="8" />
      <circle cx="170" cy="50" r="8" fill="#ec4899" /><circle cx="200" cy="50" r="8" />
      <circle cx="230" cy="50" r="8" /><circle cx="260" cy="50" r="8" />
    </g>
  </g>
</svg>
`
};

// Write project SVGs
for (const [filename, content] of Object.entries(projectImages)) {
  fs.writeFileSync(path.join('public', 'images', 'projects', filename), content.trim());
}

// Generate Avatars
for (let i = 1; i <= 4; i++) {
  const avatarColors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b'];
  const avatarSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <circle cx="50" cy="50" r="48" fill="#18181b" stroke="${avatarColors[i-1]}" stroke-width="2" />
  <circle cx="50" cy="40" r="18" fill="${avatarColors[i-1]}" fill-opacity="0.8" />
  <path d="M 22 84 C 22 66, 35 60, 50 60 C 65 60, 78 66, 78 84 Z" fill="${avatarColors[i-1]}" fill-opacity="0.6" />
</svg>
`;
  fs.writeFileSync(path.join('public', 'images', 'profile', `avatar-${i}.svg`), avatarSvg.trim());
}

// Generate Community Placeholders
const communityLogos = ['gdsc', 'gdg', 'devfest', 'io', 'mentorship'];
for (const item of communityLogos) {
  const commSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="100%" height="100%">
  <rect width="600" height="400" fill="#0d0e12" />
  <g stroke="#ffffff" stroke-opacity="0.04" stroke-width="1">
    <line x1="0" y1="100" x2="600" y2="100" />
    <line x1="0" y1="200" x2="600" y2="200" />
    <line x1="0" y1="300" x2="600" y2="300" />
    <line x1="200" y1="0" x2="200" y2="400" />
    <line x1="400" y1="0" x2="400" y2="400" />
  </g>
  <circle cx="300" cy="200" r="80" fill="#3b82f6" fill-opacity="0.1" />
  <text x="300" y="195" fill="#ffffff" font-family="system-ui" font-size="24" font-weight="bold" text-anchor="middle">${item.toUpperCase()}</text>
  <text x="300" y="225" fill="#94a3b8" font-family="system-ui" font-size="14" text-anchor="middle">Community &amp; Developer Leadership</text>
</svg>
`;
  fs.writeFileSync(path.join('public', 'images', 'placeholders', `community-${item}.svg`), commSvg.trim());
}

// Favicon
const faviconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="14" fill="#000000" />
  <path d="M 18 16 L 36 16 C 44 16, 48 20, 48 25 C 48 29, 44 32, 38 33 C 45 34, 49 38, 49 44 C 49 50, 44 54, 36 54 L 18 54 Z M 27 24 L 27 31 L 35 31 C 38 31, 40 29, 40 27.5 C 40 26, 38 24, 35 24 Z M 27 38 L 27 46 L 36 46 C 39.5 46, 41.5 44.5, 41.5 42 C 41.5 39.5, 39.5 38, 36 38 Z" fill="#3b82f6" />
</svg>
`;
fs.writeFileSync(path.join('public', 'favicon.svg'), faviconSvg.trim());

console.log("All visual assets generated successfully.");
