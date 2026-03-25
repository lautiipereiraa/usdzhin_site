export default function UsdzhinLogo({ className }) {
    return (
        <svg viewBox="0 0 240 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#1e3a8a" />
                </linearGradient>
                <linearGradient id="logo-gradient-dark" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
            </defs>

            <g transform="translate(10, 10)">
                <rect x="0" y="0" width="46" height="46" rx="14" className="fill-[url(#logo-gradient)] dark:fill-[url(#logo-gradient-dark)] drop-shadow-sm" />
                <text x="23" y="23" textAnchor="middle" dominantBaseline="central" className="font-extrabold text-[32px] fill-white" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                    $
                </text>
            </g>

            {/* Typography */}
            <text x="76" y="44" className="font-bold text-[36px] fill-slate-800 dark:fill-white tracking-tighter" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                usd<tspan className="fill-blue-600 dark:fill-blue-400">zhin</tspan>
            </text>
        </svg>
    );
}
