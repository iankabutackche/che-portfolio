export default function Logo({ lang = "zh" }) {
  return (
    <span className="logo-wrap">
      <svg
        className="logo-icon"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="logoGrad" x1="4" y1="4" x2="28" y2="28">
            <stop offset="0%" stopColor="#6ee7d7" />
            <stop offset="50%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
        </defs>
        <rect
          x="5"
          y="9"
          width="14"
          height="14"
          rx="3"
          stroke="url(#logoGrad)"
          strokeWidth="1.5"
          opacity="0.55"
        />
        <rect
          x="13"
          y="5"
          width="14"
          height="14"
          rx="3"
          stroke="url(#logoGrad)"
          strokeWidth="1.5"
        />
        <path
          d="M9 23 L16 27 L23 23"
          stroke="url(#logoGrad)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.7"
        />
      </svg>
      <span className="logo-text">
        {lang === "zh" ? (
          <>
            <span className="logo-name">车行</span>
            <span className="logo-sub">Portfolio</span>
          </>
        ) : (
          <>
            <span className="logo-name">Ian Che</span>
            <span className="logo-sub">Engineer</span>
          </>
        )}
      </span>
    </span>
  );
}
