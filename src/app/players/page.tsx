"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient"; // Adjust path if needed

type Player = {
  id: string; // UUID from supabase is string
  name: string;
};

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlayers() {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from<Player>("players")
        .select("id, name")
        .order("name", { ascending: true });

      if (error) {
        setError("Failed to load players.");
        setPlayers([]);
      } else if (data) {
        setPlayers(data);
      }
      setLoading(false);
    }

    fetchPlayers();
  }, []);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Players</h1>

      {loading && <p>Loading players...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {players.map((player) => (
            <li
              key={player.id}
              className="flex items-center space-x-4 p-4 border rounded-lg shadow hover:shadow-lg transition"
            >
              <span className="text-xl font-semibold">{player.name}</span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

