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
`;

export const Options: React.FC<IOptions> = props => {
  return <Wrapper {...props}>{props.children} </Wrapper>;
};

interface IOptions extends IOptionsWrapper {
  a?: string;
}

interface IOptionsWrapper {
  showOptions: boolean;
}
