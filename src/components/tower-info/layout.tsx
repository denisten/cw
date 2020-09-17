import React from 'react';
import { TowerInfoHeader } from './tower-info-header';
import { TowerInfoTitle } from './tower-info-title';
import { TowerInfoIndicators } from './tower-info-indicators';
import { TowerInfoMenu } from './tower-info-menu';
import { TowerInfoContent } from './tower-info-content';
import { Button, ButtonClassNames } from '../../UI/button';
import { COMMON_TRANSITION, ITabSwitchers } from './index';
import styled from 'styled-components';
import { ZIndexes } from '../root-component/z-indexes-enum';
import background from './background.svg';
import { TutorialConditions } from '../../effector/tutorial-store/store';
import { IFactors, TowersTypes } from '../../effector/towers-progress/store';
import { TowerInfoContentValues } from '../../effector/app-condition/store';

type ModalWindowProps = {
  opened?: boolean;
};

enum marginRightValues {
  OPENED = 0,
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  CLOSED = -100,
}
export const TowerInfoWrapper = styled.div<ModalWindowProps>`
  position: absolute;
  z-index: ${ZIndexes.MODAL};
  right: -3px;
  width: 36%;
  height: 100%;
  top: 0;
  box-sizing: border-box;
  margin-right: ${props =>
    !props.opened ? marginRightValues.CLOSED : marginRightValues.OPENED}%;
  transition-duration: ${COMMON_TRANSITION}s;
  transition-property: margin-right;
  display: flex;
  flex-direction: column;
  background: url(${background}) no-repeat center;
  background-size: 100% 100%;
  @media screen and (max-width: 1440px) {
    width: 547px;
  }

  @media screen and (max-width: 1280px) {
    height: 100%;
    top: 0;
  }
`;

const ModalWindowContentWrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 0 32px 110px 40px;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const TowerInfoHeader1 = styled.div<{ sizeContent: boolean }>`
  width: 100%;
  margin-bottom: ${props => (props.sizeContent ? '24px' : '21px')};
  flex-shrink: 0;
  transition: ${COMMON_TRANSITION}s;
`;

const StyleConfig = {
  enterButton: {
    width: 160,
    height: 40,
    content: 'Что дальше?',
    style: {
      position: 'absolute',
      bottom: '66px',
      left: '32px',
    } as React.CSSProperties,
  },
  unblockButton: {
    width: 234,
    height: 50,
    content: 'Разблокировать',
    style: {
      position: 'absolute',
      bottom: '140px',
      left: '140px',
    } as React.CSSProperties,
  },
};

export const TowerInfoLayout: React.FC<ITowerInfoLayout> = props => {
  return (
    <TowerInfoWrapper
      opened={props.isExtraTowerInfoModalOpen}
      ref={props.towerInfoRef}
    >
      <TowerInfoHeader tutorialCondition={props.tutorialCondition} />
      <ModalWindowContentWrapper>
        <TowerInfoHeader1 sizeContent={props.towerInfoDisplayFlag}>
          <TowerInfoTitle
            tutorialCondition={props.tutorialCondition}
            towerTitle={props.towerTitle}
            factors={props.factors}
            subscriptionText={props.subscriptionText}
          />
          <TowerInfoIndicators
            points={props.points}
            maxProgressValue={props.maxProgressValue}
            level={props.level}
            towerTitle={props.towerTitle}
            progress={props.levelUpPercentage}
            income={props.income}
            hideTowerInfo={props.towerInfoDisplayFlag}
            tutorialCondition={props.tutorialCondition}
          />
        </TowerInfoHeader1>
        <TowerInfoMenu
          isChatEnded={props.ended}
          refsCollection={props.refsCollection}
          selectTowerInfoContent={props.selectTowerInfoContent}
          towerTitle={props.towerTitle}
        />

        <TowerInfoContent
          switchers={props.switchers}
          selectedMenu={props.selectTowerInfoContent}
          productDescription={props.productDescription}
          towerTitle={props.towerTitle}
          hideDescription={props.hideDescription}
        />

        {props.showButton && (
          <Button
            pulseAnimFlag={props.showButton}
            className={ButtonClassNames.OUTLINE_NORMAL}
            callback={props.nextTowerTutorialStep}
            {...StyleConfig.enterButton}
          />
        )}
        {props.showUnblockButton && (
          <Button
            pulseAnimFlag={props.showUnblockButton}
            className={ButtonClassNames.NORMAL}
            callback={props.nextTowerTutorialStep}
            {...StyleConfig.unblockButton}
          />
        )}
      </ModalWindowContentWrapper>
    </TowerInfoWrapper>
  );
};

interface ITowerInfoLayout {
  isExtraTowerInfoModalOpen: boolean;
  towerInfoRef: React.RefObject<HTMLDivElement>;
  tutorialCondition: TutorialConditions;
  towerInfoDisplayFlag: boolean; //hideTowerInfo
  towerTitle: TowersTypes;
  factors: IFactors | undefined;
  subscriptionText: string;
  points: number;
  maxProgressValue: number | null;
  level: number;
  income: number;
  progress: number;
  levelUpPercentage: number;
  ended: boolean;
  refsCollection: React.RefObject<HTMLDivElement>[];
  selectTowerInfoContent: TowerInfoContentValues;
  productDescription: {
    description: string;
    title: string;
  };
  hideDescription: boolean;
  showButton: boolean;
  nextTowerTutorialStep: () => void;
  showUnblockButton: boolean;
  switchers: ITabSwitchers;
}
