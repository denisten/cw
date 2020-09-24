import React from 'react';
import styled from 'styled-components';
import lockImg from './lock-img.svg';
import { ReducedMissionWrapperWidth } from '../../missions-view/reduced-mission-row';

const LockedTaskRowWrapper = styled.div<ILockedTaskRow>`
  width: ${props =>
    props.isInTowerInfo
      ? ReducedMissionWrapperWidth.IN_TOWER_INFO
      : ReducedMissionWrapperWidth.NOT_IN_TOWER_INFO}px;
  height: 62px;
  background: linear-gradient(90.56deg, #2f5ccf 0%, #6412cc 99.76%), #ffffff;
  border: 1px solid #ebecef;
  border-radius: 15px;
  box-sizing: border-box;
  padding: 18px 0 19px 22px;
  opacity: 0.3;
  margin-bottom: 16px;
`;

const LockImg = styled.img.attrs({ src: lockImg })``;

export const LockedTaskRow: React.FC<ILockedTaskRow> = ({ isInTowerInfo }) => {
  return (
    <LockedTaskRowWrapper isInTowerInfo={isInTowerInfo}>
      <LockImg />
    </LockedTaskRowWrapper>
  );
};

interface ILockedTaskRow {
  isInTowerInfo: boolean;
}
