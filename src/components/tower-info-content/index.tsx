import React from 'react';
import { TowerInfoContentValues } from '../tower-info';
import { TowerInfoChat } from '../tower-info-chat';
import { TowerInfoDescription } from '../tower-info-description';
import { TowerInfoTask } from '../tower-info-task';

type TowerInfoContentProps = {
  selectedMenu: TowerInfoContentValues;
  text: string;
};

export const TowerInfoContent: React.FC<TowerInfoContentProps> = ({
  selectedMenu = TowerInfoContentValues.DESCRIPTION,
  text,
}) => {
  switch (selectedMenu) {
    case TowerInfoContentValues.CHAT:
      return <TowerInfoChat />;
    case TowerInfoContentValues.DESCRIPTION:
      return <TowerInfoDescription text={text} />;
    default:
      return <TowerInfoTask />;
  }
};
