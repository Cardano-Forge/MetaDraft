import type { IconProps } from ".";

export default function MinusIcon({ className }: IconProps) {
  return (
    <svg
      width="14"
      height="2"
      viewBox="0 0 14 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.25 1C0.25 0.585786 0.585786 0.25 1 0.25H13C13.4142 0.25 13.75 0.585786 13.75 1C13.75 1.41421 13.4142 1.75 13 1.75H1C0.585786 1.75 0.25 1.41421 0.25 1Z"
        fill="currentColor"
      />
    </svg>
  );
}
