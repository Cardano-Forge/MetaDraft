import type { IconProps } from ".";

export default function ChevronDownIcon({ className }: IconProps) {
  return (
    <svg
      width="16"
      height="9"
      viewBox="0 0 16 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.46967 0.46967C0.762563 0.176777 1.23744 0.176777 1.53033 0.46967L8 6.93934L14.4697 0.46967C14.7626 0.176777 15.2374 0.176777 15.5303 0.46967C15.8232 0.762563 15.8232 1.23744 15.5303 1.53033L8.53033 8.53033C8.23744 8.82322 7.76256 8.82322 7.46967 8.53033L0.46967 1.53033C0.176777 1.23744 0.176777 0.762563 0.46967 0.46967Z"
        fill="currentColor"
      />
    </svg>
  );
}
