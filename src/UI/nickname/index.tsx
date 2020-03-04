import styled from 'styled-components';
import React from 'react';

const NickNameWrapper = styled.span`
  color: #fff;
  position: absolute;
  top: 18%;
  left: 27%;
  font-size: 1.5em;
`;

export const NickName = React.memo(({ nickName }: INickNameWrapper) => {
  return <NickNameWrapper>{nickName}</NickNameWrapper>;
});

interface INickNameWrapper {
  nickName: string;
}
