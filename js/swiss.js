/**
 * Swiss Neo-Minimal Portfolio Interactive Controller
 * Akhil Seshan — Senior Software Engineer (GenAI & Systems)
 *
 * Modules:
 * 1. Web Audio Synthesizer (Tactile micro-clicks)
 * 2. Telemetry Clock
 * 3. Antigravity Physics Particle Canvas
 * 4. Cryptographic Text Scrambler / Decoder
 * 5. Command Palette (Cmd+K)
 * 6. Scrollspy & Scroll Reveal
 * 7. Email Copy to Clipboard
 * 8. Mobile Navigation Drawer
 */

(function () {
  'use strict';

  // State
  let audioEnabled = false;
  let audioCtx = null;

  // ==========================================================================
  // 1. TACTILE WEB AUDIO SYNTHESIZER
  // ==========================================================================
  function playClickSound(freq = 900, type = 'sine', duration = 0.02) {
    if (!audioEnabled) return;
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio fallback silent
    }
  }

  function initAudioToggle() {
    const toggleBtn = document.getElementById('audio-toggle-btn');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
      audioEnabled = !audioEnabled;
      toggleBtn.textContent = audioEnabled ? 'AUDIO: ON [MIC]' : 'AUDIO: OFF';
      toggleBtn.style.color = audioEnabled ? 'var(--accent-pulse)' : 'var(--text-secondary)';
      if (audioEnabled) {
        playClickSound(1200, 'triangle', 0.04);
      }
    });
  }

  // ==========================================================================
  // 2. LIVE TELEMETRY TIMESTAMP
  // ==========================================================================
  function initTelemetryClock() {
    const timeEl = document.getElementById('telemetry-time');
    if (!timeEl) return;

    function updateTime() {
      const now = new Date();
      const utcString = now.toUTCString().split(' ')[4] + ' UTC';
      timeEl.textContent = 'SYS_TIME: ' + utcString;
    }
    updateTime();
    setInterval(updateTime, 1000);
  }

  // ==========================================================================
  // 3. INTERACTIVE ANTIGRAVITY PARTICLE CANVAS
  // ==========================================================================
  let canvasController = {
    speedMultiplier: 1.0,
    toggleSpeed: function () {
      this.speedMultiplier = this.speedMultiplier === 1.0 ? 3.0 : 1.0;
    }
  };

  function initAntigravityCanvas() {
    const canvas = document.getElementById('antigravity-canvas');
    if (!canvas) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    const particleCount = 55;
    const maxDistance = 140;

    let mouse = {
      x: -1000,
      y: -1000,
      radius: 130,
      active: false
    };

    let lastWidth = 0;
    function resize() {
      const currentWidth = window.innerWidth;
      const currentHeight = window.innerHeight;
      
      // On mobile, ignore small height fluctuations caused by browser URL bar
      if (lastWidth && Math.abs(currentWidth - lastWidth) < 10) {
        height = canvas.height = currentHeight;
        return;
      }
      
      lastWidth = width = canvas.width = currentWidth;
      height = canvas.height = currentHeight;
      createParticles();
    }

    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = initial ? Math.random() * width : (Math.random() > 0.5 ? 0 : width);
        this.y = initial ? Math.random() * height : Math.random() * height;
        this.baseVx = (Math.random() - 0.5) * 0.45;
        this.baseVy = (Math.random() - 0.5) * 0.45;
        this.baseRadius = Math.random() * 1.5 + 0.8;
        this.radius = this.baseRadius;
        this.alpha = Math.random() * 0.45 + 0.15;
        this.isSquare = Math.random() > 0.6;
      }

      update() {
        this.x += this.baseVx * canvasController.speedMultiplier;
        this.y += this.baseVy * canvasController.speedMultiplier;

        if (this.x < 0) this.x = width;
        else if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        else if (this.y > height) this.y = 0;

        if (mouse.active) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (1 - dist / mouse.radius) * 1.8;
            this.x -= (dx / dist) * force;
            this.y -= (dy / dist) * force;
          }
        }
      }

      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        if (this.isSquare) {
          ctx.fillRect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
        } else {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    function createParticles() {
      particles = [];
      const count = Math.min(particleCount, Math.floor((width * height) / 18000));
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    }

    let animationFrameId;
    let isPaused = false;

    function render() {
      if (isPaused) return;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.12;
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(render);
    }

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    });

    window.addEventListener('mouseleave', () => {
      mouse.active = false;
    });

    window.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        mouse.active = true;
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        mouse.active = true;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      mouse.active = false;
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        isPaused = true;
        cancelAnimationFrame(animationFrameId);
      } else {
        isPaused = false;
        render();
      }
    });

    resize();
    render();
  }

  // ==========================================================================
  // 4. CRYPTOGRAPHIC TEXT SCRAMBLER / DECODER
  // ==========================================================================
  class TextScrambler {
    constructor(el) {
      this.el = el;
      this.chars = '!<>-_\\/[]{}—=+*^?#________';
      this.originalText = el.innerText;
      this.frame = 0;
      this.update = this.update.bind(this);
    }

    setText(newText) {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise((resolve) => (this.resolve = resolve));
      this.queue = [];
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 12);
        const end = start + Math.floor(Math.random() * 16);
        this.queue.push({ from, to, start, end, char: '' });
      }
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }

    update() {
      let output = '';
      let complete = 0;
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i];
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar();
            this.queue[i].char = char;
          }
          output += `<span style="color:var(--text-muted);">${char}</span>`;
        } else {
          output += from;
        }
      }
      this.el.innerHTML = output;
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }

    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
  }

  function initScrambler() {
    const targets = document.querySelectorAll('.scramble-target, [data-scramble]');
    targets.forEach((el) => {
      const scrambler = new TextScrambler(el);
      const text = el.innerText;
      let isScrambling = false;

      function triggerScramble() {
        if (isScrambling) return;
        isScrambling = true;
        playClickSound(1050, 'sine', 0.015);
        scrambler.setText(text).then(() => {
          isScrambling = false;
        });
      }

      el.addEventListener('mouseenter', triggerScramble);
      el.addEventListener('click', triggerScramble);
    });
  }

  // ==========================================================================
  // 5. COMMAND PALETTE (Cmd+K / Ctrl+K)
  // ==========================================================================
  function initCommandPalette() {
    const backdrop = document.getElementById('cmd-palette-backdrop');
    const input = document.getElementById('cmd-input');
    const list = document.getElementById('cmd-results-list');
    const triggerBtns = document.querySelectorAll('.cmd-trigger-btn');

    if (!backdrop || !input || !list) return;

    let items = Array.from(list.querySelectorAll('.cmd-item'));
    let activeIdx = 0;

    function openPalette() {
      backdrop.classList.add('active');
      input.value = '';
      filterItems('');
      activeIdx = 0;
      updateSelection();
      setTimeout(() => input.focus(), 50);
      playClickSound(1100, 'sine', 0.02);
    }

    function closePalette() {
      backdrop.classList.remove('active');
      input.blur();
      playClickSound(650, 'sine', 0.02);
    }

    triggerBtns.forEach((btn) => {
      btn.addEventListener('click', openPalette);
    });

    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closePalette();
    });

    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        backdrop.classList.contains('active') ? closePalette() : openPalette();
      } else if (e.key === 'Escape' && backdrop.classList.contains('active')) {
        closePalette();
      } else if (backdrop.classList.contains('active')) {
        const visibleItems = items.filter((it) => it.style.display !== 'none');
        if (!visibleItems.length) return;

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          activeIdx = (activeIdx + 1) % visibleItems.length;
          updateSelection();
          playClickSound(950, 'sine', 0.01);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          activeIdx = (activeIdx - 1 + visibleItems.length) % visibleItems.length;
          updateSelection();
          playClickSound(950, 'sine', 0.01);
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (visibleItems[activeIdx]) {
            executeItem(visibleItems[activeIdx]);
          }
        }
      }
    });

    input.addEventListener('input', (e) => {
      filterItems(e.target.value.toLowerCase().trim());
      activeIdx = 0;
      updateSelection();
    });

    function filterItems(query) {
      items.forEach((item) => {
        const text = item.innerText.toLowerCase();
        item.style.display = text.includes(query) ? 'flex' : 'none';
      });
    }

    function updateSelection() {
      const visibleItems = items.filter((it) => it.style.display !== 'none');
      visibleItems.forEach((it, idx) => {
        it.classList.toggle('selected', idx === activeIdx);
      });
    }

    items.forEach((item) => {
      item.addEventListener('click', () => {
        executeItem(item);
      });
    });

    function executeItem(item) {
      const action = item.getAttribute('data-action');
      closePalette();

      if (action.startsWith('#')) {
        const target = document.querySelector(action);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (action === 'copy-email') {
        const copyBtn = document.getElementById('copy-email-btn');
        if (copyBtn) copyBtn.click();
      } else if (action === 'toggle-audio') {
        const audioBtn = document.getElementById('audio-toggle-btn');
        if (audioBtn) {
          audioBtn.click();
        } else {
          audioEnabled = !audioEnabled;
          if (audioEnabled) {
            playClickSound(1200, 'triangle', 0.04);
          }
        }
      } else if (action === 'toggle-particles') {
        canvasController.toggleSpeed();
      } else if (action.startsWith('http')) {
        window.open(action, '_blank', 'noopener,noreferrer');
      }
    }
  }

  // ==========================================================================
  // 6. SCROLLSPY & SCROLL REVEAL
  // ==========================================================================
  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach((link) => {
              if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        });
      },
      {
        rootMargin: '-20% 0px -70% 0px'
      }
    );

    sections.forEach((sec) => observer.observe(sec));
  }

  function initScrollReveal() {
    const revealEls = document.querySelectorAll('.reveal-on-scroll');
    if (!revealEls.length) return;

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    revealEls.forEach((el) => observer.observe(el));
  }

  // ==========================================================================
  // 7. EMAIL COPY TO CLIPBOARD
  // ==========================================================================
  function initEmailCopy() {
    const copyBtn = document.getElementById('copy-email-btn');
    const feedback = document.getElementById('copy-feedback');
    const emailStr = 'akhilseshan.mec@gmail.com';

    if (!copyBtn) return;

    copyBtn.addEventListener('click', () => {
      playClickSound(1300, 'sine', 0.03);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(emailStr).then(showFeedback).catch(fallbackCopy);
      } else {
        fallbackCopy();
      }
    });

    function fallbackCopy() {
      const tempInput = document.createElement('input');
      tempInput.value = emailStr;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      showFeedback();
    }

    function showFeedback() {
      if (!feedback) return;
      feedback.style.display = 'block';
      copyBtn.textContent = 'COPIED!';
      setTimeout(() => {
        feedback.style.display = 'none';
        copyBtn.textContent = 'COPY EMAIL';
      }, 3000);
    }
  }

  // ==========================================================================
  // 8. MOBILE NAVIGATION DRAWER
  // ==========================================================================
  function initMobileMenu() {
    const toggleBtn = document.getElementById('mobile-toggle-btn');
    const navLinks = document.getElementById('nav-links');

    if (!toggleBtn || !navLinks) return;

    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
      const isOpen = navLinks.classList.contains('mobile-open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
      playClickSound(900, 'sine', 0.02);
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Initialize all modules on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    initAudioToggle();
    initTelemetryClock();
    initAntigravityCanvas();
    initScrambler();
    initCommandPalette();
    initScrollSpy();
    initScrollReveal();
    initEmailCopy();
    initMobileMenu();
  });
})();
