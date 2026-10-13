"use client";

import { useState } from "react";

/* Google's letter-avatar colors, picked per name so each reviewer keeps theirs. */
const AVATAR_COLORS = ["#5C6BC0", "#7E57C2", "#EC407A", "#26A69A", "#42A5F5", "#EF6C00", "#8D6E63", "#78909C", "#AB47BC", "#689F38"];

/** Reviewer's Google profile photo, or a Google-style colored letter if there's none. */
export default function ReviewerAvatar({
  name,
  photo,
  className = "w-10 h-10 md:w-11 md:h-11 text-lg",
  eager = false,
}: {
  name: string;
  photo?: string;
  className?: string;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (photo && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- Google profile photo, external and tiny
      <img
        src={photo}
        alt=""
        width={44}
        height={44}
        loading={eager ? "eager" : "lazy"}
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className={`${className} rounded-full object-cover flex-shrink-0 bg-brand-light`}
      />
    );
  }

  const hash = [...name].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 0);
  return (
    <div
      className={`${className} rounded-full flex items-center justify-center text-white font-medium flex-shrink-0`}
      style={{ backgroundColor: AVATAR_COLORS[hash % AVATAR_COLORS.length] }}
      aria-hidden="true"
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}
