import type {FC, ReactNode} from 'react';

interface TLayoutClearProps {
  children?: ReactNode;
}

const LayoutClear: FC<TLayoutClearProps> = ({children}) => {
  return <div>{children}</div>;
};

export default LayoutClear;
