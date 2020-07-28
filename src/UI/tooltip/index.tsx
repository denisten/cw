import React from 'react';
import styled from 'styled-components';
import helpBg from './help.svg';
import helpHover from './helpHover.svg';
import { ZIndexes } from '../../components/root-component/z-indexes-enum';
import { ActiveTooltip } from '../../components/tower-info/tower-info-indicators';
import * as R from 'ramda';

const Icon = styled.div<{ active: boolean }>`
  width: 12.8px;
  height: 12.8px;
  background: url(${props => (props.active ? helpHover : helpBg)}) no-repeat
    center;
  transition: 0.4s;
  cursor: pointer;
  z-index: ${ZIndexes.TUTORIAL};
  position: relative;

  &:hover {
    background: url(${helpHover}) no-repeat center;
  }
`;

const TooltipWrapper = styled.div`
  padding: 20px;
  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  display: flex;
  width: 275px;
  position: absolute;
`;

const TooltipText = styled.span`
  font-size: 16px;
  line-height: 19px;
  color: #000000;
`;

export const Tooltip: React.FC<ITooltip> = ({
  style,
  text,
  active,
  callBack,
  tooltipId,
}) => {
  const checkActiveTooltip = active === tooltipId;
  const toggleTooltip = R.ifElse(
    () => checkActiveTooltip,
    () => callBack(ActiveTooltip.OFF),
    () => callBack(tooltipId)
  );
  return (
    <Icon active={checkActiveTooltip} onClick={toggleTooltip}>
      {checkActiveTooltip && (
        <TooltipWrapper style={style}>
          <TooltipText>{text}</TooltipText>
        </TooltipWrapper>
      )}
    </Icon>
  );
};

interface ITooltip {
  style?: React.CSSProperties;
  text?: string;
  callBack: React.Dispatch<React.SetStateAction<ActiveTooltip>>;
  tooltipId: ActiveTooltip;
  active: ActiveTooltip;
}
