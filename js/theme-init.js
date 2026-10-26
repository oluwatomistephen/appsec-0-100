// Runs before first paint so the saved theme applies without a flash.
// Kept as a separate file because the CSP forbids inline scripts.
(function () {
  try {
    var t = localStorage.getItem("appsec0100:theme");
    if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t);
  } catch (e) { /* storage blocked: fall back to the system theme */ }
})();
