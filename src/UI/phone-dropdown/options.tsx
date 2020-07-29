import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div<IOptionsWrapper>`
  display: flex;
  flex-direction: column;
  opacity: ${props => (props.showOptions ? 1 : 0)};
  position: absolute;
  width: 244px;
  height: 100px;
  border-radius: 12px;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const OptionElement = styled.div`
  width: 238px;
  height: 47px;
  opacity: 0.05;
  border-radius: 10px;
  background: #fff;
  :hover {
    background: #001424;
  }
`;

export const Options: React.FC<IOptions> = props => {
  return (
    <Wrapper {...props}>
      <OptionElement />
      <OptionElement />
    </Wrapper>
  );
};

interface IOptions extends IOptionsWrapper {
  a?: string;
}

interface IOptionsWrapper {
  showOptions: boolean;
}
