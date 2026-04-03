import { useAppStore } from "../../stores/useAppStore";

export function Logo() {
  const replayIntro = useAppStore((s) => s.replayIntro);

  return (
    <div className="logo" onClick={replayIntro}>
      <svg
        viewBox="0 0 120 60"
        width="120"
        height="60"
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          x="60"
          y="46"
          textAnchor="middle"
          fill="#ffffff"
          fontFamily="'Dancing Script', cursive"
          fontSize="52"
          fontWeight="700"
          fontStyle="italic"
        >
          SH
        </text>
      </svg>
    </div>
  );
}
