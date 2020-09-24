import React from 'react';
import styled from 'styled-components';
import moneyImg from './money.svg';
import energyImg from './energy.svg';
import { StyledSpan } from '../span';
import { MTSSans } from '../../fonts';
import { ITaskLocation } from '../../components/tasks-view/tower-task-row';
import energyWhiteImg from './energy-white.svg';

enum TaskLootWrapperMarginValues {
  inTowerInfo = 10,
  notInTowerInfo = 16,
}

const Energy = styled.img.attrs({ src: energyImg })`
  margin-right: 6px;
`;
const EnergyWhite = styled(Energy).attrs({ src: energyWhiteImg })``;

const Money = styled.img.attrs({ src: moneyImg })`
  width: 24px;
  height: 24px;
  margin-right: 7px;
`;

const TaskLootWrapper = styled.div<ITaskLocation>`
  display: flex;
  margin-right: ${props =>
    props.isInTowerInfo
      ? TaskLootWrapperMarginValues.inTowerInfo
      : TaskLootWrapperMarginValues.notInTowerInfo}px;
`;

const LootWrapper = styled.div<ILootWrapper>`
  display: ${props => (props.content ? 'flex' : 'none')};
  align-items: center;
`;

const CountWrapper = styled(StyledSpan)<ICountWrapper>`
  min-width: 30px;
  height: 23px;
  font-family: ${MTSSans.REGULAR};
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: -0.4px;
  color: ${props => props.color};
  margin-right: 3px;
`;

export enum TaskLootLetterColors {
  WHITE = '#fff',
  DEFAULT = '#040324',
}

export const TaskLoot: React.FC<ITaskLoot> = ({
  energy,
  money,
  isInTowerInfo,
  color = TaskLootLetterColors.DEFAULT,
}) => {
  const useWhiteEnergyImg = color === TaskLootLetterColors.WHITE;
  return (
    <TaskLootWrapper isInTowerInfo={isInTowerInfo}>
      <LootWrapper content={energy}>
        {useWhiteEnergyImg ? <EnergyWhite /> : <Energy />}
        <CountWrapper color={color}>{energy}</CountWrapper>
      </LootWrapper>
      <LootWrapper content={money}>
        <Money />
        <CountWrapper color={color}>{money}</CountWrapper>
      </LootWrapper>
    </TaskLootWrapper>
  );
};

interface ITaskLoot extends ITaskLocation {
  energy: number;
  money: number;
  color?: TaskLootLetterColors;
}

interface ILootWrapper {
  content: number;
}

interface ICountWrapper {
  color: TaskLootLetterColors;
}
