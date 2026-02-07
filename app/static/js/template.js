document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".navbar-links a[data-section]");
  const menu = document.querySelector(".nav_menu");        // dropdown container
  const toggle = document.querySelector(".menu-toggle");   // hamburger button

  // if you’re on a page that doesn’t have the navbar, bail
  if (!menu || !toggle) return;

  // 1) hamburger open/close
  toggle.addEventListener("click", () => {
    menu.classList.toggle("open");
    toggle.classList.toggle("open");
  });

  // 2) close menu when you click a link
  document.querySelectorAll('a[href^="/#"], a[href^="#"]').forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.classList.remove("open");
    });
  });

  // ---- active link highlighting (only if nav links exist) ----
  if (!navLinks.length) return;

  const setActive = (id) => {
    navLinks.forEach(a => a.classList.toggle("active", a.dataset.section === id));
  };

  const applyHash = () => {
    const id = window.location.hash.replace("#", "");
    if (id) setActive(id);
  };

  applyHash();
  window.addEventListener("hashchange", applyHash);

  const sections = document.querySelectorAll("section[id]");
  if (!sections.length) return;

  const navHeight = document.querySelector(".navbar")?.offsetHeight || 0;

  window.addEventListener("scroll", () => {
    let current = null;

    sections.forEach(sec => {
      const r = sec.getBoundingClientRect();
      if (r.top <= navHeight + 80 && r.bottom > navHeight + 80) {
        current = sec.id;
      }
    });

    if (current) setActive(current);
  });
});