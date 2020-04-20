import React from 'react';
import { TowerInfoChat } from '../tower-info-chat';
import { TowerInfoDescription } from '../tower-info-description';
import { TowerInfoTask } from '../tower-info-task';
import { TowerInfoContentValues } from '../../effector/app-condition/store';

type TowerInfoContentProps = {
  selectedMenu: TowerInfoContentValues;
  text: Array<string>;
  hideContent: boolean;
};

export const TowerInfoContent: React.FC<TowerInfoContentProps> = ({
  selectedMenu = TowerInfoContentValues.DESCRIPTION,
  text,
  hideContent,
}) => {
  switch (selectedMenu) {
    case TowerInfoContentValues.CHAT:
      return <TowerInfoChat hideContent={hideContent} />;
    case TowerInfoContentValues.DESCRIPTION:
      return <TowerInfoDescription text={text} />;
    default:
      return <TowerInfoTask />;
  }
};
