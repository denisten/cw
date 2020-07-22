import React, { useState } from 'react';
import { ZIndexes } from '../root-component/z-indexes-enum';
import { Overlay } from '../../UI/overlay';
import styled from 'styled-components';
import wrapperBg from './wrapperbg.svg';
import { EncyclopediaItems } from './encyclopedia-items';
import { EncyclopediaContent } from './encyclopedia-content';
const StyledConfig = {
  overlay: {
    zIndex: ZIndexes.MODAL,
  },
};

const Wrapper = styled.div`
  background-image: url(${wrapperBg});
  width: 1101px;
  height: 737px;
  display: flex;
  padding-top: 44px;
  box-sizing: border-box;
`;
export enum EncyclopediaItemIds {
  LEGEND = 'legend',
  HINTS = 'hints',
  TASKS = 'tasks',
}
const encyclopediaItemsList: IEncyclopediaItemConfig[] = [
  {
    label: 'Легенда',
    id: EncyclopediaItemIds.LEGEND,
  },
  {
    label: 'Подсказки',
    id: EncyclopediaItemIds.HINTS,
  },
  {
    label: 'Задания',
    id: EncyclopediaItemIds.TASKS,
  },
];
const Encyclopedia = () => {
  const [activeItem, setActiveItem] = useState(EncyclopediaItemIds.LEGEND);
  return (
    <Overlay displayFlag={true} {...StyledConfig.overlay}>
      <Wrapper>
        <EncyclopediaItems
          encyclopediaItemsList={encyclopediaItemsList}
          activeItem={activeItem}
          callBack={setActiveItem}
        />
        <EncyclopediaContent />
      </Wrapper>
    </Overlay>
  );
};

export interface IEncyclopediaItemConfig {
  label: string;
  id: EncyclopediaItemIds;
}

export default Encyclopedia;
