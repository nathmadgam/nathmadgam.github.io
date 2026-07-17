"use client";

import { useEffect, useRef, useState } from "react";
import type { Skill } from "@/lib/data";

function SkillRow({ skill, index }: { skill: Skill; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setActive(true);
        observer.disconnect();
      }
    }, { threshold: 0.45 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="skill-row" style={{ transitionDelay: `${index * 45}ms` }}>
      <span className="skill-code">S-{String(index + 1).padStart(2, "0")}</span>
      <div className="skill-copy"><h3>{skill.title}</h3><p>{skill.description}</p></div>
      <strong>{skill.percentage}%</strong>
      <div className="skill-track" aria-label={`${skill.title}: ${skill.percentage}% proficiency`}>
        <span style={{ width: active ? `${skill.percentage}%` : "0%" }} />
      </div>
    </div>
  );
}

export function SkillGrid({ skills }: { skills: Skill[] }) {
  return <div className="skill-grid">{skills.map((skill, index) => <SkillRow key={skill.title} skill={skill} index={index} />)}</div>;
}
