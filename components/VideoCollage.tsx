"use client";

import { useRef, useState } from "react";
import type { Project } from "@/lib/data";

type Props = { projects: Project[] };

export function VideoCollage({ projects }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<Project | null>(null);

  const open = (project: Project) => {
    setActive(project);
    requestAnimationFrame(() => dialogRef.current?.showModal());
  };

  const close = () => {
    const video = dialogRef.current?.querySelector("video");
    video?.pause();
    dialogRef.current?.close();
  };

  return (
    <>
      <div className="collage-grid">
        {projects.map((project, index) => (
          <button
            key={project.title}
            className="collage-card group"
            style={{ animationDelay: `${index * 80}ms` }}
            onClick={() => open(project)}
            type="button"
          >
            <img src={project.poster} alt={`${project.title} video preview`} loading="lazy" />
            <span className="collage-sheen" aria-hidden="true" />
            <span className="collage-meta">
              <small>{project.category}</small>
              <strong>{project.title}</strong>
              <span>{project.description}</span>
            </span>
            <span className="collage-play" aria-hidden="true">▶</span>
          </button>
        ))}
      </div>

      <dialog ref={dialogRef} className="video-dialog" onClose={() => setActive(null)}>
        <div className="video-dialog-inner">
          <button type="button" onClick={close} className="dialog-close" aria-label="Close video">×</button>
          {active ? (
            <>
              <video key={active.video} controls autoPlay playsInline poster={active.poster} preload="metadata">
                <source src={active.video} type="video/mp4" />
              </video>
              <div className="video-dialog-copy">
                <small>{active.category} · {active.year}</small>
                <h3>{active.title}</h3>
                <p>{active.description}</p>
              </div>
            </>
          ) : null}
        </div>
      </dialog>
    </>
  );
}
