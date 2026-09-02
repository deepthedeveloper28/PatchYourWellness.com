/**
 * SUPER PATCH - INTERACTIVE 3-STEP ROUTINE FINDER QUIZ
 * Match user wellness goals to ideal non-medicated patch formulation
 */

const QUIZ_STATE = {
  step: 1,
  goal: '',
  lifestyle: '',
  techPref: ''
};

document.addEventListener('DOMContentLoaded', () => {
  initQuiz();
});

function initQuiz() {
  const quizWrapper = document.getElementById('patch-quiz-app');
  if (!quizWrapper) return;

  renderQuizStep(1);
}

function renderQuizStep(stepNumber) {
  QUIZ_STATE.step = stepNumber;
  const progressFill = document.querySelector('.quiz-progress-fill');
  if (progressFill) {
    progressFill.style.width = `${(stepNumber / 3) * 100}%`;
  }

  const stepContainers = document.querySelectorAll('.quiz-step-container');
  stepContainers.forEach(container => {
    container.classList.remove('active');
    if (container.getAttribute('data-step') === String(stepNumber)) {
      container.classList.add('active');
    }
  });
}

function selectQuizOption(category, value, el) {
  QUIZ_STATE[category] = value;
  
  // Highlight selection
  const parentGrid = el.closest('.quiz-options-grid');
  if (parentGrid) {
    parentGrid.querySelectorAll('.quiz-option-card').forEach(card => card.classList.remove('selected'));
    el.classList.add('selected');
  }

  // Smooth auto-advance after 300ms
  setTimeout(() => {
    if (QUIZ_STATE.step < 3) {
      renderQuizStep(QUIZ_STATE.step + 1);
    } else {
      calculateAndShowResult();
    }
  }, 280);
}

function quizGoPrev() {
  if (QUIZ_STATE.step > 1) {
    renderQuizStep(QUIZ_STATE.step - 1);
  }
}

function calculateAndShowResult() {
  const resultContainer = document.getElementById('quiz-result-wrapper');
  const quizContent = document.getElementById('quiz-interactive-content');
  if (!resultContainer || !quizContent) return;

  quizContent.style.display = 'none';
  resultContainer.style.display = 'block';

  let matchedId = 'zen';
  let matchReason = 'Perfect for unwinding the mind and nurturing calm daily focus.';

  if (QUIZ_STATE.goal === 'calm') {
    matchedId = (QUIZ_STATE.lifestyle === 'busy') ? 'peace' : 'zen';
    matchReason = 'Specially formulated to promote feelings of serene calm, mental composure, and daily stress resilience.';
  } else if (QUIZ_STATE.goal === 'energy') {
    matchedId = 'boost';
    matchReason = 'Ideal for steady, all-day clean vitality without caffeine jitters or afternoon slumps.';
  } else if (QUIZ_STATE.goal === 'focus') {
    matchedId = 'focus';
    matchReason = 'Specially formulated for deep concentration, memory, and sustained cognitive workflow.';
  } else if (QUIZ_STATE.goal === 'sleep') {
    matchedId = 'rem';
    matchReason = 'Engineered to support a smooth evening transition into deep, restorative, high-quality rest.';
  } else if (QUIZ_STATE.goal === 'mobility') {
    matchedId = (QUIZ_STATE.lifestyle === 'active') ? 'victory' : 'freedom';
    matchReason = 'Designed with targeted neural vibrotactile patterns to support physical comfort, flexibility, and mobility.';
  } else if (QUIZ_STATE.goal === 'balance') {
    matchedId = 'liberty';
    matchReason = 'Supports core neuromuscular stability, center-of-gravity coordination, and steady balance.';
  }

  const catalog = (typeof SUPER_PATCH_CATALOG !== 'undefined' && SUPER_PATCH_CATALOG.length) ? SUPER_PATCH_CATALOG : (window.SUPER_PATCH_CATALOG || []);
  let patch = catalog.find(p => p.id === matchedId) || catalog[0] || {
    id: 'zen',
    name: 'Zen Patch',
    image: 'images/products/zen-patch.webp',
    benefit: 'Mindful Focus, Presence & Flow State',
    description: 'Cultivate mindful focus and become fully present in each moment.'
  };

  resultContainer.innerHTML = `
    <div class="quiz-result-box">
      <span class="quiz-result-match-badge">🎉 98% Compatibility Match For You</span>
      <h3 style="font-size: 2.2rem; margin-bottom: 8px; color: var(--text-dark);">${patch.name}</h3>
      <p style="color: var(--brand-purple); font-weight: 700; font-size: 1.1rem; margin-bottom: 16px;">${patch.benefit}</p>
      
      <div class="quiz-result-image-wrapper">
        <img src="${patch.image}" alt="${patch.name}" class="quiz-result-patch-img" loading="eager">
      </div>

      <p style="color: var(--text-body); font-size: 1rem; line-height: 1.6; max-width: 520px; margin: 0 auto 24px;">
        ${matchReason} ${patch.description}
      </p>

      <div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
        <a href="https://ca.superpatch.com/?rsu=zenwellness" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-lg btn-pulse">
          Claim Your ${patch.name} on Official Store →
        </a>
        <button onclick="resetQuiz()" class="btn btn-secondary">
          Retake Quiz ↺
        </button>
      </div>
    </div>
  `;
}

function resetQuiz() {
  QUIZ_STATE.step = 1;
  QUIZ_STATE.goal = '';
  QUIZ_STATE.lifestyle = '';
  QUIZ_STATE.techPref = '';

  const resultContainer = document.getElementById('quiz-result-wrapper');
  const quizContent = document.getElementById('quiz-interactive-content');
  if (resultContainer && quizContent) {
    resultContainer.style.display = 'none';
    quizContent.style.display = 'block';
  }

  document.querySelectorAll('.quiz-option-card').forEach(c => c.classList.remove('selected'));
  renderQuizStep(1);
}
