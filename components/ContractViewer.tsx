"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { assetPath } from "@/lib/paths";

const pages = [1, 2, 3, 4, 5];

export function ContractViewer() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(1);
  const [zoom, setZoom] = useState(0.72);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const figures = Array.from(viewport.querySelectorAll<HTMLElement>("[data-contract-page]"));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setCurrent(Number((visible.target as HTMLElement).dataset.contractPage));
    }, { root: viewport, threshold: [0.25, 0.5, 0.75] });
    figures.forEach((figure) => observer.observe(figure));
    return () => observer.disconnect();
  }, []);

  const jump = (page: number) => {
    viewportRef.current?.querySelector<HTMLElement>(`[data-contract-page="${page}"]`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="contract-viewer">
      <div className="contract-toolbar">
        <div><span className="pdf-chip">PDF</span><span><strong>Cynex Services Agreement</strong><small>Contract Agreement Form · Five pages</small></span></div>
        <span>Page <strong>{current}</strong> of 5</span>
        <div className="contract-actions">
          <button type="button" onClick={() => setZoom((value) => Math.max(0.5, value - 0.08))} aria-label="Zoom out">−</button>
          <button type="button" onClick={() => setZoom((value) => Math.min(1.15, value + 0.08))} aria-label="Zoom in">+</button>
          <a href={assetPath("/downloads/Cynex-Services-Agreement-Fillable.pdf")} target="_blank" rel="noreferrer">Open</a>
          <a href={assetPath("/downloads/Cynex-Services-Agreement-Fillable.pdf")} download className="download-action">Download form</a>
        </div>
      </div>
      <div className="contract-workspace">
        <nav className="contract-thumbs" aria-label="Agreement pages">
          {pages.map((page) => (
            <button type="button" onClick={() => jump(page)} className={page === current ? "is-active" : ""} key={page}>
              <img src={assetPath(`/assets/contract-pages/page-${page}.webp`)} alt="" />
              <span>0{page}</span>
            </button>
          ))}
        </nav>
        <div ref={viewportRef} className="contract-viewport" tabIndex={0}>
          <div className="contract-pages" style={{ "--contract-zoom": zoom } as CSSProperties}>
            {pages.map((page) => (
              <figure key={page} data-contract-page={page}>
                <img src={assetPath(`/assets/contract-pages/page-${page}.webp`)} alt={`Cynex Services Contract Agreement Form, page ${page} of 5`} loading={page === 1 ? "eager" : "lazy"} />
                <figcaption>Page {page} of 5</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
