/**
 * A skeleton component for a list of items, commonly used
 * to indicate loading of the actual list.
 *
 * Consists of a 4-item array of gray rectangles of varying
 * heights, with a small margin between each "item".
 *
 * Can be used as a direct replacement for any list component,
 * or as a starting point for a more complex skeleton.
 */
const ListSkeleton = () => (
  <aside className="col-span-4 space-y-4 animate-pulse">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="mb-8 mt-4 flex flex-col">
        <div className="h-[18rem] bg-gray-200 rounded mb-2" />
        <div className="h-4 bg-gray-200 rounded mb-1" />
        <div className="h-14 bg-gray-200 rounded mb-4" />
        <div className="h-6 bg-gray-200 rounded mb-2" />
      </div>
    ))}
  </aside>
);

export default ListSkeleton;
