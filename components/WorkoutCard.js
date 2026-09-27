import Link from "next/link";

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workouts/${workout.id}`}
      className="bg-card border border-cardborder rounded-lg overflow-hidden hover:border-accent transition"
    >
      <img src={workout.image} alt={workout.name} className="w-full h-36 object-cover" />
      <div className="p-3">
        <div className="flex gap-2 mb-2">
          {workout.muscleGroups.map((tag) => (
            <span
              key={tag}
              className="text-[10px] bg-accent text-black px-2 py-0.5 rounded-full font-bold uppercase"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-bold text-sm uppercase mb-1">{workout.name}</h3>
        <p className="text-xs text-gray-400 mb-2">{workout.equipment}</p>
        <div className="flex gap-3 text-xs text-gray-400">
          <span>⏱ {workout.duration} min</span>
          <span>🔥 {workout.caloriesBurned} kcal</span>
          <span>⭐ {workout.rating}</span>
        </div>
      </div>
    </Link>
  );
}
