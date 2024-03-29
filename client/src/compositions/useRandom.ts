export const useRandom = () => {
  const randomNumber = (from: number = 1, to: number = 999): number => {
    return Math.floor(Math.random() * to) + from;
  };

  return {
    randomNumber,
  };
};
