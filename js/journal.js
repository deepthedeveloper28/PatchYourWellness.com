/**
 * SUPER PATCH - WELLNESS JOURNAL ARTICLE DATABASE & LIVE WORDPRESS ENGINE
 * Dynamic live fetch from https://admin.patchyourwellness.com/
 * High-performance Stale-While-Revalidate caching architecture
 */

const WP_API_BASE = 'https://admin.patchyourwellness.com/wp-json/wp/v2';
const WP_POSTS_CACHE_KEY = 'pw_live_articles_cache_v2';
const WP_CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes cache refresh

// Initial high-performance pre-bundled snapshot of live WordPress posts for instant 0ms first-paint
const INITIAL_LIVE_SNAPSHOT = [
  {
    id: 17,
    slug: 'revitalize-your-life-10-natural-ways-to-boost-your-energy-levels',
    category: 'fitness-tips',
    categoryLabel: 'Fitness Tips',
    categoryBadge: 'badge-gold',
    title: 'Revitalize Your Life: 10 Natural Ways to Boost Your Energy Levels',
    excerpt: 'Feeling sluggish or drained of energy can disrupt your daily activities. Discover 10 science-informed, natural methods to revitalize your vitality and stay charged all day.',
    readTime: '6 min read',
    date: 'September 1, 2026',
    author: 'Editorial Team',
    image: 'https://admin.patchyourwellness.com/wp-content/uploads/2026/09/dalle_6a9643a005c268.56714569.png',
    isFeatured: true,
    recommendedPatch: {
      name: 'Boost Patch (Clean Energy)',
      url: 'https://ca.superpatch.com/?rsu=zenwellness',
      tagline: '24-Hour Transdermal Botanical Stamina & Vitality'
    }
  },
  {
    id: 15,
    slug: 'travel-light-live-well-essential-wellness-tips-for-your-next-adventure',
    category: 'fitness-tips',
    categoryLabel: 'Fitness Tips',
    categoryBadge: 'badge-blue',
    title: 'Travel Light, Live Well: Essential Wellness Tips for Your Next Adventure',
    excerpt: 'Traveling is one of life’s greatest pleasures. Explore essential wellness strategies and non-invasive routine hacks to feel revitalized on the move.',
    readTime: '5 min read',
    date: 'September 1, 2026',
    author: 'Editorial Team',
    image: 'https://admin.patchyourwellness.com/wp-content/uploads/2026/09/dalle_6a9643661f1e05.38504557.png',
    isFeatured: false,
    recommendedPatch: {
      name: 'Assure Patch (Travel Comfort)',
      url: 'https://ca.superpatch.com/?rsu=zenwellness',
      tagline: 'Motion Balance & Travel Equilibrium • 100% Drug-Free'
    }
  },
  {
    id: 13,
    slug: 'natures-pharmacy-top-natural-remedies-for-pain-relief',
    category: 'fitness-tips',
    categoryLabel: 'Fitness Tips',
    categoryBadge: 'badge-purple',
    title: 'Nature’s Pharmacy: Top Natural Remedies for Pain Relief',
    excerpt: 'Explore ancient botanicals, tactile somatic pathways, and non-invasive natural solutions that have stood the test of time to support physical ease.',
    readTime: '5 min read',
    date: 'September 1, 2026',
    author: 'Editorial Team',
    image: 'https://admin.patchyourwellness.com/wp-content/uploads/2026/09/dalle_6a96433695e8d1.61036857.png',
    isFeatured: false,
    recommendedPatch: {
      name: 'Freedom Patch (Targeted Relief)',
      url: 'https://ca.superpatch.com/?rsu=zenwellness',
      tagline: 'Drug-Free Comfort for Aches & Discomfort'
    }
  },
  {
    id: 11,
    slug: 'sweet-dreams-top-natural-solutions-for-a-restful-nights-sleep',
    category: 'fitness-tips',
    categoryLabel: 'Fitness Tips',
    categoryBadge: 'badge-blue',
    title: 'Sweet Dreams: Top Natural Solutions for a Restful Night’s Sleep',
    excerpt: 'Quality sleep is the foundational pillar of immune resilience and emotional health. Discover natural solutions for restful sleep without morning grogginess.',
    readTime: '5 min read',
    date: 'September 1, 2026',
    author: 'Editorial Team',
    image: 'https://admin.patchyourwellness.com/wp-content/uploads/2026/09/dalle_6a9642fac6ff45.01774845.png',
    isFeatured: false,
    recommendedPatch: {
      name: 'REM Patch (Restorative Sleep)',
      url: 'https://ca.superpatch.com/?rsu=zenwellness',
      tagline: 'Circadian Balance & Deep Rest Support'
    }
  },
  {
    id: 9,
    slug: 'unlocking-your-mind-10-effective-strategies-for-enhanced-mental-clarity',
    category: 'fitness-tips',
    categoryLabel: 'Fitness Tips',
    categoryBadge: 'badge-purple',
    title: 'Unlocking Your Mind: 10 Effective Strategies for Enhanced Mental Clarity',
    excerpt: 'In a distracted world, cognitive sharpness is your superpower. Discover 10 actionable routines to quiet mental noise and achieve peak flow state.',
    readTime: '6 min read',
    date: 'September 1, 2026',
    author: 'Editorial Team',
    image: 'https://admin.patchyourwellness.com/wp-content/uploads/2026/09/dalle_6a96428c8bddc2.50141338.png',
    isFeatured: false,
    recommendedPatch: {
      name: 'Zen Patch (Mindfulness & Focus)',
      url: 'https://ca.superpatch.com/?rsu=zenwellness',
      tagline: 'Cognitive Flow & Calm Presence • 100% Vibrotactile'
    }
  }
];

