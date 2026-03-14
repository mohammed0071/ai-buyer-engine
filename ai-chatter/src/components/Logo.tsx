export default function Logo({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  const textColor = dark ? "text-navy-900" : "text-white";
  return (
    <a href="/" className={`flex items-center gap-2.5 ${className}`}>
      {/* EstateX building icon */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <rect width="32" height="32" rx="8" fill={dark ? "#2563eb" : "#3b82f6"} />
        <path d="M10 22V12L16 8L22 12V22H18V17H14V22H10Z" fill="white" />
        <rect x="14" y="12" width="4" height="3" rx="0.5" fill={dark ? "#2563eb" : "#3b82f6"} />
      </svg>
      <span className={`text-xl font-bold tracking-tight ${textColor}`}>
        EstateX
      </span>
    </a>
  );
}
