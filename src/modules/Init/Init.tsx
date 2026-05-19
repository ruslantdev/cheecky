import {type FC, useEffect} from 'react';
import useStoreProfile from '@/stores/storeProfile';

const Init: FC = () => {
  const {getProfile} = useStoreProfile();

  useEffect(() => {
    (async () => {
      await getProfile();
    })();
  }, [getProfile]);

  return null;
};

export default Init;
