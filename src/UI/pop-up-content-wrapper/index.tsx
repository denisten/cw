import React from 'react';
import styled from 'styled-components';
import popUpBackground from './pop-up-background.svg';
import { Overlay } from '../overlay';
import { ZIndexes } from '../../components/root-component/z-indexes-enum';
import { IPopUpStyles } from '../pop-up';

const defaultWidth = 487,
  defaultHeight = 305,
  defaultPadding = '76px 0 0 0';

const PopUpWrapper = styled.div<IPopUpStyles>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: url(${popUpBackground});
  background-size: cover;
  background-repeat: no-repeat;
  width: ${props => props.width || defaultWidth}px;
  height: ${props => props.height || defaultHeight}px;
  z-index: 100;
  padding: ${props => props.padding || defaultPadding};
  box-sizing: border-box;
`;

export const PopUpContentWrapper: React.FC<IPopUpContentWrapper> = ({
  displayFlag = false,
  children,
  ...style
}) => {
  return (
    <Overlay displayFlag={displayFlag} zIndex={ZIndexes.UI_BUTTON + 1}>
      <PopUpWrapper {...style}>{children}</PopUpWrapper>
    </Overlay>
  );
};

interface IPopUpContentWrapper extends IPopUpStyles {
  displayFlag?: boolean;
}