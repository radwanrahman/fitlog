"use client";

import { useState } from "react";
import { usePlan } from "@/context/PlanContext";

export default function MyPlan() {
  const { plan, saved } = usePlan();
  const [activeTab, setActiveTab] = useState("today");

  const list = activeTab === "today" ? plan : saved;

  const totalMinutes = plan.reduce((sum, w) => sum + w.duration, 0);
  const totalCalories = plan.reduce((sum, w) => sum + w.caloriesBurned, 0);

  return (
    <main className="px-6 py-10">
      <h1 className="text-2xl font-extrabold uppercase mb-1">My Plan</h1>
      <p className="text-gray-400 text-sm mb-6">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard label="Exercises" value={plan.length} />
        <StatCard label="Minutes" value={totalMinutes} />
        <StatCard label="Calories" value={totalCalories} />
      </div>

      <div className="flex gap-2 mb-6">
        <TabButton active={activeTab === "today"} onClick={() => setActiveTab("today")}>
          Today&apos;s Plan
        </TabButton>
        <TabButton active={activeTab === "saved"} onClick={() => setActiveTab("saved")}>
          Saved
        </TabButton>
      </div>

      {/* workout list goes here in the next step */}
    </main>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-card border border-cardborder rounded-lg p-4 text-center">
      <p className="text-2xl font-extrabold text-accent">{value}</p>
      <p className="text-xs text-gray-400 uppercase">{label}</p>
    </div>
  );
}

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1 rounded text-sm ${
        active ? "bg-accent text-black font-semibold" : "border border-gray-500 text-gray-300"
      }`}
    >
      {children}
    </button>
  );
}
