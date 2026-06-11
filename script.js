const revealItems = [...document.querySelectorAll(".reveal")];
const counters = [...document.querySelectorAll("[data-count]")];

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateCount(entry.target);
      counterObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.8 }
);

counters.forEach((counter) => counterObserver.observe(counter));

function animateCount(el) {
  const target = Number(el.dataset.count);
  const isDecimal = !Number.isInteger(target);
  const duration = 1200;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;
    el.textContent = isDecimal ? value.toFixed(1) : Math.round(value).toLocaleString("zh-CN");
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

document.querySelectorAll("[data-tabs]").forEach((tabs) => {
  const buttons = [...tabs.querySelectorAll("[data-tab]")];
  const panels = [...tabs.querySelectorAll("[data-panel]")];

  const activate = (button) => {
    buttons.forEach((item) => item.classList.toggle("active", item === button));
    panels.forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === button.dataset.tab));
  };

  buttons.forEach((button) => {
    button.addEventListener("mouseenter", () => activate(button));
    button.addEventListener("focus", () => activate(button));
    button.addEventListener("click", () => activate(button));
  });
});

let lastY = window.scrollY;
const topbar = document.querySelector(".topbar");

window.addEventListener(
  "scroll",
  () => {
    const y = window.scrollY;
    topbar.style.transform = y > lastY && y > 160 ? "translateY(-100%)" : "translateY(0)";
    lastY = y;
  },
  { passive: true }
);
