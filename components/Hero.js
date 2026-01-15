import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex flex-col items-center text-center px-6 py-36">
      <h1 className="text-5xl md:text-6xl font-semibold tracking-tight max-w-4xl">
        Master Quant Interviews
      </h1>

      <p className="text-gray-400 mt-6 max-w-2xl text-lg">
        Practice probability, statistics, puzzles, and quant-style coding
        problems used by top trading firms and hedge funds.
      </p>

      <div className="mt-10">
        <Link
          href="/auth/signin"
          className="px-8 py-3 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition"
        >
          Start Practicing
        </Link>
      </div>
    </section>
  );
}
