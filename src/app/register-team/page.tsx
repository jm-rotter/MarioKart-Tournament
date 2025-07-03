"use client";

import React, { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

export default function EnterTournament() {
  const [teamName, setTeamName] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function uploadLogo(file: File, teamName: string) {
    const filePath = `${teamName}_${Date.now()}.png`;

    const { error: uploadError } = await supabase.storage
      .from("team-logos") // replace with your bucket name
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: "image/png",
      });

    if (uploadError) throw uploadError;

    const {
      data: { publicUrl },
    } = supabase.storage.from("team-logos").getPublicUrl(filePath);

    return publicUrl;
  }

  async function registerTeam(name: string, logoUrl: string) {
    const { data, error } = await supabase
      .from("teams")
      .insert([{ name, logo_url: logoUrl }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      let logoUrl = null;
      if (logoFile) {
        logoUrl = await uploadLogo(logoFile, teamName.trim());
      }

      await registerTeam(teamName.trim(), logoUrl);
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
      <h1 className="text-3xl font-bold mb-6 text-yellow-400">Register Team</h1>

      {submitted ? (
        <div className="bg-green-700 p-4 rounded text-white">
          Thank you for registering!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 text-gray-100">
          <div>
            <label className="block mb-1 font-semibold" htmlFor="teamName">
              Team Name
            </label>
            <input
              type="text"
              id="teamName"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              required
              className="w-full rounded border border-gray-600 bg-gray-900 p-2"
              placeholder="Enter the team name"
              disabled={loading}
            />
          </div>

		<div>
		<label className="block mb-1 font-semibold">Team Logo (PNG only) Max Size: 50 KC</label>
		<div className="relative">
			<label
			htmlFor="logoFile"
			className="inline-block cursor-pointer bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded"
			>
			{logoFile ? "Change File" : "Upload PNG"}
			</label>
			<input
			type="file"
			id="logoFile"
			accept="image/png"
			onChange={(e) => {
				const file = e.target.files?.[0];
				if (file && file.size > 5 * 1024 *1024) {
				alert("File size must be under 50 kilo cazzo (5MB).");
				e.target.value = ""; // Clear file input
				setLogoFile(null);
				return;
				}
				setLogoFile(file || null);
			}}
			required
			disabled={loading}
			className="absolute opacity-0 w-0 h-0"
			/>
			{logoFile && (
			<p className="mt-2 text-sm text-gray-400">
				Selected: {logoFile.name} ({(logoFile.size / (1024 * 1024)).toFixed(2)} MB)
			</p>
			)}
		</div>
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
