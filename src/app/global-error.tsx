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
      <body>
        <div style={{ display: 'flex', minHeight: '100vh', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', color: '#09090b', padding: '1rem', fontFamily: 'system-ui, sans-serif' }}>
          <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ display: 'grid', width: '2.5rem', height: '2.5rem', placeItems: 'center', borderRadius: '0.5rem', backgroundColor: '#10b981', fontSize: '0.875rem', fontWeight: 600, color: '#fff' }}>
              P
            </span>
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>Something went wrong</h1>
          <p style={{ marginBottom: '2rem', color: '#71717a' }}>A critical error occurred while rendering the page.</p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={() => reset()}
              style={{ padding: '0.5rem 1rem', backgroundColor: '#18181b', color: '#fafafa', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500 }}
            >
              Try again
            </button>
            <Link
              href="/"
              style={{ padding: '0.5rem 1rem', border: '1px solid #e4e4e7', borderRadius: '0.5rem', color: '#18181b', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}
            >
              Go home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
