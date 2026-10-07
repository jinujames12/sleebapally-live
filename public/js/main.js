/* Site behaviour: mobile menu, and drawing the lists from data/content.js.
   You normally don't need to edit this file. */
(function () {
  "use strict";

  // ---------- Mobile menu ----------
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  // Footer year
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  var data = window.SITE_DATA || {};

  // ---------- Helpers ----------
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function telHref(phone) { return "tel:" + String(phone).replace(/[^\d+]/g, ""); }
  function phoneLink(phone) {
    return phone ? '<a class="phone" href="' + telHref(phone) + '">' + esc(phone) + "</a>" : "";
  }
  function isPlaceholder(name) { return !name || /to be updated/i.test(name); }
  function empty(msg) { return '<p class="empty-note">' + esc(msg) + "</p>"; }

  var templates = {
    person: function (p) {
      return '<article class="card">' +
        (p.role ? '<p class="role">' + esc(p.role) + "</p>" : "") +
        "<h3" + (isPlaceholder(p.name) ? ' class="placeholder"' : "") + ">" + esc(p.name || "To be updated") + "</h3>" +
        (p.place ? '<p class="meta">' + esc(p.place) + "</p>" : "") +
        (p.note ? '<p class="meta">' + esc(p.note) + "</p>" : "") +
        phoneLink(p.phone) +
        "</article>";
    },
    organisation: function (o) {
      var bearers = (o.bearers || []).length
        ? "<ul>" + o.bearers.map(function (b) {
            return "<li><span>" + esc(b.role) + "</span><span>" + esc(b.name) + "</span></li>";
          }).join("") + "</ul>"
        : '<p class="placeholder">Office bearers to be updated.</p>';
      return '<article class="card org"><h3>' + esc(o.name) + "</h3>" +
        (o.about ? "<p>" + esc(o.about) + "</p>" : "") + bearers + "</article>";
    },
    video: function (v) {
      return '<article class="video"><div class="video-frame">' +
        '<button type="button" class="video-play" data-youtube="' + esc(v.youtube) + '" data-title="' + esc(v.title) + '">' +
        '<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="30" fill="rgba(0,0,0,.35)" stroke="#e9d7ae" stroke-width="2"/><path d="M26 20l18 12-18 12z" fill="#fff"/></svg>' +
        '<span class="visually-hidden">Play video: ' + esc(v.title) + "</span>" +
        "<span>Tap to play (loads YouTube)</span></button></div>" +
        '<div class="video-body"><h3>' + esc(v.title) + "</h3>" + (v.date ? "<p>" + esc(v.date) + "</p>" : "") + "</div></article>";
    },
    event: function (e) {
      var d = new Date(e.date + "T00:00:00");
      var day = isNaN(d) ? "" : d.getDate();
      var mon = isNaN(d) ? "" : d.toLocaleString("en-GB", { month: "short" });
      return '<li class="event"><div class="event-date"><b>' + day + "</b><small>" + mon + "</small></div>" +
        "<div><h3>" + esc(e.title) + "</h3>" + (e.details ? "<p>" + esc(e.details) + "</p>" : "") + "</div></li>";
    },
    photo: function (g) {
      return '<figure><img src="' + esc(g.src) + '" alt="' + esc(g.alt) + '" loading="lazy" decoding="async" width="800" height="600">' +
        (g.caption ? "<figcaption>" + esc(g.caption) + "</figcaption>" : "") + "</figure>";
    }
  };

  // ---------- Fill every element marked data-list="..." ----------
  document.querySelectorAll("[data-list]").forEach(function (el) {
    var key = el.getAttribute("data-list");
    var tpl = templates[el.getAttribute("data-template")];
    var items = (data[key] || []).slice();
    var limit = parseInt(el.getAttribute("data-limit"), 10);

    if (key === "events") {
      var today = new Date(); today.setHours(0, 0, 0, 0);
      items = items.filter(function (e) { return new Date(e.date + "T00:00:00") >= today; })
        .sort(function (a, b) { return a.date < b.date ? -1 : 1; });
    }
    if (limit) items = items.slice(0, limit);

    if (!tpl) return;
    if (!items.length) {
      var hideWhenEmpty = el.getAttribute("data-hide-empty");
      if (hideWhenEmpty) { var box = document.getElementById(hideWhenEmpty); if (box) box.hidden = true; return; }
      el.outerHTML = empty(el.getAttribute("data-empty") || "To be updated soon.");
      return;
    }
    el.innerHTML = items.map(tpl).join("");
  });

  // ---------- YouTube: load the player only when someone taps play ----------
  document.addEventListener("click", function (e) {
    var btn = e.target.closest ? e.target.closest(".video-play") : null;
    if (!btn) return;
    var id = btn.getAttribute("data-youtube");
    var iframe = document.createElement("iframe");
    iframe.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(id) + "?autoplay=1&rel=0";
    iframe.title = btn.getAttribute("data-title") || "YouTube video";
    iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen";
    iframe.allowFullscreen = true;
    iframe.loading = "lazy";
    btn.replaceWith(iframe);
  });
})();
