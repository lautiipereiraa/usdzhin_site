const DivisorAlert = () => {
    return (
        <>
            <div className="flex items-center justify-center">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
                <div className="px-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold animate-pulse">!</span>
                    </div>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
            </div>
        </>
    )
}

export default DivisorAlert;