/* ============================================================
   DHINESH RAJI — PORTFOLIO  ·  script.js
   Plain vanilla JavaScript — no frameworks, no build tools.
   ============================================================ */
(function () {
  'use strict';

  /* ------------------------------------------------------------
     1. CONFIGURATION — the single place to customize the site.
     Edit the values below; matching spots in index.html are
     marked with "CUSTOMIZE" comments.
  ------------------------------------------------------------ */
  const CONFIG = {
    name: 'Dhinesh Raji',
    email: 'your.email@example.com',
    emailSubject: 'Career Opportunity — Dhinesh Raji',
    emailBody:
      'Hello Dhinesh,\n\n' +
      'I came across your portfolio and would like to discuss a career opportunity with you.\n\n' +
      'Best regards,',
    linkedin: 'https://linkedin.com/in/yourusername',
    github: 'https://github.com/yourusername',
    profileImage: 'assets/profile.png',
    resumePath: 'assets/resume.pdf',
    /* resume: null  → automatically detect the file and show/hide the button
       resume: true  → always show the Download Resume button
       resume: false → never show it
       Note: browsers may block file detection when opening index.html
       directly from the file system (file://). In that case, use the
       boolean override above, or serve the folder with any local
       static server (e.g. `python -m http.server`). */
    resume: null
  };

  /* ------------------------------------------------------------
     Helpers
  ------------------------------------------------------------ */
  const prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const $ = (selector, scope) => (scope || document).querySelector(selector);
  const $$ = (selector, scope) =>
    Array.prototype.slice.call((scope || document).querySelectorAll(selector));

  /* ------------------------------------------------------------
     2. AVATAR — use the local image when it exists, otherwise
     fall back to an original vector portrait (easy to replace:
     just drop a real render at assets/profile.png).
  ------------------------------------------------------------ */
  const FALLBACK_AVATAR =
    'data:image/svg+xml,' +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 480 480'>
  <defs>
    <radialGradient id='pbg' cx='50%' cy='36%' r='80%'>
      <stop offset='0%' stop-color='#FFF4F8'/>
      <stop offset='55%' stop-color='#FAEFF3'/>
      <stop offset='100%' stop-color='#F2EBE3'/>
    </radialGradient>
    <linearGradient id='pskin' x1='0' y1='0' x2='0' y2='1'>
      <stop offset='0%' stop-color='#F2C097'/>
      <stop offset='100%' stop-color='#E2A87C'/>
    </linearGradient>
    <linearGradient id='phair' x1='0' y1='0' x2='0' y2='1'>
      <stop offset='0%' stop-color='#3D3547'/>
      <stop offset='100%' stop-color='#201B28'/>
    </linearGradient>
    <linearGradient id='pblazer' x1='0' y1='0' x2='0' y2='1'>
      <stop offset='0%' stop-color='#37323F'/>
      <stop offset='100%' stop-color='#1D1925'/>
    </linearGradient>
    <linearGradient id='pTee' x1='0' y1='0' x2='0' y2='1'>
      <stop offset='0%' stop-color='#D81B68'/>
      <stop offset='100%' stop-color='#A61150'/>
    </linearGradient>
    <filter id='psoft' x='-50%' y='-50%' width='200%' height='200%'><feGaussianBlur stdDeviation='9'/></filter>
    <filter id='pblur' x='-60%' y='-60%' width='220%' height='220%'><feGaussianBlur stdDeviation='16'/></filter>
  </defs>
  <rect width='480' height='480' fill='url(#pbg)'/>
  <circle cx='240' cy='238' r='176' fill='none' stroke='#C2185B' stroke-opacity='0.14' stroke-width='1.5' stroke-dasharray='3 9'/>
  <circle cx='84' cy='112' r='9' fill='#C2185B' opacity='0.22'/>
  <circle cx='398' cy='146' r='6' fill='#241F2B' opacity='0.16'/>
  <circle cx='368' cy='84' r='4' fill='#C2185B' opacity='0.32'/>
  <circle cx='122' cy='72' r='4' fill='#241F2B' opacity='0.12'/>
  <ellipse cx='240' cy='458' rx='146' ry='22' fill='#241F2B' opacity='0.14' filter='url(#pblur)'/>
  <path d='M96 480 C104 396 164 352 240 352 C316 352 376 396 384 480 Z' fill='url(#pblazer)'/>
  <path d='M204 368 C212 359 226 354 240 354 C254 354 268 359 276 368 C284 414 288 448 288 480 L192 480 C192 448 196 414 204 368 Z' fill='url(#pTee)'/>
  <path d='M210 361 C220 372 260 372 270 361 C263 377 253 383 240 383 C227 383 217 377 210 361 Z' fill='#7E0C3D'/>
  <path d='M172 392 C192 368 218 356 238 353 L241 361 C222 364 199 375 181 396 Z' fill='#2A2532'/>
  <path d='M308 392 C288 368 262 356 242 353 L239 361 C258 364 281 375 299 396 Z' fill='#2A2532'/>
  <path d='M172 392 C192 368 218 356 238 353' fill='none' stroke='#4A4356' stroke-width='3' stroke-linecap='round' opacity='0.7'/>
  <path d='M308 392 C288 368 262 356 242 353' fill='none' stroke='#4A4356' stroke-width='3' stroke-linecap='round' opacity='0.7'/>
  <path d='M216 282 L216 328 C216 346 226 354 240 354 C254 354 264 346 264 328 L264 282 Z' fill='url(#pskin)'/>
  <path d='M216 288 C224 306 256 306 264 288 L264 300 C252 312 228 312 216 300 Z' fill='#C8845E' opacity='0.55'/>
  <ellipse cx='160' cy='220' rx='13' ry='19' fill='url(#pskin)'/>
  <ellipse cx='320' cy='220' rx='13' ry='19' fill='url(#pskin)'/>
  <ellipse cx='162' cy='222' rx='6' ry='10' fill='#C8845E' opacity='0.45'/>
  <ellipse cx='318' cy='222' rx='6' ry='10' fill='#C8845E' opacity='0.45'/>
  <path d='M163 198 C163 130 197 98 240 98 C283 98 317 130 317 198 C317 246 300 278 276 292 C262 301 228 301 214 292 C190 278 163 246 163 198 Z' fill='url(#pskin)'/>
  <ellipse cx='298' cy='214' rx='13' ry='52' fill='#C8845E' opacity='0.16' filter='url(#psoft)'/>
  <path d='M158 208 C150 118 194 78 240 78 C296 78 332 122 322 208 C320 217 311 217 309 208 C303 166 288 144 262 142 C240 140 214 151 197 169 C185 182 177 194 173 203 C170 211 161 216 158 208 Z' fill='url(#phair)'/>
  <path d='M206 106 C230 94 262 94 286 106' fill='none' stroke='#544A63' stroke-width='4' stroke-linecap='round' opacity='0.55'/>
  <path d='M196 124 C186 140 180 158 178 176' fill='none' stroke='#544A63' stroke-width='4' stroke-linecap='round' opacity='0.4'/>
  <path d='M196 192 C206 185 222 183 231 188' fill='none' stroke='#2A2431' stroke-width='7' stroke-linecap='round'/>
  <path d='M249 188 C258 183 274 185 284 192' fill='none' stroke='#2A2431' stroke-width='7' stroke-linecap='round'/>
  <ellipse cx='213' cy='212' rx='7' ry='8.5' fill='#241F2B'/>
  <ellipse cx='267' cy='212' rx='7' ry='8.5' fill='#241F2B'/>
  <circle cx='215.5' cy='208.5' r='2.4' fill='#FFFFFF' opacity='0.95'/>
  <circle cx='269.5' cy='208.5' r='2.4' fill='#FFFFFF' opacity='0.95'/>
  <path d='M240 214 C238 226 235 236 232 243 C236 249 246 249 251 244' fill='none' stroke='#C8845E' stroke-width='5' stroke-linecap='round' opacity='0.8'/>
  <path d='M222 264 C233 275 247 275 258 264' fill='none' stroke='#9C4F3B' stroke-width='6' stroke-linecap='round'/>
  <ellipse cx='240' cy='279' rx='9' ry='3' fill='#C8845E' opacity='0.3'/>
  <path d='M170 214 C174 262 202 294 240 294 C278 294 306 262 310 214 C306 272 276 304 240 304 C204 304 174 272 170 214 Z' fill='#2E2119' opacity='0.12'/>
  <ellipse cx='196' cy='240' rx='11' ry='6' fill='#D8875F' opacity='0.28'/>
  <ellipse cx='284' cy='240' rx='11' ry='6' fill='#D8875F' opacity='0.28'/>
</svg>`
    );

  function initAvatar() {
    const img = $('#profile-img');
    if (!img) return;
    const useFallback = function () {
      if (img.dataset.fallback) return;
      img.dataset.fallback = '1';
      img.src = FALLBACK_AVATAR;
    };
    // If the local file is missing, the error event fires.
    img.addEventListener('error', useFallback);
    if (img.complete && img.naturalWidth === 0) useFallback();
  }

  /* ------------------------------------------------------------
     3. CONTACT — build a properly URL-encoded mailto: link
  ------------------------------------------------------------ */
  function initContact() {
    const btn = $('#email-btn');
    if (!btn) return;
    const subject = encodeURIComponent(CONFIG.emailSubject);
    const body = encodeURIComponent(CONFIG.emailBody);
    btn.href = 'mailto:' + CONFIG.email + '?subject=' + subject + '&body=' + body;
  }

  /* ------------------------------------------------------------
     4. RESUME — conditional Download Resume button.
     The button stays hidden unless assets/resume.pdf exists
     (or CONFIG.resume is forced to true). No fake downloads.
  ------------------------------------------------------------ */
  function initResume() {
    const btn = $('#resume-btn');
    if (!btn) return;
    if (CONFIG.resume === true) {
      btn.hidden = false;
      return;
    }
    if (CONFIG.resume === false) {
      btn.hidden = true;
      return;
    }
    fetch(CONFIG.resumePath, { method: 'HEAD', cache: 'no-store' })
      .then(function (res) {
        btn.hidden = !res.ok;
      })
      .catch(function () {
        btn.hidden = true;
      });
  }

  /* ------------------------------------------------------------
     5. PARTICLES — subtle black floating dots in the hero only.
     Disabled entirely for reduced-motion users.
  ------------------------------------------------------------ */
  function initParticles() {
    if (prefersReducedMotion || typeof window.tsParticles === 'undefined') return;
    try {
      window.tsParticles.load({
        id: 'particles',
        options: {
          fpsLimit: 60,
          detectRetina: true,
          background: { color: 'transparent' },
          fullScreen: { enable: false },
          particles: {
            number: { value: 42, density: { enable: true, area: 950 } },
            color: { value: '#14121A' },
            opacity: { value: { min: 0.05, max: 0.2 } },
            size: { value: { min: 2, max: 5.5 } },
            shape: { type: 'circle' },
            move: {
              enable: true,
              speed: 0.5,
              direction: 'none',
              random: true,
              straight: false,
              outModes: { default: 'out' }
            },
            links: { enable: false }
          },
          interactivity: {
            events: {
              onHover: { enable: false },
              onClick: { enable: false },
              resize: true
            }
          }
        }
      });
    } catch (err) {
      /* Particles are decorative — fail silently. */
    }
  }

  /* ------------------------------------------------------------
     6. NAVIGATION — scroll state, mobile menu, keyboard support
  ------------------------------------------------------------ */
  function initNavigation() {
    const nav = $('#navbar');
    const toggle = $('#nav-toggle');
    const menu = $('#nav-menu');
    const backdrop = $('#nav-backdrop');
    if (!nav || !toggle || !menu) return;

    // Subtle border/shadow once the page is scrolled.
    const onScroll = function () {
      nav.classList.toggle('scrolled', window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const setMenu = function (open) {
      nav.classList.toggle('open', open);
      if (backdrop) backdrop.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute(
        'aria-label',
        open ? 'Close navigation menu' : 'Open navigation menu'
      );
    };

    toggle.addEventListener('click', function () {
      setMenu(!nav.classList.contains('open'));
    });

    // Close after selecting a section.
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });

    if (backdrop) {
      backdrop.addEventListener('click', function () { setMenu(false); });
    }

    // Escape closes the menu and returns focus to the toggle.
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        setMenu(false);
        toggle.focus();
      }
    });

    // Clean state when resizing back to desktop widths.
    window.addEventListener('resize', function () {
      if (window.innerWidth > 920) setMenu(false);
    });
  }

  /* ------------------------------------------------------------
     7. ACTIVE SECTION — highlight the visible section in the nav
  ------------------------------------------------------------ */
  function initActiveSection() {
    const links = $$('.nav-link');
    if (!links.length || !('IntersectionObserver' in window)) return;

    const byId = {};
    links.forEach(function (link) {
      byId[link.getAttribute('href').slice(1)] = link;
    });

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          const active = byId[entry.target.id];
          links.forEach(function (link) {
            link.classList.remove('is-active');
            link.removeAttribute('aria-current');
          });
          if (active) {
            active.classList.add('is-active');
            active.setAttribute('aria-current', 'true');
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    $$('section[id]').forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ------------------------------------------------------------
     8. SCROLL REVEALS — staggered fade/slide via IntersectionObserver
  ------------------------------------------------------------ */
  function initReveals() {
    const items = $$('.reveal');
    if (!items.length) return;

    // Stagger children of any [data-stagger] container.
    $$('[data-stagger]').forEach(function (group) {
      $$('.reveal', group).forEach(function (el, i) {
        el.style.setProperty('--d', (i * 80) + 'ms');
      });
    });

    // Release the animation once it finishes so hover
    // transforms on the same elements stay snappy.
    items.forEach(function (el) {
      el.addEventListener('animationend', function () {
        el.classList.add('settled');
      }, { once: true });
    });

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('in-view'); });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -36px 0px' }
    );

    items.forEach(function (el) { observer.observe(el); });
  }

  /* ------------------------------------------------------------
     9. "JAVA DEV" — split into letters for the staggered
     entrance and the smooth hover lift.
  ------------------------------------------------------------ */
  function initJavaDev() {
    const wrap = $('#java-dev');
    if (!wrap) return;

    $$('.jd-line', wrap).forEach(function (line) {
      const target = line.querySelector('.jd-text') || line;
      const text = target.textContent || '';
      target.textContent = '';
      Array.prototype.forEach.call(text, function (ch, i) {
        const span = document.createElement('span');
        span.className = 'jd-l';
        span.textContent = ch;
        span.style.setProperty('--i', String(i));
        target.appendChild(span);
      });
    });

    // Double rAF ensures the initial (hidden) state is painted
    // first, so the entrance transition actually runs.
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        wrap.classList.add('loaded');
      });
    });
  }

  /* ------------------------------------------------------------
     Boot
  ------------------------------------------------------------ */
  initAvatar();
  initContact();
  initResume();
  initParticles();
  initNavigation();
  initActiveSection();
  initReveals();
  initJavaDev();
})();
