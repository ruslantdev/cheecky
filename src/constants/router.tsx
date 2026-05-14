import {createBrowserRouter} from 'react-router-dom';

import {LayoutDefault, HomePage, AboutPage} from './lazyRoutes';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutDefault />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
    ],
  },
]);
