import useStoreLayout from '@stores/storeLayout';
import {useLayoutEffect} from 'react';
import {useShallow} from 'zustand/react/shallow';

export function usePageSettings({
  tabTitle,
  title,
  subTitle,
  desc,
}: {
  tabTitle?: string;
  title?: string;
  subTitle?: string;
  desc?: string;
}) {
  const {setTitle, setTabTitle, setSubTitle, setDesc} = useStoreLayout(
    useShallow((state) => ({
      setTitle: state.setTitle,
      setSubTitle: state.setSubTitle,
      setDesc: state.setDesc,
      setTabTitle: state.setTabTitle,
    }))
  );

  useLayoutEffect(() => {
    setTabTitle(tabTitle);
    setTitle(title);
    setSubTitle(subTitle);
    setDesc(desc);
  }, [
    setTabTitle,
    setTitle,
    setSubTitle,
    setDesc,
    tabTitle,
    title,
    subTitle,
    desc,
  ]);
}
