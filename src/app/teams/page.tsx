
import React from "react";

type Team = {
  id: number;
  name: string;
  logoUrl: string;
};

const teams: Team[] = [
  { id: 1, name: "Gran Flor", logoUrl: "/logos/racer.png" },
];

export default function TeamsPage() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Teams</h1>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {teams.map((team) => (
          <li
            key={team.id}
            className="flex items-center space-x-4 p-4 border rounded-lg shadow hover:shadow-lg transition"
          >
            <img
              src={team.logoUrl}
              alt={`${team.name} Logo`}
              className="w-16 h-16 object-contain"
            />
            <span className="text-xl font-semibold">{team.name}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}

