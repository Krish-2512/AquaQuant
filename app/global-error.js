"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      Sentry.captureException(error);
    }
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="max-w-xl text-center">
          <h2 className="text-3xl font-black uppercase italic tracking-tight mb-4">
            Something Went Wrong
          </h2>
          <p className="text-slate-400 mb-8">
            We logged the issue and you can try loading the page again.
          </p>
          <button
            onClick={() => reset()}
            className="bg-sky-400 text-sky-950 px-6 py-3 rounded-xl font-black uppercase text-xs tracking-widest"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
