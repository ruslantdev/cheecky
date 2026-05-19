import useStoreLayout from '@stores/storeLayout';
import {useLayoutEffect} from 'react';

export function usePageSettings({
  tabTitle,
  title,
}: {
  tabTitle?: string;
  title?: string;
}) {
  const setTabTitle = useStoreLayout((state) => state.setTabTitle);
  const setTitle = useStoreLayout((state) => state.setTitle);

  useLayoutEffect(() => {
    setTabTitle(tabTitle);
    setTitle(title);
  }, [setTabTitle, setTitle, tabTitle, title]);
}
