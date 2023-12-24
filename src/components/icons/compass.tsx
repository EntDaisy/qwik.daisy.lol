import type { EvaIcon, EvaProps } from '.';

export const CompassIcon: EvaIcon = (props: EvaProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      fill={props.color ?? 'currentColor'}
      stroke="none"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      {...{ ...props, size: undefined, color: undefined }}
    >
      <title>나침반 아이콘</title>
      <g data-name="Layer 2">
        <g data-name="compass">
          <rect width="24" height="24" opacity="0" />
          <polygon points="10.8 13.21 12.49 12.53 13.2 10.79 11.51 11.47 10.8 13.21" />
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm3.93 7.42l-1.75 4.26a1 1 0 0 1-.55.55l-4.21 1.7A1 1 0 0 1 9 16a1 1 0 0 1-.71-.31h-.05a1 1 0 0 1-.18-1l1.75-4.26a1 1 0 0 1 .55-.55l4.21-1.7a1 1 0 0 1 1.1.25 1 1 0 0 1 .26.99z" />
        </g>
      </g>
    </svg>
  );
};
