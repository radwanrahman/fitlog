"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";
import SortDropdown from "@/components/SortDropdown";

export default function Home() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("duration");

 useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/fitlog")
      .then((res) => res.json())
      .then((data) => {
        setWorkouts(data);
        setLoading(false);
      });
  }, []);

  return (
    <main>
      <Hero />

      <section id="library" className="px-6 py-14">
        <h2 className="text-2xl font-extrabold uppercase mb-1">The Library</h2>
        <p className="text-gray-400 text-sm mb-8">
          Twelve lifts covering every major muscle group.
        </p>

        <div className="flex justify-end mb-4">
          <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
        </div>

    {loading ? (
          <p className="text-gray-400">Loading workouts...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...workouts]
              .sort((a, b) => {
                if (sortBy === "duration") return a.duration - b.duration;
                if (sortBy === "calories") return a.caloriesBurned - b.caloriesBurned;
                if (sortBy === "rating") return b.rating - a.rating;
                return 0;
              })
              .map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
          </div>
        )}
      </section>
    </main>
  );
}
