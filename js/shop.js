/**
 * SUPER PATCH - PRODUCT DATABASE & SHOP INTERACTIVITY
 * Full compliance-checked catalog & Quick View engine
 */

const SUPER_PATCH_CATALOG = [
  {
    id: 'zen',
    name: 'Zen Patch',
    series: 'VTT Mindfulness & Clarity Series',
    category: 'calm',
    image: 'images/products/zen-patch.webp',
    benefit: 'Mindful Focus, Presence & Flow State',
    tagline: 'No drugs · No ingredients · Zero sedation · 100% Vibrotactile (VTT)',
    description: 'Cultivate mindful focus and become fully present in each moment. Zen uses non-invasive vibrotactile technology that may encourage a calm, clear, and open mind—helping you access intuition, inspiration, and cognitive harmony without drowsiness.',
    rating: 4.9,
    reviewsCount: 382,
    cadPrice: 99.00,
    packSize: '30 Wearable Patches (30-Day Supply)',
    wearDuration: 'Up to 24 Hours of continuous support',
    ingredients: ['100% Non-Invasive Vibrotactile Pattern (VTT)', 'Hypoallergenic Medical-Grade Adhesive', 'Latex-Free Breathable Film'],
    usage: 'Apply 1 patch daily to clean, dry skin on the upper arm, chest, or wrist. Replace after 24 hours.',
    pouchGradient: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f97316 100%)',
    badgeColor: 'badge-purple',
    isBestseller: true
  },
  {
    id: 'assure',
    name: 'Assure Patch',
    series: 'VTT Travel & Motion Series',
    category: 'calm',
    image: 'images/products/assure-patch.webp',
    benefit: 'Travel Comfort, Motion Balance & Anti-Nausea',
    tagline: 'No medication · No drowsiness · 100% Vibrotactile (VTT)',
    description: 'Travel with comfort and confidence. Assure uses non-invasive vibrotactile stimulation to help reduce nausea and feelings of upset due to motion without drowsiness. Feel better on the move naturally.',
    rating: 4.8,
    reviewsCount: 220,
    cadPrice: 99.00,
    packSize: '30 Wearable Patches (30-Day Supply)',
    wearDuration: 'Up to 24 Hours of continuous support',
    ingredients: ['100% Non-Invasive Vibrotactile Motion Pattern (VTT)', 'Hypoallergenic Medical-Grade Adhesive'],
    usage: 'Apply 1 patch 30–60 minutes prior to travel, boating, flying, or road trips.',
    pouchGradient: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
    badgeColor: 'badge-blue',
    isBestseller: false
  },
  {
    id: 'freedom',
    name: 'Freedom Patch',
    series: 'VTT Natural Physical Comfort Series',
    category: 'mobility',
    image: 'images/products/freedom-patch.webp',
    benefit: 'Fast, Drug-Free Comfort for Aches & Discomfort',
    tagline: 'Natural Comfort · Drug-Free & Safe · Targeted Application',
    description: 'The Freedom Patch supports fast, drug-free comfort for minor aches and stiffness. Apply directly where you need relief to ease discomfort and move with confidence. Stay active, feel better, and get back to doing what you love—naturally and safely.',
    rating: 4.9,
    reviewsCount: 512,
    cadPrice: 99.00,
    packSize: '30 Wearable Patches (30-Day Supply)',
    wearDuration: 'Up to 24 Hours of targeted comfort',
    ingredients: ['100% Non-Invasive Vibrotactile Pattern (VTT)', 'Hypoallergenic Medical-Grade Adhesive', 'Latex-Free Breathable Film'],
    usage: 'Apply 1 patch near the area of physical discomfort (shoulder, lower back, knee, or wrist). Replace after 24 hours.',
    pouchGradient: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
    badgeColor: 'badge-gold',
    isBestseller: true
  },
  {
    id: 'liberty',
    name: 'Liberty Patch',
    series: 'VTT Balance & Core Stability Series',
    category: 'mobility',
    image: 'images/products/liberty-patch.webp',
    benefit: 'Stability, Balance Equilibrium & Core Composure',
    tagline: 'Foundational VTT Technology · Drug-Free Stability & Fall Reduction',
    description: 'The Liberty Patch is a natural mobility and balance patch that supports better stability, strength, and control. It helps improve daily movement so you can stay active, reduce fall risk, and move with confidence. Perfect for freer motion and long-term vitality.',
    rating: 4.9,
    reviewsCount: 480,
    cadPrice: 99.00,
    packSize: '30 Wearable Patches (30-Day Supply)',
    wearDuration: 'Up to 24 Hours of continuous support',
    ingredients: ['100% Non-Invasive Vibrotactile Pattern (VTT)', 'Hypoallergenic Medical-Grade Adhesive', 'Water-Resistant Polymer'],
    usage: 'Apply 1 patch to the forearm, shoulder, or upper chest every morning for optimal daily stability.',
    pouchGradient: 'linear-gradient(135deg, #0284c7 0%, #0d9488 100%)',
    badgeColor: 'badge-emerald',
    isBestseller: true
  },
  {
    id: 'rem',
    name: 'REM Patch',
    series: 'VTT Restorative Sleep Series',
    category: 'sleep',
    image: 'images/products/rem-patch.webp',
    benefit: 'Deeper, Restorative Sleep & Bright Mornings',
    tagline: 'Supports REM Cycles · Drug-Free & Melatonin-Free · Zero Morning Haze',
    description: 'The REM Patch helps you enjoy deeper, more restorative rest. By supporting more time in REM sleep, it improves sleep quality so you wake up refreshed, focused, and clear-headed. Enjoy better nighttime recovery and steady all-day energy naturally.',
    rating: 4.9,
    reviewsCount: 495,
    cadPrice: 99.00,
    packSize: '30 Wearable Patches (30-Day Supply)',
    wearDuration: 'Wear overnight (8-10 hours during sleep)',
    ingredients: ['100% Non-Invasive Vibrotactile Sleep Matrix (VTT)', 'Gentle Skin-Safe Hypoallergenic Adhesive'],
    usage: 'Apply 1 patch 30–60 minutes before bedtime on clean, dry skin. Remove upon waking.',
    pouchGradient: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)',
    badgeColor: 'badge-purple',
    isBestseller: true
  },
  {
    id: 'peace',
    name: 'Peace Patch',
    series: 'VTT Stress Relief & Composure Series',
    category: 'calm',
    image: 'images/products/peace-patch.webp',
    benefit: 'Calm, Emotional Equilibrium & Daily Resilience',
    tagline: 'Natural Stress Relief · Steadier Mood · Drug-Free Tranquility',
    description: 'The Peace Patch is a natural stress relief patch that helps support calm, clarity, and emotional balance. It promotes a steadier mood, clearer thinking, and better daily resilience whether juggling work, school, or family life.',
    rating: 4.8,
    reviewsCount: 310,
    cadPrice: 99.00,
    packSize: '30 Wearable Patches (30-Day Supply)',
    wearDuration: 'Up to 24 Hours of continuous support',
    ingredients: ['100% Non-Invasive Tranquility Ridges (VTT)', 'Hypoallergenic Breathable Substrate'],
    usage: 'Place 1 patch on the upper torso, forearm, or chest. Great during demanding days.',
    pouchGradient: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)',
    badgeColor: 'badge-purple',
    isBestseller: false
  },
  {
    id: 'boost',
    name: 'Boost Patch',
    series: 'VTT Clean Vitality Series',
    category: 'energy',
    image: 'images/products/boost-patch.webp',
    benefit: 'Sustained All-Day Energy Without Caffeine or Jitters',
    tagline: 'Clean Energy · Zero Sugar · Zero Jitters · 24-Hour Stamina',
    description: 'The Boost Patch delivers steady, sustained energy without caffeine, sugar, or chemicals. Stay alert, focused, and energized for up to 24 hours with no jitters and no afternoon crash. Ideal for athletes, busy professionals, and active routines.',
    rating: 4.9,
    reviewsCount: 420,
    cadPrice: 99.00,
    packSize: '30 Wearable Patches (30-Day Supply)',
    wearDuration: 'Up to 24 Hours of steady stamina',
    ingredients: ['100% Non-Invasive Vibrotactile Energy Matrix (VTT)', 'Hypoallergenic Medical Adhesive'],
    usage: 'Place 1 patch on clean, hair-free skin in the morning for all-day stamina.',
    pouchGradient: 'linear-gradient(135deg, #f97316 0%, #ef4444 100%)',
    badgeColor: 'badge-gold',
    isBestseller: true
  },
  {
    id: 'focus',
    name: 'Focus Patch',
    series: 'VTT Executive Concentration Series',
    category: 'focus',
    image: 'images/products/focus-patch.webp',
    benefit: 'Sharp Concentration, Mental Stamina & Distraction Blocking',
    tagline: 'Laser Focus · Think Faster · Executive Clarity · 100% Drug-Free',
    description: 'The Focus Patch boosts natural concentration so you stay sharp, clear, and productive. It supports mental stamina and sustained attention, helping you think faster, learn easier, and block distractions during demanding projects or study sessions.',
    rating: 4.8,
    reviewsCount: 295,
    cadPrice: 99.00,
    packSize: '30 Wearable Patches (30-Day Supply)',
    wearDuration: 'Up to 24 Hours of cognitive support',
    ingredients: ['100% Non-Invasive Vibrotactile Pattern (VTT)', 'Hypoallergenic Medical-Grade Adhesive'],
    usage: 'Apply 1 patch prior to study, deep work, or creative sessions.',
    pouchGradient: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)',
    badgeColor: 'badge-purple',
    isBestseller: true
  },
  {
    id: 'victory',
    name: 'Victory Patch',
    series: 'VTT Athletic Performance Series',
    category: 'energy',
    image: 'images/products/victory-patch.webp',
    benefit: 'Athletic Strength, Power, Agility & Faster Recovery',
    tagline: 'Explosive Athletic Output · Speed & Endurance · Stimulant-Free',
    description: 'The Victory Patch is a natural athletic performance patch that helps boost strength, power, agility, and endurance. It supports faster recovery so you can train harder, hit new personal bests, and perform at your peak without stimulants.',
    rating: 4.9,
    reviewsCount: 260,
    cadPrice: 99.00,
    packSize: '30 Wearable Patches (30-Day Supply)',
    wearDuration: 'Up to 24 Hours (optimal for workouts)',
    ingredients: ['100% Non-Invasive Kinetic VTT Pattern', 'Sweat & Water-Resistant Athletic Adhesive'],
    usage: 'Apply 1 patch 15–30 minutes before training, competition, or high-intensity activity.',
    pouchGradient: 'linear-gradient(135deg, #dc2626 0%, #f97316 100%)',
    badgeColor: 'badge-gold',
    isBestseller: false
  },
  {
    id: 'joy',
    name: 'Joy Patch',
    series: 'VTT Mood & Positivity Series',
    category: 'calm',
    image: 'images/products/joy-patch.webp',
    benefit: 'Elevated Positivity, Optimism & Emotional Well-Being',
    tagline: 'Brighter Outlook · Steadier Mood · Emotional Harmony',
    description: 'The Joy Patch is a natural mood support patch that helps elevate positivity, calm, and emotional well-being. It promotes a brighter outlook and clearer thinking so you feel more motivated, resilient, and uplifted throughout the day.',
    rating: 4.9,
    reviewsCount: 340,
    cadPrice: 99.00,
    packSize: '30 Wearable Patches (30-Day Supply)',
    wearDuration: 'Up to 24 Hours of gentle support',
    ingredients: ['100% Non-Invasive Vibrotactile Pattern (VTT)', 'Hypoallergenic Medical Adhesive'],
    usage: 'Apply 1 patch daily to clean, dry skin on the upper chest or arm.',
    pouchGradient: 'linear-gradient(135deg, #db2777 0%, #f43f5e 100%)',
    badgeColor: 'badge-purple',
    isBestseller: false
  },
  {
    id: 'ignite',
    name: 'Ignite Patch',
    series: 'VTT Metabolic Support Series',
    category: 'energy',
    image: 'images/products/ignite-patch.webp',
    benefit: 'Higher Resting Metabolic Rate (RMR) & Calorie Burning',
    tagline: 'Boosts Resting Metabolism · Active Energy Expenditure · Drug-Free',
    description: 'The Ignite Patch helps naturally boost your metabolism by supporting a higher Resting Metabolic Rate (RMR). Burn more calories throughout the day—even at rest—while keeping your energy steady and active. Complements healthy lifestyle habits.',
    rating: 4.8,
    reviewsCount: 235,
    cadPrice: 99.00,
    packSize: '30 Wearable Patches (30-Day Supply)',
    wearDuration: 'Up to 24 Hours of daily support',
    ingredients: ['100% Non-Invasive Metabolic VTT Matrix', 'Hypoallergenic Medical Substrate'],
    usage: 'Apply 1 patch in the morning on clean, dry skin.',
    pouchGradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
    badgeColor: 'badge-gold',
    isBestseller: false
  },
  {
    id: 'defend',
    name: 'Defend Patch',
    series: 'VTT Immune Health Series',
    category: 'calm',
    image: 'images/products/defend-patch.webp',
    benefit: 'Natural Immune Resilience, Defense & Vitality',
    tagline: 'Year-Round Immune Support · Body Resilience · Non-Invasive',
    description: 'The Defend Patch is your natural immune support patch, helping your body stay strong, healthy, and resilient. It supports natural immune function so you can recover faster, feel more energized, and stay ready for seasonal challenges year-round.',
    rating: 4.8,
    reviewsCount: 210,
    cadPrice: 99.00,
    packSize: '30 Wearable Patches (30-Day Supply)',
    wearDuration: 'Up to 24 Hours of defense support',
    ingredients: ['100% Non-Invasive Vibrotactile Pattern (VTT)', 'Hypoallergenic Medical Adhesive'],
    usage: 'Wear daily during seasonal changes, high travel periods, or as part of your everyday defense routine.',
    pouchGradient: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
    badgeColor: 'badge-emerald',
    isBestseller: false
  },
  {
    id: 'lumi',
    name: 'Lumi Patch',
    series: 'VTT Skin Glow & Beauty Series',
    category: 'women',
    image: 'images/products/lumi-patch.webp',
    benefit: 'Skin Elasticity, Natural Glow & Radiance from Within',
    tagline: 'Natural Beauty Support · Youthful Radiance · No Creams Needed',
    description: 'The Lumi Patch is your natural beauty patch for healthy, glowing skin. It supports hydration, elasticity, and smooth texture while helping soften the look of fine lines and uneven tone from within—no creams or harsh chemicals needed.',
    rating: 4.8,
    reviewsCount: 175,
    cadPrice: 99.00,
    packSize: '30 Wearable Patches (30-Day Supply)',
    wearDuration: 'Up to 24 Hours of daily vitality',
    ingredients: ['100% Non-Invasive Micro-Vibration VTT Pattern', 'Ultra-Gentle Hypoallergenic Substrate'],
    usage: 'Apply 1 patch daily to clean, dry skin on the upper chest, arm, or collarbone area.',
    pouchGradient: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
    badgeColor: 'badge-purple',
    isBestseller: false
  },
  {
    id: 'kickit',
    name: 'Kick It Patch',
    series: 'VTT Habit & Willpower Series',
    category: 'focus',
    image: 'images/products/kick-it-patch.webp',
    benefit: 'Willpower, Cravings Control & Habit Building',
    tagline: 'Mindful Willpower · Break Unwanted Patterns · Non-Chemical',
    description: 'The Kick It Patch is a natural habit-control patch that supports emotional balance and willpower. It helps you break unwanted patterns, stay in control, and make healthier choices when building new daily wellness routines.',
    rating: 4.7,
    reviewsCount: 190,
    cadPrice: 99.00,
    packSize: '30 Wearable Patches (30-Day Supply)',
    wearDuration: 'Up to 24 Hours of continuous grounding',
    ingredients: ['100% Non-Invasive Grounding VTT Grid', 'Hypoallergenic Medical Substrate'],
    usage: 'Wear daily when building or maintaining mindful wellness habits and lifestyle choices.',
    pouchGradient: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
    badgeColor: 'badge-gold',
    isBestseller: false
  },
  {
    id: 'rocket',
    name: 'Rocket Patch',
    series: 'VTT Vitality & Confidence Series',
    category: 'energy',
    image: 'images/products/rocket-patch.webp',
    benefit: 'Strength, Physical Stamina & Drive',
    tagline: 'Natural Male Performance · Confidence & Drive · Drug-Free',
    description: 'The Rocket Patch is a natural performance patch that supports strength, energy, and drive. It helps you feel more focused, confident, and capable—mentally and physically—to restore natural stamina and vitality.',
    rating: 4.9,
    reviewsCount: 180,
    cadPrice: 99.00,
    packSize: '30 Wearable Patches (30-Day Supply)',
    wearDuration: 'Up to 24 Hours of support',
    ingredients: ['100% Non-Invasive Sensory VTT Matrix', 'Hypoallergenic Substrate'],
    usage: 'Apply 1 patch before active or demanding evenings.',
    pouchGradient: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
    badgeColor: 'badge-purple',
    isBestseller: false
  }
];

