"use client";

import { useEffect } from "react";

export function InteractiveShell() {
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;
    let targetX = innerWidth / 2;
    let targetY = innerHeight / 2;
    let x = targetX;
    let y = targetY;

    const move = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    const tick = () => {
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      root.style.setProperty("--pointer-x", `${x}px`);
      root.style.setProperty("--pointer-y", `${y}px`);
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        }
      },
      { threshold: 0.12 },
    );

    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => observer.observe(el));

    const counters = document.querySelectorAll<HTMLElement>("[data-count]");
    const counterObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          const end = Number(el.dataset.count ?? 0);
          const started = performance.now();
          const duration = 1200;
          const animate = (now: number) => {
            const progress = Math.min((now - started) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = String(Math.round(end * eased));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          counterObserver.unobserve(el);
        }
      },
      { threshold: 0.5 },
    );
    counters.forEach((el) => counterObserver.observe(el));

    const updateClock = () => {
      const value = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Manila",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(new Date());
      document.querySelectorAll<HTMLElement>("[data-pht-clock]").forEach((el) => {
        el.textContent = `${value} PHT`;
      });
    };

    addEventListener("pointermove", move, { passive: true });
    updateClock();
    const clock = setInterval(updateClock, 1000);
    raf = requestAnimationFrame(tick);

    return () => {
      removeEventListener("pointermove", move);
      clearInterval(clock);
      cancelAnimationFrame(raf);
      observer.disconnect();
      counterObserver.disconnect();
    };
  }, []);

  return null;
}
