import React from 'react';
import styled from 'styled-components';
import { MTSSans } from '../../../fonts';
import { Button, ButtonClassNames } from '../../../UI/button';
import { StyledSpan } from '../../../UI/span';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    text-decoration: none;
    line-height: 24px;
    letter-spacing: -0.6px;
  }
`;

const Link = styled.a`
  font-size: 16px;
  text-align: center;
  color: #02adc9;
`;

const PhoneNumber = styled.a`
  font-size: 24px;
  line-height: 24px;
  letter-spacing: -0.6px;
  color: #000000;
  font-family: ${MTSSans.BOLD};
  margin-top: 146px;
  margin-bottom: 12px;
  text-decoration: none;
`;

const SpanElem = styled(StyledSpan)`
  letter-spacing: -0.6px;
  color: #a7a7a7;
  font-size: 16px;
  line-height: 24px;
`;

const styledConfig = {
  button: {
    margin: '48px 0 8px 0',
  },
};

export const MenuHelp = () => {
  return (
    <Wrapper>
      <PhoneNumber href="tel:+8 800 800 80 80">8 800 800 80 80</PhoneNumber>
      <Link
        target="_blank"
        href="mailto:name@email.com"
        rel="noopener noreferrer"
      >
        Написать нам
      </Link>
      <Button
        style={styledConfig.button}
        className={ButtonClassNames.NORMAL}
        content="МТС Справка"
        callback={() => window.open('https://moskva.mts.ru/personal', '_blank')}
      />
      <SpanElem>Все о мире, частые вопросы и т.п.</SpanElem>
    </Wrapper>
  );
};
