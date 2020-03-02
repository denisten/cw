export const checkHaveNotify = (array: Array<string>, el: string): boolean =>
  array.findIndex(elem => elem === el) !== -1;
