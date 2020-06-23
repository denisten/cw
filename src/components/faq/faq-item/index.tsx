import React, { useState } from 'react';
import styled from 'styled-components';
import { MTSSans } from '../../../fonts';
import { IDisplayFlag } from '../../skip-tutorial';

const FaqItemWrapper = styled.div`
  width: calc(100% - 44px);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-top: 15px;
`;

const Title = styled.span`
  cursor: pointer;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.6px;
  color: #202d3d;
  font-family: ${MTSSans.BOLD};
  padding-bottom: 15px;
  border-bottom: 1px solid #d9d9d9;
`;

const Description = styled.span<IDisplayFlag>`
  font-size: 16px;
  line-height: 24px;
  color: #202d3d;
  padding: 15px 0;
  border-bottom: 1px solid #d9d9d9;
  display: ${props => (props.displayFlag ? 'block' : 'none')};
`;

export const FAQItem: React.FC<IFAQItem> = ({ title, description }) => {
  const [displayFlag, setDisplayFlag] = useState(false);
  return (
    <FaqItemWrapper>
      <Title onClick={() => setDisplayFlag(!displayFlag)}>{title}</Title>
      <Description displayFlag={displayFlag}>{description}</Description>
    </FaqItemWrapper>
  );
};

interface IFAQItem {
  title: string;
  description: string;
}
