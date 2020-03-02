import styled from 'styled-components';
import React from 'react';
type NickNameWrapperProps = {
  nickName: string;
};

const NickNameWrapper = styled.span`
  color: #fff;
  position: absolute;
  top: 18%;
  left: 27%;
  font-size: 1.5em;
`;

const NickNameMemo: React.FC<NickNameWrapperProps> = ({ nickName }) => {
  return <NickNameWrapper>{nickName}</NickNameWrapper>;
};

export const NickName = React.memo(NickNameMemo);
