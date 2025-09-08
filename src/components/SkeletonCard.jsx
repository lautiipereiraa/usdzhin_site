const SkeletonCard = () => {
    return (
        <div className="p-11 bg-white rounded-2xl shadow-md w-full animate-pulse">
            <div className="h-5 w-24 bg-gray-200 rounded mb-4"></div>

            <div className="flex items-center justify-between mb-2">
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
            </div>

            <div className="flex items-center justify-between">
                <div className="h-4 w-16 bg-gray-200 rounded"></div>
                <div className="h-4 w-20 bg-gray-200 rounded"></div>
            </div>
        </div>
    );
};

const SkeletonGrid = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 7 }).map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    );
};

export default SkeletonGrid;
