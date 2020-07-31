import React, { useState } from 'react';
import { ZIndexes } from '../root-component/z-indexes-enum';
import { Overlay } from '../../UI/overlay';
import styled from 'styled-components';
import wrapperBg from './wrapperbg.svg';
import { EncyclopediaItems } from './encyclopedia-items';
import { EncyclopediaContent } from './encyclopedia-content';
import { useStore } from 'effector-react';
import { MenuStore } from '../../effector/menu-store/store';
import { ExitButton } from '../../UI/exit-button';
import { setOpenEncyclopediaState } from '../../effector/menu-store/events';
const StyledConfig = {
  overlay: {
    zIndex: ZIndexes.ENCYCLOPEDIA,
  },
};

const Wrapper = styled.div`
  background-image: url(${wrapperBg});
  width: 1101px;
  height: 737px;
  display: flex;
  padding-top: 44px;
  box-sizing: border-box;
  user-select: none;
  position: relative;
  border-radius: 4px;
`;
export enum EncyclopediaItem {
  LEGEND = 'legend',
  HINTS = 'hints',
  TASKS = 'tasks',
}
export const encyclopediaItemsList: IEncyclopediaItemConfig[] = [
  {
    label: 'Легенда',
    id: EncyclopediaItem.LEGEND,
  },
  {
    label: 'Подсказки',
    id: EncyclopediaItem.HINTS,
  },
  {
    label: 'Задания (скоро)',
    id: EncyclopediaItem.TASKS,
  },
];

const styledConfig = {
  exitButton: {
    top: '-1%',
    right: '-4%',
    hoverFlag: true,
    zIndex: ZIndexes.UI_BUTTON,
    displayFlag: true,
  },
};

const Encyclopedia = () => {
  const { openEncyclopedia } = useStore(MenuStore);
  const [activeItem, setActiveItem] = useState(EncyclopediaItem.LEGEND);
  const activeItemObj = encyclopediaItemsList.find(
    elem => elem.id === activeItem
  );
  const activeIndex = encyclopediaItemsList.findIndex(
    elem => elem.id === activeItem
  );

  return (
    <Overlay displayFlag={openEncyclopedia} {...StyledConfig.overlay}>
      <Wrapper>
        <ExitButton
          {...styledConfig.exitButton}
          callBack={() => setOpenEncyclopediaState(false)}
        />
        <EncyclopediaItems
          encyclopediaItemsList={encyclopediaItemsList}
          activeItem={activeItem}
          callBack={setActiveItem}
        />
        <EncyclopediaContent
          activeItem={activeItemObj}
          activeIndex={activeIndex}
          callBack={setActiveItem}
        />
      </Wrapper>
    </Overlay>
  );
};

export interface IEncyclopediaItemConfig {
  label: string;
  id: EncyclopediaItem;
}

export default Encyclopedia;
