(() => {
  "use strict";

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const easeOutQuad = value => 1 - (1 - value) * (1 - value);

  function setupSkillLighting() {
    document.querySelectorAll(".skill-item").forEach((row, index) => {
      row.style.setProperty("--polish-delay", `${index * 55}ms`);
      row.addEventListener("pointermove", event => {
        const rect = row.getBoundingClientRect();
        const x = clamp(((event.clientX - rect.left) / rect.width) * 100, 0, 100);
        const y = clamp(((event.clientY - rect.top) / rect.height) * 100, 0, 100);
        row.style.setProperty("--pointer-x", `${x.toFixed(2)}%`);
        row.style.setProperty("--pointer-y", `${y.toFixed(2)}%`);
      }, { passive: true });
    });
  }

  function setupFooterTween() {
    const footer = document.querySelector(".site-footer");
    const inner = footer?.querySelector("[data-footer-depth]");
    if (!footer || !inner || reduced) return;

    const state = { tx: 0, ty: 0, x: 0, y: 0, last: performance.now() };
    footer.addEventListener("pointermove", event => {
      const rect = footer.getBoundingClientRect();
      const nx = clamp((event.clientX - rect.left) / rect.width, 0, 1);
      const ny = clamp((event.clientY - rect.top) / rect.height, 0, 1);
      state.tx = (nx - .5) * 5;
      state.ty = (ny - .5) * 3;
      footer.style.setProperty("--footer-x", `${(nx * 100).toFixed(2)}%`);
      footer.style.setProperty("--footer-y", `${(ny * 100).toFixed(2)}%`);
    }, { passive: true });
    footer.addEventListener("pointerleave", () => { state.tx = 0; state.ty = 0; });

    const frame = now => {
      const dt = clamp((now - state.last) / 1000, 0, .05);
      state.last = now;
      // Time-based quadratic following keeps motion consistent across refresh rates.
      const amount = easeOutQuad(clamp(dt * 5.5, 0, 1));
      state.x += (state.tx - state.x) * amount;
      state.y += (state.ty - state.y) * amount;
      inner.style.setProperty("--footer-shift-x", `${state.x.toFixed(3)}px`);
      inner.style.setProperty("--footer-shift-y", `${state.y.toFixed(3)}px`);
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }

  function setupSectionEntrance() {
    if (reduced || !("IntersectionObserver" in window)) return;
    const targets = document.querySelectorAll(".skills-lead, .skill-item, .site-footer-inner");
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.animate([
          { opacity: .001, transform: "translateY(18px)" },
          { opacity: 1, transform: "translateY(0)" }
        ], {
          duration: 720,
          delay: Number.parseInt(getComputedStyle(entry.target).getPropertyValue("--polish-delay"), 10) || 0,
          easing: "cubic-bezier(.25,.46,.45,.94)",
          fill: "both"
        });
        observer.unobserve(entry.target);
      });
    }, { threshold: .12 });
    targets.forEach(target => observer.observe(target));
  }

  setupSkillLighting();
  setupFooterTween();
  setupSectionEntrance();
})();
