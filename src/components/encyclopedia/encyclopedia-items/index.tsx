import React from 'react';
import styled from 'styled-components';
import { IEncyclopediaItemConfig, EncyclopediaItemIds } from '..';

const ItemsWrapper = styled.div`
  height: 100%;
  width: 308px;
  overflow: auto;
  flex-shrink: 0;
`;

const EncyclopediaItem = styled.div<{ activElem: boolean }>`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: ${props => (props.activElem ? 'bold' : 'normal')};
  font-size: 24px;
  line-height: 33px;
  color: #001424;
  opacity: ${props => (props.activElem ? '1' : '0.6')};
  background-color: ${props => (props.activElem ? '#F3F6F8' : 'white')};
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
  const list = encyclopediaItemsList.map(item => (
    <EncyclopediaItem
      activElem={item.id === activeItem}
      key={item.id}
      onClick={() => callBack(item.id)}
    >
      {item.label}
    </EncyclopediaItem>
  ));
  return <ItemsWrapper>{list}</ItemsWrapper>;
};

interface IEncyclopediaItems {
  encyclopediaItemsList: IEncyclopediaItemConfig[];
  activeItem: EncyclopediaItemIds;
  callBack: (arg: EncyclopediaItemIds) => void;
}
