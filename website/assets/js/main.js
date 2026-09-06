// CederStam — shared site behaviour (nav toggle, cookie consent, contact form)

document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  initCookieBanner();
  initContactForm();
  initScrollReveal();
});

function initScrollReveal() {
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) return;

  var targets = document.querySelectorAll(
    ".card, .section-head, .quote-block, .mini-timeline-item, .faq-item, .hero-grid > div, .photo-grid > img, .step"
  );
  if (!targets.length) return;

  document.documentElement.classList.add("reveal-ready");

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  targets.forEach(function (el, i) {
    el.style.transitionDelay = (i % 3) * 70 + "ms";
    observer.observe(el);
  });
}

function initCookieBanner() {
  var banner = document.querySelector("[data-cookie-banner]");
  if (!banner) return;

  var CONSENT_KEY = "cederstem-cookie-consent";
  if (!localStorage.getItem(CONSENT_KEY)) {
    banner.classList.add("visible");
  }

  banner.querySelectorAll("[data-cookie-accept]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      localStorage.setItem(CONSENT_KEY, "accepted");
      banner.classList.remove("visible");
    });
  });
  banner.querySelectorAll("[data-cookie-decline]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      localStorage.setItem(CONSENT_KEY, "declined");
      banner.classList.remove("visible");
    });
  });
}

function initContactForm() {
  var form = document.querySelector("[data-contact-form]");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var data = new FormData(form);
    var fields = {
      naam: data.get("naam") || "",
      email: data.get("email") || "",
      telefoon: data.get("telefoon") || "",
      leeftijd: data.get("leeftijd") || "",
      datum: data.get("datum") || "",
      tijdstip: data.get("tijdstip") || "",
      bericht: data.get("bericht") || "",
      lang: document.documentElement.lang ? document.documentElement.lang.slice(0, 2) : "nl",
    };

    var status = form.querySelector("[data-form-status]");
    var submitBtn = form.querySelector("button[type=submit]");
    if (submitBtn) submitBtn.disabled = true;

    fetch("/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields),
    })
      .then(function (res) {
        if (!res.ok) throw new Error("book API responded with " + res.status);
        return res.json();
      })
      .then(function () {
        if (status) {
          status.textContent =
            form.getAttribute("data-success-text") ||
            "Thank you — your message has been sent.";
          status.hidden = false;
        }
        form.reset();
      })
      .catch(function () {
        // Backend not configured yet, or the request failed for any
        // reason: fall back to a mailto: draft so the message is never
        // silently lost.
        var lines = [
          "Naam / Name: " + fields.naam,
          "E-mail: " + fields.email,
          "Telefoon / Phone: " + fields.telefoon,
          "Leeftijd kind / Child's age: " + fields.leeftijd,
          "Gewenste datum / Preferred date: " + (fields.datum || "geen voorkeur / no preference"),
          "Voorkeur tijdstip / Preferred time: " + (fields.tijdstip || "geen voorkeur / no preference"),
          "",
          fields.bericht,
        ];
        var to = form.getAttribute("data-mailto") || "cederstem@gmail.com";
        var subject = form.getAttribute("data-mailto-subject") || "Contactaanvraag via cederstem.be";
        var mailto =
          "mailto:" + to +
          "?subject=" + encodeURIComponent(subject) +
          "&body=" + encodeURIComponent(lines.join("\n"));

        if (status) {
          status.textContent =
            form.getAttribute("data-fallback-text") ||
            "Your email app should now open with this message pre-filled.";
          status.hidden = false;
        }
        window.location.href = mailto;
      })
      .finally(function () {
        if (submitBtn) submitBtn.disabled = false;
      });
  });
}
