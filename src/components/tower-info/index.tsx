import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ExitButton } from '../../UI/exit-button';
import {
  extraTowerInfoModalClosed,
  nextTutorDescriptionStep,
  nextTutorStep,
  showUpgradeIcon,
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
import { Directions } from '../../UI/tutorial-arrow';
import { BuildingsDescriptionService } from '../../buildings/descriptions';
import { CustomButton } from '../../UI/button';
import { ZIndexes } from '../root-component/z-indexes-enum';
import wrapperBackground from './background.svg';
import { RowWrapper } from '../../UI/row-wrapper/index';
import { MoneyWrapper } from '../../UI/money-wrapper';

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

const MAXLEVEL = 100;

export const ModalWindowWrapper = styled.div<ModalWindowProps>`
  position: absolute;
  z-index: ${ZIndexes.MODAL};
  right: 0;
  width: 38%;
  height: 100%;
  background-image: url(${wrapperBackground});
  background-size: cover;
  background-repeat: no-repeat;
  padding: 7% 0 0 3%;
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
  height: 16%;
`;

const HeaderLine = styled.div`
  width: 100%;
  display: flex;
  margin-top: 24px;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  letter-spacing: -0.5px;
  color: #001424;
`;

const MainText = styled.span`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  color: #001424;

  + div {
    margin-top: 4px;
  }
`;

const UpgradeButton = styled.div<{ canUpgrade?: boolean }>`
  width: auto;
  height: 40px;
  padding: 0 20px;
  box-sizing: border-box;
  border-radius: 8px;
  background-color: ${props => (props.canUpgrade ? '#02adc9' : '#e2e5eb')};
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  cursor: ${props => (props.canUpgrade ? 'pointer' : 'default')};
  font-size: 100%;
`;

const HeaderLineElement = styled.div<{ width?: number }>`
  width: ${props => props.width}%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  font-family: SFProDisplay;
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
    height: '4%',
    top: 2,
    left: 92,
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
  enterButton: {
    width: '201px',
    height: '52px',
    content: 'Раскрыть',
    fontSize: '28.5px',
    margin: '30px 0',
  },
  rowWrapper: {
    width: '100%',
    height: '40px',
    justifyContent: 'space-between',
  },
  money: {
    fontSize: '20px',
    margin: '0px 13px 0 0px',
    color: 'black',
    fontWeight: 'bold',
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
  const { title, maxLevel } = localBuildingService.getConfigForTower(
    towerTitle
  );
  const level = useStore(TowersProgressStore)[towerTitle].level;

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
      showUpgradeIcon(towerTitle);
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
          <RowWrapper {...StyleConfig.rowWrapper}>
            <Title>{title}</Title>
            <UpgradeButton
              canUpgrade={
                LocalTowerProgressStore[towerTitle].progress >= MAXLEVEL &&
                level < maxLevel
              }
              onClick={handleClick}
            >
              Улучшить
            </UpgradeButton>
          </RowWrapper>

          <HeaderLine>
            <HeaderLineElement>
              <MainText>Уровень эволюции</MainText>

              <ProgressBar
                progress={LocalTowerProgressStore[towerTitle].progress}
              />
            </HeaderLineElement>

            <HeaderLineElement>
              <MainText>Еженедельный доход</MainText>

              <RowWrapper>
                <MoneyWrapper count={228} {...StyleConfig.money} />
              </RowWrapper>
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
        <CustomButton
          animFlag={tutorialCondition === TutorialConditions.UNLOCK_BUTTON}
          callback={() => {
            nextTutorDescriptionStep();
            addProgressPoints({ points: 33.34, towerTitle: towerTitle });
          }}
          {...StyleConfig.enterButton}
        />
      </ModalWindowContentWrapper>
    </ModalWindowWrapper>
  );
};
