"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

type Player = {
  id: string;
  name: string;
  team_id: string | null;
};

type Team = {
  id: string;
  name: string;
  logo_url: string | null;
  players: Player[];
};

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [unregisteredPlayers, setUnregisteredPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data: teamsData, error: teamsError } = await supabase
        .from("teams")
        .select("id, name, logo_url, players(id, name, team_id)");

      const { data: unregisteredData, error: unregisteredError } = await supabase
        .from("players")
        .select("id, name, team_id")
        .is("team_id", null);

      if (teamsError) {
        console.error("Error fetching teams:", teamsError);
      }
      if (unregisteredError) {
        console.error("Error fetching unregistered players:", unregisteredError);
      }

      setTeams(teamsData || []);
      setUnregisteredPlayers(unregisteredData || []);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Teams</h1>

      {teams.length === 0 ? (
        <p>No teams yet.</p>
      ) : (
<ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
  {teams.map((team) => (
    <li
      key={team.id}
      className="border rounded-lg p-4 shadow hover:shadow-lg transition bg-gray-900"
    >
      <div className="flex items-center space-x-4 mb-3">
        {team.logo_url ? (
          <img
            src={team.logo_url}
            alt={`${team.name} Logo`}
            className="w-24 h-24 object-contain rounded"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-700 rounded flex items-center justify-center text-gray-500">
            No Logo
          </div>
        )}
        <h2 className="text-2xl font-semibold text-white">{team.name}</h2>
      </div>

      <div className="ml-28">
        {team.players.length === 0 ? (
          <p className="text-gray-500 italic">No players yet</p>
        ) : (
          <ul className="space-y-1">
            {team.players.map((player) => (
              <li key={player.id} className="text-cyan-400">
                {player.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  ))}
</ul>
      )}

      <section>
        <h2 className="text-2xl font-bold mb-4">Unregistered Players</h2>
        {unregisteredPlayers.length === 0 ? (
          <p>No unregistered players.</p>
        ) : (
          <ul className="list-disc list-inside text-cyan-400">
            {unregisteredPlayers.map((player) => (
              <li key={player.id}>{player.name}</li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
