import Header from '@modules/Header';
import Sidebar from '@modules/Sidebar';
import type {FC, ReactNode} from 'react';
import useStoreLayoutDefault from '@/stores/storeLayoutDefault';
import css from './LayoutDefault.module.scss';

interface TLayoutDefaultProps {
  children?: ReactNode;
}

const LayoutDefault: FC<TLayoutDefaultProps> = ({children}) => {
  const $layoutDefault = useStoreLayoutDefault();

  return (
    <div className={css.layoutDefault}>
      <Sidebar
        className={css.layoutDefault__sidebar}
        collapsed={$layoutDefault.isSidebarCollapsed}
      />

      <main className={css.layoutDefault__main}>
        <Header className={css.layoutDefault__header} />

        <div className={css.layoutDefault__content}>{children}</div>
      </main>
    </div>
  );
};

export default LayoutDefault;