// Active article database in memory
window.JOURNAL_ARTICLES = INITIAL_LIVE_SNAPSHOT;
window.JOURNAL_CATEGORIES = [];
let currentFilter = 'all';

/* --------------------------------------------------------------------------
   UTILITY HELPERS FOR TEXT & METADATA SANITIZATION
-------------------------------------------------------------------------- */
function decodeHtml(html) {
  if (!html) return '';
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

function stripHtml(html) {
  if (!html) return '';
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

function calculateReadTime(contentHtml) {
  const text = stripHtml(contentHtml);
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(3, Math.ceil(wordCount / 180));
  return `${minutes} min read`;
}

function formatDate(isoString) {
  if (!isoString) return 'September 2026';
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return 'September 2026';
    return d.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  } catch (e) {
    return 'September 2026';
  }
}

function getCategoryBadge(slug) {
  const badgeMap = {
    'fitness-tips': 'badge-gold',
    'botanical': 'badge-purple',
    'neuro': 'badge-purple',
    'sleep': 'badge-blue',
    'energy': 'badge-gold',
    'calm': 'badge-purple',
    'mobility': 'badge-gold'
  };
  return badgeMap[slug] || 'badge-purple';
}

function getCompanionPatch(title, content, categorySlug) {
  const combined = `${title} ${content} ${categorySlug}`.toLowerCase();
  
  if (combined.includes('energy') || combined.includes('fatigue') || combined.includes('vitality') || combined.includes('stamina')) {
    return {
      name: 'Boost Patch (Clean Energy)',
      url: 'https://ca.superpatch.com/?rsu=zenwellness',
      tagline: '24-Hour Transdermal Botanical Stamina & Vitality'
    };
  }
  if (combined.includes('sleep') || combined.includes('night') || combined.includes('dream') || combined.includes('restful') || combined.includes('circadian')) {
    return {
      name: 'REM Patch (Restorative Sleep)',
      url: 'https://ca.superpatch.com/?rsu=zenwellness',
      tagline: 'Circadian Balance & Deep Rest Support'
    };
  }
  if (combined.includes('pain') || combined.includes('relief') || combined.includes('ache') || combined.includes('discomfort') || combined.includes('stiffness')) {
    return {
      name: 'Freedom Patch (Targeted Relief)',
      url: 'https://ca.superpatch.com/?rsu=zenwellness',
      tagline: 'Drug-Free Comfort for Aches & Discomfort'
    };
  }
  if (combined.includes('travel') || combined.includes('motion') || combined.includes('nausea') || combined.includes('adventure')) {
    return {
      name: 'Assure Patch (Travel Comfort)',
      url: 'https://ca.superpatch.com/?rsu=zenwellness',
      tagline: 'Motion Balance & Travel Equilibrium • 100% Drug-Free'
    };
  }
  if (combined.includes('clarity') || combined.includes('mind') || combined.includes('focus') || combined.includes('brain') || combined.includes('cognitive')) {
    return {
      name: 'Zen Patch (Mindfulness & Focus)',
      url: 'https://ca.superpatch.com/?rsu=zenwellness',
      tagline: 'Cognitive Flow & Calm Presence • 100% Vibrotactile'
    };
  }
  
  return {
    name: 'Zen Patch (Mindful Harmony)',
    url: 'https://ca.superpatch.com/?rsu=zenwellness',
    tagline: 'Daily Mindful Focus & Flow State'
  };
}

/**
 * Transforms a raw WordPress post object to a clean Article model
 */
function transformWpPost(post, index) {
  const title = decodeHtml(post.title?.rendered || 'Untitled Article');
  
  let excerpt = stripHtml(post.excerpt?.rendered || '');
  excerpt = excerpt.replace(/\[&hellip;\]|\[\.\.\.\]/g, '...').trim();
  if (!excerpt && post.content?.rendered) {
    excerpt = stripHtml(post.content.rendered).slice(0, 180) + '...';
  }

  const contentHtml = post.content?.rendered || '';
  const dateFormatted = formatDate(post.date);

  // Extract featured image safely
  let imageUrl = 'images/blog-hero.jpg';
  if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
    imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
  } else if (post.featured_media_src_url) {
    imageUrl = post.featured_media_src_url;
  } else if (post.jetpack_featured_media_url) {
    imageUrl = post.jetpack_featured_media_url;
  }

  // Extract category
  const term = post._embedded?.['wp:term']?.[0]?.[0];
  const categorySlug = term?.slug || 'wellness';
  const categoryLabel = decodeHtml(term?.name || 'Wellness Guide');
  const categoryBadge = getCategoryBadge(categorySlug);

  // Author
  const authorName = post._embedded?.author?.[0]?.name ? decodeHtml(post._embedded.author[0].name) : 'Editorial Team';

  return {
    id: post.id,
    slug: post.slug,
    category: categorySlug,
    categoryLabel: categoryLabel,
    categoryBadge: categoryBadge,
    title: title,
    excerpt: excerpt,
    readTime: calculateReadTime(contentHtml),
    date: dateFormatted,
    author: authorName,
    image: imageUrl,
    isFeatured: index === 0,
    contentHtml: contentHtml,
    recommendedPatch: getCompanionPatch(title, contentHtml, categorySlug)
  };
}

