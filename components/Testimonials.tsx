"use client";

import { useCallback, useEffect, useState } from "react";
import type { Review } from "@/lib/data";

export function Testimonials({ reviews }: { reviews: Review[] }) {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const review = reviews[index];

  const next = useCallback(() => setIndex((current) => (current + 1) % reviews.length), [reviews.length]);
  const previous = () => setIndex((current) => (current - 1 + reviews.length) % reviews.length);

  useEffect(() => {
    setTyped("");
    let cursor = 0;
    const typeTimer = setInterval(() => {
      cursor += 1;
      setTyped(review.quote.slice(0, cursor));
      if (cursor >= review.quote.length) clearInterval(typeTimer);
    }, 24);
    const advanceTimer = setTimeout(next, Math.max(6200, review.quote.length * 24 + 2600));
    return () => {
      clearInterval(typeTimer);
      clearTimeout(advanceTimer);
    };
  }, [index, next, review.quote]);

  return (
    <div className="testimonial-shell">
      <div className="testimonial-stage" aria-live="polite">
        <div className="testimonial-topline"><span>{String(index + 1).padStart(2, "0")} / {String(reviews.length).padStart(2, "0")}</span><span>★★★★★</span></div>
        <blockquote>“{typed}<span className="type-cursor" aria-hidden="true" />”</blockquote>
        <div className={`review-attribution ${typed.length === review.quote.length ? "is-visible" : ""}`}>
          <div><strong>{review.name}</strong><span>{review.location}{review.repeatClient ? " · Repeat client" : ""}</span></div>
          <div><strong>{review.price}</strong><span>{review.duration} · {review.age}</span></div>
          <span className="fiverr-badge">Posted on Fiverr</span>
        </div>
      </div>
      <div className="testimonial-controls">
        <div>{reviews.map((_, dot) => <button type="button" aria-label={`Show review ${dot + 1}`} key={dot} onClick={() => setIndex(dot)} className={dot === index ? "is-active" : ""} />)}</div>
        <div><button type="button" onClick={previous} aria-label="Previous review">←</button><button type="button" onClick={next} aria-label="Next review">→</button></div>
      </div>
    </div>
  );
}
