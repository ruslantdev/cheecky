import useStoreProfile from '@/stores/storeProfile';
import {FC, useEffect} from 'react';

const Init: FC = () => {
  const {getProfile} = useStoreProfile();

  useEffect(() => {
    (async () => {
      await getProfile();
    })();
  }, []);
};

export default Init;
