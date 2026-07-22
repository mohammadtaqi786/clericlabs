export function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ChevronIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function LogoMark() {
  return (
    <span className="logo-mark" aria-hidden="true">
      <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
        <path d="M9.8 2.2C12.8 2.8 15 5.2 15 8.1c0 3.4-2.8 6.2-6.2 6.2-2.8 0-5.2-1.9-6-4.5 1.5.8 3.7.7 5.3-.5 2.1-1.6 2.8-4.4 1.7-7.1Z" fill="url(#logo-a)" />
        <path d="M4.4 4.1c1.4-1.5 3.6-1.8 5.3-.8-.7 1.9-2.3 3.4-4.3 3.8-1 .2-1.9.1-2.7-.3.3-1 .9-1.9 1.7-2.7Z" fill="url(#logo-b)" />
        <defs>
          <linearGradient id="logo-a" x1="3" x2="15" y1="13.9" y2="3.1" gradientUnits="userSpaceOnUse">
            <stop stopColor="#151B67" />
            <stop offset=".52" stopColor="#4E6DFF" />
            <stop offset="1" stopColor="#BFD0FF" />
          </linearGradient>
          <linearGradient id="logo-b" x1="2.8" x2="10.2" y1="6.6" y2="2.6" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8BA7FF" />
            <stop offset="1" stopColor="#FFFFFF" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  )
}
