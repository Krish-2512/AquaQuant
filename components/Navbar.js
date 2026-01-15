import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-12 py-6 border-b border-gray-900">
      <div className="text-xl font-semibold tracking-tight">
        QuantPrep
      </div>

      <div className="flex gap-8 text-gray-300">
        <Link href="/auth/signin" className="hover:text-white">
          Sign in
        </Link>
      </div>
    </nav>
  );
}
