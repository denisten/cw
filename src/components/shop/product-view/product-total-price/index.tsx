import React from 'react';
import styled from 'styled-components';
import { StyledSpan } from '../../../../UI/span';
import { MTSSans } from '../../../../fonts';
import { Icon, TypeOfIcons } from '../../../../UI/icons';
import { NumberText } from '..';
import { parseSum } from '../../../../utils/parse-sum';

const TotalPriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TotalText = styled(StyledSpan)`
  font-family: ${MTSSans.BOLD};
  font-size: 24px;
  line-height: 32px;
  letter-spacing: -0.6px;
  color: #212527;
`;

const TotalPriceIconBlock = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 25px;
    height: 25px;
    margin-right: 8px;
  }
`;
export const ProductTotalPrice: React.FC<{ callBack: () => void }> = ({
  callBack,
}) => {
  return (
    <>
      <TotalPriceWrapper>
        <TotalText>Итого</TotalText>
        <TotalPriceIconBlock>
          <Icon type={TypeOfIcons.COIN} />
          <NumberText>{parseSum(String(callBack()))}</NumberText>
        </TotalPriceIconBlock>
      </TotalPriceWrapper>
    </>
  );
};
