"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <head>
        <title>Something went wrong | Pulse</title>
        <style>{`
          :root {
            --bg: #ffffff;
            --fg: #09090b;
            --muted: #71717a;
            --btn-bg: #18181b;
            --btn-fg: #fafafa;
            --border: #e4e4e7;
          }
          @media (prefers-color-scheme: dark) {
            :root {
              --bg: #09090b;
              --fg: #fafafa;
              --muted: #a1a1aa;
              --btn-bg: #fafafa;
              --btn-fg: #18181b;
              --border: #27272a;
            }
          }
          body {
            margin: 0;
            background-color: var(--bg);
            color: var(--fg);
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            display: flex;
            min-height: 100vh;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 1.5rem;
            text-align: center;
          }
        `}</style>
      </head>
      <body>
        <div style={{ maxWidth: "28rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ display: "grid", width: "2.5rem", height: "2.5rem", placeItems: "center", borderRadius: "0.5rem", backgroundColor: "#10b981", fontSize: "0.875rem", fontWeight: 700, color: "#fff", boxShadow: "0 2px 8px rgba(16,185,129,0.25)" }}>
              P
            </span>
          </div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.025em", marginBottom: "0.5rem" }}>
            Something went wrong
          </h1>
          <p style={{ marginBottom: "2rem", color: "var(--muted)", fontSize: "0.875rem", lineHeight: 1.5 }}>
            A critical error occurred while rendering the page. You can try reloading or navigate back to the home page.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.75rem" }}>
            <button
              onClick={() => reset()}
              style={{ padding: "0.5rem 1.25rem", backgroundColor: "var(--btn-bg)", color: "var(--btn-fg)", border: "none", borderRadius: "0.5rem", cursor: "pointer", fontSize: "0.875rem", fontWeight: 600, transition: "opacity 0.15s" }}
            >
              Try again
            </button>
            <Link
              href="/"
              style={{ padding: "0.5rem 1.25rem", border: "1px solid var(--border)", borderRadius: "0.5rem", color: "var(--fg)", textDecoration: "none", fontSize: "0.875rem", fontWeight: 500 }}
            >
              Go home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
