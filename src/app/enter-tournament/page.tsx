"use client";

import React, { useState } from "react";

export default function EnterTournament() {
  const [constructorName, setConstructorName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [drivers, setDrivers] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // For now just log the data; later replace with API call to save the data
    console.log({
      constructorName,
      logoUrl,
      drivers: drivers.split(",").map((d) => d.trim()).filter(Boolean),
      email,
    });

    setSubmitted(true);
    // reset form if you want:
    // setConstructorName("");
    // setLogoUrl("");
    // setDrivers("");
    // setEmail("");
  };

  return (
    <main className="container mx-auto p-6 max-w-md">
      <h1 className="text-3xl font-bold mb-6 text-yellow-400">Enter Tournament</h1>

      {submitted ? (
        <div className="bg-green-700 p-4 rounded text-white">
		Thank you for registering your team! We&apos;'ll get in touch soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 text-gray-100">
          <div>
            <label className="block mb-1 font-semibold" htmlFor="constructorName">
              Constructor Name
            </label>
            <input
              type="text"
              id="constructorName"
              value={constructorName}
              onChange={(e) => setConstructorName(e.target.value)}
              required
              className="w-full rounded border border-gray-600 bg-gray-900 p-2"
              placeholder="Your racing team name"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold" htmlFor="logoUrl">
              Racing Team Logo URL
            </label>
            <input
              type="url"
              id="logoUrl"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              required
              className="w-full rounded border border-gray-600 bg-gray-900 p-2"
              placeholder="https://example.com/logo.png"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold" htmlFor="drivers">
              Driver Names (comma separated)
            </label>
            <input
              type="text"
              id="drivers"
              value={drivers}
              onChange={(e) => setDrivers(e.target.value)}
              required
              className="w-full rounded border border-gray-600 bg-gray-900 p-2"
              placeholder="Driver1, Driver2, Driver3"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold" htmlFor="email">
              Contact Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded border border-gray-600 bg-gray-900 p-2"
              placeholder="you@example.com"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-gray-900 font-bold py-3 rounded hover:bg-yellow-500 transition"
          >
            Submit Registration
          </button>
        </form>
      )}
    </main>
  );
}

