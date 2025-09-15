const SkeletonBestPriceCard = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {[1, 2].map((_, index) => (
                <div
                    key={index}
                    className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xs border border-blue-100 animate-pulse flex flex-col justify-between"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
                        <div className="h-12 w-12 rounded-full bg-gray-300"></div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
                        <div className="h-6 w-1/3 bg-gray-300 rounded"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SkeletonBestPriceCard;
