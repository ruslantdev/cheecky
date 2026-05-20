import useStoreScreen from '@stores/storeScreen';
import {type FC, type ReactNode, useEffect} from 'react';

interface TScreenProps {
  children?: ReactNode;
}

export const Screen: FC<TScreenProps> = ({children}) => {
  useEffect(() => {
    const $screen = useStoreScreen.getState();
    $screen.init();

    return () => {
      $screen.cleanup();
    };
  }, []);

  return <>{children}</>;
};
