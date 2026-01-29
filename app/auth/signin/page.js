"use client";

import { useEffect, useState } from "react";
import { signIn, getProviders } from "next-auth/react";

export default function SignIn() {
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    let mounted = true;
    getProviders().then((p) => {
      if (mounted) setProviders(p);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="border border-gray-800 rounded-xl p-10 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Sign in to QuantPrep</h2>

        <p className="text-gray-400 mb-8">Practice real quant interview problems.</p>

        <div className="space-y-3">
          {providers === null && (
            <div className="text-gray-400">Loading providers…</div>
          )}

          {/* Always show Google button so users can attempt Google sign-in; if not configured we'll show a hint. */}
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition"
          >
            Continue with Google
          </button>
          {providers && !providers.google && (
            <div className="text-xs text-yellow-400">Google provider not configured. Set GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET in .env.local</div>
          )}

          {providers &&
            Object.values(providers).map((provider) => {
              // Credentials provider handled separately so we can supply demo creds client-side.
              if (provider.id === "credentials" || provider.id === "google") return null;

              return (
                <button
                  key={provider.id}
                  onClick={() => signIn(provider.id, { callbackUrl: "/dashboard" })}
                  className="w-full py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition"
                >
                  Continue with {provider.name}
                </button>
              );
            })}

          {/* Demo credentials button */}
          <button
            onClick={() => signIn("credentials", { username: "dev", password: "dev", callbackUrl: "/dashboard" })}
            className="w-full py-3 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition"
          >
            Continue as Demo
          </button>
        </div>
      </div>
    </div>
  );
}
