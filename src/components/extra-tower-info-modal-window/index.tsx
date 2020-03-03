import React from 'react';
import styled from 'styled-components';
import { ExitButton } from '../../UI/exit-button';
import { extraTowerInfoModalClosed } from '../../effector/app-condition/events';
import { addProgressPoints } from '../../effector/towers-progress/events';
import { useStore } from 'effector-react';
import { AppCondition } from '../../effector/app-condition/store';
import { ZIndexes } from '../root-component/z-indexes-enum';

export type ModalWindowProps = {
  opened?: boolean;
};

enum marginRightValues {
  OPENED = 0,
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  CLOSED = -100,
}

export const ModalWindowWrapper = styled.div<ModalWindowProps>`
  position: absolute;
  z-index: ${ZIndexes.MODAL};
  right: 0;
  width: 35%;
  height: 100%;
  background-color: green;
  margin-right: ${props =>
    !props.opened ? marginRightValues.CLOSED : marginRightValues.OPENED}%;
  transition-duration: 0.5s;
  transition-property: margin-right;
`;

const StyleConfig = {
  exitButton: {
    height: '3%',
    top: 1,
    left: 1,
    hoverFlag: true,
  },
  upgradeButton: {
    height: '50px',
    width: '100px',
    position: 'absolute',
    top: 5,
    right: 20,
  } as React.CSSProperties,
};

export const ModalWindow: React.FC<ModalWindowProps> = ({ opened }) => {
  const {
    focusOn: { towerTitle },
  } = useStore(AppCondition);

  const handleClick = () => {
    if (towerTitle) {
      addProgressPoints({ points: 100, towerTitle });
    }
  };
  return (
    <ModalWindowWrapper opened={opened}>
      <ExitButton
        {...StyleConfig.exitButton}
        callBack={() => extraTowerInfoModalClosed()}
      />
      <button style={{ ...StyleConfig.upgradeButton }} onClick={handleClick}>
        UPGRADE
      </button>
      hello
    </ModalWindowWrapper>
  );
};
