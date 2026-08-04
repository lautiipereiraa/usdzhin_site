import React from "react";

const ConvertIcon = ({ className = "w-4 h-4" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={className}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 21 3 16.5 7.5 12M3 16.5h13.5M16.5 3 21 7.5 16.5 12M21 7.5H7.5"
        />
    </svg>
);

export default ConvertIcon;
