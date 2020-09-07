import { TowerInfoUpgradeButton } from '../../../UI/tower-info-upgrade-button';
import { TutorialConditions } from '../../../effector/tutorial-store/store';
import { RowWrapper } from '../../../UI/row-wrapper';
import React from 'react';
import styled from 'styled-components';
import { MTSSans } from '../../../fonts';
import { COMMON_TRANSITION, MAX_POINTS } from '../index';
import { BuildingsService } from '../../../buildings/config';
import { showUpgradeIcon } from '../../../effector/app-condition/events';
import { towerUpdateHandler } from '../../../utils/tower-update-handler';
import { useStore } from 'effector-react';
import {
  TowerLevel,
  TowersProgressStore,
  TowersTypes,
  IFactors,
} from '../../../effector/towers-progress/store';
import arrow from './arrow.svg';
import arrowHover from './arrow-hover.svg';
import { upgradeTowerAndShowAnimation } from '../../../utils/upgrade-tower-and-show-animation';
import { windowOpen } from '../../../utils/window-open';
import { TowerInfoModalStore } from '../../../effector/tower-info-modal-store/store';
import subsDone from './subsDone.svg';
import * as R from 'ramda';
import { reactGAEvent } from '../../../utils/ga-event';
import { transliterate } from '../../../utils/transliterate';

const Arrow = styled.div`
  width: 35px;
  height: 35px;
  margin-left: 12px;
  background-image: url(${arrow});
`;

const Title = styled.div<ITitle>`
  font-size: ${props => (props.sizeContent ? '29px' : '32px')};
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.25;
  letter-spacing: -0.5px;
  color: #001424;
  font-family: ${MTSSans.ULTRA_WIDE};
  transition: ${COMMON_TRANSITION}s;
  user-select: none;
  display: flex;
  align-items: center;
  :hover {
    color: #04b5d2;
    cursor: pointer;
  }

  &:hover ${Arrow} {
    background-image: url(${arrowHover});
  }
`;

const AddedSubscription = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 28px;
  color: #6e7782;

  img {
    height: 14px;
    width: 14px;
    margin-right: 6px;
  }
`;

const styledConfig = {
  width: '100%',
  alignItems: 'center',
};

const canUpgrade = (points: number, maxLevel: TowerLevel, level: TowerLevel) =>
  points >= MAX_POINTS && level < maxLevel;

const pulseAnim = (tutorialCondition: TutorialConditions) =>
  tutorialCondition === TutorialConditions.UPGRADE_BUTTON_TOWER_INFO;

const SubscriptionElem: React.FC<ISubscriptionElem> = ({
  subscriptionText,
}) => (
  <AddedSubscription>
    <img src={subsDone} alt="done" />
    {subscriptionText}
  </AddedSubscription>
);

export const TowerInfoTitle: React.FC<ITowerInfoTitle> = ({
  tutorialCondition,
  towerTitle,
  factors,
  subscriptionText,
}) => {
  const { hideTowerInfo } = useStore(TowerInfoModalStore);
  const {
    points,
    level: { level },
  } = useStore(TowersProgressStore)[towerTitle];
  const { title, maxLevel, link } = BuildingsService.getConfigForTower(
    towerTitle
  );
  const haveSubscription =
    (subscriptionText && factors?.hasCurrentUsage?.value) || false;

  const handleClick = async () => {
    if (towerTitle) {
      showUpgradeIcon(towerTitle);
      await towerUpdateHandler(tutorialCondition, towerTitle);
    }
  };

  const subscription = R.ifElse(
    () => haveSubscription,
    () => <SubscriptionElem subscriptionText={subscriptionText} />,
    () => null
  )('');

  const handleTitleClick = () => {
    reactGAEvent({
      eventLabel: 'zagolovok',
      eventCategory: 'zdanie',
      eventContent: transliterate(title),
    });
    link && windowOpen(link);
  };
  return (
    <>
      <RowWrapper {...styledConfig}>
        <Title sizeContent={hideTowerInfo} onClick={handleTitleClick}>
          {title}
          <Arrow />
        </Title>
        <TowerInfoUpgradeButton
          handleClick={handleClick}
          pulseAnim={pulseAnim(tutorialCondition)}
          canUpgrade={canUpgrade(points, maxLevel, level)}
          hide={hideTowerInfo}
        />
        <TowerInfoUpgradeButton
          handleClick={() => upgradeTowerAndShowAnimation(towerTitle)}
          canUpgrade={level < maxLevel}
        />
      </RowWrapper>
      {subscription}
    </>
  );
};

interface ITowerInfoTitle {
  towerTitle: TowersTypes;
  tutorialCondition: TutorialConditions;
  haveSubscription?: boolean;
  factors?: IFactors;
  subscriptionText: string;
}

interface ITitle {
  sizeContent: boolean;
}

interface ISubscriptionElem {
  subscriptionText: string;
}
