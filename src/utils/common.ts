export const sleep = async (time = 1000): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

export const stringToNumber = (data?: string) => {
  return Number(data) || 0;
};

export default sleep;
