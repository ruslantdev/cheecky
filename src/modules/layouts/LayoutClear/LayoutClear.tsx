import {Suspense} from 'react';
import {Outlet} from 'react-router-dom';

const LayoutClear = () => {
  return (
    <Suspense fallback={null}>
      <Outlet />
    </Suspense>
  );
};

export default LayoutClear;