// Attach to window
window.SUPER_PATCH_CATALOG = SUPER_PATCH_CATALOG;

document.addEventListener('DOMContentLoaded', () => {
  initShopPage();
  initQuickViewModal();
});

/* --------------------------------------------------------------------------
   SHOP PAGE RENDERING & FILTERING
-------------------------------------------------------------------------- */
function initShopPage() {
  const container = document.getElementById('shop-product-grid');
  if (!container) return;

  const tabBtns = document.querySelectorAll('.category-tabs .tab-btn');

  // Helper function to apply a category filter
  function applyCategoryFilter(filterKey, shouldScroll = false) {
    const targetBtn = document.querySelector(`.category-tabs .tab-btn[data-filter="${filterKey}"]`);
    if (targetBtn) {
      tabBtns.forEach(b => b.classList.remove('active'));
      targetBtn.classList.add('active');
    }

    if (!filterKey || filterKey === 'all') {
      renderProducts(SUPER_PATCH_CATALOG);
    } else {
      const filtered = SUPER_PATCH_CATALOG.filter(p => p.category === filterKey);
      renderProducts(filtered);
    }

    if (shouldScroll) {
      const controlsBar = document.querySelector('.shop-controls-bar');
      if (controlsBar) {
        controlsBar.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  // Category filter tabs click handler
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      applyCategoryFilter(filter, false);

      // Update URL without full page reload for shareability
      if (filter && filter !== 'all') {
        history.replaceState(null, '', `shop.html?category=${filter}`);
      } else {
        history.replaceState(null, '', 'shop.html');
      }
    });
  });

  // Search input filter
  const searchInput = document.getElementById('shop-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const filtered = SUPER_PATCH_CATALOG.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.benefit.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q)
      );
      renderProducts(filtered);
    });
  }

  // Check URL query parameter on page load (e.g. shop.html?category=calm)
  const urlParams = new URLSearchParams(window.location.search);
  const initialCategory = urlParams.get('category');
  if (initialCategory) {
    applyCategoryFilter(initialCategory, false);
  } else {
    renderProducts(SUPER_PATCH_CATALOG);
  }

  // Listen for browser back/forward buttons
  window.addEventListener('popstate', () => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category') || 'all';
    applyCategoryFilter(cat, true);
  });

  // Intercept in-page footer / internal links with ?category=...
  document.querySelectorAll('a[href*="shop.html?category="], a[href*="?category="]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      const url = new URL(href, window.location.href);
      const cat = url.searchParams.get('category');
      if (cat) {
        e.preventDefault();
        applyCategoryFilter(cat, true);
        history.pushState(null, '', `shop.html?category=${cat}`);
      }
    });
  });
}

