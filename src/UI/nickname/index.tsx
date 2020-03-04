import styled from 'styled-components';
import React from 'react';

const NickNameWrapper = styled.span`
  color: #076170;
  position: absolute;
  top: 12%;
  left: 27%;
  font-size: 28.5px;
`;

export const NickName = React.memo(({ nickName }: INickNameWrapper) => {
  return <NickNameWrapper>{nickName}</NickNameWrapper>;
});

interface INickNameWrapper {
  nickName: string;
}
