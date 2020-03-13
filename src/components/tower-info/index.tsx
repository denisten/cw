import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ExitButton } from '../../UI/exit-button';
import {
  extraTowerInfoModalClosed,
  showUpgradeIcon,
} from '../../effector/app-condition/events';
import { addProgressPoints } from '../../effector/towers-progress/events';
import { useStore } from 'effector-react';
import {
  AppCondition,
  maxProgressValue,
} from '../../effector/app-condition/store';
import { ProgressBar } from '../../UI/progress-bar';
import { TowerInfoContent } from '../tower-info-content';
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
import headerBackground from './header.svg';
import { RowWrapper } from '../../UI/row-wrapper/index';
import { MoneyWrapper } from '../../UI/money-wrapper';
import { pulseAnimationHOF } from '../../hoc/pulse-anim';
import {
  TutorialConditions,
  TutorialStore,
} from '../../effector/tutorial-store/store';
import {
  nextTutorDescriptionStep,
  nextTutorStep,
} from '../../effector/tutorial-store/events';

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
  width: 484px;
  height: 80%;
  top: 50%;
  transform: translate(0%, -50%);
  /* padding: 7% 0 0 3%; */
  box-sizing: border-box;
  margin-right: ${props =>
    !props.opened ? marginRightValues.CLOSED : marginRightValues.OPENED}%;
  transition-duration: 0.5s;
  transition-property: margin-right;
  display: flex;
  flex-direction: column;

  @media (max-resolution: 0.8dppx) {
    width: 36%;
  }
`;

const ModalWindowContentWrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 40px;
  box-sizing: border-box;

  background-image: url(${wrapperBackground});
  background-size: 100% 100%;
  background-repeat: no-repeat;

  @media (max-resolution: 0.8dppx) {
    padding: 3vh;
  }
`;

const ModalWindowHeader = styled.div`
  width: 100%;
  height: 55px;
  background: url(${headerBackground}) no-repeat center;
  background-size: 100% 100%;
  flex-shrink: 0;
  position: relative;

  @media (max-resolution: 0.8dppx) {
    height: 5vh;
  }
`;
const TowerInfoHeader = styled.div`
  width: 100%;
  margin-bottom: 40px;

  @media (max-resolution: 0.8dppx) {
    margin-bottom: 2vh;
  }
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
  line-height: 1.25;
  letter-spacing: -0.5px;
  color: #001424;
  font-family: 'MTSSansUltraWide', serif;

  @media (max-resolution: 0.8dppx) {
    font-size: 2.5vh;
  }
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

  @media (max-resolution: 0.8dppx) {
    font-size: 1.5vh;
  }
`;

const UpgradeButton = styled.div<{ canUpgrade?: boolean; pulseAnim?: boolean }>`
  width: auto;
  height: 40px;
  padding: 0 20px;
  box-sizing: border-box;
  border-radius: 2px;
  background-color: ${props => (props.canUpgrade ? '#02adc9' : '#e2e5eb')};
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  cursor: ${props => (props.canUpgrade ? 'pointer' : 'default')};
  font-size: 16px;
  pointer-events: ${props => (props.canUpgrade ? 'auto' : 'none')};
  font-family: 'MTSSansBold', 'regular';
  animation-name: ${props =>
    props.pulseAnim ? pulseAnimationHOF('159, 169, 176') : 'none'};
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-duration: 0.6s;

  @media (max-resolution: 0.8dppx) {
    font-size: 1.5vh;
    height: 3vh;
    padding: 0 1.4vh;
  }
`;

const HeaderLineElement = styled.div<{ width?: number }>`
  width: ${props => props.width}%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;

const TowerInfoMenu = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #e2e5eb;
  margin-bottom: 28px;
`;

const TowerInfoMenuElement = styled.div<{ selected: boolean }>`
  height: 100%;
  text-align: center;
  cursor: pointer;
  z-index: 2;
  margin-right: 10%;
  color: #${props => (props.selected ? '001424' : '6e7782')};
  font-size: 20px;
  font-weight: ${props => (props.selected ? '500' : 'normal')};
  font-family: 'MTSSansRegular';
  :after {
    content: '';
    display: block;
    margin-top: 8px;
    border-bottom: 3px solid #${props => (props.selected ? '08b0cc' : 'none')};
  }

  @media (max-resolution: 0.8dppx) {
    font-size: 1.5vh;
  }
`;

const StyleConfig = {
  exitButton: {
    height: '50%',
    top: 25,
    left: 90,
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
    width: '122px',
    height: '40px',
    content: 'Что дальше?',
    fontSize: '16px',
    margin: '30px 0',
    color: '#02adc9',
    position: 'absolute',
    bottom: 12,
  },
  rowWrapper: {
    width: '100%',
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
    } = useStore(AppCondition),
    LocalTowerProgressStore = useStore(TowersProgressStore);
  const { tutorialCondition, tutorialTextId } = useStore(TutorialStore);
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
  const [allTowerText, setAllTowerText] = useState('');
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
      extraTowerInfoModalClosed();
    }
  };

  const nextTowerTutorialStep = () => {
    if (selectedMenu !== TowerInfoContentValues.DESCRIPTION && !allTowerText) {
      // * если в режиме туториала мы не в описании а на чате например
      setSelectMenu(TowerInfoContentValues.DESCRIPTION);
      setAllTowerText(
        localDescriptionService.getAllDescriptionForCurrentTower()
      ); // get all text
    } else if (
      // * если мы в описании но текст весь не раскрыт, раскрываем
      selectedMenu === TowerInfoContentValues.DESCRIPTION &&
      !allTowerText
    ) {
      setAllTowerText(
        localDescriptionService.getAllDescriptionForCurrentTower()
      ); // get all text
    } else if (
      selectedMenu === TowerInfoContentValues.DESCRIPTION &&
      allTowerText !== ''
    ) {
      // * если открыт весь текст и нажали на далее => идём в чат и так далее
      setSelectMenu(TowerInfoContentValues.CHAT);
    } else if (
      selectedMenu === TowerInfoContentValues.CHAT &&
      allTowerText !== ''
    ) {
      setSelectMenu(TowerInfoContentValues.TASK);
    }
  };
  return (
    <ModalWindowWrapper opened={opened}>
      <ModalWindowHeader>
        <ExitButton
          {...StyleConfig.exitButton}
          callBack={() => extraTowerInfoModalClosed()}
        />
      </ModalWindowHeader>
      <ModalWindowContentWrapper>
        <TowerInfoHeader>
          <RowWrapper {...StyleConfig.rowWrapper}>
            <Title>{title}</Title>
            <UpgradeButton
              canUpgrade={
                LocalTowerProgressStore[towerTitle].progress >= MAXLEVEL &&
                level < maxLevel
              }
              onClick={handleClick}
              pulseAnim={
                tutorialCondition ===
                TutorialConditions.UPGRADE_BUTTON_TOWER_INFO
              }
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

        <TowerInfoContent
          selectedMenu={selectedMenu}
          text={!allTowerText ? descriptionText : allTowerText}
        />

        {!tutorialCondition ||
        tutorialCondition === TutorialConditions.NEXT_BUTTON_TOWER_INFO ? (
          <CustomButton
            animFlag={
              tutorialCondition === TutorialConditions.NEXT_BUTTON_TOWER_INFO
            }
            callback={() => {
              nextTutorDescriptionStep();
              addProgressPoints({ points: 33.34, towerTitle: towerTitle });
              nextTowerTutorialStep();
            }}
            {...StyleConfig.enterButton}
          />
        ) : null}
      </ModalWindowContentWrapper>
    </ModalWindowWrapper>
  );
};
