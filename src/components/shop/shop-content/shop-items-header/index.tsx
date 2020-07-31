import React from 'react';
import styled from 'styled-components';
import { MTSSans } from '../../../../fonts';

const Header = styled.div<{ background: string }>`
  width: 100%;
  background: url(${props => props.background}) no-repeat center;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: 24px;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.6px;
  font-family: ${MTSSans.BOLD};
  color: #ffffff;
  margin-bottom: 24px;
  height: 26px;
`;
export const ShopItemsHeader: React.FC<IShopItemsHeader> = ({
  headerText,
  background,
}) => {
  return <Header background={background}>{headerText}</Header>;
};

interface IShopItemsHeader {
  headerText: string;
  background: string;
}
