(function () {
  "use strict";

  var data = window.__PM__ || {};
  var $ = function (sel, scope) { return (scope || document).querySelector(sel); };
  var $$ = function (sel, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(sel)); };

  function safe(fn, name) {
    try { fn(); } catch (e) { if (window.console) console.warn("[" + name + "] failed:", e); }
  }

  // ---------------------------------------------------------------
  // Nav: solidify background on scroll
  // ---------------------------------------------------------------
  function initNavScroll() {
    var nav = $("[data-nav]");
    if (!nav) return;
    var onScroll = function () {
      nav.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // ---------------------------------------------------------------
  // Mobile menu toggle
  // ---------------------------------------------------------------
  function initMobileMenu() {
    var toggle = $("[data-menu-toggle]");
    var menu = $("[data-mobile-menu]");
    if (!toggle || !menu) return;

    function close() {
      toggle.setAttribute("aria-expanded", "false");
      menu.classList.remove("is-open");
    }
    function open() {
      toggle.setAttribute("aria-expanded", "true");
      menu.classList.add("is-open");
    }
    toggle.addEventListener("click", function () {
      var isOpen = toggle.getAttribute("aria-expanded") === "true";
      if (isOpen) close(); else open();
    });
    $$("a", menu).forEach(function (a) {
      a.addEventListener("click", close);
    });
  }

  // ---------------------------------------------------------------
  // Smooth-scroll anchors (native scrollTo, offset for sticky nav)
  // ---------------------------------------------------------------
  function initAnchorScroll() {
    var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.addEventListener("click", function (e) {
      var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!a) return;
      var id = a.getAttribute("href");
      if (!id || id.length < 2) return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      var navOffset = 64;
      var top = el.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: top, behavior: reduced ? "auto" : "smooth" });
    });
  }

  // ---------------------------------------------------------------
  // Scroll reveal — threshold low + 6s safety net
  // ---------------------------------------------------------------
  function initReveals() {
    var targets = $$(".reveal");
    if (!targets.length) return;

    if (!("IntersectionObserver" in window)) {
      targets.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -2% 0px" });

    targets.forEach(function (el) { io.observe(el); });

    setTimeout(function () {
      targets.forEach(function (el) {
        if (!el.classList.contains("is-visible") && el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add("is-visible");
        }
      });
    }, 6000);
  }

  // ---------------------------------------------------------------
  // Timeline: mark today's entry with a "HOY" badge
  // ---------------------------------------------------------------
  function initTimelineToday() {
    var items = $$("[data-timeline] .timeline-item");
    if (!items.length) return;

    var today = new Date();
    today.setHours(0, 0, 0, 0);

    items.forEach(function (item) {
      var start = item.getAttribute("data-start");
      var end = item.getAttribute("data-end");
      if (!start || !end) return;
      var startDate = new Date(start + "T00:00:00");
      var endDate = new Date(end + "T00:00:00");
      if (today >= startDate && today <= endDate) {
        var dateEl = item.querySelector(".timeline-date");
        if (dateEl && !dateEl.querySelector(".timeline-today")) {
          var badge = document.createElement("span");
          badge.className = "timeline-today";
          badge.textContent = "HOY";
          dateEl.appendChild(badge);
        }
      }
    });
  }

  // ---------------------------------------------------------------
  // Apply CTA: wire the real URL once it's set in manifest.js
  // ---------------------------------------------------------------
  function initApplyButton() {
    var btn = $("[data-apply-btn]");
    if (!btn || !data.applyUrl) return;
    var link = document.createElement("a");
    link.className = btn.className.replace("btn-disabled", "btn-primary");
    link.href = data.applyUrl;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = "Postular ahora";
    btn.replaceWith(link);
  }

  function boot() {
    safe(initNavScroll, "initNavScroll");
    safe(initMobileMenu, "initMobileMenu");
    safe(initAnchorScroll, "initAnchorScroll");
    safe(initReveals, "initReveals");
    safe(initTimelineToday, "initTimelineToday");
    safe(initApplyButton, "initApplyButton");
    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
