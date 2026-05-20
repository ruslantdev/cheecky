import Button from '@components/Button';
import {ReactComponent as IconSidebarClose} from '@icons/sidebar-close.svg';
import {ReactComponent as IconSidebarOpen} from '@icons/sidebar-open.svg';
import useStoreLayoutDefault from '@/stores/storeLayoutDefault';
import css from './SidebarToggler.module.scss';

export const SidebarToggler = () => {
  const isOpen = useStoreLayoutDefault((state) => state.isOpen);
  const toggle = useStoreLayoutDefault((state) => state.toggle);

  return (
    <Button
      className={css.sidebarToggler}
      onClick={toggle}
      preIcon={isOpen ? IconSidebarClose : IconSidebarOpen}
      aria-expanded={isOpen}
    />
  );
};