/* --------------------------------------------------------------------------
   FETCHING & FAST STALE-WHILE-REVALIDATE ENGINE
-------------------------------------------------------------------------- */
async function fetchWordPressArticles() {
  // 1. Check LocalStorage Cache for instant retrieval
  try {
    const cachedData = localStorage.getItem(WP_POSTS_CACHE_KEY);
    if (cachedData) {
      const parsed = JSON.parse(cachedData);
      if (Array.isArray(parsed.articles) && parsed.articles.length > 0) {
        window.JOURNAL_ARTICLES = parsed.articles;
        updateUI();
      }
    }
  } catch (err) {
    console.warn('Could not read posts from localStorage:', err);
  }

  // 2. Fetch fresh articles asynchronously in background
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s network timeout

    const res = await fetch(`${WP_API_BASE}/posts?_embed&per_page=100`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`WordPress API returned status ${res.status}`);
    }

    const rawPosts = await res.json();
    
    // Filter out standard default placeholder hello-world post
    const publishedPosts = rawPosts.filter(p => p.slug !== 'hello-world' && p.id !== 1);

    if (publishedPosts.length > 0) {
      const transformedArticles = publishedPosts.map((p, idx) => transformWpPost(p, idx));
      window.JOURNAL_ARTICLES = transformedArticles;
      
      // Save to localStorage for instant subsequent loads
      try {
        localStorage.setItem(WP_POSTS_CACHE_KEY, JSON.stringify({
          articles: transformedArticles,
          timestamp: Date.now()
        }));
      } catch (storageErr) {
        console.warn('LocalStorage save failed:', storageErr);
      }

      // Re-render UI with freshly fetched posts
      updateUI();
    }
  } catch (err) {
    console.warn('Live fetch from WordPress API failed, using cached snapshot:', err);
    // UI already rendered with cached data or INITIAL_LIVE_SNAPSHOT
    updateUI();
  }
}

