import type { SVGProps } from "react";

export function CalendarSolid(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7 2C7.41421 2 7.75 2.33579 7.75 2.75V4H15.25V2.75C15.25 2.33579 15.5858 2 16 2C16.4142 2 16.75 2.33579 16.75 2.75V4H19C20.1046 4 21 4.89543 21 6V9H3V6C3 4.89543 3.89543 4 5 4H6.25V2.75C6.25 2.33579 6.58579 2 7 2Z"
        fill="currentColor"
      />
      <path
        d="M3 10H21V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V10Z"
        fill="currentColor"
      />
    </svg>
  );
}
