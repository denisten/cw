import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ExitButton } from '../../UI/exit-button';
import {
  extraTowerInfoModalClosed,
  nextTutorDescriptionStep,
  nextTutorStep,
} from '../../effector/app-condition/events';
import { addProgressPoints } from '../../effector/towers-progress/events';
import { useStore } from 'effector-react';
import {
  AppCondition,
  maxProgressValue,
  TutorialConditions,
} from '../../effector/app-condition/store';
import { ProgressBar } from '../../UI/progress-bar';
import { TowerInfoContent } from '../tower-info-content';
import shape from './shape.png';
import {
  TowersProgressStore,
  TowersTypes,
} from '../../effector/towers-progress/store';
import { BuildingsService } from '../../buildings/config';
import { Directions, TutorialArrow } from '../../UI/tutorial-arrow';
import { BuildingsDescriptionService } from '../../buildings/descriptions';

export type ModalWindowProps = {
  opened?: boolean;
};

enum marginRightValues {
  OPENED = 0,
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  CLOSED = -100,
}

export enum TowerInfoContentValues {
  TASK = 'task',
  CHAT = 'chat',
  DESCRIPTION = 'description',
}

export const ModalWindowWrapper = styled.div<ModalWindowProps>`
  position: absolute;
  z-index: 1;
  right: 0;
  width: 50%;
  height: 100%;
  background-color: white;
  padding: 5.5% 0 0 4.5%;
  box-sizing: border-box;
  margin-right: ${props =>
    !props.opened ? marginRightValues.CLOSED : marginRightValues.OPENED}%;
  transition-duration: 0.5s;
  transition-property: margin-right;
`;

const ModalWindowContentWrapper = styled.div`
  height: 100%;
  width: 80%;
`;
const TowerInfoHeader = styled.div`
  width: 100%;
  height: 20%;
`;

const HeaderLine = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
`;

const Title = styled.div`
  font-size: 2em;
  font-weight: 900;
  line-height: 1;
  color: #000000;
  margin-bottom: 3.3%;
`;

const UpgradeButton = styled.div`
  width: 100%;
  height: 62%;
  border-radius: 8px;
  background-color: #5ee220;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  cursor: pointer;
  font-size: 100%;
`;

const HeaderLineElement = styled.div<{ width: number }>`
  width: ${props => props.width}%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding: 0 3%;
  font-size: 85%;
  font-family: SFProDisplay;
  font-weight: 600;
  line-height: 1.5;
  color: #000000;
`;

const TowerInfoMenu = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const TowerInfoMenuElement = styled.div<{ selected: boolean }>`
  height: 100%;
  text-align: center;
  cursor: pointer;
  z-index: 2;
  margin-right: 10%;
  color: #${props => (props.selected ? '000000' : '999999')};
  :after {
    content: '';
    display: block;
    margin-top: 2%;
    border-bottom: 3px solid #${props => (props.selected ? 'ff2d2d' : 'e8e8e8')};
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 3px;
  background-color: #e8e8e8;
  position: relative;
  top: -0.3%;
  margin: 0 0 3.5% 0;
`;

const StyleConfig = {
  exitButton: {
    height: '3%',
    top: 1,
    left: 1,
    hoverFlag: true,
  },
  tutorialArrow: {
    direction: Directions.TOP,
    range: 2,
    top: 48,
    left: 40,
  },
  descriptionButton: {
    position: 'absolute',
    top: '46%',
    left: '39.7%',
  },
};

export const TowerInfo: React.FC<ModalWindowProps> = ({ opened }) => {
  const {
      focusOn: { towerTitle: notVerifiedTowerTitle },
      tutorialTextId,
      tutorialCondition,
    } = useStore(AppCondition),
    LocalTowerProgressStore = useStore(TowersProgressStore);
  const towerTitle: TowersTypes =
    notVerifiedTowerTitle || TowersTypes.MAIN_TOWER;
  const localBuildingService = new BuildingsService(),
    localDescriptionService = new BuildingsDescriptionService();
  const descriptionText = localDescriptionService.getDescriptionForCurrentTower(
    towerTitle,
    tutorialTextId
  );
  const { title } = localBuildingService.getConfigForTower(towerTitle);
  const [selectedMenu, setSelectMenu] = useState(
    TowerInfoContentValues.DESCRIPTION
  );

  useEffect(() => {
    if (
      LocalTowerProgressStore[towerTitle].progress >= maxProgressValue &&
      tutorialCondition
    ) {
      nextTutorStep();
    }
  }, [LocalTowerProgressStore[towerTitle].progress]);

  const handleClick = () => {
    if (towerTitle) {
      addProgressPoints({ points: 20, towerTitle });
    }
  };

  return (
    <ModalWindowWrapper opened={opened}>
      <ModalWindowContentWrapper>
        <ExitButton
          {...StyleConfig.exitButton}
          callBack={() => extraTowerInfoModalClosed()}
        />
        <TowerInfoHeader>
          <Title>{title}</Title>
          <HeaderLine>
            <HeaderLineElement width={36}>
              Уровень эволюции
              <ProgressBar
                progress={LocalTowerProgressStore[towerTitle].progress}
              />
            </HeaderLineElement>

            <HeaderLineElement width={36}>
              <span>Еженедельный доход</span>
              <span>
                300
                <img src={shape} alt="money" />
              </span>
            </HeaderLineElement>
            <HeaderLineElement width={28}>
              <UpgradeButton onClick={handleClick}>Улучшить</UpgradeButton>
            </HeaderLineElement>
          </HeaderLine>
        </TowerInfoHeader>
        <TowerInfoMenu>
          <TowerInfoMenuElement
            selected={selectedMenu === TowerInfoContentValues.DESCRIPTION}
            onClick={() => setSelectMenu(TowerInfoContentValues.DESCRIPTION)}
          >
            Описание
          </TowerInfoMenuElement>
          <TowerInfoMenuElement
            selected={selectedMenu === TowerInfoContentValues.CHAT}
            onClick={() => setSelectMenu(TowerInfoContentValues.CHAT)}
          >
            Чат
          </TowerInfoMenuElement>
          <TowerInfoMenuElement
            selected={selectedMenu === TowerInfoContentValues.TASK}
            onClick={() => setSelectMenu(TowerInfoContentValues.TASK)}
          >
            Задания
          </TowerInfoMenuElement>
        </TowerInfoMenu>
        <Divider />
        <TowerInfoContent selectedMenu={selectedMenu} text={descriptionText} />
        <button
          onClick={() => {
            nextTutorDescriptionStep();
            addProgressPoints({ points: 35, towerTitle: towerTitle });
          }}
          {...StyleConfig.descriptionButton}
        >
          Раскрыть
        </button>
        {tutorialCondition === TutorialConditions.UNLOCK_BUTTON ? (
          <TutorialArrow {...StyleConfig.tutorialArrow} />
        ) : (
          ''
        )}
      </ModalWindowContentWrapper>
    </ModalWindowWrapper>
  );
};