/* --------------------------------------------------------------------------
   UI RENDERING FUNCTIONS FOR BLOG.HTML
-------------------------------------------------------------------------- */
function updateUI() {
  if (typeof initJournalPage === 'function') {
    renderCategoryTabs();
    applyFilterAndSearch();
  }
}

function renderCategoryTabs() {
  const tabsContainer = document.getElementById('journal-category-tabs');
  if (!tabsContainer) return;

  // Extract unique categories from articles
  const categoriesMap = new Map();
  window.JOURNAL_ARTICLES.forEach(a => {
    if (!categoriesMap.has(a.category)) {
      categoriesMap.set(a.category, {
        slug: a.category,
        label: a.categoryLabel,
        count: 1
      });
    } else {
      categoriesMap.get(a.category).count++;
    }
  });

  const totalCount = window.JOURNAL_ARTICLES.length;

  let tabsHtml = `
    <button class="tab-btn ${currentFilter === 'all' ? 'active' : ''}" data-filter="all">
      ✨ All Guides (${totalCount})
    </button>
  `;

  categoriesMap.forEach((cat) => {
    tabsHtml += `
      <button class="tab-btn ${currentFilter === cat.slug ? 'active' : ''}" data-filter="${cat.slug}">
        🏷️ ${cat.label} (${cat.count})
      </button>
    `;
  });

  tabsContainer.innerHTML = tabsHtml;

  // Attach event listeners to tabs
  tabsContainer.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      tabsContainer.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter') || 'all';
      applyFilterAndSearch();
    });
  });
}

function applyFilterAndSearch() {
  const searchInput = document.getElementById('journal-search-input');
  const q = searchInput ? searchInput.value.toLowerCase().trim() : '';

  let filtered = window.JOURNAL_ARTICLES;

  if (currentFilter !== 'all') {
    filtered = filtered.filter(a => a.category === currentFilter);
  }

  if (q) {
    filtered = filtered.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.categoryLabel.toLowerCase().includes(q) ||
      a.author.toLowerCase().includes(q)
    );
  }

  renderJournalArticles(filtered);
}

