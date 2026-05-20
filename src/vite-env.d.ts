/// <reference types="vite/client" />

// all *.svg elements are React components by default (vite-plugin-svgr + include: **/*.svg).
// if you need a URL string: import src from './icon.svg?url'
declare module '*.svg' {
  import type * as React from 'react';
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;
  const src: string;
  export default src;
}

declare module '*.svg?react' {
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare module '*.scss' {
  const classes: Record<string, string>;
  export default classes;
}
