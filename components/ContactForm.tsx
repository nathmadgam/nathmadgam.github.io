"use client";

import { FormEvent, useState } from "react";

const CONTACT_EMAIL = "nathanielmadridgaminde@proton.me";

export function ContactForm() {
  const [message, setMessage] = useState("");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const discord = String(form.get("discord") ?? "").trim();
    const project = String(form.get("project") ?? "").trim();
    const budget = String(form.get("budget") ?? "").trim();
    const details = String(form.get("message") ?? "").trim();

    const subject = `Roblox project inquiry: ${project || "New project"}`;
    const body = [
      `Name: ${name}`,
      `Reply email: ${email}`,
      discord ? `Discord: ${discord}` : "Discord: Not provided",
      budget ? `Budget: ${budget}` : "Budget: Not provided",
      "",
      "Project details:",
      details,
    ].join("\n");

    setMessage("Opening your email app with the project details filled in…");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form className="inquiry-form" onSubmit={submit}>
      <label><span>Name</span><input name="name" required minLength={2} autoComplete="name" /></label>
      <label><span>Email</span><input name="email" type="email" required autoComplete="email" /></label>
      <label><span>Discord</span><input name="discord" autoComplete="off" /></label>
      <label><span>Project type</span><input name="project" required placeholder="Gameplay system, UI, backend…" /></label>
      <label><span>Budget</span><input name="budget" placeholder="Optional" /></label>
      <label className="full"><span>Project details</span><textarea name="message" required minLength={20} rows={6} /></label>
      <button type="submit">Prepare project inquiry <span>↗</span></button>
      <p aria-live="polite">{message || <>This static form opens your email application and sends to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</>}</p>
    </form>
  );
}
