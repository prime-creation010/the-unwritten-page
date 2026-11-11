(() => {
  const pages = [...document.querySelectorAll(".page")];
  const progress = document.getElementById("progress");
  let current = 0;

  function showPage(index) {
    current = Math.max(0, Math.min(index, pages.length - 1));
    pages.forEach((page, i) => {
      page.classList.toggle("active", i === current);
      page.setAttribute("aria-hidden", i === current ? "false" : "true");
    });
    progress.textContent = `${String(current + 1).padStart(2, "0")} / ${String(pages.length).padStart(2, "0")}`;
    history.replaceState(null, "", `#page-${current + 1}`);
  }

  document.querySelectorAll("[data-next]").forEach(button =>
    button.addEventListener("click", () => showPage(current + 1))
  );
  document.querySelectorAll("[data-back]").forEach(button =>
    button.addEventListener("click", () => showPage(current - 1))
  );

  const requested = Number(location.hash.replace("#page-", ""));
  if (requested >= 1 && requested <= pages.length) current = requested - 1;
  showPage(current);
})();
