import React, { useState } from 'react';
import styled from 'styled-components';
import { ExitButton } from '../../UI/exit-button';
import { extraTowerInfoModalClosed } from '../../effector/app-condition/events';
import { addProgressPoints } from '../../effector/towers-progress/events';
import { useStore } from 'effector-react';
import { AppCondition } from '../../effector/app-condition/store';
import { ProgressBar } from '../../UI/progress-bar';

export type ModalWindowProps = {
  opened?: boolean;
};

type TowerInfoMenuElement = {
  selected: boolean;
};

enum marginRightValues {
  OPENED = 0,
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  CLOSED = -100,
}

export const ModalWindowWrapper = styled.div<ModalWindowProps>`
  position: absolute;
  z-index: 1;
  right: 0;
  width: 50%;
  height: 100%;
  background-color: white;
  padding-left: 7.5%;
  padding-top: 8.5%;
  box-sizing: border-box;
  margin-right: ${props =>
    !props.opened ? marginRightValues.CLOSED : marginRightValues.OPENED}%;
  transition-duration: 0.5s;
  transition-property: margin-right;
  font-size: 1.2em;
`;

const ModalWindowContentWrapper = styled.div`
  height: 100%;
  width: 80%;
  border: 1px solid sienna;
`;
const TowerInfoHeader = styled.div`
  width: 100%;
  height: 20%;
  border: 1px solid red;
  //margin: 9% 0 0 4%;
  box-sizing: border-box;
  font-size: 80%;
`;

const HeaderLine = styled.div`
  width: 100%;
  height: 40%;
  border: 1px solid green;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: normal;
  color: #000000;
  margin-bottom: 3.3%;
`;

const UpgradeButton = styled.div`
  width: 130px;
  height: 40px;
  border-radius: 8px;
  background-color: #5ee220;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  cursor: pointer;
`;

const HeaderLineElement = styled.div`
  width: 33%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  margin: 0 5%;
`;

const TowerInfoMenu = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const TowerInfoMenuElement = styled.div<TowerInfoMenuElement>`
  height: 100%;
  text-align: center;
  cursor: pointer;
  border-bottom: ${props => (props.selected ? '3px solid #ff2d2d' : 'none')};
  z-index: 2;
  margin-right: 10%;
`;

const Divider = styled.div`
  width: 100%;
  height: 3px;
  background-color: #e8e8e8;
  position: relative;
  top: -0.4%;
`;

const StyleConfig = {
  exitButton: {
    height: '3%',
    top: 1,
    left: 1,
    hoverFlag: true,
  },
};

export const TowerInfo: React.FC<ModalWindowProps> = ({ opened }) => {
  const {
    focusOn: { towerTitle },
  } = useStore(AppCondition);

  const handleClick = () => {
    if (towerTitle) {
      addProgressPoints({ points: 100, towerTitle });
    }
  };

  const [selectMenu, setSelectMenu] = useState([true, false, false]);

  return (
    <ModalWindowWrapper opened={opened}>
      <ModalWindowContentWrapper>
        <ExitButton
          {...StyleConfig.exitButton}
          callBack={() => extraTowerInfoModalClosed()}
        />

        <TowerInfoHeader>
          <Title>МТС Библиотека</Title>
          <HeaderLine>
            <HeaderLineElement>
              Уровень эволюции
              <ProgressBar />
            </HeaderLineElement>

            <HeaderLineElement>
              <span>Еженедельный доход</span>
              <span>300∆</span>
            </HeaderLineElement>
            <HeaderLineElement>
              <UpgradeButton onClick={handleClick}>Улучшить</UpgradeButton>
            </HeaderLineElement>
          </HeaderLine>
        </TowerInfoHeader>
        <TowerInfoMenu>
          <TowerInfoMenuElement
            selected={selectMenu[0]}
            onClick={() => setSelectMenu([true, false, false])}
          >
            Описание
          </TowerInfoMenuElement>
          <TowerInfoMenuElement
            selected={selectMenu[1]}
            onClick={() => setSelectMenu([false, true, false])}
          >
            Чат
          </TowerInfoMenuElement>
          <TowerInfoMenuElement
            selected={selectMenu[2]}
            onClick={() => setSelectMenu([false, false, true])}
          >
            Задания
          </TowerInfoMenuElement>
        </TowerInfoMenu>
        <Divider />
      </ModalWindowContentWrapper>
    </ModalWindowWrapper>
  );
};
