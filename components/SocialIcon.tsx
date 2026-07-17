export type SocialName = "mail" | "discord" | "linkedin" | "x";

export function SocialIcon({ name }: { name: SocialName }) {
  if (name === "mail") return (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3 5.5h18v13H3v-13Zm9 6.1 7-4.45H5l7 4.45Zm0 2.35L5 9.5v7h14v-7l-7 4.45Z"/></svg>
  );
  if (name === "discord") return (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M19.5 5.34A17.5 17.5 0 0 0 15.44 4l-.5 1.02a15.8 15.8 0 0 0-5.87 0L8.56 4A17.7 17.7 0 0 0 4.5 5.35C1.93 9.14 1.23 12.84 1.58 16.5A16.6 16.6 0 0 0 6.56 19l1.21-1.64a10.7 10.7 0 0 1-1.9-.92l.47-.37c3.67 1.7 7.65 1.7 11.28 0l.48.37c-.61.36-1.25.67-1.91.92L17.4 19a16.5 16.5 0 0 0 4.98-2.5c.41-4.24-.7-7.9-2.88-11.16ZM8.56 14.5c-1.1 0-2-1-2-2.24s.88-2.25 2-2.25 2.03 1.02 2 2.25c0 1.24-.9 2.24-2 2.24Zm6.88 0c-1.1 0-2-1-2-2.24s.88-2.25 2-2.25 2.03 1.02 2 2.25c0 1.24-.88 2.24-2 2.24Z"/></svg>
  );
  if (name === "linkedin") return (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M5.2 3.6A2.2 2.2 0 1 1 5.2 8a2.2 2.2 0 0 1 0-4.4ZM3.3 9.5h3.8V21H3.3V9.5Zm6.1 0H13v1.57h.05c.5-.95 1.72-1.95 3.55-1.95 3.8 0 4.5 2.5 4.5 5.75V21h-3.8v-5.43c0-1.3-.02-2.96-1.8-2.96-1.8 0-2.08 1.41-2.08 2.87V21H9.4V9.5Z"/></svg>
  );
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-6.39L6.48 22H3.36l7.24-8.28L2.96 2h6.4l4.42 5.84L18.9 2Zm-1.1 17.84h1.73L8.42 4.05H6.57L17.8 19.84Z"/></svg>
  );
}
