interface BBBSealProps {
  variant?: "horizontal" | "vertical";
  darkBg?: boolean;
  className?: string;
}

const SEAL_URLS = {
  horizontal: "https://seal-dc-easternpa.bbb.org/seals/blue-seal-200-42-bbb-236104655.png",
  "horizontal-white": "https://seal-dc-easternpa.bbb.org/seals/blue-seal-200-42-whitetxt-bbb-236104655.png",
  vertical: "https://seal-dc-easternpa.bbb.org/seals/blue-seal-150-110-bbb-236104655.png",
  "vertical-white": "https://seal-dc-easternpa.bbb.org/seals/blue-seal-150-110-whitetxt-bbb-236104655.png",
};

export default function BBBSeal({ variant = "horizontal", darkBg = false, className = "" }: BBBSealProps) {
  const isVertical = variant === "vertical";
  const key = darkBg ? `${variant}-white` : variant;

  return (
    <a
      href="https://www.bbb.org/us/pa/philadelphia/profile/roofing-contractors/adilay-roofing-llc-0241-236104655/#sealclick"
      target="_blank"
      rel="nofollow noopener noreferrer"
      className={className}
    >
      <img
        src={SEAL_URLS[key as keyof typeof SEAL_URLS]}
        alt="Adilay Roofing LLC BBB Business Review"
        width={isVertical ? 150 : 200}
        height={isVertical ? 110 : 42}
        style={{ border: 0 }}
      />
    </a>
  );
}
