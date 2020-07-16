import React, { memo } from 'react';
import { TowerInfoChat } from '../tower-info-chat';
import { TowerInfoDescription } from '../tower-info-description';
import { TowerInfoContentValues } from '../../../effector/app-condition/store';
import { TowerInfoTask } from '../tower-info-task';
import { TowersTypes } from '../../../effector/towers-progress/store';
import { ITabSwitchers } from '../index';

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
