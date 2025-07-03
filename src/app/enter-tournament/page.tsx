"use client";

import React, { useState } from "react";
import { supabase } from "../../../lib/supabaseClient"; // adjust path if needed

export default function EnterTournament() {
  const [playerName, setPlayerName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function submitPlayer(name: string) {
    const { data, error } = await supabase
      .from("players")
      .insert([{ name }])
      .select()
      .single();

    if (error) {
      throw error;
    }
    return data;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      await submitPlayer(playerName.trim());
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to submit:", error);
      setErrorMessage("Failed to submit registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto p-6 max-w-md">
      <h1 className="text-3xl font-bold mb-6 text-yellow-400">Enter Tournament</h1>

      {submitted ? (
        <div className="bg-green-700 p-4 rounded text-white">
          Thank you for registering!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 text-gray-100">
          <div>
            <label className="block mb-1 font-semibold" htmlFor="playerName">
              Your Name
            </label>
            <input
              type="text"
              id="playerName"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              required
              className="w-full rounded border border-gray-600 bg-gray-900 p-2"
              placeholder="Enter your name"
              disabled={loading}
            />
          </div>

          {errorMessage && (
            <p className="text-red-500 font-semibold">{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 text-gray-900 font-bold py-3 rounded hover:bg-yellow-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Submit Registration"}
          </button>
        </form>
      )}
    </main>
  );
}
