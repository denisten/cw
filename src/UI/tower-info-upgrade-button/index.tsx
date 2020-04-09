import React from 'react';
import styled from 'styled-components';
import { pulseAnimationHOF } from '../../hoc/pulse-anim';
import background from './background.svg';

const UpgradeButton = styled.div<ITowerInfoUpgradeButton>`
  width: 34px;
  height: 34px;
  border-radius: 1px;
  background: url(${background}) no-repeat center;
  display: ${props => (props.canUpgrade ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  animation-name: ${props =>
    props.pulseAnim ? pulseAnimationHOF('159, 169, 176') : 'none'};
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-duration: 0.6s;
  margin-left: 10px;
  cursor: pointer;
`;

export const TowerInfoUpgradeButton: React.FC<ITowerInfoUpgradeButton> = ({
  canUpgrade,
  pulseAnim,
  handleClick,
}) => {
  return (
    <UpgradeButton
      pulseAnim={pulseAnim}
      canUpgrade={canUpgrade}
      onClick={handleClick}
    />
  );
};

interface ITowerInfoUpgradeButton {
  canUpgrade?: boolean;
  pulseAnim?: boolean;
  handleClick?: () => void;
}
