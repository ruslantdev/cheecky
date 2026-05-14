import MaintenanceComponent from '@/components/Maintenance';

export const Maintenance = () => {
  const handleClick = () => {
    console.log('handleClick Maintenance');
  };

  return <MaintenanceComponent onClick={handleClick} />;
};
