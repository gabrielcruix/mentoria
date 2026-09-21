(function () {
  "use strict";

  /* ------------------------------------------------------------------
     Checkout link — replace with the real checkout URL when it exists.
     Until then, every ".js-cta" button falls back to its href (an
     in-page anchor to the offer section) so the CTAs stay functional.
     ------------------------------------------------------------------ */
  var CHECKOUT_URL = "COLE_AQUI_SEU_CHECKOUT_URL";
  var isCheckoutConfigured = /^https?:\/\//i.test(CHECKOUT_URL);

  if (isCheckoutConfigured) {
    document.querySelectorAll(".js-cta").forEach(function (link) {
      link.setAttribute("href", CHECKOUT_URL);
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener");
    });
  } else {
    console.info(
      "[Mentoria Cruix] CHECKOUT_URL ainda não configurada em assets/js/main.js — os botões estão levando para a seção de oferta."
    );
  }

  /* Header background on scroll */
  var header = document.getElementById("siteHeader");
  var hero = document.getElementById("topo");

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("is-scrolled", y > 40);

    if (stickyCta && hero) {
      var heroBottom = hero.getBoundingClientRect().bottom;
      var showSticky = heroBottom < 0 && y + window.innerHeight < document.body.scrollHeight - 200;
      stickyCta.classList.toggle("is-shown", showSticky);
    }
  }

  var stickyCta = document.getElementById("stickyCta");
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Scroll reveal */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* FAQ accordion */
  var faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    var btn = item.querySelector(".faq-q");
    var answer = item.querySelector(".faq-a");
    btn.addEventListener("click", function () {
      var isOpen = item.classList.contains("is-open");
      faqItems.forEach(function (other) {
        other.classList.remove("is-open");
        other.querySelector(".faq-a").style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add("is-open");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  /* Smooth-scroll anchor offset for fixed header */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href").slice(1);
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.pageYOffset - 76;
      window.scrollTo({ top: top, behavior: "smooth" });
    });
  });
})();
