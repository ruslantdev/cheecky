import useStoreProfile from '@stores/storeProfile';

export const useCheckPermission = () => {
  const isAdmin = useStoreProfile((state) => state.profile?.is_admin ?? false);

  return {
    is: {
      admin: isAdmin,
    },
  };
};
