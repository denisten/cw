import React from 'react';
import styled from 'styled-components';
import moneyImg from './money.svg';
import batteryImg from './battery.svg';
import { StyledSpan } from '../span';
import { MTSSans } from '../../fonts';
import { ITaskLocation } from '../../components/tasks/tower-task-row';

enum TaskLootWrapperMarginValues {
  inTowerInfo = 2,
  notInTowerInfo = 16,
}

const TaskLootWrapper = styled.div<ITaskLocation>`
  display: flex;
  margin-right: ${props =>
    props.isInTowerInfo
      ? TaskLootWrapperMarginValues.inTowerInfo
      : TaskLootWrapperMarginValues.notInTowerInfo}px;
`;

const LootWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CountWrapper = styled(StyledSpan)`
  min-width: 39px;
  height: 23px;
  font-family: ${MTSSans.REGULAR};
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: -0.4px;
  color: #202d3d;
  margin-right: 3px;
`;

const styledConfig = {
  loot: {
    marginRight: '6px',
  },
  money: {
    width: '19px',
    height: '17px',
    marginRight: '6px',
  },
};

export const TaskLoot: React.FC<ITaskLoot> = ({
  energy,
  money,
  isInTowerInfo,
}) => {
  return (
    <TaskLootWrapper isInTowerInfo={isInTowerInfo}>
      <LootWrapper>
        <img src={batteryImg} alt="battery" style={styledConfig.loot} />
        <CountWrapper>{energy}</CountWrapper>
      </LootWrapper>
      <LootWrapper>
        <img src={moneyImg} alt="money" style={styledConfig.money} />
        <CountWrapper>{money}</CountWrapper>
      </LootWrapper>
    </TaskLootWrapper>
  );
};

interface ITaskLoot extends ITaskLocation {
  energy: number;
  money: number;
}
