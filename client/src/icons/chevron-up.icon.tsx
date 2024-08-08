import { IconProps } from ".";

export default function ChevronUpIcon({ className }: IconProps) {
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
        d="M7.46967 0.46967C7.76256 0.176777 8.23744 0.176777 8.53033 0.46967L15.5303 7.46967C15.8232 7.76256 15.8232 8.23744 15.5303 8.53033C15.2374 8.82322 14.7626 8.82322 14.4697 8.53033L8 2.06066L1.53033 8.53033C1.23744 8.82322 0.762563 8.82322 0.46967 8.53033C0.176777 8.23744 0.176777 7.76256 0.46967 7.46967L7.46967 0.46967Z"
        fill="currentColor"
      />
    </svg>
  );
}
