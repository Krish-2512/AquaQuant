"use client";

import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="border border-gray-800 rounded-xl p-10 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">
          Sign in to QuantPrep
        </h2>

        <p className="text-gray-400 mb-8">
          Practice real quant interview problems.
        </p>

        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}