function renderProducts(products) {
  const container = document.getElementById('shop-product-grid');
  const counter = document.getElementById('shop-catalog-counter');
  if (!container) return;

  if (counter) {
    counter.textContent = `Showing ${products.length} Formulation${products.length === 1 ? '' : 's'}`;
  }

  if (products.length === 0) {
    container.innerHTML = `
      <div class="shop-empty-state">
        <div class="shop-empty-icon">🔍</div>
        <h3 class="shop-empty-title">No matching formulations found</h3>
        <p class="shop-empty-sub">Try adjusting your search terms or selecting a different category filter above.</p>
        <button class="btn btn-secondary" onclick="document.getElementById('shop-search-input').value=''; document.querySelector('.category-tabs .tab-btn[data-filter=all]').click();">
          Reset All Filters
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = products.map(product => {
    return `
      <div class="product-card" data-id="${product.id}">
        <div class="card-top-badges">
          <span class="badge ${product.badgeColor}">
            ${product.isBestseller ? '★ Popular Choice' : '✓ 100% Drug-Free'}
          </span>
          <span class="patch-type-badge badge-pill-glow">
            ${product.series.includes('Botanical') ? '🌿 Botanical' : '⚡ Neuro-VTT'}
          </span>
        </div>

        <div class="patch-visual-wrapper" style="background: radial-gradient(circle, #f8fafc 0%, #f1f5f9 100%);">
          <img src="${product.image}" alt="${product.name}" class="patch-real-img" loading="lazy" decoding="async" width="220" height="220">
        </div>

        <div class="product-card-body">
          <div class="card-rating-row">
            <span class="star-rating">★★★★★</span>
            <span><strong>${product.rating}</strong> (${product.reviewsCount}+ verified)</span>
          </div>

          <h3 class="card-title">${product.name}</h3>
          <div class="card-benefit-tagline">${product.benefit}</div>
          <p class="card-desc">${product.description}</p>

          <div class="card-highlights">
            <span class="card-pill">📦 30 Patches</span>
            <span class="card-pill">⏱ 24h Support</span>
            <span class="card-pill">🛡️ Non-Invasive</span>
          </div>

          <div class="card-footer">
            <div class="card-price-block">
              <span class="card-price-label">Special Sale</span>
              <div class="card-price-row">
                <span class="card-original-price" data-cad-orig="${product.origCadPrice || 139.00}" data-usd-orig="${product.origUsdPrice || 99.00}">$${((window.SuperPatchState && window.SuperPatchState.region === 'CA') ? (product.origCadPrice || 139.00) : (product.origUsdPrice || 99.00)).toFixed(2)} ${(window.SuperPatchState && window.SuperPatchState.region === 'CA') ? 'CAD' : 'USD'}</span>
                <span class="card-price" data-cad-price="${product.cadPrice || 99.00}" data-usd-price="${product.usdPrice || 69.00}">$${((window.SuperPatchState && window.SuperPatchState.region === 'CA') ? (product.cadPrice || 99.00) : (product.usdPrice || 69.00)).toFixed(2)} ${(window.SuperPatchState && window.SuperPatchState.region === 'CA') ? 'CAD' : 'USD'}</span>
              </div>
            </div>
            <div class="card-actions-group">
              <button class="btn-card-quickview" onclick="openQuickView('${product.id}')">Quick View</button>
              <a href="https://ca.superpatch.com/?rsu=zenwellness" target="_blank" rel="noopener noreferrer" class="btn-card-buy">
                Shop Now →
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Re-run currency formatter
  if (typeof updateCurrencyDisplay === 'function') {
    updateCurrencyDisplay();
  }
}

/* --------------------------------------------------------------------------
   QUICK VIEW MODAL ENGINE
-------------------------------------------------------------------------- */
function initQuickViewModal() {
  let modalOverlay = document.getElementById('sp-quickview-modal');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'sp-quickview-modal';
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
      <div class="modal-card">
        <button class="modal-close-btn" onclick="closeQuickView()">✕</button>
        <div id="quickview-modal-content"></div>
      </div>
    `;
    document.body.appendChild(modalOverlay);

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeQuickView();
    });
  }
}

function openQuickView(productId) {
  const product = SUPER_PATCH_CATALOG.find(p => p.id === productId);
  if (!product) return;

  const content = document.getElementById('quickview-modal-content');
  if (!content) return;

  const isUS = window.SuperPatchState && window.SuperPatchState.region === 'US';
  const usdPrice = product.usdPrice || 69.00;
  const cadPrice = product.cadPrice || 99.00;
  const origUsd = product.origUsdPrice || 99.00;
  const origCad = product.origCadPrice || 139.00;

  const priceDisplay = isUS 
    ? `$${usdPrice.toFixed(2)} USD` 
    : `$${cadPrice.toFixed(2)} CAD`;

  const origPriceDisplay = isUS
    ? `$${origUsd.toFixed(2)} USD`
    : `$${origCad.toFixed(2)} CAD`;

  content.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 32px; align-items: center;">
      <div style="background: radial-gradient(circle, #f8fafc 0%, #f1f5f9 100%); border-radius: 16px; padding: 40px 20px; display: flex; justify-content: center; align-items: center;">
        <img src="${product.image}" alt="${product.name}" style="width: 100%; max-width: 240px; height: auto; object-fit: contain; filter: drop-shadow(0 14px 24px rgba(0,0,0,0.15));">
      </div>
      <div>
        <span class="badge ${product.badgeColor}" style="margin-bottom: 12px;">${product.series}</span>
        <h2 style="font-size: 2rem; margin-bottom: 8px;">${product.name}</h2>
        <p style="color: var(--brand-purple); font-weight: 700; margin-bottom: 16px;">${product.benefit}</p>
        <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 20px; line-height: 1.6;">${product.description}</p>
        
        <div style="background: #f8fafc; border-radius: 12px; padding: 16px; margin-bottom: 20px; font-size: 0.875rem;">
          <div style="margin-bottom: 8px;"><strong>Active Formulation / Technology:</strong> ${product.tagline}</div>
          <div style="margin-bottom: 8px;"><strong>Package Size:</strong> ${product.packSize}</div>
          <div><strong>How to Use:</strong> ${product.usage}</div>
        </div>

        <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #e2e8f0; padding-top: 20px; flex-wrap: wrap; gap: 16px;">
          <div>
            <div style="font-size: 0.725rem; color: #16a34a; text-transform: uppercase; font-weight: 800; letter-spacing: 0.05em; margin-bottom: 4px;">⚡ Limited Time Sale (Save $30)</div>
            <div style="display: flex; align-items: baseline; gap: 10px;">
              <span style="font-size: 1.15rem; color: #94a3b8; text-decoration: line-through; font-weight: 600;" data-cad-orig="${origCad}" data-usd-orig="${origUsd}">${origPriceDisplay}</span>
              <span style="font-size: 1.85rem; font-weight: 900; color: #0f172a;" data-cad-price="${cadPrice}" data-usd-price="${usdPrice}">${priceDisplay}</span>
            </div>
          </div>
          <a href="https://ca.superpatch.com/?rsu=zenwellness" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="padding: 14px 28px;">
            Order on Official Site →
          </a>
        </div>
      </div>
    </div>
  `;

  const modalOverlay = document.getElementById('sp-quickview-modal');
  if (modalOverlay) {
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeQuickView() {
  const modalOverlay = document.getElementById('sp-quickview-modal');
  if (modalOverlay) {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}
