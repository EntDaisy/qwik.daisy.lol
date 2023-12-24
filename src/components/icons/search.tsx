import type { EvaIcon, EvaProps } from '.';

export const SearchIcon: EvaIcon = (props: EvaProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      fill={props.color ?? 'currentColor'}
      {...{ ...props, size: undefined, color: undefined }}
    >
      <title>검색 아이콘</title>
      <g data-name="Layer 2">
        <g data-name="search">
          <rect width="24" height="24" opacity="0" />
          <path d="M20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z" />
        </g>
      </g>
    </svg>
  );
};
