import React from 'react';
import styled from 'styled-components';
import { IEncyclopediaItemConfig, EncyclopediaItem } from '..';
import { MTSSans } from '../../../fonts';

const ItemsWrapper = styled.div`
  height: 100%;
  width: 308px;
  overflow: auto;
  flex-shrink: 0;
  position: relative;
  box-sizing: border-box;
  padding-bottom: 100px;
`;

const EncyclopediaElement = styled.div<IEncyclopediaElement>`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: start;
  padding-left: 40px;
  box-sizing: border-box;

  font-family: ${props => (props.selected ? MTSSans.BOLD : MTSSans.REGULAR)};
  font-size: 24px;
  line-height: 33px;
  color: #001424;
  opacity: ${props => (props.selected ? '1' : '0.6')};
  background-color: ${props => (props.selected ? '#F3F6F8' : 'white')};
  transition: 0.4s;
  cursor: pointer;

  &:hover {
    background-color: #f3f6f8;
  }
`;

export const EncyclopediaItems: React.FC<IEncyclopediaItems> = ({
  encyclopediaItemsList,
  activeItem,
  callBack,
}) => {
  const Items = encyclopediaItemsList.map(item => (
    <EncyclopediaElement
      selected={item.id === activeItem}
      key={item.id}
      onClick={() => callBack(item.id)}
    >
      {item.label}
    </EncyclopediaElement>
  ));
  return <ItemsWrapper>{Items}</ItemsWrapper>;
};

interface IEncyclopediaItems {
  encyclopediaItemsList: IEncyclopediaItemConfig[];
  activeItem: EncyclopediaItem;
  callBack: (arg: EncyclopediaItem) => void;
}

interface IEncyclopediaElement {
  selected: boolean;
}
