import React from 'react';
import styled from 'styled-components';
import { StyledSpan } from '../../../UI/span';
import { MTSSans } from '../../../fonts';
import { useStore } from 'effector-react';
import { UserDataStore } from '../../../effector/user-data/store';
import { CoinsWallet } from '../../../UI/wallet';
import { ClientWorldItems } from './cw-items';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 86px 1fr;
  border-right: 1px solid rgba(0, 0, 0, 0.15);
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 10px 42px 0px 42px;
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.15);
`;

const Content = styled.div`
  overflow: auto;
  height: 449px;
  box-sizing: border-box;
  padding: 32px 42px;
  display: grid;
`;

const Title = styled(StyledSpan)`
  font-size: 36px;
  line-height: 24px;
  letter-spacing: -0.6px;
  color: #001424;
  font-family: ${MTSSans.BOLD};
`;

export const ShopContent = () => {
  const { money } = useStore(UserDataStore);
  return (
    <Wrapper>
      <Header>
        <Title>Магазин</Title>
        <CoinsWallet hidePlus={true} sum={String(money)} />
      </Header>
      <Content>
        <ClientWorldItems />
      </Content>
    </Wrapper>
  );
};
