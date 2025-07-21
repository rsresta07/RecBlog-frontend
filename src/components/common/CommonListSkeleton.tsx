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
