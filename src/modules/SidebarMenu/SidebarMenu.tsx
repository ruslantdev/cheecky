import Menu from '@components/Menu';
import type {TMenuItem} from '@components/MenuItem/MenuItem';
import ROUTES from '@constants/route';
import {ReactComponent as IconDashboard} from '@icons/dashboard.svg';
import {ReactComponent as IconRuble} from '@icons/ruble.svg';
import {useCallback, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {useLocation} from 'react-router';

export const SidebarMenu = () => {
  const {pathname} = useLocation();
  const {t} = useTranslation();

  const markActiveRoute = useCallback(
    (items: TMenuItem[], currentPath: string): TMenuItem[] => {
      return items.map((item) => ({
        ...item,
        isActive: item.path === currentPath,
      }));
    },
    []
  );

  const menuItems = useMemo(() => {
    return [
      {
        title: t('Dashboard'),
        path: ROUTES.home.path,
        icon: IconDashboard,
      },
      {
        title: t('Subscriptions'),
        path: ROUTES.subscriptions.path,
        // icon: IconRuble,
      },
      {
        title: t('Shops'),
        path: '/shops',
        icon: IconRuble,
      },
    ];
  }, [t]);

  const formattedMenuItems = useMemo(() => {
    return markActiveRoute(menuItems, pathname);
  }, [menuItems, pathname, markActiveRoute]);

  return <Menu items={formattedMenuItems} />;
};