function renderJournalArticles(articles) {
  const featuredContainer = document.getElementById('journal-featured-container');
  const grid = document.getElementById('journal-grid');
  const countBadge = document.getElementById('journal-count-badge');

  if (countBadge) {
    countBadge.textContent = `Showing ${articles.length} Article${articles.length === 1 ? '' : 's'}`;
  }

  if (!grid) return;

  if (articles.length === 0) {
    if (featuredContainer) featuredContainer.innerHTML = '';
    grid.innerHTML = `
      <div class="shop-empty-state" style="grid-column: 1 / -1; padding: 48px 24px; text-align: center;">
        <div class="shop-empty-icon" style="font-size: 3rem; margin-bottom: 16px;">📖</div>
        <h3 class="shop-empty-title" style="font-size: 1.4rem; color: #0f172a; margin-bottom: 8px;">No articles match your criteria</h3>
        <p class="shop-empty-sub" style="color: #64748b; margin-bottom: 20px;">Try searching for different keywords or select 'All Guides'.</p>
        <button class="btn btn-secondary" onclick="resetJournalFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  // If viewing all and not searching, show lead featured article
  const searchInput = document.getElementById('journal-search-input');
  const isSearching = searchInput && searchInput.value.trim().length > 0;

  if (featuredContainer) {
    if (!isSearching && currentFilter === 'all' && articles.length > 0) {
      const lead = articles[0];
      featuredContainer.innerHTML = `
        <div class="journal-featured-card" onclick="openArticleReader('${lead.id}')">
          <div class="journal-featured-img">
            <img src="${lead.image}" alt="${lead.title}" loading="lazy">
          </div>
          <div class="journal-featured-body">
            <div class="journal-badge-row">
              <span class="badge badge-purple">★ Latest Guide</span>
              <span class="badge ${lead.categoryBadge}">${lead.categoryLabel}</span>
            </div>
            <h2 class="journal-featured-title">
              ${lead.title}
            </h2>
            <p class="journal-featured-excerpt">
              ${lead.excerpt}
            </p>
            <div class="journal-meta-row">
              <span>By ${lead.author} • ${lead.readTime}</span>
              <button class="journal-read-btn" style="font-size: 1rem;">Read Full Guide →</button>
            </div>
          </div>
        </div>
      `;
    } else {
      featuredContainer.innerHTML = '';
    }
  }

  // Render grid items
  // If featured card is shown, slice the rest for grid; else show all
  const gridArticles = (!isSearching && currentFilter === 'all' && articles.length > 1 && featuredContainer) 
    ? articles.slice(1) 
    : articles;

  grid.innerHTML = gridArticles.map(article => {
    return `
      <article class="journal-card" onclick="openArticleReader('${article.id}')">
        <div class="journal-card-thumb">
          <img src="${article.image}" alt="${article.title}" loading="lazy" onerror="this.src='images/blog-hero.jpg'">
        </div>
        <div class="journal-card-body">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <span class="badge ${article.categoryBadge}" style="font-size: 0.75rem;">${article.categoryLabel}</span>
            <span style="font-size: 0.8rem; color: #94a3b8;">${article.readTime}</span>
          </div>
          <h3 class="journal-card-title">${article.title}</h3>
          <p class="journal-card-excerpt">${article.excerpt}</p>
          <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #f1f5f9; padding-top: 14px; margin-top: auto;">
            <span style="font-size: 0.8rem; color: #64748b;">${article.date}</span>
            <button class="journal-read-btn" aria-label="Read ${article.title}">
              Read Guide →
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function setupJournalSearch() {
  const searchInput = document.getElementById('journal-search-input');
  if (!searchInput) return;

  let debounceTimer;
  searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      applyFilterAndSearch();
    }, 150);
  });
}

function resetJournalFilters() {
  const searchInput = document.getElementById('journal-search-input');
  if (searchInput) searchInput.value = '';
  currentFilter = 'all';
  const allBtn = document.querySelector('#journal-category-tabs .tab-btn[data-filter="all"]');
  if (allBtn) allBtn.click();
  else applyFilterAndSearch();
}

/* --------------------------------------------------------------------------
   ARTICLE NAVIGATION LOGIC
-------------------------------------------------------------------------- */
window.openArticleReader = function(articleId) {
  window.location.href = `post.html?id=${articleId}`;
};

function initJournalPage() {
  renderCategoryTabs();
  applyFilterAndSearch();
  setupJournalSearch();
}

// Kick off initialization and live fetch
document.addEventListener('DOMContentLoaded', () => {
  initJournalPage();
  fetchWordPressArticles();
});
