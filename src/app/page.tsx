// app/page.tsx or pages/index.tsx

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl md:text-6xl font-bold text-yellow-400 text-center">
        🏁 Formula Mario Kart 2025 🏎️
      </h1>
      <p className="mt-6 max-w-2xl text-center text-lg text-gray-300">
        Pre-season is over. Playtime is over.
        <br />
        Ladies and gentlemen press A and START YOUR ENGINES.
      </p>

      <div className="mt-10 space-x-4">
        <Link href="/rankings" passHref>
          <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-md">
            View Rankings
          </button>
        </Link>
        <Link href="/enter-tournament" passHref>
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md">
            Enter Tournament
          </button>
        </Link>
      </div>

      <p className="mt-16 text-sm text-gray-500">
        100 Grand Prix. 11 Constructors. 20 Drivers. 3 Trophies.
      </p>
    </main>
  );
}

