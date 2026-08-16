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

  // No backend: submitting opens the visitor's own email client with a
  // pre-filled message addressed to the practice's Gmail inbox.
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var data = new FormData(form);
    var lines = [
      "Naam / Name: " + (data.get("naam") || ""),
      "E-mail: " + (data.get("email") || ""),
      "Telefoon / Phone: " + (data.get("telefoon") || ""),
      "Leeftijd kind / Child's age: " + (data.get("leeftijd") || ""),
      "Gewenste datum / Preferred date: " + (data.get("datum") || "geen voorkeur / no preference"),
      "Voorkeur tijdstip / Preferred time: " + (data.get("tijdstip") || "geen voorkeur / no preference"),
      "",
      data.get("bericht") || "",
    ];

    var to = form.getAttribute("data-mailto") || "cederstem@gmail.com";
    var subject = form.getAttribute("data-mailto-subject") || "Contactaanvraag via cederstem.be";
    var mailto =
      "mailto:" + to +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(lines.join("\n"));

    var status = form.querySelector("[data-form-status]");
    if (status) {
      status.textContent =
        form.getAttribute("data-success-text") ||
        "Your email app should now open with this message pre-filled.";
      status.hidden = false;
    }

    window.location.href = mailto;
  });
}
