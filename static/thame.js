/* static/js/theme.js
   - gắn cho nút: <button class="theme-toggle" data-theme-toggle ...> */
(function () {
  const root = document.documentElement;
  const KEY = "theme";

  function getPreferred() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function apply(theme) {
    root.setAttribute("data-theme", theme);
    try { localStorage.setItem(KEY, theme); } catch (e) {}
    document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
      btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    });
  }

  let initial = null;
  try { initial = localStorage.getItem(KEY); } catch (e) {}
  apply(initial || getPreferred());

  document.addEventListener("click", (e) => {
    const btn = e.target && e.target.closest ? e.target.closest("[data-theme-toggle]") : null;
    if (!btn) return;
    const cur = root.getAttribute("data-theme") || "light";
    apply(cur === "dark" ? "light" : "dark");
  });
})();
