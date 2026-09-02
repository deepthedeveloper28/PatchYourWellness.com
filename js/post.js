/**
 * PatchYourWellness.com - Single Blog Post Page Engine
 * High-performance dynamic post loader with instant caching & live WordPress sync
 */

document.addEventListener('DOMContentLoaded', () => {
  loadSinglePost();
});

async function loadSinglePost() {
  const urlParams = new URLSearchParams(window.location.search);
  const postIdParam = urlParams.get('id') || urlParams.get('slug') || '17';

  // 1. Check in-memory articles first
  let article = findArticleInCollection(postIdParam, window.JOURNAL_ARTICLES);

  // 2. Check localStorage cache if not found in memory
  if (!article) {
    try {
      const cached = localStorage.getItem('pw_live_articles_cache_v2');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed.articles)) {
          article = findArticleInCollection(postIdParam, parsed.articles);
          window.JOURNAL_ARTICLES = parsed.articles;
        }
      }
    } catch (e) {
      console.warn('LocalStorage read failed:', e);
    }
  }

  // 3. If found locally, render immediately with 0ms latency
  if (article) {
    renderArticleDetails(article);
  }

  // 4. Fetch live from WordPress API to ensure latest content / full body
  try {
    let wpPost = null;
    const isNumericId = /^\d+$/.test(postIdParam);

    if (isNumericId) {
      const res = await fetch(`https://admin.patchyourwellness.com/wp-json/wp/v2/posts/${postIdParam}?_embed`);
      if (res.ok) {
        wpPost = await res.json();
      }
    } else {
      const res = await fetch(`https://admin.patchyourwellness.com/wp-json/wp/v2/posts?slug=${encodeURIComponent(postIdParam)}&_embed`);
      if (res.ok) {
        const list = await res.json();
        if (list.length > 0) wpPost = list[0];
      }
    }

    if (wpPost && typeof transformWpPost === 'function') {
      article = transformWpPost(wpPost, 0);
      renderArticleDetails(article);
    } else if (!article && window.JOURNAL_ARTICLES && window.JOURNAL_ARTICLES.length > 0) {
      // Fallback to first available article
      article = window.JOURNAL_ARTICLES[0];
      renderArticleDetails(article);
    }
  } catch (fetchErr) {
    console.warn('Live post fetch error:', fetchErr);
    if (!article && window.JOURNAL_ARTICLES && window.JOURNAL_ARTICLES.length > 0) {
      article = window.JOURNAL_ARTICLES[0];
      renderArticleDetails(article);
    }
  }
}

function findArticleInCollection(query, list) {
  if (!Array.isArray(list) || list.length === 0) return null;
  const qStr = String(query).toLowerCase();
  return list.find(a => String(a.id) === qStr || String(a.slug).toLowerCase() === qStr);
}

function renderArticleDetails(article) {
  if (!article) return;

  // Set document meta & title
  document.title = `${article.title} | PatchYourWellness.com`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', article.excerpt || article.title);
  }

  // Populate Breadcrumb
  const breadcrumbTitle = document.getElementById('post-breadcrumb-title');
  if (breadcrumbTitle) breadcrumbTitle.textContent = article.title;

  // Category Badge
  const categoryBadge = document.getElementById('post-category-badge');
  if (categoryBadge) {
    categoryBadge.className = `badge ${article.categoryBadge || 'badge-purple'}`;
    categoryBadge.textContent = article.categoryLabel || 'Wellness Guide';
  }

  // Read Time
  const readTimeEl = document.getElementById('post-readtime');
  if (readTimeEl) readTimeEl.textContent = `⏱ ${article.readTime || '5 min read'}`;

  // Title
  const titleEl = document.getElementById('post-title');
  if (titleEl) titleEl.textContent = article.title;

  // Excerpt
  const excerptEl = document.getElementById('post-excerpt');
  if (excerptEl) excerptEl.textContent = article.excerpt;

  // Author info
  const authorNameEl = document.getElementById('post-author-name');
  if (authorNameEl) authorNameEl.textContent = article.author || 'Editorial Team';

  const authorBioEl = document.getElementById('post-bio-author');
  if (authorBioEl) authorBioEl.textContent = article.author || 'Editorial Team';

  const initialsEl = document.getElementById('post-author-initials');
  if (initialsEl) {
    const initials = (article.author || 'PW')
      .split(' ')
      .filter(Boolean)
      .map(n => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
    initialsEl.textContent = initials || 'PW';
  }

  // Date
  const dateEl = document.getElementById('post-date');
  if (dateEl) dateEl.textContent = article.date;

  // Hero Image
  const heroImg = document.getElementById('post-hero-img');
  if (heroImg) {
    heroImg.src = article.image;
    heroImg.alt = article.title;
    heroImg.onerror = () => { heroImg.src = 'images/blog-hero.jpg'; };
  }

  // Body Content
  const bodyContentEl = document.getElementById('post-body-content');
  if (bodyContentEl) {
    // Clean up excessive empty paragraphs from WordPress
    let cleanHtml = article.contentHtml || '';
    cleanHtml = cleanHtml.replace(/<p>\s*<\/p>/gi, '');
    bodyContentEl.innerHTML = cleanHtml;
  }

  // Recommended Companion Patch Box
  if (article.recommendedPatch) {
    const recName = document.getElementById('post-rec-name');
    if (recName) recName.textContent = article.recommendedPatch.name;

    const recTagline = document.getElementById('post-rec-tagline');
    if (recTagline) recTagline.textContent = article.recommendedPatch.tagline;

    const recLink = document.getElementById('post-rec-link');
    if (recLink) recLink.href = article.recommendedPatch.url || 'https://ca.superpatch.com/?rsu=zenwellness';
  }

  // Render Related Articles (excluding current)
  renderRelatedPosts(article.id);
}

function renderRelatedPosts(currentId) {
  const relatedGrid = document.getElementById('related-posts-grid');
  if (!relatedGrid) return;

  const list = window.JOURNAL_ARTICLES || [];
  const related = list.filter(a => String(a.id) !== String(currentId)).slice(0, 3);

  if (related.length === 0) {
    relatedGrid.innerHTML = '';
    return;
  }

  relatedGrid.innerHTML = related.map(article => {
    return `
      <article class="journal-card" onclick="window.location.href='post.html?id=${article.id}'">
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

function copyPostLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    alert('Article link copied to clipboard! 📋');
  }).catch(() => {
    prompt('Copy this link:', window.location.href);
  });
}

function sharePostTwitter() {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(document.title);
  window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
}

function sharePostFacebook() {
  const url = encodeURIComponent(window.location.href);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
}
