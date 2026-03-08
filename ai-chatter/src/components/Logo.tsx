export default function Logo({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  const textColor = dark ? "text-navy-900" : "text-white";
  return (
    <a href="/" className={`flex items-center gap-2 ${className}`}>
      {/* Chat bubble icon */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <rect width="32" height="32" rx="8" fill={dark ? "#2563eb" : "#3b82f6"} />
        <path
          d="M10 11C10 10.4477 10.4477 10 11 10H21C21.5523 10 22 10.4477 22 11V18C22 18.5523 21.5523 19 21 19H14L11 22V19H11C10.4477 19 10 18.5523 10 18V11Z"
          fill="white"
        />
        <circle cx="14" cy="14.5" r="1" fill={dark ? "#2563eb" : "#3b82f6"} />
        <circle cx="16.5" cy="14.5" r="1" fill={dark ? "#2563eb" : "#3b82f6"} />
        <circle cx="19" cy="14.5" r="1" fill={dark ? "#2563eb" : "#3b82f6"} />
      </svg>
      <span className={`text-xl font-bold tracking-tight ${textColor}`}>
        AI Chatter
      </span>
    </a>
  );
}
