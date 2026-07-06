import { Link } from "@tanstack/react-router";

export function Logo({ size = 28, withWordmark = true }: { size?: number; withWordmark?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <span
        className="relative inline-flex items-center justify-center rounded-[10px]"
        style={{
          width: size,
          height: size,
          background: "var(--gradient-brand)",
          boxShadow: "var(--shadow-brand)",
        }}
      >
        <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none">
          <path d="M12 2L21 7v10l-9 5-9-5V7l9-5z" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M3 7l9 5 9-5M12 12v10" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      </span>
      {withWordmark && (
        <span className="font-display text-lg font-bold tracking-tight text-foreground">
          Bloxel<span className="text-gradient">AI</span>
        </span>
      )}
    </Link>
  );
}
