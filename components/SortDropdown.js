export default function SortDropdown({ sortBy, setSortBy }) {
  return (
    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
      className="bg-card border border-cardborder text-sm px-3 py-1 rounded"
    >
      <option value="duration">Sort by: Duration</option>
      <option value="calories">Sort by: Calories</option>
      <option value="rating">Sort by: Rating</option>
    </select>
  );
}
