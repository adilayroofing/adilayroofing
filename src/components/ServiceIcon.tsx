interface ServiceIconProps {
  slug: string;
  className?: string;
}

export default function ServiceIcon({ slug, className = "w-8 h-8" }: ServiceIconProps) {
  const icon = icons[slug];
  if (!icon) return null;

  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      {icon}
    </svg>
  );
}

const icons: Record<string, React.ReactNode> = {
  // Roof Replacement — house with roof
  "roof-replacement": (
    <>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    </>
  ),

  // Roof Repair — wrench tool
  "roof-repair": (
    <>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.42 15.17l-5.16-5.17a3.12 3.12 0 114.42-4.42l.74.74.74-.74a3.12 3.12 0 014.42 4.42l-5.16 5.17z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.42 15.17L16.58 21M21.75 6.75a4.5 4.5 0 01-4.5 4.5"
      />
    </>
  ),

  // Flat Roofing — commercial building
  "flat-roofing": (
    <>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 21h16.5M4.5 3h15M5.25 3v18M18.75 3v18M9 6.75h1.5M9 9.75h1.5M9 12.75h1.5M14.25 6.75h1.5M14.25 9.75h1.5M14.25 12.75h1.5M9 18.75h6V15.75H9v3z"
      />
    </>
  ),

  // Shingle Roofing — residential house
  "shingle-roofing": (
    <>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21H4.125c-.621 0-1.125-.504-1.125-1.125V9.75"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2.25l9.75 7.5M12 2.25L2.25 9.75"
      />
    </>
  ),

  // Siding — wall panels / layers
  "siding": (
    <>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
      />
    </>
  ),

  // Windows — window with panes
  "windows": (
    <>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8.25V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18V8.25m-18 0V6a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 6v2.25m-18 0h18M12 3.75v16.5M3 12h18"
      />
    </>
  ),

  // Gutters — water / rain drainage
  "gutters": (
    <>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
      />
    </>
  ),
};
