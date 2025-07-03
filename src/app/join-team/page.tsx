"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

type Team = {
  id: string;
  name: string;
};

export default function JoinTeam() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [playerName, setPlayerName] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "error" | "success" | null }>(
    { text: "", type: null }
  );

  useEffect(() => {
    async function fetchTeams() {
      const { data, error } = await supabase.from("teams").select("id, name");
      if (error) {
        console.error("Error loading teams:", error);
        setMessage({ text: "Failed to load teams.", type: "error" });
      } else {
        setTeams(data ?? []);
        if (data && data.length > 0) setSelectedTeamId(data[0].id);
      }
    }
    fetchTeams();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: null });

    try {
      const { data: players, error: playerError } = await supabase
        .from("players")
        .select("id")
        .eq("name", playerName.trim());

      if (playerError) throw playerError;

      if (!players || players.length === 0) {
        setMessage({ text: "Invalid player name. Please try again.", type: "error" });
        setLoading(false);
        return;
      }

      const playerId = players[0].id;

      const { error: updateError } = await supabase
        .from("players")
        .update({ team_id: selectedTeamId })
        .eq("id", playerId);

      if (updateError) throw updateError;

      setMessage({ text: "Team joined successfully!", type: "success" });
      setPlayerName("");
      setSelectedTeamId(teams.length > 0 ? teams[0].id : "");
    } catch (error) {
      console.error("Error joining team:", error);
      setMessage({ text: "Failed to join team. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container mx-auto p-6 max-w-md">
      <h1 className="text-3xl font-bold mb-6 text-yellow-400">Join a Team</h1>

      <form onSubmit={handleSubmit} className="space-y-5 text-gray-100">
        <div>
          <label className="block mb-1 font-semibold" htmlFor="playerName">
            Player Name
          </label>
          <input
            type="text"
            id="playerName"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            required
            disabled={loading}
            className="w-full rounded border border-gray-600 bg-gray-900 p-2"
            placeholder="Enter your player name"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold" htmlFor="teamSelect">
            Select Team
          </label>
          <select
            id="teamSelect"
            value={selectedTeamId}
            onChange={(e) => setSelectedTeamId(e.target.value)}
            disabled={loading || teams.length === 0}
            className="w-full rounded border border-gray-600 bg-gray-900 p-2"
          >
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-400 text-gray-900 font-bold py-3 rounded hover:bg-yellow-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Joining..." : "Join Team"}
        </button>

        {/* Feedback message */}
        {message.type && (
          <p
            className={`mt-4 p-3 rounded ${
              message.type === "success"
                ? "bg-green-700 text-green-200"
                : "bg-red-700 text-red-200"
            } font-semibold`}
          >
            {message.text}
          </p>
        )}
      </form>
    </main>
  );
}

