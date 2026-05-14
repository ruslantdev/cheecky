export const sleep = async (time = 1000): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

export default sleep;
