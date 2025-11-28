// tabs.js
// Sync a select#tabs with headings inside a scrollable main#main element.
// - Selecting an option smoothly scrolls to the corresponding heading (by id)
// - Scrolling updates the select to the last header passed (stays until the next header)

(function () {
  'use strict';

  function init() {
    const selectElement = document.getElementById('tabs');
    const mainElement = document.getElementById('post_main');
    if (!selectElement || !mainElement) return;

    const sectionIds = Array.from(selectElement.options).map((o) => o.value);
    const OFFSET = 25; // adjust if you have a fixed header or extra spacing

    function scrollToSection(id) {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.offsetTop;
      mainElement.scrollTo({ top: top - OFFSET, behavior: 'smooth' });
    }

    selectElement.addEventListener('change', function (e) {
      scrollToSection(e.target.value);
    });

    function getCurrentSection() {
      const scrollTop = mainElement.scrollTop;
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop <= scrollTop + OFFSET) {
          current = id;
        } else {
          break;
        }
      }
      return current;
    }

    let ticking = false;
    function onScroll() {
      const current = getCurrentSection();
      if (selectElement.value !== current) selectElement.value = current;
      ticking = false;
    }

    mainElement.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    }, { passive: true });

    // Initialize on load
    window.addEventListener('load', function () {
      selectElement.value = getCurrentSection();
    });
  }

  // Wait for DOMContentLoaded in case script is in head
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
