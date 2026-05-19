import {LAYOUT_TYPE} from '@constants/layout';
import ROUTES, {getRoutePathByName} from '@constants/route';
import Layout from '@modules/Layout';
import RoutePermission from '@modules/RoutePermission';
import {ObjectEntries} from '@utils/object';
import {
  createBrowserRouter,
  type RouteObject,
  redirect,
} from 'react-router-dom';

export const generateRoutes = (): RouteObject[] => {
  const data: RouteObject[] = [];

  ObjectEntries(ROUTES).forEach(([name, props]) => {
    const {
      path,
      component,
      layout,
      redirect: routeRedirect,
      isAdmin,
    } = props || {};

    const handle = {
      layout: layout || LAYOUT_TYPE.default,
      name,
      isAdmin,
      redirect: routeRedirect,
    };

    if (routeRedirect) {
      data.push({
        id: String(name),
        path: path === '/' ? undefined : path,
        index: path === '/',
        loader: () => redirect(getRoutePathByName(routeRedirect.name)),
        handle,
      });

      return;
    }

    data.push({
      id: String(name),
      path: path === '/' ? undefined : path,
      index: path === '/',
      lazy: () =>
        component().then((module) => ({
          Component: module.default,
        })),
      handle,
    });
  });

  return data;
};

export const router = createBrowserRouter([
  {
    element: (
      <RoutePermission>
        <Layout />
      </RoutePermission>
    ),
    children: generateRoutes(),
  },
]);

export default router;
