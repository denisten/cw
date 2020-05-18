import React from 'react';
import styled from 'styled-components';
import moneyImg from './money.svg';
import batteryImg from './battery.svg';
import { StyledSpan } from '../span';
import { MTSSans } from '../../fonts';

const TaskLootWrapper = styled.div`
  display: flex;
  margin-right: 16px;
`;

const EnergyWrapper = styled.div`
  display: flex;
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
};

export const TaskLoot: React.FC<ITaskLoot> = ({ energy, money }) => {
  return (
    <TaskLootWrapper>
      <EnergyWrapper>
        <img src={batteryImg} alt="battery" style={styledConfig.loot} />
        <CountWrapper>{energy}</CountWrapper>
      </EnergyWrapper>
      <EnergyWrapper>
        <img src={moneyImg} alt="money" style={styledConfig.loot} />
        <CountWrapper>{money}</CountWrapper>
      </EnergyWrapper>
    </TaskLootWrapper>
  );
};

interface ITaskLoot {
  energy: number;
  money: number;
}
