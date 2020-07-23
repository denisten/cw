import React from 'react';
import styled from 'styled-components';
import { IEncyclopediaItemConfig, EncyclopediaItemIds } from '..';
import { MTSSans } from '../../../fonts';
import icon from './icon.svg';

const ItemsWrapper = styled.div`
  height: 100%;
  width: 308px;
  overflow: auto;
  flex-shrink: 0;
  position: relative;
  box-sizing: border-box;
  padding-bottom: 100px;
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

const ItemsButton = styled.div`
  width: 100%;
  position: absolute;
  background: #02adc9;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  height: 100px;
  bottom: 0;
  left: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  line-height: 33px;
  color: #ffffff;
  font-family: ${MTSSans.BOLD};
`;

const Icon = styled.img`
  width: 26px;
  height: 16px;
  margin-right: 15px;
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
  return (
    <ItemsWrapper>
      {list}
      <ItemsButton>
        <Icon src={icon} alt="icon" />
        <span>Обзор</span>
      </ItemsButton>
    </ItemsWrapper>
  );
};

interface IEncyclopediaItems {
  encyclopediaItemsList: IEncyclopediaItemConfig[];
  activeItem: EncyclopediaItemIds;
  callBack: (arg: EncyclopediaItemIds) => void;
}
