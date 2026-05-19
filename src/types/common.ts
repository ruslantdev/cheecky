import type {ComponentType} from 'react';

export type TLazyComponent = () => Promise<{default: ComponentType}>;
