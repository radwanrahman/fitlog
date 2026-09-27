"use client";

import { useState } from "react";
import { usePlan } from "@/context/PlanContext";
import Link from "next/link";
import toast from "react-hot-toast";

export default function MyPlan() {
  const { plan, saved, removeFromPlan, removeFromSaved, markAsDone } = usePlan();
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

      {list.length === 0 ? (
        <div className="text-center py-16 border border-cardborder rounded-lg">
          <h3 className="font-bold mb-2">NOTHING HERE YET</h3>
          <p className="text-gray-400 text-sm mb-4">
            Browse the library and add a lift to get today moving.
          </p>
          <Link href="/" className="bg-accent text-black px-4 py-2 rounded font-semibold">
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {list.map((workout) => (
            <PlanRow key={workout.id} workout={workout} isToday={activeTab === "today"} />
          ))}
        </div>
      )}
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

function PlanRow({ workout, isToday }) {
  const { removeFromPlan, removeFromSaved, markAsDone } = usePlan();

  return (
    <div className="flex items-center justify-between bg-card border border-cardborder rounded-lg p-3">
      <div className="flex items-center gap-3">
        <img src={workout.image} alt={workout.name} className="w-14 h-14 rounded object-cover" />
        <div>
          <h3 className="font-bold text-sm uppercase">{workout.name}</h3>
          <p className="text-xs text-gray-400">{workout.equipment}</p>
          <div className="flex gap-3 text-xs text-gray-400 mt-1">
            <span>⏱ {workout.duration} min</span>
            <span>🔥 {workout.caloriesBurned} kcal</span>
            <span>⭐ {workout.rating}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href={`/workouts/${workout.id}`}
          className="border border-gray-500 text-xs px-3 py-1 rounded"
        >
          View Details
        </Link>

        {isToday && !workout.done && (
          <button
            onClick={() => {
              markAsDone(workout.id);
              toast.success("Marked as done");
            }}
            className="bg-accent text-black text-xs px-3 py-1 rounded font-semibold"
          >
            Mark as Done
          </button>
        )}

        <button
          onClick={() => {
            if (isToday) removeFromPlan(workout.id);
            else removeFromSaved(workout.id);
            toast("Removed");
          }}
          className="text-gray-400 px-2"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
