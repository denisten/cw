const randomRangeID = 1000;

export const generateUniqueID = () => {
  return Math.floor(Math.random() * Math.floor(randomRangeID));
};
