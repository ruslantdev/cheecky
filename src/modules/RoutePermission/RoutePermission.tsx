import {getRoutePathByName} from '@constants/route';
import {useCheckPermission} from '@hooks/useCheckPermission';
import {type ReactNode, useEffect, useMemo} from 'react';
import {type RouteHandle, useMatches, useNavigate} from 'react-router-dom';
import type {TPage} from '@/types';

type RoutePermissionProps = {
  children: ReactNode;
};

const RoutePermission = ({children}: RoutePermissionProps) => {
  const matches = useMatches();
  const navigate = useNavigate();
  const {is} = useCheckPermission();

  const handle = matches[matches.length - 1]?.handle as RouteHandle | undefined;

  const needsAdmin = handle?.isAdmin === true;

  const allowRender = useMemo(() => {
    if (!needsAdmin) {
      return true;
    }

    return is.admin;
  }, [needsAdmin, is.admin]);

  useEffect(() => {
    if (allowRender || !needsAdmin) {
      return;
    }

    const redirectTarget: TPage = handle?.redirect?.name ?? 'home';

    if (handle?.name === redirectTarget) {
      return;
    }

    navigate(getRoutePathByName(redirectTarget), {replace: true});
  }, [allowRender, needsAdmin, handle?.name, handle?.redirect, navigate]);

  if (!allowRender) {
    return null;
  }

  return children;
};

export default RoutePermission;
