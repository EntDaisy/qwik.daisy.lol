import type { LenientSVGProps } from '@builder.io/qwik';
import type { JSX } from '@builder.io/qwik/jsx-runtime';

export interface EvaProps extends LenientSVGProps<SVGSVGElement> {
  color?: string;
  size?: number;
}

export type EvaIcon = (props: EvaProps) => JSX.Element;

export { BrushIcon } from './brush';
export { CodeIcon } from './code';
export { CompassIcon } from './compass';
export { LoginIcon } from './login';
export { LogoutIcon } from './logout';
export { PaperPlaneIcon } from './paper-plane';
export { PersonIcon } from './person';
export { SearchIcon } from './search';
