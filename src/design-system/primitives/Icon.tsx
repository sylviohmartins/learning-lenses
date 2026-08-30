import type { ReactNode, SVGAttributes } from "react";

export type IconName =
  | "home"
  | "learn"
  | "review"
  | "dossier"
  | "settings"
  | "arrow-right"
  | "arrow-left"
  | "external-link"
  | "close"
  | "check"
  | "info";

const paths: Record<IconName, ReactNode> = {
  home: (
    <>
      <path d="m3.5 10.5 8.5-7 8.5 7" />
      <path d="M5.5 9.5v10h13v-10M9.5 19.5v-6h5v6" />
    </>
  ),
  learn: (
    <>
      <path d="M4 5.5c2.8-.7 5.5-.1 8 1.7v12c-2.5-1.8-5.2-2.4-8-1.7z" />
      <path d="M20 5.5c-2.8-.7-5.5-.1-8 1.7v12c2.5-1.8 5.2-2.4 8-1.7z" />
    </>
  ),
  review: (
    <>
      <path d="M4.5 8.5V4.8l2.2 2.1A8 8 0 1 1 4 13" />
      <path d="M4.5 4.8h3.7" />
    </>
  ),
  dossier: (
    <>
      <path d="M4 5.5h6l1.5 2H20v11H4z" />
      <path d="M8 12h8M8 15.5h5" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19 13.5v-3l-2.1-.7a7 7 0 0 0-.6-1.4l1-2-2.1-2.1-2 1a7 7 0 0 0-1.4-.6L11 2.5H8l-.7 2.2a7 7 0 0 0-1.4.6l-2-1-2.1 2.1 1 2a7 7 0 0 0-.6 1.4L.5 10.5v3l2.1.7a7 7 0 0 0 .6 1.4l-1 2 2.1 2.1 2-1a7 7 0 0 0 1.4.6l.7 2.2h3l.7-2.2a7 7 0 0 0 1.4-.6l2 1 2.1-2.1-1-2a7 7 0 0 0 .6-1.4z" />
    </>
  ),
  "arrow-right": <path d="M5 12h14M14 7l5 5-5 5" />,
  "arrow-left": <path d="M19 12H5M10 7l-5 5 5 5" />,
  "external-link": (
    <>
      <path d="M14 4h6v6M20 4l-9 9" />
      <path d="M18 13v6H5V6h6" />
    </>
  ),
  close: <path d="m6 6 12 12M18 6 6 18" />,
  check: <path d="m5 12.5 4.2 4.2L19 7" />,
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v6M12 7.5v.2" />
    </>
  ),
};

type IconProps = Omit<SVGAttributes<SVGSVGElement>, "children"> & {
  name: IconName;
  size?: number;
  title?: string;
};

export function Icon({ name, size = 20, title, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      focusable="false"
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {paths[name]}
    </svg>
  );
}
