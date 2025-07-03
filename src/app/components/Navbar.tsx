import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <div className="font-bold text-xl text-yellow-400">FMK 2025</div>
      <div className="space-x-6">
        <Link href="/" className="hover:text-yellow-400">
          Home
        </Link>
        <Link href="/rules" className="hover:text-yellow-400">
          Rules
        </Link>
        <Link href="/teams" className="hover:text-yellow-400">
          Teams
        </Link>
        <Link href="/players" className="hover:text-yellow-400">
          Players
		</Link>
      </div>
    </nav>
  );
}
