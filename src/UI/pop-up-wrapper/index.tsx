import React from 'react';
import styled from 'styled-components';
import popUpBackground from './pop-up-background.svg';
import { Overlay } from '../overlay';
import { ZIndexes } from '../../components/root-component/z-indexes-enum';

const PopUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-image: url(${popUpBackground});
  width: 487px;
  height: 305px;
  z-index: 100;
  padding-top: 76px;
  box-sizing: border-box;
`;

export const PopUpSec: React.FC<IPopUp> = ({ displayFlag, children }) => {
  return (
    <Overlay displayFlag={displayFlag} zIndex={ZIndexes.UI_BUTTON + 1}>
      <PopUpWrapper>{children}</PopUpWrapper>
    </Overlay>
  );
};

interface IPopUp {
  displayFlag: boolean;
}
