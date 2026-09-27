"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import toast from "react-hot-toast";

export default function WorkoutDetail() {
  const { id } = useParams();
  const { addToPlan, saveForLater } = usePlan();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return null;
      })
      .then((data) => {
        setWorkout(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="p-10 text-gray-400">Loading workout...</p>;
  if (!workout) return <p className="p-10 text-gray-400">Workout not found.</p>;

  return (
    <main className="grid md:grid-cols-2 gap-10 px-6 py-14">
      <img src={workout.image} alt={workout.name} className="w-full rounded-lg object-cover" />

      <div>
        <h1 className="text-3xl font-extrabold uppercase mb-3">{workout.name}</h1>
        <p className="text-gray-400 mb-4">{workout.description}</p>

        <div className="flex gap-2 mb-6">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-accent text-black px-3 py-1 rounded-full font-bold"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="bg-card border border-cardborder rounded-lg p-4 mb-6 text-sm">
          <Row label="Equipment" value={workout.equipment} />
          <Row label="Difficulty" value={workout.difficulty} />
          <Row label="Sets" value={workout.sets} />
          <Row label="Reps" value={workout.reps} />
          <Row label="Duration" value={`${workout.duration} min`} />
          <Row label="Calories" value={`${workout.caloriesBurned} kcal`} />
          <Row label="Rating" value={workout.rating} />
        </div>

        <h2 className="font-bold mb-2">Instructions</h2>
        <ol className="list-decimal list-inside text-sm text-gray-300 space-y-1 mb-6">
          {workout.instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>

        <div className="flex gap-3">
          <button
            onClick={() => {
              const added = addToPlan(workout);
              if (added) toast.success("Added to today's plan");
              else toast("Already in your plan");
            }}
            className="bg-accent text-black font-semibold px-4 py-2 rounded"
          >
            Add to today&apos;s plan
          </button>
          <button
            onClick={() => {
              const added = saveForLater(workout);
              if (added) toast.success("Saved for later");
              else toast("Already saved");
            }}
            className="border border-gray-500 px-4 py-2 rounded"
          >
            Save for later
          </button>
        </div>
      </div>
    </main>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between py-1 border-b border-cardborder last:border-0">
      <span className="text-gray-400">{label.toUpperCase()}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
