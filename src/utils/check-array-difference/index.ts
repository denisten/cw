export const checkArrayDifference = (
  arrayOne: number[],
  arrayTwo: number[]
) => {
  return (
    arrayOne
      .filter(i => !arrayTwo.includes(i))
      .concat(arrayTwo.filter(i => !arrayOne.includes(i))).length !== 0
  );
};
