// CederStem — shared site behaviour (nav toggle, cookie consent, contact form)

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
});

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

  // Placeholder handler: this form has no backend wired up yet.
  // Swap the else-branch out once a GDPR-appropriate form endpoint
  // (see BELGIAN-MARKET-NOTES.md) is connected.
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var status = form.querySelector("[data-form-status]");
    if (status) {
      status.textContent =
        form.getAttribute("data-success-text") ||
        "Thank you — this demo form is not yet connected to an inbox.";
      status.hidden = false;
    }
    form.reset();
  });
}
