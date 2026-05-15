export const envStringToBoolean = (data?: string) => {
  const a = String(data).toLowerCase().trim();

  return !(
    a === 'null' ||
    a === 'undefined' ||
    a === 'false' ||
    a === '0' ||
    a === 'no' ||
    a === 'off' ||
    a === '' ||
    a === 'disabled' ||
    a === 'disable'
  );
};
