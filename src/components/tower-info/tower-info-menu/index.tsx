import { RowWrapper } from '../../../UI/row-wrapper';
import { TowerInfoContentValues } from '../../../effector/app-condition/store';
import { setTowerInfoContent } from '../../../effector/app-condition/events';
import { MoveDivider } from '../../../UI/move-divider';
import React from 'react';
import { useMoveTo } from '../../../hooks/use-move-to';
import styled from 'styled-components';
import { MTSSans } from '../../../fonts';
import { useStore } from 'effector-react';
import { TasksStore } from '../../../effector/tasks-store/store';
import { TowersTypes } from '../../../effector/towers-progress/store';
import { filterTasksArray } from '../../../utils/filtered-missions-array';

enum SelectedColorValue {
  TRUE = '001424',
  FALSE = '6e7782',
}

enum dataTypesMenu {
  CHAT = 'chat',
  TASK = 'task',
}

const TowerInfoMenuWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  flex-shrink: 0;
`;

const TowerInfoMenuElement = styled.div<ISelected>`
  height: 100%;
  text-align: center;
  cursor: pointer;
  z-index: 2;
  margin-right: 40px;
  color: #${props =>
    props.selected ? SelectedColorValue.TRUE : SelectedColorValue.FALSE};
  font-size: 20px;
  font-family: ${props => (props.selected ? MTSSans.MEDIUM : MTSSans.REGULAR)};
  position: relative;
  padding-bottom: 12px;
  transition: all 0.8s ease;

  &:hover {
    color: black;
  }

  @media (max-resolution: 0.8dppx) {
    font-size: 1.5vh;
  }

  &[data-type=${dataTypesMenu.CHAT}]::before,
  &[data-type=${dataTypesMenu.TASK}]::before {
    content: '';
    display: ${props => (props.notify ? 'block' : 'none')};
    width: 10px;
    height: 10px;
    border-radius: 50%;
    position: absolute;
    right: -20px;
    top: 3px;
    border-radius: 50%;
    background-color: #e30611;
  }
`;

const FIRST_ELEM_WIDTH = 92;

export const TowerInfoMenu: React.FC<ITowerInfoMenu> = ({
  refsCollection,
  selectTowerInfoContent,
  isChatEnded,
  towerTitle,
}) => {
  const {
    left,
    width,
    hLeft,
    hWidth,
    hovered,
    handleMouseOver,
    handleMouseOut,
  } = useMoveTo(FIRST_ELEM_WIDTH, refsCollection, selectTowerInfoContent);
  const missions = useStore(TasksStore);

  return (
    <TowerInfoMenuWrapper>
      <RowWrapper onMouseOut={() => handleMouseOut()}>
        <TowerInfoMenuElement
          selected={
            selectTowerInfoContent === TowerInfoContentValues.DESCRIPTION
          }
          onClick={() => {
            setTowerInfoContent(TowerInfoContentValues.DESCRIPTION);
          }}
          onMouseOver={handleMouseOver}
          ref={refsCollection[0]}
        >
          Информация
        </TowerInfoMenuElement>
        <TowerInfoMenuElement
          selected={selectTowerInfoContent === TowerInfoContentValues.CHAT}
          onClick={() => {
            setTowerInfoContent(TowerInfoContentValues.CHAT);
          }}
          onMouseOver={handleMouseOver}
          ref={refsCollection[1]}
          notify={!isChatEnded}
          data-type={dataTypesMenu.CHAT}
        >
          Чат
        </TowerInfoMenuElement>
        <TowerInfoMenuElement
          selected={selectTowerInfoContent === TowerInfoContentValues.TASK}
          onClick={() => {
            setTowerInfoContent(TowerInfoContentValues.TASK);
          }}
          onMouseOver={handleMouseOver}
          ref={refsCollection[2]}
          data-type={dataTypesMenu.TASK}
          notify={!!filterTasksArray(missions, towerTitle).length}
        >
          Задания
        </TowerInfoMenuElement>
        <MoveDivider
          width={hovered ? hWidth : width}
          left={hovered ? hLeft : left}
        />
      </RowWrapper>
    </TowerInfoMenuWrapper>
  );
};

interface ITowerInfoMenu {
  refsCollection: React.RefObject<HTMLDivElement>[];
  selectTowerInfoContent: TowerInfoContentValues;
  isChatEnded?: boolean;
  towerTitle: TowersTypes;
}

interface ISelected {
  selected: boolean;
  notify?: boolean;
}
