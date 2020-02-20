import React, { useEffect, useState } from 'react';
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
  const [descriptionText, setDescriptionText] = useState('');
  useEffect(() => {
    setDescriptionText(state => (state += text));
  }, [text]);
  switch (selectedMenu) {
    case TowerInfoContentValues.CHAT:
      return <TowerInfoChat />;
    case TowerInfoContentValues.DESCRIPTION:
      return <TowerInfoDescription text={descriptionText} />;
    default:
      return <TowerInfoTask />;
  }
};
