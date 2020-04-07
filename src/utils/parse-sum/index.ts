const zerosInOneThousand = 3;

export const parseSum = (sum: string) => {
  let answer = '';
  for (let i = 1; i < sum.length + 1; i += 1) {
    answer += sum[sum.length - i];
    if (i % zerosInOneThousand === 0 && i !== sum.length) {
      answer += '.';
    }
  }
  return answer
    .split('')
    .reverse()
    .join('');
};
