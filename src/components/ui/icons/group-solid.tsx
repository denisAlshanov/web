import type { SVGProps } from "react";

export function GroupSolid(props: SVGProps<SVGSVGElement>) {
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
        d="M8 3.5C5.51472 3.5 3.5 5.51472 3.5 8C3.5 10.4853 5.51472 12.5 8 12.5C10.4853 12.5 12.5 10.4853 12.5 8C12.5 5.51472 10.4853 3.5 8 3.5Z"
        fill="currentColor"
      />
      <path
        d="M18 2.5C15.7909 2.5 14 4.29086 14 6.5C14 8.70914 15.7909 10.5 18 10.5C20.2091 10.5 22 8.70914 22 6.5C22 4.29086 20.2091 2.5 18 2.5Z"
        fill="currentColor"
      />
      <path
        d="M0.5 19.5C0.5 15.3579 3.85786 12 8 12C12.1421 12 15.5 15.3579 15.5 19.5V20.5H0.5V19.5Z"
        fill="currentColor"
      />
      <path
        d="M17 19.5V20.5H23.5V14.5C23.5 11.7386 21.2614 9.5 18.5 9.5C17.1 9.5 15.8329 10.0843 14.9233 11.0226C16.4853 12.8088 17 15.5 17 19.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
