import React from 'react';
import styled from 'styled-components';

const MTSCardBody = styled.div<{ active?: boolean }>`
  width: 100%;
  height: 56px;
  background: #ffffff;
  border: ${props =>
    props.active ? '2px solid #EB0E0E' : '1px solid #dedede'};
  box-sizing: border-box;
  border-radius: 10px;
  padding: 0 14px;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 12px;
`;

export const MTSItemCard = () => {
  return <MTSCardBody active={true}></MTSCardBody>;
};
