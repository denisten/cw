import { maxPercent } from '../../constants';

export const calculateLevelUpPercent = (
  points: number,
  minProgress: number,
  maxProgress: number
) => ((points - minProgress) * maxPercent) / (maxProgress - minProgress);
