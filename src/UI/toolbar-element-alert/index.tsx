import React from 'react';
import styled from 'styled-components';
import { MTSSans } from '../../fonts';

export const ToolbarElementAlertCountWrapper = styled.div<IToolbarElementAlert>`
  position: absolute;
  top: -4px;
  right: -4px;
  width: 17.73px;
  height: 17.72px;
  background: #e63535;
  border-radius: 100%;
  color: #fff;
  font-family: ${MTSSans.BOLD};
  font-style: normal;
  font-weight: bold;
  font-size: 9px;
  line-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  :after {
    content: "${props => props.count}";
  }
`;

export const ToolbarElementAlert: React.FC<IToolbarElementAlert> = ({
  count,
}) => {
  return count ? <ToolbarElementAlertCountWrapper count={count} /> : null;
};

interface IToolbarElementAlert {
  count: number;
}
