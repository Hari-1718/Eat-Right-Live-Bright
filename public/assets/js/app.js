// app.js — small helpers for responsive nav and interactions
document.addEventListener('DOMContentLoaded', function () {
  console.log('Eat Right Live Bright App v4 loaded');
  // Theme toggle functionality

  const themeToggles = document.querySelectorAll('.theme-toggle');
  const htmlElement = document.documentElement;

  // Check for saved theme preference or default to 'light'
  const currentTheme = localStorage.getItem('theme') || 'light';
  htmlElement.setAttribute('data-theme', currentTheme);

  themeToggles.forEach(function (themeToggle) {
    themeToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      const theme = htmlElement.getAttribute('data-theme');
      const newTheme = theme === 'light' ? 'dark' : 'light';

      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);

      // Refresh glow color to match theme opacity
      try {
        const cs = getComputedStyle(htmlElement);
        const primary = cs.getPropertyValue('--primary').trim();
        updateGlow(primary);
      } catch (_) { }
    });
  });

  // simple nav toggle (works on all pages)
  var toggles = document.querySelectorAll('.nav-toggle');
  toggles.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      document.documentElement.classList.toggle('nav-open');
    });
  });

  // Close button functionality
  const closeBtn = document.querySelector('.nav-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      document.documentElement.classList.remove('nav-open');
    });
  }

  // close nav when clicking outside or when a link is clicked
  document.addEventListener('click', function (e) {
    var nav = document.querySelector('.nav-actions');
    var toggles = Array.from(document.querySelectorAll('.nav-toggle'));
    var isNavOpen = document.documentElement.classList.contains('nav-open');

    // Close if clicking outside the nav menu
    var clickedOnAnyToggle = toggles.some(function (t) { return t.contains(e.target); });
    if (isNavOpen && nav && !nav.contains(e.target) && !clickedOnAnyToggle) {
      document.documentElement.classList.remove('nav-open');
    }

    // Close nav when a link is clicked; let browser navigate normally
    var link = e.target.closest('.nav-actions a');
    if (link) {
      document.documentElement.classList.remove('nav-open');
    }

    // Close color popover when clicking outside
    const pop = document.getElementById('colorPopover');
    const toggle = document.getElementById('colorToggle');
    if (pop && pop.classList.contains('open')) {
      const clickedInsidePopover = pop.contains(e.target);
      const clickedToggle = toggle && toggle.contains(e.target);
      if (!clickedInsidePopover && !clickedToggle) {
        pop.classList.remove('open');
      }
    }
  });



  // Remove transition class on page load for fade in
  window.addEventListener('pageshow', function () {
    document.body.classList.remove('page-transition');
  });

  // Close nav on escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.documentElement.classList.remove('nav-open');
      const pop = document.getElementById('colorPopover');
      if (pop) pop.classList.remove('open');
    }
  });

  // basic lazy loading for images (optional enhancement)
  var lazyImgs = [].slice.call(document.querySelectorAll('img[loading="lazy"]'));
  if ('IntersectionObserver' in window && lazyImgs.length) {
    let io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          let img = e.target;
          img.src = img.dataset.src || img.src;
          img.removeAttribute('loading');
          obs.unobserve(img);
        }
      });
    }, { rootMargin: '50px 0px', threshold: 0.01 });
    lazyImgs.forEach(function (i) { io.observe(i); });
  }

  // ===== Theme Accent Picker (primary/secondary) =====
  const colorToggle = document.getElementById('colorToggle');
  const colorPopover = document.getElementById('colorPopover');

  function hexToRgb(hex) {
    const h = hex.replace('#','');
    const bigint = parseInt(h.length === 3 ? h.split('').map(c=>c+c).join('') : h, 16);
    return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
  }

  function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) { h = s = 0; }
    else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
  }

  function hslToRgb(h, s, l) {
    h /= 360; s /= 100; l /= 100;
    let r, g, b;
    if (s === 0) { r = g = b = l; }
    else {
      const hue2rgb = function (p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
  }

  function adjustLightness(hex, delta) {
    const { r, g, b } = hexToRgb(hex);
    let { h, s, l } = rgbToHsl(r, g, b);
    l = Math.max(0, Math.min(100, l + delta));
    const rgb = hslToRgb(h, s, l);
    const toHex = (n) => n.toString(16).padStart(2, '0');
    return '#' + toHex(rgb.r) + toHex(rgb.g) + toHex(rgb.b);
  }

  function updateGlow(primaryHex) {
    if (!primaryHex) return;
    const { r, g, b } = hexToRgb(primaryHex);
    const theme = htmlElement.getAttribute('data-theme');
    const alpha = theme === 'dark' ? 0.24 : 0.18;
    const rgba = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    document.querySelectorAll('.dotted-glow').forEach(function (el) {
      el.style.setProperty('--glow-color', rgba);
    });
  }

  function applyAccent(primary, secondary) {
    if (!primary || !secondary) return;
    htmlElement.style.setProperty('--primary', primary);
    htmlElement.style.setProperty('--secondary', secondary);
    // Derive dark/light variants for consistency
    htmlElement.style.setProperty('--primary-dark', adjustLightness(primary, -10));
    htmlElement.style.setProperty('--primary-light', adjustLightness(primary, +50));
    updateGlow(primary);
  }

  function loadAccent() {
    try {
      const saved = JSON.parse(localStorage.getItem('accent') || 'null');
      if (saved && saved.primary && saved.secondary) {
        applyAccent(saved.primary, saved.secondary);
      } else {
        // Ensure initial glow matches current CSS primary
        const cs = getComputedStyle(htmlElement);
        const primary = cs.getPropertyValue('--primary').trim();
        if (primary) updateGlow(primary);
      }
    } catch (_) {
      // Fallback
      const cs = getComputedStyle(htmlElement);
      const primary = cs.getPropertyValue('--primary').trim();
      if (primary) updateGlow(primary);
    }
  }

  loadAccent();

  if (colorToggle && colorPopover) {
    colorToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      colorPopover.classList.toggle('open');
    });

    const swatches = colorPopover.querySelectorAll('.color-swatch');
    swatches.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const primary = btn.getAttribute('data-primary');
        const secondary = btn.getAttribute('data-secondary');
        applyAccent(primary, secondary);
        localStorage.setItem('accent', JSON.stringify({ primary: primary, secondary: secondary }));
        colorPopover.classList.remove('open');
      });
    });
  }
});
