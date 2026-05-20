import useStoreLayout from '@stores/storeLayout';
import {useLayoutEffect} from 'react';
import {useShallow} from 'zustand/react/shallow';

export function usePageSettings({
  tabTitle,
  title,
}: {
  tabTitle?: string;
  title?: string;
}) {
  const {setTitle, setTabTitle} = useStoreLayout(
    useShallow((state) => ({
      setTitle: state.setTitle,
      setTabTitle: state.setTabTitle,
    }))
  );

  useLayoutEffect(() => {
    setTabTitle(tabTitle);
    setTitle(title);
  }, [setTabTitle, setTitle, tabTitle, title]);
}
