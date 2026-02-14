import type { SVGProps } from "react";

export function TvSolid(props: SVGProps<SVGSVGElement>) {
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
        d="M8.5 2.5C8.22386 2.22386 8.22386 1.77614 8.5 1.5C8.77614 1.22386 9.22386 1.22386 9.5 1.5L12 4L14.5 1.5C14.7761 1.22386 15.2239 1.22386 15.5 1.5C15.7761 1.77614 15.7761 2.22386 15.5 2.5L13.208 4.792V5H20C21.6569 5 23 6.34315 23 8V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V8C1 6.34315 2.34315 5 4 5H10.792V4.792L8.5 2.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
