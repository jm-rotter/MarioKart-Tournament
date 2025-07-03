// app/rules/page.tsx

import React from "react";

const rules = [
  "Each Constructor must have a name and a Racing Team Logo (RTL).",
  "Each GP is run at 420cc.",
  "No driving aids. That is, no steering aid and no auto-acceleration. Except for those who bribe the officials",
  "Performance Enhancing Drugs are a must.",
  "You are allowed to bring one upgrade to your car each grand prix but no more than that, the set-up must be the same up to a given upgrade. Again bribes are accepted pay-pal/jaden :)",
  "Missing a grand-prix results in a W.O (Walk over) unless a new time is agreed upon by both teams.",
  "GP:s follow the Official Mario Kart Calendar.",
  "Bot difficulty is set to the hardest.",
  "If we can agree (authoritatively) on new rules or changing of the current ones we may do so.",
  "A team can have reserve drivers, although it is not beneficial towards the drivers championship.",
];

export default function RulesPage() {
  return (
    <main className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8 text-yellow-400">Formula Mario Kart 2025 Rules</h1>
      <ol className="list-decimal list-inside space-y-4 text-lg text-gray-100">
        {rules.map((rule, idx) => (
          <li key={idx} className="leading-relaxed">
            {rule}
          </li>
        ))}
      </ol>
    </main>
  );
}

