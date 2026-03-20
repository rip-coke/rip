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

(function(){
  const linksBtn = document.getElementById('tab-links-btn');
  const detailsBtn = document.getElementById('tab-details-btn');
  const notesBtn = document.getElementById('tab-notes-btn');
  const details = document.getElementById('tab-details');
  const links = document.getElementById('tab-links');
  const notes = document.getElementById('tab-notes');

  function showDetails(){
    details.classList.remove('hidden');
    notes.classList.add('hidden');
    links.classList.add('hidden');
    detailsBtn.classList.add('border-yellow-500','text-gray-900');
    notesBtn.classList.remove('border-yellow-500','text-gray-900');
    linksBtn.classList.remove('border-yellow-500','text-gray-900');
    detailsBtn.setAttribute('aria-selected','true');
    notesBtn.setAttribute('aria-selected','false');
    linksBtn.setAttribute('aria-selected','false');
  }
  function showNotes(){
    notes.classList.remove('hidden');
    details.classList.add('hidden');
    links.classList.add('hidden');
    notesBtn.classList.add('border-yellow-500','text-gray-900');
    detailsBtn.classList.remove('border-yellow-500','text-gray-900');
    linksBtn.classList.remove('border-yellow-500','text-gray-900');
    notesBtn.setAttribute('aria-selected','true');
    detailsBtn.setAttribute('aria-selected','false');
    linksBtn.setAttribute('aria-selected','false');
  }
  function showLinks(){
    links.classList.remove('hidden');
    notes.classList.add('hidden');
    details.classList.add('hidden');
    linksBtn.classList.add('border-yellow-500','text-gray-900');
    detailsBtn.classList.remove('border-yellow-500','text-gray-900');
    notesBtn.classList.remove('border-yellow-500','text-gray-900');
    linksBtn.setAttribute('aria-selected','true');
    detailsBtn.setAttribute('aria-selected','false');
    notesBtn.setAttribute('aria-selected','false');
  }

  if (detailsBtn) {
    detailsBtn.addEventListener('click', showDetails);
    notesBtn.addEventListener('click', showNotes);
    linksBtn.addEventListener('click', showLinks);
  }
})();

var swiper = new Swiper('.swiper-container', {
  loop: true,
  autoplay: {
      delay: 3000,
      disableOnInteraction: false
  },
  pagination: {
      el: '.swiper-pagination',
      clickable: true,
  },
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
  },
});