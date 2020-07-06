import React, { memo } from 'react';
import { TowerInfoChat } from '../tower-info-chat';
import { TowerInfoDescription } from '../tower-info-description';
import { TowerInfoTask } from '../tower-info-task';
import { TowerInfoContentValues } from '../../effector/app-condition/store';
import { TowersTypes } from '../../effector/towers-progress/store';
import { ITabSwitchers } from '../tower-info';

export const TowerInfoContent: React.FC<ITowerInfoContent> = memo(
  ({
    selectedMenu = TowerInfoContentValues.DESCRIPTION,
    text,
    towerTitle,
    switchers,
  }) => {
    switch (selectedMenu) {
      case TowerInfoContentValues.CHAT:
        return <TowerInfoChat towerTitle={towerTitle} switchers={switchers} />;
      case TowerInfoContentValues.DESCRIPTION:
        return <TowerInfoDescription text={text} />;
      default:
        return <TowerInfoTask towerTitle={towerTitle} />;
    }
  }
);

interface ITowerInfoContent {
  selectedMenu: TowerInfoContentValues;
  text: Array<string>;
  towerTitle: TowersTypes;
  switchers: ITabSwitchers;
}
