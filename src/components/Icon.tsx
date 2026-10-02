import { icons, type IconName } from "./icons";

export type { IconName };

export default function Icon({ name, className }: { name: IconName; className?: string }) {
    return(
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            {icons[name]}
        </svg>
    )
}
