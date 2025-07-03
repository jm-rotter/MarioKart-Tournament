// src/app/rankings/page.tsx
export default function Rankings() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold text-yellow-400 mb-8 text-center">
        🏆 Formula Mario Kart 2025 Rankings
      </h1>

      <p className="text-gray-400 text-center mb-12">
        Rankings will appear here once the season starts.
      </p>

      {/* Placeholder table structure */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-700">
          <thead>
            <tr className="bg-gray-800 text-yellow-400">
              <th className="py-3 px-6 border border-gray-700">Position</th>
              <th className="py-3 px-6 border border-gray-700">Driver</th>
              <th className="py-3 px-6 border border-gray-700">Constructor</th>
              <th className="py-3 px-6 border border-gray-700">Points</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4} className="py-6 text-center text-gray-600 italic">
                No data yet
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}

