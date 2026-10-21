/**
 * MilitaryToCorp (M2C) — Interactive Component Scripts
 * Philosophy: "Life is in the details. Look closer. Live easier."
 * Layout: Modern, Innovative, Simple & Smooth Bento Grids & Micro-Interactions
 */

(function () {
  'use strict';

  // -------------------------------------------------------------------------
  // DOM Elements
  // -------------------------------------------------------------------------
  const header = document.getElementById('mainHeader');
  const scrollProgress = document.getElementById('scrollProgress');
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileDrawerBackdrop = document.getElementById('mobileDrawerBackdrop');
  const mobileDrawerClose = document.getElementById('mobileDrawerClose');
  const toastNotice = document.getElementById('toastNotice');
  const toastMessage = document.getElementById('toastMessage');

  // -------------------------------------------------------------------------
  // Scroll Progress & Header Scroll Styling
  // -------------------------------------------------------------------------
  function handleScroll() {
    if (!header) return;
    const scrollY = window.scrollY || window.pageYOffset;
    if (scrollY > 15) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (scrollProgress) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progressPercent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      scrollProgress.style.width = Math.min(100, Math.max(0, progressPercent)) + '%';
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // -------------------------------------------------------------------------
  // Live IST Digital Clock
  // -------------------------------------------------------------------------
  function updateLiveClock() {
    const clockEl = document.getElementById('liveClock');
    if (!clockEl) return;
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const hoursStr = String(hours).padStart(2, '0');
    clockEl.textContent = `${hoursStr}:${minutes}:${seconds} ${ampm} IST`;
  }
  updateLiveClock();
  setInterval(updateLiveClock, 1000);

  // -------------------------------------------------------------------------
  // Accessible Dropdown Navigation
  // -------------------------------------------------------------------------
  const navDrops = document.querySelectorAll('.nav-drop, .nav-item-dropdown');

  navDrops.forEach(drop => {
    const btn = drop.querySelector('.nav-drop-btn, .nav-dropdown-btn');
    if (!btn) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = drop.classList.contains('is-open');

      // Close all other dropdowns
      navDrops.forEach(d => {
        if (d !== drop) {
          d.classList.remove('is-open');
          const otherBtn = d.querySelector('.nav-drop-btn, .nav-dropdown-btn');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      if (isOpen) {
        drop.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        drop.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Close dropdowns on outside click or Escape
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-drop') && !e.target.closest('.nav-item-dropdown')) {
      navDrops.forEach(drop => {
        drop.classList.remove('is-open');
        const btn = drop.querySelector('.nav-drop-btn, .nav-dropdown-btn');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      navDrops.forEach(drop => {
        drop.classList.remove('is-open');
        const btn = drop.querySelector('.nav-drop-btn, .nav-dropdown-btn');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
      closeMobileMenu();
      closeModal();
    }
  });

  // -------------------------------------------------------------------------
  // Mobile Drawer Navigation
  // -------------------------------------------------------------------------
  function openMobileMenu() {
    if (!mobileDrawer || !mobileDrawerBackdrop) return;
    mobileDrawer.classList.add('is-open');
    mobileDrawerBackdrop.classList.add('is-open');
    document.body.classList.add('menu-locked');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
  }

  function closeMobileMenu() {
    if (!mobileDrawer || !mobileDrawerBackdrop) return;
    mobileDrawer.classList.remove('is-open');
    mobileDrawerBackdrop.classList.remove('is-open');
    document.body.classList.remove('menu-locked');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileDrawer && mobileDrawer.classList.contains('is-open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileDrawerClose) {
    mobileDrawerClose.addEventListener('click', closeMobileMenu);
  }

  if (mobileDrawerBackdrop) {
    mobileDrawerBackdrop.addEventListener('click', closeMobileMenu);
  }

  // -------------------------------------------------------------------------
  // Toast Notifications
  // -------------------------------------------------------------------------
  let toastTimer = null;
  function showToast(message, duration = 3500) {
    if (!toastNotice || !toastMessage) return;
    toastMessage.textContent = message;
    toastNotice.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastNotice.classList.remove('is-visible');
    }, duration);
  }

  window.showM2CToast = showToast;

  // -------------------------------------------------------------------------
  // Innovative Hero Fast-Finder Interaction
  // -------------------------------------------------------------------------
  const heroFinderBtn = document.getElementById('heroFinderBtn');
  const heroRoleSelect = document.getElementById('heroRoleSelect');

  if (heroFinderBtn) {
    heroFinderBtn.addEventListener('click', () => {
      const selectedRole = heroRoleSelect ? heroRoleSelect.value : 'all';
      const jobsSection = document.getElementById('hot-jobs');
      
      // Update jobs category tab
      const targetTab = document.querySelector(`.jobs-tab-btn[data-category="${selectedRole}"]`) ||
                        document.querySelector('.jobs-tab-btn[data-category="all"]');
      if (targetTab) {
        targetTab.click();
      }

      // Smooth scroll to jobs section
      if (jobsSection) {
        jobsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      showToast(`Filtering verified positions for ${heroRoleSelect?.options[heroRoleSelect.selectedIndex].text || 'all categories'}`);
    });
  }

  // Quick tag chips in Hero
  document.querySelectorAll('.quick-tag-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const tagText = chip.getAttribute('data-search') || chip.textContent.replace('#', '').trim();
      const searchInput = document.getElementById('jobSearchInput');
      const jobsSection = document.getElementById('hot-jobs');

      if (searchInput) {
        searchInput.value = tagText;
        searchInput.dispatchEvent(new Event('input', { bubbles: true }));
      }

      if (jobsSection) {
        jobsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      showToast(`Showing opportunities tagged "${tagText}"`);
    });
  });

  // Floating Help Pill
  const floatingHelpPill = document.querySelector('.floating-help-pill');
  if (floatingHelpPill) {
    const openHelp = () => {
      const helplineCard = document.getElementById('helplineCard');
      if (helplineCard) {
        helplineCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      showToast('Need assistance? Call Helpline: +91 124 420 0300 or Email: info@militarytocorp.com', 4500);
    };
    floatingHelpPill.addEventListener('click', openHelp);
    floatingHelpPill.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openHelp();
      }
    });
  }

  // Hero Banner Carousel
  const heroPrev = document.querySelector('.hero-carousel-arrow.arrow-prev');
  const heroNext = document.querySelector('.hero-carousel-arrow.arrow-next');
  const heroDots = document.querySelectorAll('.hero-slide-dot');
  if (heroPrev || heroNext || heroDots.length) {
    const heroBg = document.querySelector('.hero-ref-bg');
    const heroImages = [
      'assets/GoldenHourMilitaryPartnership.png',
      'assets/veteran-hiring.png',
      'assets/hero-detail.jpg'
    ];
    const heroFrames = ['handshake', 'graphic', 'portrait'];
    let currentHeroIdx = 0;
    let heroFading = false;

    function setHeroSlide(index) {
      if (!heroBg || heroFading) return;
      const next = (index + heroImages.length) % heroImages.length;
      if (next === currentHeroIdx) return;
      currentHeroIdx = next;
      heroDots.forEach((dot, i) => {
        const active = i === currentHeroIdx;
        dot.classList.toggle('is-active', active);
        dot.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      heroFading = true;
      heroBg.style.opacity = '0';
      window.setTimeout(() => {
        heroBg.src = heroImages[currentHeroIdx];
        heroBg.dataset.frame = heroFrames[currentHeroIdx];
        heroBg.style.opacity = '1';
        heroFading = false;
      }, 420);
    }

    if (heroPrev) heroPrev.addEventListener('click', () => setHeroSlide(currentHeroIdx - 1));
    if (heroNext) heroNext.addEventListener('click', () => setHeroSlide(currentHeroIdx + 1));
    heroDots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const index = Number(dot.getAttribute('data-slide'));
        if (!Number.isNaN(index)) setHeroSlide(index);
      });
    });
  }

  // -------------------------------------------------------------------------
  // Interactive "Look Closer" Detail-Lens Tab Switching
  // -------------------------------------------------------------------------
  const lensTabs = document.querySelectorAll('.lens-tab-btn');
  const lensPanels = document.querySelectorAll('.lens-panel');

  lensTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-lens-target');
      
      lensTabs.forEach(t => t.classList.remove('is-active'));
      lensPanels.forEach(p => p.classList.remove('is-active'));

      tab.classList.add('is-active');
      const activePanel = document.getElementById(targetId);
      if (activePanel) {
        activePanel.classList.add('is-active');
      }
    });
  });

  // -------------------------------------------------------------------------
  // Hot Jobs Database, Filtering, & Search
  // -------------------------------------------------------------------------
  const jobsData = [
    {
      id: 'M2C10738',
      title: 'Technical Support Manager',
      category: 'tech',
      company: 'A leading Tech & IT Company',
      location: 'Bangalore',
      type: 'Full-Time',
      posted: '2 weeks ago',
      isNew: false,
      skills: ['Technical Support'],
      desc: 'Lead High-Performance Teams: Manage a support team to achieve business objectives...',
      experience: '',
      responsibilities: []
    },
    {
      id: 'M2C10737',
      title: 'Manager-APST',
      category: 'operations',
      company: 'E-Commerce',
      location: 'Rajahmundry',
      type: 'Full-Time',
      posted: '3 weeks ago',
      isNew: false,
      skills: [],
      desc: 'https://www.militarytocorp.com/crm/uploads/ckeditor/JD-Flipkart-Cluster Head...',
      experience: '',
      responsibilities: []
    },
    {
      id: 'M2C10736',
      title: 'Audit Team Leader',
      category: 'leadership',
      company: 'E-Commerce',
      location: 'Amritsar',
      type: 'Full-Time',
      posted: '1 month ago',
      isNew: false,
      skills: [],
      desc: 'Job Role: Audit Team Leader Job Locations: Amritsar, Punjab, India Required...',
      experience: '',
      responsibilities: []
    },
    {
      id: 'M2C10735',
      title: 'Sr Manager- Security and Vigilance',
      category: 'security',
      company: 'Leading Telecom Infra Company',
      location: 'Kolkata',
      type: 'Full-Time',
      posted: '1 month ago',
      isNew: false,
      skills: [],
      desc: 'Hiring for Sr. Manager – Security & Vigilance | Kolkata Leadership role with...',
      experience: '',
      responsibilities: []
    },
    {
      id: 'M2C10734',
      title: 'Personal Security Officer',
      category: 'security',
      company: 'A leading real estate & property mgmt MNC',
      location: 'Bengaluru',
      type: 'Full-Time',
      posted: '1 month ago',
      isNew: false,
      skills: [],
      desc: 'Hiring Ex-Servicemen | Personal Security Officer (PSO) | Bangalore   We are...',
      experience: '',
      responsibilities: []
    },
    {
      id: 'M2C10733',
      title: 'Engineering Roles',
      category: 'tech',
      company: 'A Leading Education Society',
      location: 'Coimbatore',
      type: 'Full-Time',
      posted: '1 month ago',
      isNew: false,
      skills: [],
      desc: 'Hiring Ex-Servicemen | Multiple Roles | Coimbatore Budget: 6–7.2 LPA  We...',
      experience: '',
      responsibilities: []
    }
  ];

  // Render Job Cards
  const jobsGrid = document.getElementById('jobsGrid');
  const jobsCountBadge = document.getElementById('jobsCountBadge');
  const jobTabs = document.querySelectorAll('.jobs-tab-btn');
  const searchInput = document.getElementById('jobSearchInput');
  const emptyState = document.getElementById('jobsEmptyState');

  let activeCategory = 'all';
  let activeSearchQuery = '';
  let savedJobIds = new Set(JSON.parse(localStorage.getItem('m2c_saved_jobs') || '[]'));

  function renderJobs() {
    if (!jobsGrid) return;

    const filtered = jobsData.filter(job => {
      const matchCat = activeCategory === 'all' || job.category === activeCategory;
      const q = activeSearchQuery.toLowerCase();
      const matchQuery = !q ||
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q) ||
        job.id.toLowerCase().includes(q) ||
        job.skills.some(s => s.toLowerCase().includes(q));
      return matchCat && matchQuery;
    });

    if (jobsCountBadge) {
      jobsCountBadge.innerHTML = `Showing <strong>${filtered.length}</strong> of ${jobsData.length} positions`;
    }

    if (filtered.length === 0) {
      jobsGrid.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    jobsGrid.innerHTML = filtered.map(job => {
      const isSaved = savedJobIds.has(job.id);
      return `
        <article class="job-card" data-job-id="${job.id}">
          <div class="job-card-header">
            <div>
              <span class="eyebrow" style="margin-bottom: 6px; font-size: 0.68rem;">Job ID - ${job.id}</span>
              <h3 class="job-card-title">${escapeHTML(job.title)}</h3>
            </div>
            ${job.isNew ? '<span class="job-badge-new">NEW</span>' : ''}
          </div>

          <div class="job-card-meta">
            <span class="job-meta-item job-company">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></svg>
              ${escapeHTML(job.company)}
            </span>
            <span class="job-meta-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>
              ${escapeHTML(job.location)}
            </span>
            <span class="job-meta-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><polyline points="12 6 12 12 16 14"/></svg>
              ${escapeHTML(job.posted)}
            </span>
          </div>

          ${job.skills.length ? `<div class="job-card-skills">${job.skills.map(skill => `<span class="job-skill-chip">${escapeHTML(skill)}</span>`).join('')}</div>` : ''}

          <p class="job-card-desc">${escapeHTML(job.desc)}</p>

          <div class="job-card-footer">
            <div style="display: flex; gap: 10px; align-items: center;">
              <button type="button" class="btn btn-primary btn-sm btn-apply-job" data-job-id="${job.id}">Apply Now</button>
              <button type="button" class="text-link btn-view-job" data-job-id="${job.id}">View Details <span class="arrow-icon">→</span></button>
            </div>
            <button type="button" class="job-save-btn ${isSaved ? 'is-saved' : ''}" data-job-id="${job.id}" title="${isSaved ? 'Remove from saved' : 'Save position'}" aria-label="Save ${escapeHTML(job.title)}">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="1.8"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
            </button>
          </div>
        </article>
      `;
    }).join('');

    // Attach listeners to newly rendered cards
    attachJobCardEvents();
    revealJobCards();
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  function attachJobCardEvents() {
    // Save buttons
    document.querySelectorAll('.job-save-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-job-id');
        if (savedJobIds.has(id)) {
          savedJobIds.delete(id);
          btn.classList.remove('is-saved');
          btn.querySelector('svg').setAttribute('fill', 'none');
          showToast(`Job ${id} removed from saved list.`);
        } else {
          savedJobIds.add(id);
          btn.classList.add('is-saved');
          btn.querySelector('svg').setAttribute('fill', 'currentColor');
          showToast(`Job ${id} saved to your bookmarks.`);
        }
        localStorage.setItem('m2c_saved_jobs', JSON.stringify([...savedJobIds]));
      });
    });

    // View Details
    document.querySelectorAll('.btn-view-job').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-job-id');
        openJobModal(id);
      });
    });

    // Apply Now
    document.querySelectorAll('.btn-apply-job').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-job-id');
        openJobModal(id, true);
      });
    });
  }

  // Filter Tab Events
  jobTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      jobTabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      activeCategory = tab.getAttribute('data-category') || 'all';
      renderJobs();
    });
  });

  // Search Input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      activeSearchQuery = e.target.value.trim();
      renderJobs();
    });
  }

  // Initial render
  let revealJobCards = function () {};
  initHomeMotion();
  renderJobs();

  // -------------------------------------------------------------------------
  // Job Details & Application Modal
  // -------------------------------------------------------------------------
  const jobModal = document.getElementById('jobModal');
  const modalJobTitle = document.getElementById('modalJobTitle');
  const modalJobId = document.getElementById('modalJobId');
  const modalJobCompany = document.getElementById('modalJobCompany');
  const modalJobLocation = document.getElementById('modalJobLocation');
  const modalJobType = document.getElementById('modalJobType');
  const modalJobDesc = document.getElementById('modalJobDesc');
  const modalJobExp = document.getElementById('modalJobExp');
  const modalJobResp = document.getElementById('modalJobResp');
  const modalJobSkills = document.getElementById('modalJobSkills');
  const modalFormJobId = document.getElementById('modalFormJobId');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const jobApplicationForm = document.getElementById('jobApplicationForm');

  function openJobModal(id, focusForm = false) {
    const job = jobsData.find(j => j.id === id);
    if (!job || !jobModal) return;

    if (modalJobTitle) modalJobTitle.textContent = job.title;
    if (modalJobId) modalJobId.textContent = `Job ID: ${job.id}`;
    if (modalJobCompany) modalJobCompany.textContent = job.company;
    if (modalJobLocation) modalJobLocation.textContent = job.location;
    if (modalJobType) modalJobType.textContent = job.type;
    if (modalJobDesc) modalJobDesc.textContent = job.desc;
    if (modalJobExp) modalJobExp.textContent = job.experience;
    if (modalFormJobId) modalFormJobId.value = job.id;

    if (modalJobSkills) {
      modalJobSkills.innerHTML = job.skills.map(s => `<span class="job-skill-chip">${escapeHTML(s)}</span>`).join('');
    }

    if (modalJobResp) {
      modalJobResp.innerHTML = job.responsibilities.map(r => `<li>${escapeHTML(r)}</li>`).join('');
    }

    jobModal.classList.add('is-active');
    document.body.classList.add('menu-locked');

    if (focusForm && jobApplicationForm) {
      setTimeout(() => {
        jobApplicationForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const firstInput = jobApplicationForm.querySelector('input');
        if (firstInput) firstInput.focus();
      }, 200);
    }
  }

  function closeModal() {
    if (!jobModal) return;
    jobModal.classList.remove('is-active');
    document.body.classList.remove('menu-locked');
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (jobModal) {
    jobModal.addEventListener('click', (e) => {
      if (e.target === jobModal) {
        closeModal();
      }
    });
  }

  // Application Form Submit Simulation
  if (jobApplicationForm) {
    jobApplicationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = jobApplicationForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.textContent : 'Submit Application';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Transmitting Credentials...';
      }

      setTimeout(() => {
        closeModal();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
        jobApplicationForm.reset();
        showToast('Application successfully transmitted. Our veteran recruitment director will contact you within 24 hours.', 5000);
      }, 1200);
    });
  }

  // Newsletter Form Submit Simulation
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      if (input && input.value) {
        showToast(`Subscribed: ${input.value}. You will receive leadership insights & veteran hiring briefs.`, 4500);
        newsletterForm.reset();
      }
    });
  }

  // -------------------------------------------------------------------------
  // Active Navigation Highlighting
  // -------------------------------------------------------------------------
  (function highlightActivePage() {
    const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
    const pageName = currentPath.split('/').pop().toLowerCase();

    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
      try {
        const linkUrl = new URL(link.href, window.location.href);
        const linkPath = linkUrl.pathname.replace(/\/+$/, '') || '/';
        const linkPage = linkPath.split('/').pop().toLowerCase();

        const isHome = (!pageName || pageName === 'index.html' || pageName === 'index.php' || pageName === 'militarytocorp-premium-homepage.html');
        const linkIsHome = (!linkPage || linkPage === 'index.html' || linkPage === 'index.php' || linkPage === 'militarytocorp-premium-homepage.html');

        if ((isHome && linkIsHome) || (!isHome && pageName === linkPage && linkPage !== '')) {
          link.classList.add('is-active');
          link.setAttribute('aria-current', 'page');
        } else {
          link.classList.remove('is-active');
          link.removeAttribute('aria-current');
        }
      } catch (_) {}
    });
  })();

  function initHomeMotion() {
    const home = document.querySelector('.hero-ref-banner');
    if (!home) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.documentElement.classList.add('motion');

    const batches = [
      { sel: '.hero-cert-pill, .hero-line-welcome, .hero-line-brand, .hero-ref-tagline, .hero-cta-row, .hero-excellence-shield', immediate: true },
      { sel: '.offer-top > *, .offer-feature, .offer-card' },
      { sel: '.photo-band-copy > *, .photo-band-image' },
      { sel: '.updates-alert-ribbon' },
      { sel: '.about-lead-copy > *, .about-photo-frame' },
      { sel: '.section-ribbon-title, .service-clean-card' },
      { sel: '.wide-feature-card' },
      { sel: '.stat-box-ref' },
      { sel: '.bottom-trio-card' },
      { sel: '.jobs-section .section-header-split > *, .jobs-toolbar' },
      { sel: '.philosophy-section > div:first-child, .lens-tabs-nav' },
      { sel: '.dual-cta-section > div' },
      { sel: '.newsletter-band > *' },
      { sel: '.footer-top-grid > div' }
    ];

    const pending = [];

    batches.forEach((batch) => {
      document.querySelectorAll(batch.sel).forEach((el, index) => {
        if (el.classList.contains('rise')) return;
        el.classList.add('rise');
        if (el.matches('.about-photo-frame, .corner-card-image, .offer-feature, .photo-band-image')) {
          el.classList.add('rise-photo');
        }
        el.style.transitionDelay = Math.min(index, 5) * 80 + 'ms';
        pending.push({ el, immediate: !!batch.immediate });
      });
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-shown');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -6% 0px' });

    revealJobCards = function () {
      document.querySelectorAll('#jobsGrid .job-card').forEach((el, index) => {
        if (el.classList.contains('rise')) return;
        el.classList.add('rise');
        el.style.transitionDelay = (index % 2) * 90 + 'ms';
        io.observe(el);
      });
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        pending.forEach(({ el, immediate }) => {
          if (immediate) {
            el.classList.add('is-shown');
          } else {
            io.observe(el);
          }
        });
      });
    });
  }

})();
